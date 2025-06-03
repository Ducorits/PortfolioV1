<script lang="ts">

	import { fade, fly } from 'svelte/transition';
  import { onDestroy, onMount } from 'svelte';
  let { close, projectId } = $props();
  let projectHtml: string = $state('<p>Loading…</p>');
  let controller: AbortController;

  $effect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  });

  async function loadProject(projectId: string) {
    controller?.abort();
    controller = new AbortController;

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
    controller = new AbortController;
  });

  onDestroy(() => {
    controller?.abort();
  });
</script>

<aside transition:fly="{{ x: 300, duration: 500 }}" class="sheet flex-shrink bg-gray-900 border-l-2 border-[#42b9bc] pl-[20px] pt-[10px] text-white rounded-l-[40px]">
  <div class="sticky top-0 bg-gray-900 z-10 flex items-center gap-4">
    <button class="bg-[#42b9bc] w-[44px] h-[40px] rounded-full" onclick={close}>✕</button>
    <h2 class="text-[40px] font-bold w-full text-center">{projectId}</h2>
  </div>
  <div class="content-wrapper text-center p-[10px] h-full w-full">
    {#key projectId}
      <div in:fade="{{duration: 200}}">
        {@html projectHtml}
      </div>
    {/key}
  </div>
</aside>

<style>
  .sheet {
    position: absolute;
    top: 5%; right: 0;
    width: 33%;
    height: 95%;
    overflow-y: auto;
    box-shadow: -2px 0 8px rgba(0,0,0,0.2);
  }
</style>
