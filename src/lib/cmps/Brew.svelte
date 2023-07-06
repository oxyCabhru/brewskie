<script lang="ts">
    import {
        select_brew,
        unselect_brew,
        selected_brews,
    } from "$lib/selected_brews";
    import { BrewType, type BrewMetadata } from "$lib/types";
    export let brew: BrewMetadata;
    let icon_url: string;
    if (brew.icon) {
        icon_url = URL.createObjectURL(
            new Blob([
                Buffer.from(brew.icon, "base64")
            ])
        );
    }
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
        {#if brew.icon}
        <span class="brew-icon">
            <img alt="" src={icon_url} width=16 height=16 />
        </span>
        {:else}
        <span class="brew-icon">
            <ion-icon name="logo-github" />
        </span>
        {/if}
            <a href={brew.homepage} class="hover-link">
                {brew.display_name}
                <ion-icon name="link-outline" class="i" />
            </a>
            <div class="ml-auto flex gap-2">
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
    }

    /* .brew-icon {
        filter: saturate(0);
        transition: filter 150ms ease-in;
    }
    .card:hover .brew-icon {
        filter: saturate(100%);
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
