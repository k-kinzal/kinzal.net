<script lang="ts">
    import type {Image} from "$lib/generated/images";

    export let image: Image;
</script>

<!-- grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 -->
<div class="relative w-full" id={image.src}>
  <a href={image.src} class="block h-full w-full">
    <div class="absolute inset-0 z-10 h-full bg-base-300 bg-opacity-30 opacity-0 backdrop-blur-xs hover:opacity-100 border-4 border-white/20 duration-300"></div>
    <picture class="block h-full w-full">
      <source srcset={image.thumbnail.avif} type="image/avif" />
      <source srcset={image.thumbnail.webp} type="image/webp" />
      <img srcset={image.thumbnail.png} alt="" class="object-cover h-full w-full" />
    </picture>
  </a>
</div>