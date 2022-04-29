<script context="module" lang="ts">
    import {item} from "$lib/data/images";

    export async function load({params}) {
        let category = params.category;
        let filename = params.filename;
        let image = item(`/${category}/${filename}`);
        if (!image) {
            return { fallthrough: true };
        }
        return {
            props: {
              category: category
            }
        }
    }
</script>
<script lang="ts">
  import Viewer from "$lib/components/Viewer.svelte";

  export let category;
</script>

<!--<svelte:head>-->
<!--  <meta property="og:title" content="{image.src}">-->
<!--  <meta property="og:type" content="website">-->
<!--  <meta property="og:description" content="Kinzal's Portfolio">-->
<!--  <meta property="og:url" content="{$page.url}">-->
<!--  <meta property="og:image" content="{image.png}">-->
<!--  <meta property="og:site_name" content="RakugakiYa">-->
<!--  <meta name="twitter:card" content="Summary with Large Image">-->
<!--  <meta name="twitter:site" content="@k_kinzal">-->
<!--</svelte:head>-->

<Viewer category={category} />