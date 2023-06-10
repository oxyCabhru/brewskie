<script lang="ts">
// import {readable, type Readable};

import { Accordion, AccordionItem, drawerStore, popup, type PopupSettings } from "@skeletonlabs/skeleton";
import type { SixPack } from "$lib/types";
import { user_choice, lang } from "$lib/store";
import locale from "$lib/localization";
import { Gamepad2, EyeOff, Coffee, MessagesSquare, Globe, PlusCircle, PlusSquare, XSquare } from "lucide-svelte";
import { toggleBrew } from "$lib/functions";

const addToSelection: PopupSettings = {
    event: "hover",
    target: "add-to-selection",
    placement: "left",
}
function add_sixpack(pack: SixPack) {
    user_choice.update(ch => {
        pack.brews.forEach(brew => {
            if (ch.casks.includes(brew.token) || ch.packages.includes(brew.token)) return;
            (brew.type == "cask") ?
                ch.casks.push(brew.token)
                :
                ch.packages.push(brew.token);
        });
        return ch;
    });
    drawerStore.close();
}

const browsers: SixPack = {
    category: $locale.sixpacks.browsers.title[$lang],
    lucide_icon: Globe,
    brews: [
        {   //based on gecko
            token: "firefox",
            type: "cask",
            description: $locale.sixpacks.browsers.firefox[$lang]
        },
        {   //based on blink
            token: "google-chrome",
            type: "cask",
            description: $locale.sixpacks.browsers.chrome[$lang]
        },
        {   //based on webkit
            token: "orion",
            type: "cask",
            description: $locale.sixpacks.browsers.orion[$lang]
        }
    ]
}

const social: SixPack = {
    category: $locale.sixpacks.social.title[$lang],
    lucide_icon: MessagesSquare,
    brews: [
        {
            token: "telegram",
            type: "cask",
            description: $locale.sixpacks.social.telegram[$lang]
        },
        {
            token: "whatsapp",
            type: "cask",
            description: $locale.sixpacks.social.whatsapp[$lang]
        },
        {
            token: "discord",
            type: "cask",
            description: $locale.sixpacks.social.discord[$lang]
        }
    ]
}

const essential: SixPack = {
    category: $locale.sixpacks.essential.title[$lang],
    lucide_icon: Coffee,
    brews: [ //the apps here are meant for the computer to be handle anything thrown at it, providing a bit of context for the user
        {   //better spotlight
            token: "raycast",
            type: "cask",
            description: $locale.sixpacks.essential.raycast[$lang]
        },
        {   //versatile media player
            token: "iina",
            type: "cask",
            description: $locale.sixpacks.essential.iina[$lang]
        },
        {   //handle any and all compressed archives
            token: "keka",
            type: "cask",
            description: $locale.sixpacks.essential.keka[$lang]
        },
        {   //QOL
            token: "rectangle",
            type: "cask",
            description: $locale.sixpacks.essential.rectangle[$lang]
        },
        {
            token: "maccy",
            type: "cask",
            description: $locale.sixpacks.essential.maccy[$lang]
        },
        {
            token: "aldente",
            type: "cask",
            description: $locale.sixpacks.essential.aldente[$lang]
        },
        {
            token: "hiddenbar",
            type: "cask",
            description: $locale.sixpacks.essential.hiddenbar[$lang]
        }
    ]
}

const privacy: SixPack = {
    category: $locale.sixpacks.privacy.title[$lang],
    lucide_icon: EyeOff,
    brews: [
        {
            token: "lulu",
            type: "cask",
            description: $locale.sixpacks.privacy.lulu[$lang]
        },
        {
            token: "bitwarden",
            type: "cask",
            description: $locale.sixpacks.privacy.bitwarden[$lang]
        }
    ]
}

const gaming: SixPack = {
    category: $locale.sixpacks.gaming.title[$lang],
    lucide_icon: Gamepad2,
    brews: [ //i do *not* want to add the epic games launcher here. it sucks.
        {
            token: "steam",
            type: "cask",
            description: $locale.sixpacks.gaming.steam[$lang]
        },
        {
            token: "prismlauncher",
            type: "cask",
            description: $locale.sixpacks.gaming.prismlauncher[$lang]
        },
        {
            token: "origin",
            type: "cask",
            description: $locale.sixpacks.gaming.origin[$lang]
        },
        {   //sigh
            token: "epic-games",
            type: "cask",
            description: $locale.sixpacks.gaming.epic_games[$lang]
        },
        {
            token: "openemu",
            type: "cask",
            description: $locale.sixpacks.gaming.openemu[$lang]
        },
        {
            token: "battle-net",
            type: "cask",
            description: $locale.sixpacks.gaming.battle_net[$lang]
        }
    ]
}

