<script lang="ts">
    import "../app.css";
    import {afterNavigate} from "$app/navigation";
    import {page} from "$app/stores"
    import {page as state} from "$lib/stores/page";
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let el;

    afterNavigate(navigation => {
        if (navigation.to.pathname.startsWith('/images')) {
            return;
        }
        if (navigation.from === null || !navigation.from.pathname.startsWith('/images')) {
            state.update($page, {scrollPosition: 0});
        } else {
            state.load($page);
        }
        el.scrollTop = $state.scrollPosition;
    });

    let handleScroll = (ev) => {
        if ($page.url.pathname.startsWith('/images')) {
            return;
        }
        state.update($page, {scrollPosition: ev.target.scrollTop});
    }
</script>

<header class="xs:sticky md:sticky"><Navbar /></header>

<main class="flex-grow lg:overflow-y-scroll xl:overflow-y-scroll 2xl:overflow-y-scroll" bind:this={el} on:scroll={handleScroll}>
  <slot />
</main>

<footer><Footer /></footer>
