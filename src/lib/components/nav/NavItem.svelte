<script lang="ts">
    import "./nav.css"
    import "@fortawesome/fontawesome-free/css/all.css"

    import {page} from "$app/stores";

    export let style = undefined
    let className = ''; export { className as class }

    export let title = ''
    export let href = ''
    export let rel = ''
    export let map = {}

    $: if ((map[href] || href) === $page.url.pathname) {
        className = className.replace(/select:/g, '').replace(/ +/g, ' ')
    } else {
        className = className.replace(/select:[^ ]+/g, '').replace(/ +/g, ' ')
    }
</script>

<li class={className} style={style}>
  <a href={href} rel={rel} class="flex h-full w-full p-6">
    <span class="m-auto">{title}</span>
  </a>
</li>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>