<script>
  import ProjectCard from "$lib/components/ProjectCard.svelte";
</script>

<svelte:head>
  <title>projects</title>
</svelte:head>

<div class="flex w-full h-full pt-10 pb-10 justify-center">
  <div
    class="flex flex-col xl:flex-row w-full px-10 md:px-0 md:w-2/3 h-full justify-center sm:justify-between gap-[40px]"
  >
    <div class="flex">
      <h1
        class="text-gray-300 text-[60px] md:text-[100px] leading-[100px] md:leading-[120px]"
      >
        projects.
      </h1>
    </div>
    <div
      class="grid sm:[grid-template-columns:repeat(auto-fit,minmax(380px,1fr))] gap-[40px] md:mt-10 rounded-[20px] w-full h-full text-white"
    >
      <ProjectCard
        href="/codam-graph"
        image="/assets/codam-graph.png"
        title="Codam Coding College Core"
        description="An interactive visualization of Codam’s Core curriculum.
        Where I learned programming."
      />
      <ProjectCard
        href="/flow"
        image="/assets/small-flowfield.png"
        title="Flow Field"
        description="A Typescript flow field using PixiJS, used as background for the homepage"
      />
      <ProjectCard
        href="https://github.com/fvan-wij/Cub3d_Telestein3D"
        target="_blank"
        image="/assets/telestein.gif"
        title="Telestein3D / Cub3d"
        description="A wolfenstein3D inspired horror game, written in C.
        The walls are rendered using raycasting.
        Co created with fvan-wij"
      />
      <ProjectCard
        href="https://github.com/Ducorits/FdF"
        target="_blank"
        image="/assets/fdf.png"
        title="FDF"
        description="Fil de fer, wireframe renderer, project at Codam."
      />
    </div>
  </div>
</div>
