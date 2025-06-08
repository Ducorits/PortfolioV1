<script>
  import Background from "$lib/components/Background.svelte";
</script>

<Background />

<svelte:head>
  <title>home</title>
</svelte:head>

<div class="flex w-full h-full pt-10 justify-center">
  <div
    class="flex flex-col md:flex-row w-full md:w-2/3 h-full md:justify-between"
  >
    <div class="md:w-1/3 w-full flex items-start justify-center p-4">
      <h1 class="text-gray-300 text-[100px] leading-[120px]">ducorits.</h1>
    </div>
    <div
      class="bg-[#111111] border border-violet-700 rounded-[20px] p-6 text-white max-w-xl h-60"
    >
      <p class="text-red-500 font-semibold mb-4">
        NOTICE:<br />
        I am currently working on this site, everything is subject to change!
      </p>
      <p class="mb-2">
        Glad to find you looking at my portfolio<br />
        Take a look around!
      </p>
      <p class="mb-2">
        I am a software engineer that likes to make pretty things :D
      </p>
      <p class="italic">
        P.S. if you don't see a nice flowfield, reload the page!
      </p>
    </div>
  </div>
</div>
