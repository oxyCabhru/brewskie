<script lang="ts">
  import categories from "$lib/premade_brews";
  import {
    is_selected,
    select_brew,
    selected_brews,
    unselect_brew,
  } from "$lib/selected_brews";
  import type { BrewMetadata } from "$lib/types";
  import Brew from "./Brew.svelte";
  export let category: {
    category: string;
    ionicon_html: string;
    toggle_all: boolean;
    brews: {
      token: string;
      type: string;
      description: string;
      api: Promise<BrewMetadata>;
    }[];
  };

  let selected: boolean = false;
  $: selected =
    is_selected(
      category.brews.filter((v) => v.type == "cask").map((v) => v.token),
      "cask"
    ) &&
    is_selected(
      category.brews.filter((v) => v.type == "formula").map((v) => v.token),
      "formula",
      $selected_brews
    );

  function category_toggle(e: MouseEvent) {
    if (selected) {
      category.brews.forEach((brew) => {
        unselect_brew(e, brew.token, brew.type == "cask" ? "cask" : "formula");
      });
    } else {
      category.brews.forEach((brew) => {
        select_brew(e, brew.token, brew.type == "cask" ? "cask" : "formula");
      });
    }
  }
</script>

<div class="category card p-4 shadow-xl collapse">
  <input type="checkbox" name="category" />
  <div class="card-title flex gap-14 place-content-between collapse-title">
    <span class="flex items-center">
      {category.category}
      {#if category.toggle_all}
        <button
          id="select-all"
          class="badge badge-outline"
          data-selected={selected ? "Unselect all" : "Select all"}
          on:click={category_toggle}
        >
          <ion-icon name="checkmark-done-outline" class="i" />
        </button>
      {/if}
    </span>

    <span style="visibility: visible !important;">
      {@html category.ionicon_html}
    </span>
  </div>
  <div class="flex flex-row flex-wrap gap-2 collapse-content">
    {#each category.brews as brew}
      <div class="tooltip" data-tip={brew.description}>
        {#await brew.api}
          Loading {brew.token}..
        {:then api}
          <Brew brew={api} />
        {/await}
      </div>
    {/each}
  </div>
</div>

<style>
  .category {
    border: solid rgba(0, 0, 0, 0.4) 1px;
    background: var(--brew-sh-bg);
  }
  #select-all {
    margin-left: 1rem;
    padding: 0.75rem 0.5rem;
    z-index: 1;
  }
  #select-all[data-selected="Unselect all"] {
    background-color: var(--brew-sh-primary);
    color: var(--brew-sh-bg);
  }
  #select-all::after {
    content: attr(data-selected);
    width: 0;
    text-transform: uppercase;
    overflow: hidden;
    white-space: nowrap;
    transform-origin: left;
    padding-left: 0rem;
    transition: 200ms ease-in width, 200ms ease-in padding-left;
  }
  .category:hover #select-all::after {
    width: 100%;
    padding-left: 0.25rem;
  }
</style>
