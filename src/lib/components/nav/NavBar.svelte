<script lang="ts">
  export let style = undefined
  let className = undefined; export { className as class }

  let onBlur = (e) => {
      if (e.relatedTarget && e.relatedTarget.nodeName === 'A') {
          e.target.focus()
          e.stopPropagation()
      }
  }

</script>

<nav class={`flex justify-between ${className}`} style={style} >
  <div><slot name="brand" /></div>
  <div class="group flex">
    <button class="peer flex p-6 md:hidden" on:blur={onBlur}>
      <span><i class="fa-solid fa-bars"></i></span>
    </button>
    <ul class="hidden md:flex peer-focus-within:flex focus-within:flex peer-focus:flex peer-focus:flex-col peer-focus:absolute peer-focus:top-16 peer-focus:left-0 peer-focus:z-50 peer-focus:w-full">
      <slot name="nav-items" />
    </ul>
  </div>
</nav>

<style>
  @import "@fortawesome/fontawesome-free/css/all.css";

  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>