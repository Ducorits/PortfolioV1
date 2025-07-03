<script lang="ts">
  let {
    href,
    image,
    title,
    description,
    id,
  }: {
    href?: string | null;
    image?: string | null;
    title: string;
    description: string;
    id?: string;
  } = $props();
</script>

{#if href}
  <a
    {href}
    class="group relative rounded-[20px] w-auto sm:w-100 aspect-[6/4] overflow-hidden border border-blue-600 hover:border-blue-300 bg-[#111] hover:bg-[#1a1a1a] transition-colors"
  >
    {#if image}
      <img
        src={image}
        alt={title}
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    {:else}
      <p class="flex h-full text-white text-lg justify-center items-center">
        {title}
      </p>
    {/if}
    <div
      class="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4"
    >
      <p class="text-white text-lg">{description}</p>
    </div>
  </a>
{:else}
  <div
    class="group relative rounded-[20px] w-auto sm:w-100 aspect-[6/4] overflow-hidden border border-blue-600 hover:border-blue-300 bg-[#111] hover:bg-[#1a1a1a] transition-colors"
  >
    {#if image}
      <img
        src={image}
        alt={title}
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    {:else}
      <p class="flex h-full text-white text-lg justify-center items-center">
        {title}
      </p>
    {/if}

    <div
      class="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4"
    >
      <p class="text-white text-lg">{description}</p>
    </div>
  </div>
{/if}
