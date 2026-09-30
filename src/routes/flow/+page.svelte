<script lang="ts">
  import FlowField from "$lib/components/FlowField.svelte";
  import FlowSettingsPanel from "$lib/components/FlowSettingsPanel.svelte";
    import OverlayInfoButton from "$lib/components/OverlayInfoButton.svelte";
</script>

<svelte:head>
  <title>flow field</title>
</svelte:head>

<OverlayInfoButton title="About This Flow Field" projectId="FlowField" />

<div class="page">
  <FlowField />
  <FlowSettingsPanel />


</div>
