<script lang="ts">
  import { onMount } from "svelte";
  import { getContext } from "svelte";
  import type { CanvasRenderingContext2D } from "svelte/types/runtime";

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
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }

  onMount(() => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx = canvas.getContext("2d");
    resizeCanvas();

    function animate() {
      onDraw(ctx, width, height);
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
