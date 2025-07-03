<script>
  import { Github, Linkedin } from "@lucide/svelte";
</script>

<svelte:head>
  <title>about</title>
</svelte:head>

<div class="flex w-full h-full pt-10 pb-10 justify-center">
  <div
    class="flex flex-col xl:flex-row w-full px-6 md:px-0 md:w-2/3 h-full justify-center md:justify-between gap-10"
  >
    <div class="w-full xl:w-auto flex">
      <h1
        class="text-gray-300 text-[60px] md:text-[100px] leading-[100px] md:leading-[120px]"
      >
        about.
      </h1>
    </div>
    <div
      class="flex flex-col gap-6 md:mt-10 bg-[#111111] border-blue-600 border rounded-[20px] h-full p-6 w-full text-gray-200"
    >
      <h2 class="text-gray-300 text-[28px] sm:text-[40px] leading-tight">
        Duco Ritsema van Eck
      </h2>
      <p>
        I'm a software engineer and creative coder who enjoys making cool things
        — sometimes technical, sometimes silly.<br /> I studied at
        <a
          href="https://www.codam.nl/en/about-codam/"
          class="underline text-gray-500 hover:text-violet-400 transition-colors"
        >
          Codam Coding College
        </a>, part of the
        <a
          href="https://www.42network.org/"
          class="underline text-gray-500 hover:text-violet-400 transition-colors"
        >
          42 network
        </a>, where we learn by doing.
      </p>
      <p>
        Outside of code, I love Games, 3D graphics, the absurd brilliance of
        Terry Pratchett, dad jokes, playing piano and guitar, and cracking open
        hardware just to see what’s inside.
      </p>
      <p>
        Not everything I do needs a purpose, but most of it starts with
        curiosity.
      </p>
      <div class="flex flex-row text-[24px] gap-2 pt-4">
        <p>Links:</p>
        <a
          href="https://github.com/Ducorits"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-row text-gray-500 hover:text-violet-400 text-[24px] transition-colors"
        >
          <p>Github_</p>
          <Github size={28} />
        </a>
        <a
          href="https://www.linkedin.com/in/duco-ritsema-van-eck-b8399b239/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-row text-gray-500 hover:text-violet-400 text-[24px] transition-colors"
        >
          <p>Linked_</p>
          <Linkedin size={28} />
        </a>
      </div>
    </div>
  </div>
</div>
