<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<div class="flex min-h-dvh flex-col">
  <Header />

  <main class="flex flex-1 flex-col">
    {@render children()}
  </main>
</div>