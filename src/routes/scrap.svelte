<script lang="ts">
    import {page} from "$app/stores";
    import {ogp} from "$lib/data/images";
    import List from "$lib/components/List.svelte";
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

<List category="scrap" />