<script lang="ts">
    import {
        select_brew,
        unselect_brew,
        selected_brews,
    } from "$lib/selected_brews";
    import { BrewType, type BrewMetadata } from "$lib/types";
    import { onMount } from "svelte";
    export let brew: BrewMetadata;
    let selected: boolean;
    $: selected =
        brew.type == BrewType.Cask
            ? $selected_brews.casks.includes(brew.token)
            : $selected_brews.formulae.includes(brew.token);
</script>

<div
    class="card card-compact shadow-xl"
    data-type={brew.type == BrewType.Cask ? "cask" : "formula"}
    data-token={brew.token}
>
    <div class="card-body">
        <div class="card-title">
            <a href={brew.homepage} class="hover-link">
                {brew.display_name}
                <ion-icon name="link-outline" class="i" />
            </a>
            <div class="ml-auto">
                <span class="badge badge-outline">
                    <ion-icon name="arrow-down-outline" />
                    {brew.installs}
                </span>
                <button
                    class="badge badge-outline"
                    on:click={selected ? unselect_brew : select_brew}
                >
                    {selected ? "- Unselect" : "+ Select"}
                </button>
            </div>
        </div>
        <p>
            {brew.description}
        </p>
    </div>
</div>

<style>
    .card {
        background: var(--alt-bg);
        flex-grow: 1;
        /* isolation: isolate; */
        /* overflow: hidden; */
    }
    /* .card:hover {
        border-top-left-radius: 0;
    }
    .card:hover::before {
        content: attr(data-type);
        position: absolute;
        z-index: 1;
        padding: 0 1rem;
        border-top-left-radius: 0.75rem;
        border-top-right-radius: 0.75rem;
        text-transform: uppercase;
        background: var(--alt-bg);
        transform: translateY(-100%);
    } */
    #downloads {
    }
    a.hover-link > ion-icon {
        transform: translateX(-2.5px);
        opacity: 0;
        transition: transform 200ms ease-out, opacity 130ms linear;
    }
    a.hover-link:hover > ion-icon {
        transform: translateX(0);
        opacity: 1;
    }
</style>
