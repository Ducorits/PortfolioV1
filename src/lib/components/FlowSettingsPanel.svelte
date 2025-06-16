<!-- src/lib/components/FlowSettingsPanel.svelte
<script lang="ts">
  import { settings, type FlowSettings } from "$lib/stores/settings";
  import { onMount } from "svelte";

  let open = false;
  let local: FlowSettings;

  // keep a local copy for two‑way binding, then push on “Apply”
  const unsubscribe = settings.subscribe((v) => (local = { ...v }));
  onMount(() => () => unsubscribe());

  function apply() {
    settings.set(local);
  }
</script>

<button class="toggle-btn cursor-pointer" on:click={() => (open = !open)}>
  {open ? "Close ⚙️" : "Settings ⚙️"}
</button>

<div class="panel" class:open>
  <button
    class="toggle-btn bg-violet-600 p-2 rounded-[10px] cursor-pointer"
    on:click={() => (open = !open)}
  >
    {open ? "Close ⚙️" : "Settings ⚙️"}
  </button>
  <h2>Flow Field Settings</h2>

  <label>
    Cell Size:
    <input
      class="text-black"
      type="number"
      bind:value={local.cellSize}
      min="1"
    />
  </label>

  <label>
    Curve:
    <input type="range" bind:value={local.curve} min="0" max="5" step="0.1" />
    {local.curve}
  </label>

  <label>
    Zoom:
    <input
      type="range"
      bind:value={local.zoom}
      min="0.001"
      max="0.1"
      step="0.001"
    />
    {local.zoom}
  </label>

  <label>
    Particle Count:
    <input type="number" bind:value={local.particleCount} min="0" max="10000" />
  </label>

  <label>
    Fade Alpha:
    <input
      type="range"
      bind:value={local.fadeAlpha}
      min="0"
      max="0.2"
      step="0.005"
    />
    {local.fadeAlpha}
  </label>

  <label>
    <input type="checkbox" bind:checked={local.showDebug} />
    Show Debug Vectors
  </label>

  <button on:click={apply}>Apply</button>
</div>

<style>
  .panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    backdrop-filter: blur(4px);
    background: rgba(20, 20, 30, 0.8);
    padding: 1rem;
    transform: translateX(100%);
    transition: transform 0.3s;
    color: white;
  }
  .panel.open {
    transform: translateX(0);
  }
  .toggle-btn {
    position: fixed;
    top: 1rem;
    right: 1rem;
  }
</style> -->

<!-- src/lib/components/FlowSettingsPanel.svelte -->
<script lang="ts">
  import { settings, type FlowSettings } from "$lib/stores/settings";
  import { onMount } from "svelte";

  let open = false;
  let local: FlowSettings;
  const unsubscribe = settings.subscribe((v) => (local = { ...v }));
  onMount(() => () => unsubscribe());

  function apply() {
    settings.set(local);
  }
</script>

<button
  class="fixed top-4 right-4 bg-[#111111] border-1 border-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-[#333333] transition cursor-pointer"
  on:click={() => (open = !open)}
>
  {open ? "Close ⚙️" : "Settings ⚙️"}
</button>

<aside
  class="fixed top-16 right-0 max-h-[calc(100vh-4rem)] h-full w-100 bg-black/50 backdrop-blur-lg p-6 overflow-y-auto rounded-bl-lg transform transition-transform duration-300 ease-in-out
         {open ? 'translate-x-0' : 'translate-x-full'}"
>
  <h2 class="text-2xl font-semibold mb-6 text-white">Flow Field Settings</h2>

  <div class="grid grid-cols-2 gap-x-4 gap-y-6">
    <label class="self-center text-white">Cell Size</label>
    <input
      type="number"
      bind:value={local.cellSize}
      min="1"
      class="col-span-1 w-full rounded px-2 py-1"
    />

    <label class="self-center text-white">Curve</label>
    <div class="flex items-center space-x-2">
      <input
        type="range"
        bind:value={local.curve}
        min="0"
        max="5"
        step="0.1"
        class="flex-1"
      />
      <span class="w-12 text-right text-white">{local.curve}</span>
    </div>

    <label class="self-center text-white">Zoom</label>
    <div class="flex items-center space-x-2">
      <input
        type="range"
        bind:value={local.zoom}
        min="0.001"
        max="0.1"
        step="0.001"
        class="flex-1"
      />
      <span class="w-16 text-right text-white">{local.zoom}</span>
    </div>

    <label class="self-center text-white">Particle Count</label>
    <input
      type="number"
      bind:value={local.particleCount}
      min="0"
      max="10000"
      class="w-full rounded px-2 py-1"
    />

    <label class="self-center text-white">Particle Size</label>
    <input
      type="number"
      bind:value={local.particleSize}
      min="0"
      max="10000"
      class="w-full rounded px-2 py-1"
    />

    <label class="self-center text-white">Fade Alpha</label>
    <div class="flex items-center space-x-2">
      <input
        type="range"
        bind:value={local.fadeAlpha}
        min="0"
        max="0.2"
        step="0.005"
        class="flex-1"
      />
      <span class="w-12 text-right text-white">{local.fadeAlpha}</span>
    </div>

    <label class="flex items-center text-white">
      <input type="checkbox" bind:checked={local.showDebug} class="mr-2" />
      Show Debug
    </label>
    <!-- empty placeholder to keep grid shape -->
    <div></div>
  </div>

  <button
    on:click={apply}
    class="mt-8 w-full bg-green-500 text-white py-2 rounded hover:bg-green-400 transition"
  >
    Apply
  </button>
</aside>
