<script lang="ts">
  import { browser } from "$app/environment";
  import {
    unselect_brew,
    clear_brews,
    selected_brews,
  } from "$lib/selected_brews";
  import { onMount } from "svelte";
  import copy from "copy-to-clipboard";
  import { slide } from "svelte/transition";
  export let brews: any[];
  let success: boolean = false;
  let success_alert: HTMLDivElement;
  let copy_input: HTMLInputElement;
  let downloaded_hash: string;
  let copy_me = "Click to copy";
  async function copy_to_clipboard() {
    if (!browser || !downloaded_hash) return;
    copy_input.select();
    copy(downloaded_hash);
    copy_me = "Copied! 👍";
    setTimeout(() => (copy_me = "Click to copy"), 5000);
  }
  async function brewskie() {
    if (
      $selected_brews.casks.length == 0 &&
      $selected_brews.formulae.length == 0
    )
      return;

    const response = JSON.parse(
      await (
        await fetch("/download", {
          method: "POST",
          body: JSON.stringify($selected_brews),
        })
      ).text()
    ) as { hash: string; brewfile: string };
    const b = new Blob([response.brewfile]);
    const h = response.hash;
    const brewskie_retrieve = URL.createObjectURL(b);
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = brewskie_retrieve;
    link.download = `brewskie-${h}.sh`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(brewskie_retrieve);
    downloaded_hash = h;
    success = true;
  }
  onMount(() => {
    const brews = document.getElementById("brews");
    const alert = document.getElementById("selected-popup");
    if (!brews || !alert) return;
    const update = () => {
      const content_height = brews.scrollHeight;
      brews.style.setProperty(
        "--size",
        `${Math.min(content_height, 96).toString()}px`
      );
    };
    alert.addEventListener("mouseenter", update);
    alert.addEventListener("mouseleave", update);
  });
</script>

{#if success}
  <div
    transition:slide
    bind:this={success_alert}
    id="downloaded"
    class="alert alert-success shadow-xl relative"
  >
    <button
      aria-label="dismiss success flyer"
      class="absolute right-0.5 bottom-0 text-xl"
      style="visibility: visible !important"
      on:click={() => {
        success = false;
      }}
    >
      <ion-icon name="close-circle-outline" class="i close-button" />
    </button>
    <div>
      <h3 class="font-bold">Thank you for using Brewskie!</h3>
      <p>Your script should be downloading.</p>
    </div>
    <div class="text-gray-600">
      <p>
        For future reference, you can input this: <span
          class="tooltip"
          data-tip={copy_me}
          data-clipboard-target="#copy-me"
          ><input
            readonly
            id="copy-me"
            class="input input-bordered input-info input-sm copy-controller"
            type="text"
            bind:this={copy_input}
            placeholder={downloaded_hash}
            on:click={copy_to_clipboard}
          /></span
        >
      </p>
      <p>
        in the quickstart option that's in the sidebar to restore your
        selection.
      </p>
    </div>
  </div>
{/if}
{#if brews.length > 0}
  <div transition:slide id="selected-popup" class="alert shadow-xl">
    <ion-icon name="beer-outline" class="i" />
    <div>
      <h3 class="font-bold">Selected Brews:</h3>
      <div id="brews" class="text-xs flex flex-row flex-wrap gap-1 px-2 w-80">
        {#each brews as brew}
          <button
            aria-label={`unselect brew ${brew.brew} of type ${brew.type}`}
            class="brew badge badge-outline whitespace-nowrap"
            on:click={(e) => unselect_brew(e, brew.brew, brew.type)}
          >
            {brew.brew}
            <ion-icon name="close-outline" class="i text-red-600" />
          </button>
        {/each}
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <button
        aria-label="download the script, dubbed brewskie"
        class="btn btn-sm btn-primary upper font-bold"
        on:click={brewskie}
      >
        Get Brewskie
        <ion-icon name="beer-outline" class="i" />
      </button>
      <button
        aria-label="clear all selections"
        class="btn btn-sm upper font-bold"
        on:click={clear_brews}
      >
        Clear Selection
      </button>
    </div>
  </div>
{/if}

<style>
  .alert #brews {
    --size: 1.5rem;
  }
  #brews {
    height: 1.5rem;
    overflow-y: hidden;
    transition: height 180ms ease-out;
  }
  .alert:hover #brews {
    overflow-y: auto;
    height: var(--size);
  }
  input {
    z-index: 10;
    width: calc(8ch * 1.4);
  }
  ion-icon.close-button {
    color: currentColor;
    transition: color 120ms ease-in-out;
  }
  ion-icon.close-button:hover {
    color: red;
  }
  button ion-icon:not(.close-button) {
    width: 0;
    transition: width 80ms ease-in;
  }
  button:hover ion-icon:not(.close-button),
  button:focus ion-icon:not(.close-button) {
    width: 1rem;
  }
</style>
