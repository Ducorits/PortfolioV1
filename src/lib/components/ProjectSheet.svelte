<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { onDestroy, onMount } from "svelte";
  import { projectMap } from "$lib/projectContent";

  let { close, projectId, open }: { close: any; projectId: string; open: any } =
    $props();
  let controller: AbortController;

  let ProjectComponent: typeof import("svelte").SvelteComponent | null =
    $state(null);

  $effect(() => {
    if (projectId) {
      ProjectComponent = projectMap[projectId] ?? null;
      console.log(ProjectComponent);
    } else {
      ProjectComponent = null;
    }
  });

  onMount(async () => {
    controller = new AbortController();
  });

  onDestroy(() => {
    controller?.abort();
  });
</script>

<aside
  transition:fly={{ x: 300 }}
  class="sheet flex-shrink w-full sm:w-[600px] h-full bg-black/50 backdrop-blur-lg pl-[20px] pt-[10px] text-white rounded-l-sm transform transition-transform duration-300 ease-in-out
         {open ? 'translate-x-0' : 'translate-x-full'}"
>
  <div class="sticky top-0 z-10 flex items-center gap-4">
    <button class="bg-gray-700 w-[40px] h-[38px] rounded-full" onclick={close}
      >✕</button
    >
    <h2 class="text-[40px] font-bold w-full text-center">{projectId}</h2>
  </div>
  <div class="content-wrapper prose prose-invert text-white">
    {#if ProjectComponent}
      <ProjectComponent />
    {:else}
      <p class="text-red-500">Project not found: {projectId}</p>
    {/if}
  </div>
</aside>

<style>
  .sheet {
    position: fixed;
    top: 0;
    right: 0;
    overflow-y: hidden;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  }
  .content-wrapper {
    overflow-y: auto;
    height: calc(100% - 60px); /* adjust based on header height */
    padding-right: 1rem;
  }
</style>
