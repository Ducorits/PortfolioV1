<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut, linear } from "svelte/easing";
  import { aboutProjectMap } from "$lib/projectContent";
  import { derived } from "svelte/store";

  let { title, projectId } = $props();

  let isOpen = $state(false);
  let scale = tweened(0, { duration: 300, easing: linear });

  function toggle() {
    isOpen = !isOpen;
    scale.set(isOpen ? 1 : 0);
  }

  let ProjectInfo: typeof import("svelte").SvelteComponent | null =
    $state(null);

  $effect(() => {
    if (projectId) {
      ProjectInfo = aboutProjectMap[projectId] ?? null;
      console.log(ProjectInfo);
    } else {
      ProjectInfo = null;
    }
  });
  let buttonRotation = $derived(isOpen ? "rotate-45" : "rotate-0");
</script>

<!-- Button in top-left -->
<button
  onclick={toggle}
  class="fixed left-5 top-20 lg:left-20 z-50 w-10 h-10 rounded-full bg-black/80 text-white flex items-center justify-center transition-transform duration-300 ease-in-out border-1 border-blue-600 {buttonRotation}"
  aria-label="Toggle Info Overlay"
  {title}
>
  <span class="text-2xl font-bold">+</span>
</button>

<!-- Overlay expanding from the button -->
<div
  class="fixed top-0 left-0 z-40 w-screen h-screen overflow-hidden pointer-events-none
         [--clip-x:40px] [--clip-y:100px]
         lg:[--clip-x:100px]"
  style="clip-path: circle({$scale *
    130}% at var(--clip-x) var(--clip-y)); transition: clip-path 0.6s;"
>
  <div
    class="overlay pt-35 lg:pt-10 w-full h-full text-white p-8 pointer-events-auto overflow-y-auto"
  >
    <div class="max-w-2xl mx-auto prose prose-invert">
      <h2 class="text-3xl font-semibold mb-4">{title}</h2>
      {#if ProjectInfo}
        <ProjectInfo />
      {/if}
      <button
        onclick={toggle}
        class="mt-6 px-4 py-2 bg-white/20 rounded hover:bg-white/30 transition"
      >
        Close
      </button>
    </div>
  </div>
</div>

<style>
  .overlay {
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.4);
  }
</style>
