<script lang="ts">
    import type {Image} from "$lib/generated/images";

    export let image: Image;
</script>

<div class="relative h-96 2xl:h-56 xl:h-56" id={image.src}>
  <a href={image.src} class="block h-full w-full">
    <div class="absolute inset-0 z-10 h-96 2xl:h-56 xl:h-56 bg-base-300 bg-opacity-30 opacity-0 backdrop-blur-xs hover:opacity-100 border-4 border-white/20 duration-300"></div>
    <picture class="block h-full w-full">
      <source srcset={image.thumbnail.avif} type="image/avif" />
      <source srcset={image.thumbnail.webp} type="image/webp" />
      <img srcset={image.thumbnail.png} alt="" class="object-cover h-full w-full" />
    </picture>
  </a>
</div>