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

  let app: Application | null = null;

  let container: HTMLDivElement;

  interface Cell {
    x: number;
    y: number;
    angle: number;
    uVec: Point;
  }

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

    // Disable auto-clearing

    if (!container) {
      console.warn("Container not found!");
      return;
    }

    console.log("mounted");

    // Append the application canvas to the document body
    container.appendChild(app.canvas);
    app.canvas.classList.add(
      "fixed",
      "top-0",
      "left-0",
      "w-screen",
      "h-screen",
      "-z-10"
    );

    // Main container
    const flow_field = new Container();

    const width: number = app.screen.width;
    const height: number = app.screen.height;
    const cellSize = 10;
    const rows: number = Math.floor(height / cellSize);
    const cols: number = Math.floor(width / cellSize);
    const curve: number = 2;
    const zoom: number = 0.05;
    const particleCount: number = 5000;
    const particles: Graphics[] = [];
    let grid: Cell[] = [];
    let angle: number = 0;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        angle = (Math.cos(x * zoom) + Math.sin(y * zoom)) * curve;
        const unitVector = new Point(Math.cos(angle), Math.sin(angle));
        grid.push({
          x: x * cellSize,
          y: y * cellSize,
          angle: angle,
          uVec: unitVector,
        });
      }
    }

    // for (let i = 0; i < grid.length; i++) {
    //   let cell = grid[i];
    //   let point = rotateAroundPivot(
    //     { x: cell.x, y: cell.y },
    //     { x: cell.x + 10, y: cell.y },
    //     cell.angle
    //   );
    //   let arrow = new Graphics()
    //     .moveTo(cell.x, cell.y)
    //     .lineTo(point.x, point.y)
    //     .stroke({ color: 0x888888, pixelLine: true });
    //   flow_field.addChild(arrow);
    // }

    for (let i = 0; i < particleCount; i++) {
      let particle = new Graphics().circle(0, 0, 4).fill("#aa0033");
      particle.x = Math.random() * width;
      particle.y = Math.random() * height;

      particles.push(particle);
      flow_field.addChild(particle);
    }

    app.stage.addChild(flow_field);

    // Listen for animate update
    app.ticker.add((time) => {
      // console.log("ticking");
      const fade = new Graphics();
      fade.rect(0, 0, width, height).fill({ color: 0x111122, alpha: 0.05 });
      if (app) app.renderer.render(fade); // Overlay this fade layer

      for (let p of particles) {
        let col = Math.floor(p.x / cellSize);
        let row = Math.floor(p.y / cellSize);
        if (col < 0 || col >= cols || row < 0 || row >= rows) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          continue;
        }
        let index = row * cols + col;

        let cell = grid[index];
        p.x += cell.uVec.x * time.deltaTime * 0.5;
        p.y += cell.uVec.y * time.deltaTime * 0.5;
        if (p.x < 0 || p.x >= width || p.y >= height || p.y < 0) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
        }
      }
    });
  });

  onDestroy(() => {
    if (app) {
      app.destroy(true);
      app = null;
    }
  });
</script>

<div class="absolute inset-0 -z-10" bind:this={container}></div>
