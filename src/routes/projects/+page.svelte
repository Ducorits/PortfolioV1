<script>
</script>

<svelte:head>
  <title>projects</title>
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
        class="bg-[#111111] border-blue-600 hover:border-blue-300 hover:bg-[#1a1a1a] border-1 rounded-[20px] h-full p-4"
      >
        <p>Codam</p>
        <img
          alt="codam graph"
          src="/assets/codam-graph.png"
          class="rounded-md"
        />
      </a>
      <div
        class="bg-[#111111] border-blue-600 hover:border-blue-300 hover:bg-[#1a1a1a] border-1 rounded-[20px] h-full p-4"
      >
        <p>Cub3d</p>
      </div>
      <a
        href="/flow"
        class="bg-[#111111] border-blue-600 hover:border-blue-300 hover:bg-[#1a1a1a] border-1 rounded-[20px] h-full p-4"
      >
        <p>flowfield</p>
        <img
          alt="flowfield"
          src="/assets/small-flowfield.png"
          class="rounded-md"
        />
      </a>
    </div>
  </div>
</div>
