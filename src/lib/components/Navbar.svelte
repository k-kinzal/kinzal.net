<script context="module" lang="ts">
  export const prerender = true;
</script>
<script lang="ts">
    import {page} from "$app/stores";
    import {links} from "$lib/data/links";
</script>

<nav class="flex border-l-8 border-l-accent justify-between">
  <div class="p-4">
    <a href="/" class="font-raleway font-thin text-2xl text-base-900 tracking-widest">RakugakiYa</a>
  </div>
  <ul class="flex">
    {#each links as link}
      <li class="border-l border-base-300 w-36 {link.url === $page.url.pathname ? 'bg-base-50' : 'hover:bg-base-50 duration-300'}">
        <a href={link.url} rel={link.rel} class="block p-6 font-raleway text-center align-middle tracking-wider text-xs h-full">{link.title}</a>
      </li>
    {/each}
  </ul>
</nav>