<script context="module" lang="ts">
  export const prerender = true;
</script>
<script lang="ts">
    import {page} from "$app/stores";
    import {links} from "$lib/data/links";
</script>

<nav class="flex justify-between border-l-8 border-l-accent">
  <div class="p-6">
    <a href="/" class="font-raleway font-thin md:text-xl lg:text-2xl text-base-900 tracking-wider lg:tracking-widest">RakugakiYa</a>
  </div>
  <ul class="hidden md:flex">
    {#each links as link}
    <li class="w-20 md:w-24 lg:w-36 border-l border-base-300">
      <a href={link.url} rel={link.rel} class="flex h-full w-full {link.url === $page.url.pathname ? 'bg-base-50' : 'hover:bg-base-50 duration-300'}">
        <span class="m-auto font-raleway text-xs text-base-900 lg:tracking-wider">{link.title}</span>
      </a>￥
    </li>
    {/each}
  </ul>
  <div class="group flex md:hidden">
    <button class="w-16">
      <span class="text-base-900"><i class="fa-solid fa-bars"></i></span>
    </button>
    <div class="fixed top-0 left-0 z-30 h-full w-full bg-black/50 invisible group-focus-within:visible delay-150">
      <ul class="flex flex-col justify-start h-full ml-auto w-56 bg-white transition translate-x-56 group-focus-within:translate-x-0 delay-150">
        <li class="flex h-16 w-full">
          <span class="m-auto text-center text-base-300 text-xs font-raleway lg:tracking-wider">
            <i class="fa-solid fa-circle-notch"></i>
          </span>
        </li>
        {#each links as link}
        <li class="flex h-24 w-full border-t border-base-300 last:border-b">
          <a href={link.url} rel={link.rel} class="flex h-full w-full {link.url === $page.url.pathname ? 'bg-base-50' : 'hover:bg-base-50 duration-300'}">
            <span class="m-auto text-center text-base-900 font-raleway text-xs lg:tracking-wider">{link.title}</span>
          </a>
        </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>