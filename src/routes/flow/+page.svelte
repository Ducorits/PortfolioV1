<script lang="ts">
  import FlowField from "$lib/components/FlowField.svelte";
  import FlowSettingsPanel from "$lib/components/FlowSettingsPanel.svelte";
</script>

<svelte:head>
  <title>flow field</title>
</svelte:head>

<div class="page">
  <FlowField />
  <FlowSettingsPanel />

  <main class="flex flex-1 overflow-hidden"></main>
</div>
