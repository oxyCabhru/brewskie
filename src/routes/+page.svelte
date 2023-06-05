<script lang="ts">
    import { user_choice } from "$lib/store";
	import { InputChip, Paginator, toastStore } from "@skeletonlabs/skeleton";
	import type { PaginationSettings } from "@skeletonlabs/skeleton/dist/components/Paginator/types";
    import Brews from "$lib/Brews.svelte";
	import type {PageData} from "./$types";
	import { onMount } from "svelte";
	import type { UserChoices } from "$lib/types";
	import { FileDown } from "lucide-svelte";
	import { prepare_brewfile } from "$lib/bundle";
	export let data;
    let [current_apps, current_pkgs, current_stream] = [data.apps, data.packages, data.stream]
    let input_choices: string[] = [];
    $: input_choices = $user_choice.casks.concat($user_choice.packages);
    onMount(() => {
        // restore choices from localStorage
        user_choice.set(
             {
                casks: JSON.parse(localStorage.getItem("casks") || "[]"),
                packages: JSON.parse(localStorage.getItem("formulae") || "[]"),
            } as UserChoices
        );

        // update local storage with any changes from this point on
        user_choice.subscribe(choices => {
            window.localStorage.setItem("casks", JSON.stringify(choices.casks));
            window.localStorage.setItem("formulae", JSON.stringify(choices.packages));
        });
    })
    function removeChip(e: any) {
        user_choice.update(ch => {
            ch.casks = ch.casks.filter(cask => cask != e.detail.chipValue);
            ch.packages = ch.packages.filter(pkg => pkg != e.detail.chipValue);
            return ch;
        })
    }
    function addChip(e: any) {
        user_choice.update(ch => {
            const token = e.detail.chipValue;
            if (ch.casks.includes(token) || ch.packages.includes(token)) {
                ch.casks = ch.casks.filter(cask => cask != token);
                ch.packages = ch.packages.filter(pkg => pkg != token);
                return ch;
            }
            const dp = data.available_brews.find(brew => brew.token == token);
            if (!dp) return ch;
            dp.type == "cask" ?
                ch.casks.push(dp.token)
                :
                ch.packages.push(dp.token)
            return ch;
        })
    }
    let pagination: PaginationSettings = {
        offset: data.pagination,
        limit: data.amount,
        size: data.total,
        amounts: [30, 50],
    };
    async function paginate(e: any) {
        const val = parseInt(e.detail);
        switch (e.type) {
            case "amount":
                pagination.limit = val;
                break;
            case "page":
                pagination.offset = val;
                break;
            default: return;
        }
        await change_data();
    }
    async function change_data() {
        const cur_pagination = pagination.offset;
        const cur_amount = pagination.limit;
        toastStore.trigger({
            message: "Loading.."
        })
        window.location.href = `?p=${cur_pagination}&c=${cur_amount}`
    }
    async function fetch_brewskie() {
        if (input_choices.length == 0) return;
        let res = await fetch("/download", {
            method: "POST",
            body: JSON.stringify($user_choice)
        });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.download = "brewskie.sh";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
</script>

<!-- <p>apps length {data.apps.length}</p>
    <p>pkg length {data.packages.length}</p>
    <p>pagination {$page.url.searchParams.get("p") || "0"}</p>
    <p>ch: {input_choices}</p>
    <p>{JSON.stringify($user_choice)}</p> -->
    
    <main>
    <div class="controls card variant-glass-primary">
        <div class="brewfile">
            <InputChip
            class={"variant-glass-surface"}
            bind:value={input_choices}
            placeholder={"Know a brew you want? Type it here and press Enter.."}
            whitelist={data.available_brews.map(brew => brew.token)}
            allowDuplicates={true}
            on:remove={removeChip}
            on:add={addChip}
            name="inp" />
            <button 
                class={`btn ${(input_choices.length == 0) ? "variant-soft-secondary" : "variant-filled-primary"}`}
                on:click={fetch_brewskie}>
                <FileDown />
                Done!
            </button>
        </div>
        
        <Paginator
            class="variant-glass-primary paginator"
            bind:settings={pagination}
            select="select min-w-[150px] variant-soft-surface"
            buttonClasses="btn-icon variant-filled-surface "
            justify="justify-around"
            amountText="Brews"
            buttonTextNext={"👉"}
            buttonTextPrevious={"👈"}
            on:page={paginate}
            on:amount={paginate} />
    </div>
    <Brews apps={current_apps} packages={current_pkgs} stream={current_stream} />
</main>

<style>
    main {
        position: relative;
        display: grid;
        grid-template-areas: 
            "controls controls"
            "casks pkgs"
            "casks pkgs";
        gap: 2.5rem;
        margin: 2.5rem 5rem;
    }
    .brewfile {
        display: grid;
        grid-template-columns: 8fr 1fr;
    }
    .controls {
        top: 1rem;
        grid-area: controls;
        display: grid;
        position: sticky;
        width: 100%;
        z-index: 1;
    }
    :global(.paginator) {
        padding: .25rem 0;
    }
</style>