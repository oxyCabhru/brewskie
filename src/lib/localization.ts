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
        he: "ברוסקי משתמש באחסון המקומי של הדפדפן שלכם כדי לשמור את ההעדפות שלכם בין עמודים.",
    },
    localstorage_link:
    {
        en: "For more information on localStorage",
        he: "לעוד מידע על localStorage.."
    },
    welcome:
    {
        en: "Welcome to Brewskie, a tool for quickly and easily getting started with a new machine, not-too-unlike",
        he: "ברוכים הבאים לברוסקי, כלי להתחלה מהירה עם מחשב חדש, לא שונה כל כך מ-",
    },
    welcome_now:
    {
        en: "but now-- for macOS!",
        he: "אבל עכשיו-- עבור מחשבי מק!"
    },
    how_to:
    {
        title:
        {
            en: "How to use:",
            he: "מדריך למשתמש:",
        },
        step1:
        {
            title: 
            {
                en: "Select apps and packages you'd like to install.",
                he: "בחרו תוכנות וחבילות שתרצו להתקין."
            },
            detail:
            {
                en: `Alternatively, you can also search for them in the search bar. On desktop, little chips will appear and show the name of the Brew token of the corresponding cask or formula.
                Selections will persist between uses of the site.`,
                he: `לחילופין, אפשר גם לחפש אותם בשורת החיפוש למעלה. במסכים גדולים יתווספו צ'יפים קטנים עם השם של כל תוכנה וחבילה.
                הבחירות שלכם יישמרו בין שימושים של האתר.`
            }
        },
        step2:
        {
            title:
            {
                en: "Download the script and review it!",
                he: "הורידו את הסקריפט ובדקו אותו!",
            },
            detail_1:
            {
                en: "Press the orange ",
                he: "לחצו על הכפתור ",
            },
            detail_2:
            {
                en: ` button to download the script.
I strongly encourage you to read its contents before running it, make sure you understand what you run, and stop if you don't feel comfortable with running it.
The script installs Homebrew if your machine doesn't have it already,
writes a `,
                he: `להורדת הסקריפט.
אני ממליץ מאוד לקרוא את התוכן של הקובץ לפני שאתם מריצים אותו. תבינו מה הסקריפט עושה, ואם אתם מרגישים לא בנוח עם זאת-- עצרו.
הסקריפט מתקין Homebrew אם זה לא מותקן כבר במחשב שלכם, לאחר מכן הוא כותב `
            },
            detail_3:
            {
                en: ` into /tmp/brewskie,
and attempts to run it using`,
                he: "לתוך /tmp/brewskie, ומנסה להריץ אותו באמצעות הפקודה הבאה:"
            }
        },
        step3:
        {
            title:
            {
                en: "Make the script executable and run it!",
                he: "עשו את הסקריפט ניתן להרצה, והריצו אותו!",
            },
            detail_1:
            {
                en: `By default, you can't run the script after downloading it --
you have to expressly make it executable.
This is mainly a security measure, and we are all grateful for it.`,
                he: `כברירת מחדל, לא ניתן להריץ את הסקריפט מיד לאחר ההורדה -- 
אתם חייבים להפוך אותו לסקריפט ניתן להרצה באופן מפורש.
התנהגות זו היא בעיקר כדי לשמור על ביטחון המחשב שלכם, והרי זה מבורך.`,
            },
            link: 
            {
                en: "Please follow Apple's instructions for making a script executable.",
                he: "עקבו אחר ההוראות הרשמיות של אפל כדי להפוך את הסקריפט לניתן להרצה.",
            },
            detail_2:
            {
                en: "Run it as per the instructions, follow the prompts, and within a few minutes you should have all of your selected Brews installed! ",
                he: "הריצו את הסקריפט לפי ההוראות, עקבו אחר הההנחיות בטרמינל, ובתוך מספר דקות כל התוכנות שלכם אמורות להיות מותקנות!",
            }
        }
    },
    credit:
    {
        en: "Made by Daniel Moshe 🤓",
        he: "נבנה ע\"י דניאל משה 🤓",
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
                he: "התקנת תוכנות וחבילות בקלות ובמהירות, מונע ע\"י "
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