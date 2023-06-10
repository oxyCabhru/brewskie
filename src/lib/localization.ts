import { readable } from "svelte/store";

const sixpacks = {
    title:
    {
        premade: 
        {
            en: "Premade Brewskies!",
            he: "חבילות מוכנות מראש!",
        },
        call_to_action:
        {
            en: "Come get yours!",
            he: "התחלה מהירה יותר 😉",
        }
    },
    add_all_to_selection:
    {
        en: "Add all to selection",
        he: "בחר הכל",
    },
    browsers:
    {
        title:
        {
            en: "Browsers",
            he: "דפדפנים",
        },
        firefox:
        {
            en: "Supported by non-profit Mozilla Foundation, runs on the Gecko engine.",
            he: "",
        },
        chrome:
        {
            en: "Made by Google, the most popular web browser in the world. Runs on the Blink engine.",
            he: "",
        },
        orion:
        {
            en: "Made by Kagi, built specifically for macOS. Runs on the webkit engine, much like Safari.",
            he: "",
        }
    },
    social:
    {
        title:
        {
            en: "Instant Messaging",
            he: "הודעות מיידיות",
        },
        telegram:
        {
            en: "Cloud-based, encrypted instant messaging app, based on the MTProto protocol.",
            he: "",
        },
        whatsapp:
        {
            en: "One of the most popular instant messaging apps today, owned by Meta.",
            he: "",
        },
        discord:
        {
            en: "An instant messaging, VoIP app centered around communities and gaming.",
            he: "",
        }
    },
    essential:
    {
        title: 
        {
            en: "Essential for all",
            he: "תוכנות מומלצות לכולם",
        },
        raycast:
        {
            en: "Alternative for Spotlight, enhances your workflow.",
            he: "",
        },
        iina:
        {
            en: "Decidedly modern, free, and open-source media player for macOS.",
            he: "",
        },
        keka:
        {
            en: "A tool for compressing and decompressing files like .zip, .rar, and more.",
            he: "",
        },
        rectangle:
        {
            en: "Snap your windows to parts of your screen with ease.",
            he: "",
        },
        maccy:
        {
            en: "Keep track of your <⌘ + C>s, go back in history.",
            he: "",
        },
        aldente:
        {
            en: "Make the most of your Macbook's battery by preserving its health.",
            he: "",
        },
        hiddenbar:
        {
            en: "Hide unwanted menubar icons to keep it nice and tidy.",
            he: "",
        }
    },
    privacy:
    {
        title: 
        {
            en: "Privacy-conscious",
            he: "פרטיות",
        },
        lulu:
        {
            en: "Get notified and block when an app tries to communicate outside your machine.",
            he: "",
        },
        bitwarden:
        {
            en: "Open-source password manager and keep them secure with you across devices.",
            he: "",
        }
    },
    gaming:
    {
        title:
        {
            en: "Gaming",
            he: "גיימינג",
        },
        steam:
        {
            en: "Steam, made by Valve. Most people who play games have an account.",
            he: "",
        },
        prismlauncher:
        {
            en: "A free and open-source modded Minecraft client.",
            he: "",
        },
        origin:
        {
            en: "EA's solution to their digital distribution of games on Mac.",
            he: "",
        },
        epic_games:
        {
            en: "Epic Games Launcher. At least they give out a game or two every so often.",
            he: "",
        },
        openemu:
        {
            en: "Emulate nearly any old-school game! ROMs not included.",
            he: "",
        },
        battle_net:
        {
            en: "Blizzard's games at your fingertips. Could never really get into Warcraft..",
            he: "",
        }
    }
};

const about_content = {
    localstorage_explain:
    {
        en: "Brewskie uses your browser's local storage for keeping your selections between page loads.",
        he: "",
    }
}

export default readable(
    {
        title: {
            brewskie: {
                en: "Brewskie! 🤙",
                he: "ברוסקי! 🤙",
            },
            desc: {
                en: "Install apps and packages quickly and easily, powered by ",
                he: "התקנת תוכנות וחבילות בקלות ובמהירות, מונע ע\"י"
            },
            cask: {
                en: "One cask",
                he: "תוכנה אחת",
            },
            pkg: {
                en: "One formula",
                he: "חבילה אחת",
            },
            casks: {
                en: "Casks",
                he: "תוכנות",
            },
            pkgs: {
                en: "Formulae",
                he: "חבילות",
            }
        },
        about:
        {
            en: "About",
            he: "אודות",
        },
        downloads_tooltip:
        {
            en: "Recent download count",
            he: "מספר ההורדות לאחרונה",
        },
        input_chips_placeholder: 
            {
                en: "Know a brew you want? Type it here and press Enter..",
                he: "מכירים תוכנה שאתם רוצים? כתבו פה ולחצו אנטר..",
            },
        preview_selections:
            {
                en: "Preview",
                he: "הבחירות שלי",
            },
        download_brewfile:
            {
                en: "Done!",
                he: "סיימתי!",
            },
        toggles: {
                autocomplete: {
                    en: "Toggle Autocompletions",
                    he: "השלמה אוטומטית",
                },
                pagination: {
                    en: "Toggle Pagination Bar",
                    he: "החלפה בין עמודים",
                },
            },
        autocomplete_warning:
            {
                en: "On mobile, could cause worse page performance!",
                he: "בטלפון אפשרות זו יכולה לגרום לחוויה פחות טובה",
            },
        access_premade_brewskies:
            {
                en: "Access Premade Brewskies",
                he: "חבילות מוכנות מראש",
            },
        clear_all_selected:
            {
                en: "Clear all",
                he: "הסר הכל",
            },
        some_brews_selected:
            {
                en: "These are your currently selected brews:",
                he: "אלה הם הבחירות שלכם:"
            },
        no_brews_selected:
            {
                en: "No brews currently selected!",
                he: "לא נבחרו חבילות או תוכנות!"
            },
        sixpacks,
        about_content,
        
    }
)