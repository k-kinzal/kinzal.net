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
    import {goto} from '$app/navigation';

    import { Swiper, SwiperSlide } from "swiper/svelte";
    import { Lazy, Navigation, History, Keyboard } from "swiper";

    import "swiper/css";
    import "swiper/css/lazy";
    import "swiper/css/navigation";

  // import {images} from "$lib/data/images";

  export let category;
  export let image;

  let close = () => {
      goto(category === 'original' ? '/' : `/${category}`);
  }
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

<div class="absolute top-0 left-0 z-40 w-screen h-full w-full bg-gray-700">
  <Swiper
    lazy={{
      loadPrevNext: true
    }}
    navigation={true}
    history={{
      key: "",
    }}
    keyboard={true}
    modules={[Lazy, Navigation, History, Keyboard]}
    class="w-full h-full"
  >
    {#each images.filter(t => t.category === category) as image}
      <SwiperSlide data-history={image.src.replace(/^.*[\\\/]/, '')}>
        <picture class="block h-full w-full" on:click={close}>
          <source data-srcset={image.avif} type="image/avif" />
          <source data-srcset={image.webp} type="image/webp" />
          <img data-srcset={image.png} alt="" class="object-scale-down object-center h-full w-full swiper-lazy" />
        </picture>
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white animate-spin"></div>
      </SwiperSlide>
    {/each}
  </Swiper>
</div>

<style>

</style>