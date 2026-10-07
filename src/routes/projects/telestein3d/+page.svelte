<script lang="ts">
 	import { codamProjectMap } from "$lib/projectContent";

	let ProjectComponent: typeof import("svelte").SvelteComponent | null =
    $state(null);

	ProjectComponent = codamProjectMap["cub3d"];

</script>

<svelte:head>
  <title>telestein3d</title>
</svelte:head>

<div class="flex w-full h-full pt-10 pb-10 justify-center">
  <div
    class="flex flex-col w-full px-6 md:px-0 md:w-2/3 h-full justify-center md:justify-between gap-10"
  >
	<div>
		<!-- <img
				src="/assets/telestein.gif"
				alt="Telestein3D / Cub3d"
				class="w-full h-full object-cover"
		/> -->
	</div>
    <div class="w-full xl:w-auto flex">
      <h1
        class="text-gray-300 text-[60px] md:text-[100px] leading-[100px] md:leading-[120px]"
      >
        telestein3d.
      </h1>
    </div>
    <div
      class="flex flex-col gap-6 md:mt-10 lg:w-[1000px] bg-[#111111] border-blue-600 border rounded-[20px] h-full p-6 w-full text-gray-100 text-lg content-wrapper pb-40 prose prose-invert"
    >
			<ProjectComponent/>
    </div>
  </div>
</div>