// const techie: SixPack = {
//     category: "Techies",
//     lucide_icon: Wrench,
//     brews: [],
// }

// const oxy: SixPack = {
//     category: "oxy",
//     brews: [
//         {   //web browser
//             token: "firefox",
//             type: "cask",
//         },
//         {   //better spotlight
//             token: "raycast",
//             type: "cask",
//         },
//         {   //versatile media player
//             token: "iina",
//             type: "cask",
//         },
//         {   //everyone likes music
//             token: "spotify",
//             type: "cask",
//         },
//         {   //you most likely have an account here
//             token: "discord",
//             type: "cask",
//         },
//         {   //for the occasional image edit
//             token: "gimp",
//             type: "cask",
//         },
//         {   //yarr
//             token: "transmission",
//             type: "cask",
//         },
//         {
//             token: "keka",
//             type: "cask",
//         },
//         {   //gamez, for the ones we got at least
//             token: "steam", //id include legendary, alas
//             type: "cask",
//         },
//         {
//             token: "rectangle",
//             type: "cask",
//         },
//         {
//             token: "warp",
//             type: "cask",
//         },
//         {
//             token: "maccy",
//             type: "cask",
//         },
//         {
//             token: "telegram",
//             type: "cask",
//         },
//         {
//             token: "whatsapp",
//             type: "cask"
//         },
//         {
//             token: "notion",
//             type: "cask",
//         },
//         {
//             token: "aldente",
//             type: "cask",
//         },
//         {
//             token: "hiddenbar",
//             type: "cask",
//         }


//     ]
// }

const packs = [browsers, social, essential, privacy, gaming];
</script>


<div class="p-1">
    <div class="card-header text-center">
        <h1 class="h1 gradient-heading primary-gr">
            {$locale.sixpacks.title.premade[$lang]}
        </h1>
        <h2 class="h2">
            {$locale.sixpacks.title.call_to_action[$lang]}
        </h2>
    </div>
    <Accordion>
        {#each packs as pack}
            <AccordionItem>
                <svelte:fragment slot="lead">
                    <svelte:component this={pack.lucide_icon} size="16" />
                </svelte:fragment>

                <svelte:fragment slot="summary">
                    <div class="pr-2 flex flex-row justify-between">
                        {pack.category}
                        <button
                            class="btn btn-sm flex flex-row gap-1 [&>*]:pointer-events-none"
                            on:click={() => {add_sixpack(pack)}}
                            use:popup={addToSelection}
                            >
                            <span class="card p-1 variant-filled-secondary" data-popup="add-to-selection">
                                <div class="arrow variant-filled-secondary" />
                                {$locale.sixpacks.add_all_to_selection[$lang]}
                            </span>
                            <PlusSquare size="16" />
                        </button>
                    </div>
                </svelte:fragment>

                <svelte:fragment slot="content">
                    <div class="chips flex flex-row flex-wrap gap-4">
                        {#each pack.brews as brew}
                        <div class="hover chip variant-filled" use:popup={{
                            event: "click",
                            target: `brew-desc-${brew.token}`,
                            placement: "right",
                            closeQuery: `quickadd-${brew.token}`
                        }}>
                            {brew.token}
                        </div>
                        {#if brew.description}
                        <div data-popup={`brew-desc-${brew.token}`}
                            class="card variant-filled-surface text-white/100 p-2 border-solid border-primary-500 border">
                            <span>
                                {brew.description}
                            </span>
                            <button
                                id={`quickadd-${brew.token}`}
                                data-token={brew.token}
                                data-brewtype={brew.type}
                                data-chosen={$user_choice.casks.includes(brew.token)}
                                on:click={toggleBrew}
                                class={`btn-icon btn-icon-sm
                                ${$user_choice.casks.includes(brew.token) ? "variant-soft-secondary" : "variant-soft-primary"}
                                p-2`}>
                                {#if $user_choice.casks.includes(brew.token)}
                                    <XSquare size="14" />
                                {:else}
                                    <PlusCircle size="14" />
                                {/if}
                            </button>
                        </div>
                        {/if}
                        {/each}
                    </div>
                </svelte:fragment>
            </AccordionItem>
        {/each}
    </Accordion>
</div>