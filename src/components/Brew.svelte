<script lang="ts">
    import type { ApiResponse } from "$lib/types";
    export let brew: ApiResponse;
    export let type: "cask" | "formula";
</script>

<div class="brew-card" data-token={brew.token}>
    {type}
    <div class="header">
        <div class="title">
            <span class="display-name" title={brew.token}>
                {brew.display_name}
            </span>
            <a href={brew.homepage} class="homepage i">
                <ion-icon name="link-outline" />
            </a>
        </div>
        <div class="popularity">
            <span class="installs">
                {brew.installs}
            </span>
            <ion-icon name="download-outline" class="i" />
        </div>
    </div>
    <div class="content">
        <p class="description">
            {brew.description}
        </p>
    </div>
</div>

<style>
    .brew-card {
        outline: 1px solid red;
        display: flex;
        flex-direction: column;
    }
    .header {
        width: 100%;
        display: flex;
        position: relative;
    }
    .title {
        flex-grow: 1;
        text-align: center;
    }
    .popularity {
        background: gray;
        padding: 0.1rem 0.25rem;
        border-radius: 1rem 0 0 1rem;
    }
</style>
