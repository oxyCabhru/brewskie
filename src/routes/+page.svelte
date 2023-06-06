<script lang="ts">
    import { user_choice } from "$lib/store";
	import { InputChip, Paginator, toastStore, Autocomplete, type AutocompleteOption, popup } from "@skeletonlabs/skeleton";
	import type { PaginationSettings } from "@skeletonlabs/skeleton/dist/components/Paginator/types";
    import Brews from "$lib/Brews.svelte";
	import type {PageData} from "./$types";
	import { onMount } from "svelte";
	import type { UserChoices } from "$lib/types";
	import { FileDown } from "lucide-svelte";
	export let data;
    let raw_input: string;
    let autocomp_options: AutocompleteOption[] = data.available_brews.map(brew => {
        return {
            label: brew.token,
            value: brew.token,
        } as AutocompleteOption
    })
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

        const el: HTMLElement | null = document.querySelector('[class="input-chip-field unstyled bg-transparent border-0 !ring-0 p-0 w-full"]');
        if (el) {
            popup(el, {
                event: 'focus-click',
                target: 'autocomplete',
                placement: 'bottom',
            });
        };
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
            const token = e.detail.chipValue || e.detail.value;
            if (ch.casks.includes(token) || ch.packages.includes(token)) {
                ch.casks = ch.casks.filter(cask => cask != token);
                ch.packages = ch.packages.filter(pkg => pkg != token);
                raw_input = "";
                return ch;
            }
            const dp = data.available_brews.find(brew => brew.token == token);
            if (!dp) return ch;
            dp.type == "cask" ?
                ch.casks.push(dp.token)
                :
                ch.packages.push(dp.token)
            raw_input = "";
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
    <main>
    <div class="controls card variant-glass-primary">
        <div class="brewfile">
            <InputChip
                class={"variant-glass-surface"}
                chips={"input-chips variant-filled"}
                bind:input={raw_input}
                bind:value={input_choices}
                placeholder={"Know a brew you want? Type it here and press Enter.."}
                whitelist={data.available_brews.map(brew => brew.token)}
                allowDuplicates={true}
                on:remove={removeChip}
                on:add={addChip}
                name="inp" />
                <div data-popup="autocomplete" class="autocomplete card w-full h-32 overflow-y-auto">
                    <Autocomplete
                        bind:input={raw_input}
                        options={autocomp_options}
                        on:selection={addChip}
                    />
                </div>
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
            select="select w-min
            border border-surface-300 text-gray-900 text-sm rounded-lg focus:ring-surface-500 focus:border-surface-500 block w-full p-2.5 dark:bg-primary-700 dark:border-surface-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-surface-500
            variant-soft-surface
            "
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
            "casks pkgs";
        gap: .25rem;
        margin: .1rem .25rem;
    }
    .autocomplete {
        margin-top: .25rem;
        width: 88%;
        z-index: 1;
    }
    .brewfile {
        display: grid;
        grid-template-columns: 8fr 1fr;
    }
    .controls {
        top: 0;
        grid-area: controls;
        display: grid;
        position: sticky;
        width: 100%;
        height: 6rem;
        z-index: 1;
    }
    :global(.paginator) {
        padding: .25rem 0;
        display: flex;
        flex-flow: row nowrap !important;
    }
    :global(.paginator > *) {
        margin-top: 0 !important;
    }
    :global(.paginator-label) {
        width: min-content !important;
    }
    :global(.input-chips) {
        display: none;
    }
    @media only screen and (min-width: 1024px) {
        main {
            grid-template-areas: 
            "controls controls"
            "casks pkgs"
            "casks pkgs";
            gap: 2.5rem;
            margin: 2.5rem 5rem;
        }
        .controls {
            top: 1rem;
        }
        :global(.input-chips) {
            display: unset;
        }
    }
</style>