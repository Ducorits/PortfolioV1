<script lang="ts">
  import { page } from "$app/state";
  import Header from "$lib/components/Header.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="canonical" href={page.url.href.replace(/\/$/, '')} />
</svelte:head>

<div class="flex min-h-dvh flex-col">
  <Header />

  <main class="flex flex-1 flex-col">
    {@render children()}
  </main>
</div>