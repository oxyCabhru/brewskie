<script lang="ts">
// import {readable, type Readable};

import { Accordion, AccordionItem, drawerStore, popup, type PopupSettings } from "@skeletonlabs/skeleton";
import type { SixPack } from "$lib/types";
import { toggleBrew, user_choice } from "$lib/store";
import { Gamepad2, EyeOff, Coffee, MessagesSquare, Globe, PlusCircle, PlusSquare, XSquare } from "lucide-svelte";

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
    category: "Browsers",
    lucide_icon: Globe,
    brews: [
        {   //based on gecko
            token: "firefox",
            type: "cask",
            description: "Supported by non-profit Mozilla Foundation, runs on the Gecko engine."
        },
        {   //based on blink
            token: "google-chrome",
            type: "cask",
            description: "Made by Google, the most popular web browser in the world. Runs on the Blink engine."
        },
        {   //based on webkit
            token: "orion",
            type: "cask",
            description: "Made by Kagi, built specifically for macOS. Runs on the webkit engine, much like Safari."
        }
    ]
}

const social: SixPack = {
    category: "Instant Messaging",
    lucide_icon: MessagesSquare,
    brews: [
        {
            token: "telegram",
            type: "cask",
            description: "Cloud-based, encrypted instant messaging app, based on the MTProto protocol."
        },
        {
            token: "whatsapp",
            type: "cask",
            description: "One of the most popular instant messaging apps today, owned by Meta."
        },
        {
            token: "discord",
            type: "cask",
            description: "An instant messaging, VoIP app centered around communities and gaming."
        }
    ]
}

const essential: SixPack = {
    category: "Essential for all",
    lucide_icon: Coffee,
    brews: [ //the apps here are meant for the computer to be handle anything thrown at it, providing a bit of context for the user
        {   //better spotlight
            token: "raycast",
            type: "cask",
            description: "Alternative for Spotlight, enhances your workflow."
        },
        {   //versatile media player
            token: "iina",
            type: "cask",
            description: "Decidedly modern, free, and open-source media player for macOS."
        },
        {   //handle any and all compressed archives
            token: "keka",
            type: "cask",
            description: "A tool for compressing and decompressing files like .zip, .rar, and more."
        },
        {   //QOL
            token: "rectangle",
            type: "cask",
            description: "Snap your windows to parts of your screen with ease."
        },
        {
            token: "maccy",
            type: "cask",
            description: "Keep track of your <⌘ + C>s, go back in history."
        },
        {
            token: "aldente",
            type: "cask",
            description: "Make the most of your Macbook's battery by preserving its health."
        },
        {
            token: "hiddenbar",
            type: "cask",
            description: "Hide unwanted menubar icons to keep it nice and tidy."
        }
    ]
}

const privacy: SixPack = {
    category: "Privacy-conscious",
    lucide_icon: EyeOff,
    brews: [
        {
            token: "lulu",
            type: "cask",
            description: "Get notified and block when an app tries to communicate outside your machine."
        },
        {
            token: "bitwarden",
            type: "cask",
            description: "Open-source password manager and keep them secure with you across devices."
        }
    ]
}

const gaming: SixPack = {
    category: "Gaming",
    lucide_icon: Gamepad2,
    brews: [ //i do *not* want to add the epic games launcher here. it sucks.
        {
            token: "steam",
            type: "cask",
            description: "Steam, made by Valve. Most people who play games have an account."
        },
        {
            token: "prismlauncher",
            type: "cask",
            description: "A free and open-source modded Minecraft client."
        },
        {
            token: "origin",
            type: "cask",
            description: "EA's solution to their digital distribution of games on Mac."
        },
        {   //sigh
            token: "epic-games",
            type: "cask",
            description: "Epic Games Launcher. At least they give out a game or two every so often."
        },
        {
            token: "openemu",
            type: "cask",
            description: "Emulate nearly any old-school game! ROMs not included."
        },
        {
            token: "battle-net",
            type: "cask",
            description: "Blizzard's games at your fingertips. Could never really get into Warcraft.."
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
            Premade Brewskies!
        </h1>
        <h2 class="h2">
            Come get yours!
        </h2>
    </div>
    <Accordion>
        {#each packs as pack}
            <AccordionItem>
                <svelte:fragment slot="lead">
                    <svelte:component this={pack.lucide_icon} size="16" />
                </svelte:fragment>

                <svelte:fragment slot="summary">
                    <div class="flex flex-row justify-between">
                        {pack.category}
                        <button
                            class="btn btn-sm flex flex-row gap-1 [&>*]:pointer-events-none"
                            on:click={() => {add_sixpack(pack)}}
                            use:popup={addToSelection}
                            >
                            <span class="card p-1 variant-filled-secondary" data-popup="add-to-selection">
                                <div class="arrow variant-filled-secondary" />
                                Add all to selection
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