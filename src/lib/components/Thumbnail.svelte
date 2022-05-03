<script lang="ts">
  import { onMount } from 'svelte';
  import LazyLoad from "vanilla-lazyload";
  import type {Item} from "$lib/data/images";

  export let item: Item;

  let containerElement: HTMLDivElement;
  onMount(() => {
      new LazyLoad({use_native: false}, containerElement.querySelectorAll('picture > img'));
  });
</script>

<div class="relative w-full" bind:this={containerElement}>
  <a href={item.key} class="block h-full w-full">
    <picture>
      {#each item.thumbnail.responsives as image}
      <source data-src={image.src} data-srcset={image.srcset} type={image.type} />
      {/each}
      <img src={item.thumbnail.defaults.src || "/images/empty.png"} data-bg="/images/empty.png" data-srcset={item.thumbnail.defaults.srcset} alt="" loading="lazy" class="block h-full w-full object-cover" />
    </picture>
    <div class="absolute inset-0 z-10 h-full bg-base-300 bg-opacity-30 opacity-0 backdrop-blur-xs hover:opacity-100 border-4 border-white/20 duration-300"></div>
  </a>
</div>