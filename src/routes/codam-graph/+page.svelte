<script lang="ts">
  import { selectedProject } from "$lib/stores/shared.svelte";
  import CodamHolyGraph from "$lib/components/CodamHolyGraph.svelte";
  import ProjectSheet from "$lib/components/ProjectSheet.svelte";

  let projectId = $derived(selectedProject.id);
</script>

<div class="page">
  <CodamHolyGraph />

  <main class="flex flex-1 overflow-hidden">
    {#if projectId}
      <ProjectSheet {projectId} close={() => (selectedProject.id = "")} />
    {/if}
  </main>
</div>
