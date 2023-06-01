<script lang="ts">
    import { user_choice } from "$lib/store";
	import { InputChip, Paginator } from "@skeletonlabs/skeleton";
	import type {PageData} from "./$types";
	export let data;
    import { page } from "$app/stores";
	import type { PaginationSettings } from "@skeletonlabs/skeleton/dist/components/Paginator/types";
	import Brews from "$lib/Brews.svelte";
    let input_choices: string[] = [];
    $: input_choices = $user_choice.casks.concat($user_choice.packages);
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
        limit: data.amount * 2,
        size: data.total,
        amounts: [30, 50],
    };
    async function paginate(e: any) {
        switch (e.type) {
            case "amount":
                window.location.href = `?p=${$page.url.searchParams.get("p")}&c=${e.detail / 2}`
                break;
            case "page":
                window.location.href = `?p=${e.detail}&c=${$page.url.searchParams.get("c")}`
                break;
            default: return;
        }
    }
</script>
<InputChip
    bind:value={input_choices}
    placeholder={"Know a brew you want? Type it here"}
    whitelist={data.available_brews.map(brew => brew.token)}
    allowDuplicates={true}
    on:remove={removeChip}
    on:add={addChip}
    name="inp" />

    <Paginator
        bind:settings={pagination}
        on:page={paginate}
        on:amount={paginate} />

    <!-- <p>apps length {data.apps.length}</p>
    <p>pkg length {data.packages.length}</p>
    <p>pagination {$page.url.searchParams.get("p") || "0"}</p>
    <p>ch: {input_choices}</p> -->

    <main>
        <Brews apps={data.apps} packages={data.packages} stream={data.stream} />
    </main>

<style>
    main {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
</style>