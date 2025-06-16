<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";
  import {
    Application,
    Color,
    Container,
    FillGradient,
    Graphics,
    Point,
  } from "pixi.js";
  import { rotateAroundPivot } from "$lib/utils";
  import { settings, type FlowSettings } from "$lib/stores/settings";

  let app: Application | null = null;

  let container: HTMLDivElement;

  // Layers & data
  let arrowsLayer: Container;
  let particlesLayer: Container;
  const particles: Graphics[] = [];
  let grid: Cell[] = [];

  interface Cell {
    x: number;
    y: number;
    angle: number;
    uVec: Point;
  }

  let cfg: FlowSettings;
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
    resetScene();
  });

  function resetScene() {
    if (!app) return;
    const width = app.screen.width;
    const height = app.screen.height;

    // remove previous
    arrowsLayer.removeChildren();
    particlesLayer.removeChildren();
    grid = [];
    particles.length = 0;

    const rows: number = Math.floor(height / cfg.cellSize);
    const cols: number = Math.floor(width / cfg.cellSize);
    // setup grid and debug arrows.
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let angle =
          (Math.cos(x * cfg.zoom) + Math.sin(y * cfg.zoom)) * cfg.curve;
        const unitVector = new Point(Math.cos(angle), Math.sin(angle));
        const pos = new Point(x * cfg.cellSize, y * cfg.cellSize);
        grid.push({
          x: pos.x,
          y: pos.y,
          angle: angle,
          uVec: unitVector,
        });
        if (cfg.showDebug) {
          const arrow = new Graphics()
            .moveTo(pos.x, pos.y)
            .lineTo(pos.x + unitVector.x * 10, pos.y + unitVector.y * 10)
            .stroke({ color: 0x888888, pixelLine: true });
          arrowsLayer.addChild(arrow);
        }
      }
    }

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

    // Add ticker
    app.ticker.remove(update);
    app.ticker.add(update);
  }

  function update(ticker: any) {
    if (!app) return;
    const width = app.screen.width;
    const height = app.screen.height;

    // console.log("ticking");
    const fade = new Graphics();
    fade
      .rect(0, 0, width, height)
      .fill({ color: cfg.backgroundColor, alpha: cfg.fadeAlpha });
    if (app) app.renderer.render(fade); // Overlay this fade layer

    const cols: number = Math.floor(width / cfg.cellSize);
    const rows: number = Math.floor(height / cfg.cellSize);
    const delta = ticker.deltaTime;
    for (let p of particles) {
      let col = Math.floor(p.x / cfg.cellSize);
      let row = Math.floor(p.y / cfg.cellSize);
      if (col < 0 || col >= cols || row < 0 || row >= rows) {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
        continue;
      }
      let index = row * cols + col;

      let cell = grid[index];
      p.x += cell.uVec.x * delta * 0.5;
      p.y += cell.uVec.y * delta * 0.5;
      if (p.x < 0 || p.x >= width || p.y >= height || p.y < 0) {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
      }
    }
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
