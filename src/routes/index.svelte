<script lang="ts">
    import {page} from "$app/stores";
    import {items} from "$lib/data/images";
    import List from "$lib/components/List.svelte";
    import {ImageCategory} from "$lib/data/images";

    let keys = Object.keys(items)
    let key = keys[Math.floor(Math.random()*keys.length)];
    let item = items[key];
</script>

<svelte:head>
  <meta property="og:title" content="Original Images">
  <meta property="og:type" content="website">
  <meta property="og:description" content="Kinzal's Portfolio">
  <meta property="og:url" content="{$page.url}">
  <meta property="og:image" content="{item.ogp.src}">
  <meta property="og:site_name" content="RakugakiYa">
  <meta name="twitter:card" content="Summary with Large Image">
  <meta name="twitter:site" content="@k_kinzal">
</svelte:head>

<List category={ImageCategory.ORIGINAL} />