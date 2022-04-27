<script lang="ts">
  import {links} from "$lib/data/links";
  import {NavBar, NavItem} from "$lib/components/nav";
</script>

<header class="h-16 w-full bg-white">
  <NavBar class="h-full w-full">
    <!-- Brand -->
    <a href="/" class="flex h-full w-full p-4 border-l-8 border-l-accent" slot="brand">
      <span class="m-auto font-raleway font-thin md:text-xl lg:text-2xl text-base-900 tracking-wider lg:tracking-widest">RakugakiYa</span>
    </a>

    <!-- Navigation Items -->
    <svelte:fragment slot="nav-items">
      {#each links as link}
      <NavItem
        title={link.title}
        href={link.url}
        rel={link.rel}
        class="bg-white border-l border-base-300 font-raleway text-xs text-base-900 select:bg-base-50 select:pointer-events-none tracking-wide lg:tracking-wider hover:bg-base-50 duration-300" />
      {/each}
    </svelte:fragment>
  </NavBar>

</header>