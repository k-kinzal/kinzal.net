<script context="module" lang="ts">
    import {ImageCategory} from "$lib/data/images";

    function wait(fn: () => any) {
        setTimeout(() => { fn() || wait(fn) }, 0);
    }

    let scrollPositions: {[key in ImageCategory]: number} = {};
</script>
<script lang="ts">
    import {afterNavigate} from "$app/navigation";
    import {items} from "$lib/data/images";
    import Thumbnail from "$lib/components/Thumbnail.svelte";

    export let category: ImageCategory;

    let el: Element;
    afterNavigate(({from}) => {
        if (from === null || !from.pathname.startsWith(`/${category}/`)) {
            return;
        }
        wait(() => {
            el.scrollTop = scrollPositions[category]
            return el.scrollTop === scrollPositions[category];
        });
    });
</script>

<div class="bg-gray-700 h-full w-full md:overflow-y-scroll" bind:this={el} on:scroll={e => scrollPositions[category] = e.target.scrollTop}>
  <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
    {#each Object.values(items).filter(v => v.category === category).sort((a, b) => a.key < b.key ? 1 : -1) as item}
    <Thumbnail item={item} />
    {/each}
  </div>
</div>
