<script lang="ts">
    import {afterNavigate} from "$app/navigation";
    import type {ImageCategory} from "$lib/data/images";
    import {items} from "$lib/data/images";
    import Thumbnail from "$lib/components/Thumbnail.svelte";

    export let category: ImageCategory;

    let el;
    afterNavigate(({from, to}) => {
        // if (from !== null) {
        //     let i = index(from.pathname)
        //     let container = el.firstChild.firstChild
        //     let column = window.innerWidth / container.offsetWidth
        //     console.log(i, Math.floor(i / column),  Math.floor(i / column) * container.offsetHeight)
        //     el.scrollTop = Math.floor(i / column) * container.offsetHeight
        // }
        // console.log(el.firstChild.offsetWidth, el.firstChild.offsetHeight, window.innerWidth, window.innerWidth / el.firstChild.offsetWidth, from, to)
    });

</script>

<div class="bg-gray-700 h-full w-full md:overflow-y-scroll" bind:this={el}>
  <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
    {#each items(category) as item}
    <Thumbnail item={item} />
    {/each}
  </div>
</div>
