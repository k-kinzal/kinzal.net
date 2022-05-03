<script lang="ts">
    import type {ImageCategory} from "$lib/data/images";
    import {items} from "$lib/data/images";

    import {goto} from "$app/navigation";

    import { Swiper, SwiperSlide } from "swiper/svelte";
    import { Lazy, Navigation, History, Keyboard } from "swiper";

    import "swiper/css";
    import "swiper/css/lazy";
    import "swiper/css/navigation";

    export let category: ImageCategory;

    let close = () => {
        goto(`/${category === 'original' ? '' : category}`)
    }
</script>

<div class="absolute top-0 left-0 z-40 w-screen h-full w-full bg-gray-700">
  <Swiper
    lazy={{loadPrevNext: true}}
    navigation={true}
    history={{key: category}}
    keyboard={true}
    modules={[Lazy, Navigation, History, Keyboard]}
    class="w-full h-full">
    {#each Object.values(items).filter(v => v.category === category).sort((a, b) => a.key < b.key ? 1 : -1) as item}
    <SwiperSlide data-history={item.key.replace(/^.*[\\\/]/, '')}>
      <div class="block w-full h-full" on:click={close}>
        <picture>
          {#each item.responsives as image}
          <source data-src={image.src} data-srcset={image.srcset} type={image.type} />
          {/each}
          <img src={item.defaults.src || "/images/empty.png"} data-srcset={item.defaults.srcset} alt="" loading="lazy" class="object-scale-down object-center h-full w-full swiper-lazy" />
        </picture>
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white animate-spin"></div>
      </div>
    </SwiperSlide>
    {/each}
  </Swiper>
</div>