<script lang="ts">
  import Canvas from './Canvas.svelte';
  import { drawFlowField } from './flowField';
</script>

<div class="bg-[#111111] fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none">
  <Canvas onDraw={drawFlowField} />
</div>
