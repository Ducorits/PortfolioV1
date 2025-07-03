<script>
  import { Github, Linkedin } from "@lucide/svelte";
</script>

<svelte:head>
  <title>about</title>
</svelte:head>

<div class="flex w-full h-full pt-10 justify-center">
  <div
    class="flex flex-col xl:flex-row w-full px-6 md:px-0 sm:w-2/3 h-full justify-center sm:justify-between gap-10"
  >
    <div class="w-full xl:w-auto flex">
      <h1 class="text-gray-300 text-[60px] sm:text-[100px] leading-[1.1]">
        about.
      </h1>
    </div>
    <div
      class="flex flex-col gap-6 md:mt-10 bg-[#111111] border-blue-600 border rounded-[20px] h-full p-6 w-full text-gray-200"
    >
      <h2 class="text-gray-300 text-[30px] sm:text-[40px] leading-tight">
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
      <div class="flex flex-row text-[24px] gap-4 pt-4">
        <p>Links:</p>
        <a
          href="https://github.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-row text-gray-500 hover:text-violet-400 text-[24px] transition-colors"
        >
          <p>Github_</p>
          <Github size={28} />
        </a>
        <a
          href="https://linkedin.com/in/your-profile"
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
