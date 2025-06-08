<script lang="ts">
  import { onMount } from "svelte";

  export let onDraw: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => void;

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  let width = 0;
  let height = 0;
  let animationFrameId: number;

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Set actual pixel size of canvas
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Set CSS display size
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    width = rect.width;
    height = rect.height;

    // Get 2D context and scale it to match DPR
    ctx = canvas.getContext("2d")!;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset any existing transforms
    ctx.scale(dpr, dpr);
  }

  onMount(() => {
    resizeCanvas();

    function animate() {
      if (ctx) {
        onDraw(ctx, width, height);
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  });
</script>

<canvas bind:this={canvas} class="canvas"></canvas>

<style>
  .canvas {
    width: 100vw;
    height: 100vh;
    display: block;
  }
</style>
