<script lang="ts">
  import "../app.css";
  import { selected_brews } from "$lib/selected_brews";
  import { theme, theme_handler, lang } from "$lib/user_prefs";
  import locale from "$lib/localization";
  import type { LayoutData } from "./$types";
  import { onMount } from "svelte";
  import { Buffer } from "buffer";
  import Topbar from "$lib/cmps/Topbar.svelte";
  import Sidebar from "$lib/cmps/Sidebar.svelte";
  globalThis.Buffer = Buffer;
  export let data;
  onMount(() => {
    theme_handler($theme);
  });
</script>

<svelte:head>
  <title>
    {$locale.title.brewskie[$lang]}
    {$selected_brews.casks.length > 0 || $selected_brews.formulae.length > 0
      ? `| ${
          $selected_brews.casks.length == 1
            ? $locale.title.cask[$lang]
            : `${$selected_brews.casks.length} ${$locale.title.casks[$lang]}`
        } | ${
          $selected_brews.formulae.length == 1
            ? $locale.title.pkg[$lang]
            : `${$selected_brews.formulae.length} ${$locale.title.pkgs[$lang]}`
        }`
      : ""}
  </title>
</svelte:head>

<div id="brewskie">
  <div id="topbar">
    <Topbar build_data={data.build_data} />
  </div>
  <div id="content">
    <div id="sidebar" class="zone">
      <Sidebar />
    </div>
    <div id="page" class="zone">
      <slot />
    </div>
  </div>
</div>

<style>
  #brewskie {
    flex-grow: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .zone {
    background: var(--brew-sh-alt-bg);
  }
  #content {
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: 0.5rem;
    flex-grow: 1;
    overflow-y: auto;
  }
  #topbar {
    width: 100%;
  }
  #sidebar {
    padding: 0.5rem 0.75rem;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 0.6rem;
  }
  #page {
    overflow-y: auto;
    overflow-x: hidden;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 0.6rem;
  }
</style>
