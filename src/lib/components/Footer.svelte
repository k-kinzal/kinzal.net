<script lang="ts">
    import {Pinterest, Tumblr, Facebook, Twitter} from 'svelte-share-buttons-component/src/index';

    let url = 'https://kinzal.net/';
    let title = 'RakugakiYa';
</script>

<footer>
  <div class="flex border-white/0 border-r-8 border-r-accent p-4 justify-between">
    <ul class="flex">
      <li class="mr-1"><Twitter text="{title}" {url} via="k_kinzal" related="other,users" /></li>
      <li class="mr-1"><Facebook class="share-button" quote="{title}" {url} /></li>
      <li class="mr-1"><Tumblr class="share-button" {title} {url} caption="{title}" /></li>
      <li class="mr-1"><Pinterest class="share-button" {url} media="{url}favicon.png" description={title} /></li>
    </ul>
    <div class="flex">
      <p class="m-auto text-xs text-base-900 font-raleway font-thin">&#xA9; 2005-2022, kinzal.net</p>
    </div>
  </div>
</footer>
