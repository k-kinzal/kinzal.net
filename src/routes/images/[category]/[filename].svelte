<script context="module" lang="ts">
    import {images} from "$lib/data/images";

    export async function load({ params }) {
        let category = params.category;
        let filename = params.filename;
        let files = images.filter(v => v.category === category && v.src.indexOf(filename) != -1);
        if (files.length !== 1) {
            return { fallthrough: true };
        }
        return {
            props: {
              category: category,
              image: files[0],
            }
        }
    }
</script>
<script lang="ts">
  import {page} from "$app/stores";
  import {beforeUpdate} from "svelte";
  import {goto} from '$app/navigation';
  import {next, prev} from "$lib/data/images";

  export let category;
  export let image;
  let nextImage;
  let prevImage;

  beforeUpdate(() => {
      nextImage = next(image.src);
      prevImage = prev(image.src);
  })

  let nextPage = () => {
      if (nextImage) goto(nextImage.src);
  }
  let prevPage = () => {
      if (prevImage) goto(prevImage.src);
  }
  let close = () => {
      goto(category === 'original' ? '/' : `/${category}`);
  }
  let handleKeydown = (ev) => {
      switch (ev.code) {
          case "Space":
          case "ArrowRight":
          case "ArrowDown":
              nextPage();
              break;
          case "ArrowLeft":
          case "ArrowUp":
              prevPage();
              break;
          case "Enter":
          case "Escape":
              close();
              break;
      }
  }
</script>

<svelte:head>
  <meta property="og:title" content="{image.src}">
  <meta property="og:type" content="website">
  <meta property="og:description" content="Kinzal's Portfolio">
  <meta property="og:url" content="{$page.url}">
  <meta property="og:image" content="{image.png}">
  <meta property="og:site_name" content="RakugakiYa">
  <meta name="twitter:card" content="Summary with Large Image">
  <meta name="twitter:site" content="@k_kinzal">
</svelte:head>

<svelte:window on:keydown={handleKeydown}/>

<div class="absolute z-50 flex flex-row w-screen h-full w-full bg-gray-700" style="margin-top: -65px">
  {#if prevImage}
  <div class="flex w-48 cursor-pointer" on:click={prevPage}>
    <p class="m-auto text-3xl text-base-300"><i class="fa-solid fa-caret-left"></i></p>
  </div>
  {:else}
  <div class="flex w-48"></div>
  {/if}
  <picture class="flex-grow block h-full w-full" on:click={close}>
    <source srcset={image.avif} type="image/avif" />
    <source srcset={image.webp} type="image/webp" />
    <img srcset={image.png} alt="" class="object-scale-down object-center h-full w-full"/>
  </picture>
  {#if nextImage}
  <div class="flex w-48 cursor-pointer" on:click={nextPage}>
    <p class="m-auto text-3xl text-base-300"><i class="fa-solid fa-caret-right"></i></p>
  </div>
  {:else}
  <div class="flex w-48"></div>
  {/if}
</div>