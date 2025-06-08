<script>
  import Background from "$lib/components/Background.svelte";
  import Header from "$lib/components/Header.svelte";
</script>

<Background />

<head>
  <title>projects</title>
</head>

<div class="flex justify-center items-center w-full h-full">
  <div class="flex h-full w-2/3 justify-between gap-20 pt-10">
    <div class="w-1/3">
      <h1 class="text-gray-300 text-[100px] leading-[120px]">projects.</h1>
    </div>
    <div
      class="grid grid-cols-2 gap-[40px] rounded-[20px] mt-10 w-2/3 h-full text-white"
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
