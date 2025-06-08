<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
  <Header />
  <main class="flex-grow">
    {@render children()}
  </main>
</div>
