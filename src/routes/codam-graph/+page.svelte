<script lang="ts">
  import { selectedProject } from "$lib/stores/shared.svelte";
  import CodamHolyGraph from "$lib/components/CodamHolyGraph.svelte";
  import ProjectSheet from "$lib/components/ProjectSheet.svelte";
  import OverlayInfoButton from "$lib/components/OverlayInfoButton.svelte";
  import { aboutProjectMap } from "$lib/projectContent";

  let projectId = $derived(selectedProject.id);
  let open = $derived(projectId ? true : false);
</script>

<svelte:head>
  <title>codam-graph</title>
</svelte:head>

<div>
  <OverlayInfoButton title="About This Graph" projectId="CodamHolyGraph" />

  <CodamHolyGraph />
  <ProjectSheet
    {projectId}
    {open}
    close={() => {
      open = false;
    }}
  />

  <main class="flex flex-1 overflow-hidden"></main>
</div>
