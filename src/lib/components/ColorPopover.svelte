<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  // 1) pull props in runes mode
  let { color, position, onColorChange, onClose } = $props<{
    color: string;
    position: { top: number; left: number };
    onColorChange: (c: string) => void;
    onClose: () => void;
  }>();

  // 2) internal reactive copy of color
  let internalColor = $state(color);

  // 3) sync external → internal if parent changes `color`
  $effect(() => {
    if (color !== internalColor) internalColor = color;
  });

  let realPosition = $state(position);
  if (realPosition.left + 220 >= window.innerWidth)
    realPosition.left = window.innerWidth - 240;

  // 4) click-outside logic
  let pickerEl: HTMLDivElement;
  function handleClickOutside(ev: MouseEvent) {
    if (!pickerEl.contains(ev.target as Node)) setTimeout(() => onClose(), 20);
  }
  onMount(() => document.addEventListener("mousedown", handleClickOutside));
  onDestroy(() =>
    document.removeEventListener("mousedown", handleClickOutside)
  );
</script>

<div
  bind:this={pickerEl}
  class="fixed z-50 bg-[#1a1a1a] rounded-lg p-2 shadow-xl border border-gray-500"
  style="top: {realPosition.top}px; left: {realPosition.left}px;"
>
  <!-- 5) Hex picker -->
  <hex-color-picker
    color={internalColor}
    oncolor-changed={(e: CustomEvent<{ value: string }>) => {
      internalColor = e.detail.value;
      onColorChange(internalColor);
    }}
    style="width: 220px; height: 200px;"
  ></hex-color-picker>

  <!-- 6) direct hex input -->
  <input
    type="text"
    bind:value={internalColor}
    oninput={() => onColorChange(internalColor)}
    class="w-full mt-2 p-1 bg-[#2a2a2a] text-white text-sm rounded"
  />

  <!-- 7) close button -->
  <div class="text-right mt-2">
    <button
      class="text-white text-sm px-3 py-1 rounded bg-red-600 hover:bg-red-500"
      onclick={onClose}
    >
      Close
    </button>
  </div>
</div>
