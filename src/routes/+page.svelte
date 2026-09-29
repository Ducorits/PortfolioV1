<script>
  import FlowField from "$lib/components/FlowField.svelte";
</script>

<FlowField useDefaultSettings={true} />

<svelte:head>
  <title>Duco Ritsema van Eck | Software Engineer</title>
</svelte:head>

<div class="flex flex-1 w-full pt-10 pb-10 justify-center">
  <div
    class="flex flex-col xl:flex-row w-full px-10 md:px-0 md:w-2/3 md:justify-between gap-[40px]"
  >
    <div class="flex flex-col flex-1">
      <h1
        class="text-gray-300 text-[60px] sm:text-[100px] leading-[100px] sm:leading-[120px]"
      >
        ducorits.
      </h1>
      <div class="mt-auto">
        <h2 class="text-gray-300 text-[30px] sm:text-[40px] leading-[40px] sm:leading-[50px]">
          Duco Ritsema van Eck
        </h2>
        <p class="text-gray-500 text-[20px] hover:text-violet-400 transition-colors sm:text-[30px] leading-[30px] sm:leading-[40px]">
          Software engineer based in Utrecht.
        </p>
        <p class="text-gray-500 text-[20px] hover:text-violet-400 transition-colors sm:text-[30px] leading-[30px] sm:leading-[40px]">
          Explore my projects, experience, and interests.
        </p>
      </div>
    </div>
  </div>
</div>
