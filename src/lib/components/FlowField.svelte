<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";
  import { Application, Container, Graphics, Point } from "pixi.js";
  import { settings, type FlowSettings } from "$lib/stores/settings";
  import FlowSettingsPanel from "./FlowSettingsPanel.svelte";

  let app: Application | null = null;

  let container: HTMLDivElement;

  // Layers & data
  let arrowsLayer: Container;
  let particlesLayer: Container;
  const particles: Graphics[] = $state([]);
  let grid: Cell[][] = $state([]);
  let rows: number = $state(0);
  let cols: number = $state(0);
  let width: number = $state(0);
  let height: number = $state(0);

  let dragging = false;
  let lastMouse = new Point();

  interface Cell {
    x: number;
    y: number;
    angle: number;
    uVec: Point;
  }

  let cfg: FlowSettings;
  let oldCfg: FlowSettings;
  let unsub = () => {};

  onMount(async () => {
    if (!browser) return;

    // Create a new application
    app = new Application();

    // Initialize the application
    await app.init({
      background: "#111122",
      resizeTo: window,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      clearBeforeRender: false,
      preserveDrawingBuffer: true,
    });

    if (!container) {
      console.warn("Container not found!");
      return;
    }

    console.log("FlowField Mounted");

    // Append the application canvas to the document body
    container.appendChild(app.canvas);
    app.canvas.classList.add("fixed", "inset-0", "-z-10");

    // Main container
    const flowField = new Container();
    arrowsLayer = new Container();
    particlesLayer = new Container();
    flowField.addChild(arrowsLayer, particlesLayer);
    app.stage.addChild(flowField);

    unsub = settings.subscribe((newCfg) => {
      cfg = newCfg;
      resetScene();
    });

    // inside onMount, AFTER you append `app.view`…
    flowField.interactive = true; // enable Pixi interaction
    flowField.hitArea = app.screen;

    flowField
      .on("pointerdown", (e) => {
        dragging = true;
        lastMouse.copyFrom(e.global);
      })
      .on("pointerup", () => {
        dragging = false;
      })
      .on("pointerupoutside", () => {
        dragging = false; // in case they release off‑canvas
      })
      .on("pointermove", (e) => {
        if (!dragging || !cfg.enableMouseDrag) return;
        const mouse = e.global;
        const dragDir = new Point(mouse.x - lastMouse.x, mouse.y - lastMouse.y);
        const mag = Math.hypot(dragDir.x, dragDir.y);
        if (mag > 1) {
          dragDir.x /= mag;
          dragDir.y /= mag;
          perturbGrid(mouse, dragDir);
          lastMouse.copyFrom(mouse);
        }
      });
    resetScene();
  });

  function perturbGrid(mouse: Point, dir: Point) {
    const brushRadius = 100;
    const radiusInCells = Math.ceil(brushRadius / cfg.cellSize);
    const centerRow = Math.floor(mouse.y / cfg.cellSize);
    const centerCol = Math.floor(mouse.x / cfg.cellSize);

    for (let dy = -radiusInCells; dy < radiusInCells; dy++) {
      console.log(dy);
      const row = centerRow + dy;
      if (row < 0 || row >= rows) continue;
      for (let dx = -radiusInCells; dx < radiusInCells; dx++) {
        const col = centerCol + dx;
        if (col < 0 || col >= cols) continue;

        const cell = grid[row][col];
        const dist = Math.hypot(cell.x - mouse.x, cell.y - mouse.y);
        if (dist > brushRadius) continue;

        const influence = 1 - dist / brushRadius;
        const strength = 10;

        // console.log(influence);
        cell.uVec.x += dir.x * influence * strength;
        cell.uVec.y += dir.y * influence * strength;
        // normalize if needed
        const len = Math.hypot(cell.uVec.x, cell.uVec.y);
        cell.uVec.x /= len;
        cell.uVec.y /= len;
        // grid[row][col] = cell;
      }
    }
  }

  function setGrid() {
    // setup grid and debug arrows.
    for (let y = 0; y < rows; y++) {
      grid[y] = [];
      for (let x = 0; x < cols; x++) {
        let angle =
          (Math.cos(x * cfg.zoom) + Math.sin(y * cfg.zoom)) * cfg.curve;
        const unitVector = new Point(Math.cos(angle), Math.sin(angle));
        const pos = new Point(x * cfg.cellSize, y * cfg.cellSize);
        grid[y][x] = {
          x: pos.x,
          y: pos.y,
          angle: angle,
          uVec: unitVector,
        };
        if (cfg.showDebug) {
          const arrow = new Graphics()
            .moveTo(pos.x, pos.y)
            .lineTo(pos.x + unitVector.x * 10, pos.y + unitVector.y * 10)
            .stroke({ color: 0x888888, pixelLine: true });
          arrowsLayer.addChild(arrow);
        }
      }
    }
  }

  function setParticles() {
    // setup particles
    for (let i = 0; i < cfg.particleCount; i++) {
      let colorIndex = Math.floor(Math.random() * cfg.particleColors.length);

      let g = new Graphics()
        .circle(0, 0, cfg.particleSize)
        .fill(cfg.particleColors[colorIndex]);
      g.x = Math.random() * width;
      g.y = Math.random() * height;

      particles.push(g);
      particlesLayer.addChild(g);
    }
  }

  function resetScene() {
    if (!app) return;
    width = app.screen.width;
    height = app.screen.height;

    // remove previous
    arrowsLayer.removeChildren();
    particlesLayer.removeChildren();
    particles.length = 0;

    rows = Math.floor(height / cfg.cellSize);
    cols = Math.floor(width / cfg.cellSize);

    setGrid();
    setParticles();

    // Add ticker
    app.ticker.remove(update);
    app.ticker.add(update);
  }

  function update(ticker: any) {
    if (!app) return;

    width = app.screen.width;
    height = app.screen.height;

    const fade = new Graphics();
    if (cfg.clearBackground) {
      fade
        .rect(0, 0, width, height)
        .fill({ color: cfg.backgroundColor, alpha: 1 });
    } else {
      fade
        .rect(0, 0, width, height)
        .fill({ color: cfg.backgroundColor, alpha: cfg.fadeAlpha });
    }
    if (app) app.renderer.render(fade); // Overlay this fade layer

    cols = Math.floor(width / cfg.cellSize);
    rows = Math.floor(height / cfg.cellSize);
    const delta = ticker.deltaTime;
    for (let p of particles) {
      let col = Math.floor(p.x / cfg.cellSize);
      let row = Math.floor(p.y / cfg.cellSize);
      if (col < 0 || col >= cols || row < 0 || row >= rows) {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
        continue;
      }

      let cell = grid[row][col];
      p.x += cell.uVec.x * delta * cfg.particleSpeed;
      p.y += cell.uVec.y * delta * cfg.particleSpeed;
      if (p.x < 0 || p.x >= width || p.y >= height || p.y < 0) {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
      }
    }

    if (oldCfg != cfg) oldCfg = cfg;
  }

  onDestroy(() => {
    unsub();
    if (app) {
      app.destroy(true);
      app = null;
    }
  });
</script>

<div class="absolute inset-0 -z-10" bind:this={container}></div>
