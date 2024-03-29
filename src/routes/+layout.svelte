<script lang="ts">
  import "../app.css";
  import { clear_brews, selected_brews } from "$lib/selected_brews";
  import { Buffer } from "buffer";
  import Topbar from "$lib/cmps/Topbar.svelte";
  import Sidebar from "$lib/cmps/Sidebar.svelte";
  import SelectedPopup from "$lib/cmps/SelectedPopup.svelte";
  import { page, navigating } from "$app/stores";
  import HowTo from "$lib/cmps/HowTo.svelte";
  import type { SelectedBrews } from "$lib/types";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  let breadcrumbs: string[];
  $: breadcrumbs = $page.route.id?.split("/").filter((v) => v != "") || [];
  globalThis.Buffer = Buffer;
  let brews: any[];
  const parse_brews = (refresh?: boolean) => {
    if (refresh) clear_brews();
    return $selected_brews.casks
      .map((brew) => {
        return { brew: brew, type: "cask" };
      })
      .concat(
        $selected_brews.formulae.map((brew) => {
          return { brew: brew, type: "formula" };
        })
      );
  };
  $: brews = $selected_brews ? parse_brews(false) : parse_brews(true);
  let shared_brewskie: SelectedBrews | undefined;
  async function load_suggestion() {
    let hash = $page.url.searchParams.get("h");
    if (!hash) return;
    shared_brewskie = (await (
      await fetch(`/query?hash=${hash}`)
    ).json()) as SelectedBrews;
    suggestion = true;
  }
  const accept_suggestion = () => {
    if (!shared_brewskie) return;
    $selected_brews = shared_brewskie;
    suggestion = false;
  };
  let suggestion = false;
  onMount(async () => {
    await load_suggestion();
  });
</script>

<svelte:head>
  <!-- dynamic page title -->
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

  <script
    async
    src="https://analytics.umami.is/script.js"
    data-website-id="c2564a40-959f-47e3-bb81-296a428a126f"
  ></script>
  <!-- metadata -->
  <meta
    name="description"
    content="Install apps and packages quickly and easily, powered by Homebrew."
  />
  <meta name="robots" content="nofollow, nositelinkssearchbox, nosnippet" />
</svelte:head>

<div id="container">
  <div id="overlay" class="content-end lg:content-start">
    {#if $navigating}
      <div class="mt-4 scale-150 loading loading-spinner" />
    {/if}
    {#if suggestion}
      <div transition:slide class="alert alert-info shadow-xl">
        <div>
          <h3>Someone has shared a quickstart code with you!</h3>
          <p>
            The code was
            <input
              readonly
              class="input input-bordered input-info input-sm"
              type="text"
              style="width: calc(8ch * 1.4)"
              placeholder={$page.url.searchParams.get("h")}
            />, would you like to load it?
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <button class="btn btn-primary btn-sm" on:click={accept_suggestion}
            >Yes</button
          >
          <button
            class="btn btn-sm"
            on:click={() => {
              suggestion = false;
            }}>No</button
          >
        </div>
      </div>
    {/if}
    <SelectedPopup {brews} />
  </div>
  <div id="brewskie">
    <div id="topbar">
      <Topbar {breadcrumbs} />
    </div>
    <div id="content">
      <div id="sidebar" class="hidden lg:block zone">
        <Sidebar>
          <HowTo />
        </Sidebar>
      </div>
      <div id="page" class="zone grow">
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
    display: flex;
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
    width: min-content;
    border-radius: 0.6rem;
    overflow-y: auto;
    overflow-x: hidden;
  }
  #page {
    width: fit-content;
    overflow-x: hidden;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 0.6rem;
  }
</style>
