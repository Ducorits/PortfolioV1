<script>
  import Background from "$lib/components/Background.svelte";
</script>

<Background />

<svelte:head>
  <title>home</title>
</svelte:head>

<div class="flex w-full h-full pt-10 justify-center">
  <div
    class="flex flex-col xl:flex-row w-full px-10 md:px-0 sm:w-2/3 h-full justify-center sm:justify-between gap-[40px]"
  >
    <div class="w-110 flex">
      <h1
        class="text-gray-300 text-[60px] sm:text-[100px] leading-[100px] sm:leading-[120px]"
      >
        projects.
      </h1>
    </div>
    <div
      class="grid 2xl:grid-cols-2 gap-[40px] md:mt-10 rounded-[20px] w-full md:w-2/3 h-full text-white"
    >
      <a
        href="/codam-graph"
        class="bg-[#111111] border-violet-400 hover:border-violet-200 hover:bg-[#1a1a1a] border-1 rounded-[20px] h-full p-4"
      >
        <p>Codam</p>
        <img alt="je mama" src="/assets/hand.jpg" class="rounded-md" />
      </a>
      <div
        class="bg-[#111111] border-violet-400 hover:border-violet-200 hover:bg-[#1a1a1a] border-1 rounded-[20px] h-full p-4"
      >
        <p>Cub3d</p>
      </div>
      <div
        class="bg-[#111111] border-violet-400 hover:border-violet-200 hover:bg-[#1a1a1a] border-1 rounded-[20px] h-full p-4"
      >
        <p>hallo</p>
      </div>
    </div>
  </div>
</div>
