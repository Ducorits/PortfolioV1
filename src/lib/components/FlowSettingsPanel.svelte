<script lang="ts">
  import { settings, type FlowSettings } from "$lib/stores/settings";
  import { onMount, tick } from "svelte";
  import ColorPopover from "./ColorPopover.svelte";

  let open = false;
  let local: FlowSettings;
  let isClient = false;
  let showBackgroundPicker = false;
  let particlePickerStates: boolean[] = [];
  let selectedParticleIndex: number | null = null;
  let pickerPosition = { top: 0, left: 0 };
  const unsubscribe = settings.subscribe((v) => (local = { ...v }));

  onMount(() => {
    isClient = true;
    particlePickerStates = local.particleColors.map(() => false);

    import("vanilla-colorful/hex-color-picker.js");
    return () => unsubscribe();
  });

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
      class="col-span-1 w-full text-white bg-[#00000000] rounded px-2 py-1"
    />

    <label class="self-center text-white">Curve</label>
    <div class="flex items-center space-x-2">
      <input
        type="range"
        bind:value={local.curve}
        min="0"
        max="5"
        step="0.1"
        class="flex-1 bg-transparent"
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
      class="w-full rounded text-white bg-[#00000000] px-2 py-1"
    />

    <label class="self-center text-white">Particle Size</label>
    <input
      type="number"
      bind:value={local.particleSize}
      min="0"
      max="10000"
      class="w-full rounded text-white bg-[#00000000] px-2 py-1"
    />

    <label class="self-center text-white" for="fade-alpha-input"
      >Ghost effect</label
    >
    <div class="flex items-center space-x-2">
      <input
        id="fade-alpha-input"
        type="range"
        bind:value={local.fadeAlpha}
        min="0"
        max="0.1"
        step="0.005"
        class="flex-1"
      />
      <span class="w-12 text-right text-white">{local.fadeAlpha}</span>
    </div>

    <label class="self-center text-white col-span-1" for="background-color-btn"
      >Background Color</label
    >
    <div class="flex items-center col-span-1 space-x-2">
      <button
        id="background-color-btn"
        aria-label="Background color selector"
        class="w-10 h-10 rounded"
        style="background-color: {local.backgroundColor}"
        on:click={(e) => {
          if (showBackgroundPicker) {
            showBackgroundPicker = !showBackgroundPicker;
          } else {
            const rect = (
              e.currentTarget as HTMLElement
            ).getBoundingClientRect();
            pickerPosition = {
              top: rect.bottom + window.scrollY + 8,
              left: rect.left + window.scrollX,
            };
            showBackgroundPicker = !showBackgroundPicker;
          }
        }}
      ></button>
      <input
        type="text"
        bind:value={local.backgroundColor}
        class="text-white bg-[#00000000] text-sm truncate w-20 rounded"
        maxlength="7"
        placeholder={local.backgroundColor}
      />
    </div>

    <label class="self-center text-white col-span-2">Particle Colors</label>

    <div class="grid grid-cols-6 col-span-2 gap-1 items-center relative">
      {#each local.particleColors as color, i}
        <div class="flex items-center col-span-2 space-x-2">
          <button
            class="w-10 h-10 rounded shadow"
            style="background-color: {color}"
            on:click={async (e) => {
              if (selectedParticleIndex === i) {
                selectedParticleIndex = null;
              } else {
                const rect = (
                  e.currentTarget as HTMLElement
                ).getBoundingClientRect();
                pickerPosition = {
                  top: rect.bottom + window.scrollY + 8,
                  left: rect.left + window.scrollX,
                };
                selectedParticleIndex = i;
              }
            }}
          />
          <input
            type="text"
            bind:value={color}
            class="text-white px-1 bg-[#00000000] text-sm w-16 rounded"
            maxlength="7"
            placeholder={color}
          />
        </div>
      {/each}
    </div>

    <div class="col-span-2 flex space-x-4 mt-2">
      <button
        class="bg-gray-600 text-white px-3 py-1 rounded hover:bg-green-500"
        on:click={() => {
          local.particleColors = [...local.particleColors, "#ffffff"];
          particlePickerStates = [...particlePickerStates, true];
        }}
      >
        + Add Color
      </button>

      {#if local.particleColors.length > 1}
        <button
          class="bg-gray-600 text-white px-3 py-1 rounded hover:bg-red-500"
          on:click={() => {
            local.particleColors = local.particleColors.slice(0, -1);
            particlePickerStates = particlePickerStates.slice(0, -1);
          }}
        >
          – Remove Last
        </button>
      {/if}
    </div>

    <label class="flex items-center text-white">
      <input
        type="checkbox"
        bind:checked={local.showDebug}
        class="mr-2 text-white bg-[#00000000]"
      />
      Show Debug
    </label>
    <div></div>

    <label class="flex items-center text-white">
      <input
        type="checkbox"
        bind:checked={local.clearBackground}
        class="mr-2 text-white bg-[#00000000]"
      />
      Clear Background
    </label>
    <div></div>
  </div>

  <button
    on:click={apply}
    class="mt-8 w-full bg-green-500 text-white py-2 rounded hover:bg-green-400 transition"
  >
    Apply
  </button>
</aside>

{#if isClient && selectedParticleIndex != null}
  <ColorPopover
    position={pickerPosition}
    color={local.particleColors[selectedParticleIndex]}
    onColorChange={(val) => {
      local.particleColors[selectedParticleIndex] = val;
    }}
    onClose={() => (selectedParticleIndex = null)}
  />
{/if}

{#if isClient && showBackgroundPicker}
  <ColorPopover
    position={pickerPosition}
    color={local.backgroundColor}
    onColorChange={(val) => {
      local.backgroundColor = val;
    }}
    onClose={() => (showBackgroundPicker = false)}
  />
  <!-- <div class="col-span-2 flex justify-center">
    <hex-color-picker
      color={local.backgroundColor}
      on:color-changed={(e) => (local.backgroundColor = e.detail.value)}
      style="width: 100%; max-width: 200px; height: 200px;"
    />
  </div> -->
{/if}
