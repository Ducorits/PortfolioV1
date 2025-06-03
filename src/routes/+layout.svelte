<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<Header/>

{@render children()}

<!-- <div class="absolute bottom-0 left-1/6 w-2/3 h-1/12 bg-[#111111] border-t-violet-700 border-l-violet-700 border-r-violet-700 border-1 rounded-t-lg"></div> -->
