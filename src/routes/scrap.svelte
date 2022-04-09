<script lang="ts">
    import {page} from "$app/stores";
    import Item from '$lib/components/Item.svelte'
    import {images, ogp} from "$lib/data/images";
</script>

<svelte:head>
  <meta property="og:title" content="Scrap Images">
  <meta property="og:type" content="website">
  <meta property="og:description" content="Kinzal's Portfolio">
  <meta property="og:url" content="{$page.url}">
  <meta property="og:image" content="{ogp}">
  <meta property="og:site_name" content="RakugakiYa">
  <meta name="twitter:card" content="Summary with Large Image">
  <meta name="twitter:site" content="@k_kinzal">
</svelte:head>

<div class="relative bg-gray-700">
  <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
    {#each images.filter(t => t.category === "scrap") as image}
      <Item image={image} />
    {/each}
  </div>
</div>