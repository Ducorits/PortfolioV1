<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { onDestroy, onMount } from "svelte";
  let { close, projectId, open } = $props();
  let projectHtml: string = $state("<p>Loading…</p>");
  let controller: AbortController;

  $effect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  });

  async function loadProject(projectId: string) {
    controller?.abort();
    controller = new AbortController();

    // 1) Build the URL to your static HTML file
    const url = `/projects/${projectId}.html`;

    // 2) Fetch it as plain text
    try {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) {
        projectHtml = `<p style="color: red;">Could not load ${projectId}.html</p>`;
      } else {
        projectHtml = await res.text();
      }
    } catch (err) {
      projectHtml = `<p style="color: red;">Fetch error: ${err}</p>`;
    }
  }

  onMount(async () => {
    controller = new AbortController();
  });

  onDestroy(() => {
    controller?.abort();
  });
</script>

<aside
  transition:fly={{ x: 300 }}
  class="sheet flex-shrink bg-[#111111]/60 backdrop-blur-lg pl-[20px] pt-[10px] text-white rounded-l-sm transform transition-transform duration-300 ease-in-out
         {open ? 'translate-x-0' : 'translate-x-full'}"
>
  <div class="sticky top-0 z-10 flex items-center gap-4">
    <button class="bg-gray-700 w-[44px] h-[40px] rounded-full" onclick={close}
      >✕</button
    >
    <h2 class="text-[40px] font-bold w-full text-center">{projectId}</h2>
  </div>
  <div class="content-wrapper text-center p-[10px] h-full w-full">
    {#key projectId}
      <div in:fade={{ duration: 200 }}>
        {@html projectHtml}
      </div>
    {/key}
  </div>
</aside>

<style>
  .sheet {
    position: fixed;
    top: 4rem;
    right: 0;
    width: 33%;
    height: calc(100vh - 4rem);
    overflow-y: hidden;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  }
</style>
