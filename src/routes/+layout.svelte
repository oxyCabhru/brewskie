<script lang="ts">
  import "../app.css";
  import { selected_brews } from "$lib/selected_brews";
  import { Buffer } from "buffer";
  import Topbar from "$lib/cmps/Topbar.svelte";
  import Sidebar from "$lib/cmps/Sidebar.svelte";
  import SelectedPopup from "$lib/cmps/SelectedPopup.svelte";
  globalThis.Buffer = Buffer;
  let brews: any[];
  $: brews = $selected_brews.casks
    .map((brew) => {
      return { brew: brew, type: "cask" };
    })
    .concat(
      $selected_brews.formulae.map((brew) => {
        return { brew: brew, type: "formula" };
      })
    );
</script>

<svelte:head>
  <title>
    Brewskie 🤙
    {$selected_brews.casks.length > 0 || $selected_brews.formulae.length > 0
      ? `| ${
          $selected_brews.casks.length == 1
            ? "Cask"
            : `${$selected_brews.casks.length} ${"Casks"}`
        } | ${
          $selected_brews.formulae.length == 1
            ? "Formula"
            : `${$selected_brews.formulae.length} ${"Formulae"}`
        }`
      : ""}
  </title>
</svelte:head>

<div id="container">
  <div id="overlay">
    <SelectedPopup {brews} />
  </div>
  <div id="brewskie">
    <div id="topbar">
      <Topbar />
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
</div>

<style>
  #container > * {
    position: absolute;
    isolation: isolate;
    height: 100%;
    width: 100%;
  }
  #overlay {
    z-index: 1;
    gap: 1.5rem;
    padding: 0.5rem 2rem;
    display: grid;
    align-content: start;
    justify-content: center;
    pointer-events: none;
  }
  :global(#overlay > .alert) {
    pointer-events: auto;
  }
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
    overflow-y: auto;
  }
  #page {
    overflow-y: auto;
    overflow-x: hidden;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 0.6rem;
  }
</style>
