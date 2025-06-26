<script lang="ts">
  import { selectedProject } from "$lib/stores/shared.svelte";
  import CodamHolyGraph from "$lib/components/CodamHolyGraph.svelte";
  import ProjectSheet from "$lib/components/ProjectSheet.svelte";

  let projectId = $derived(selectedProject.id);
  let open = $derived(projectId ? true : false);
</script>

<svelte:head>
  <title>codam-graph</title>
</svelte:head>

<div>
  <CodamHolyGraph />
  <ProjectSheet {projectId} {open} close={() => (selectedProject.id = "")} />

  <main class="flex flex-1 overflow-hidden"></main>
</div>
