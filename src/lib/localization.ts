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
            he: "דפדפן אינטרנט בקוד פתוח של חברת \"Mozilla\", רץ על המנוע של \"Gecko\". ",
        },
        chrome:
        {
            en: "Made by Google, the most popular web browser in the world. Runs on the Blink engine.",
            he: " דפדפן האינטרנט של גוגל. הפופולארי ביותר בעולם, רץ על המנוע של \"Blink\".",
        },
        orion:
        {
            en: "Made by Kagi, built specifically for macOS. Runs on the webkit engine, much like Safari.",
            he: "מנוע החיפוש של חברת \"Kagi\". יעודי למערכת ההפעלה של מק. כמו ספארי, רץ על המנוע של \"Wekbit\". ",
        }
    },
    social:
    {
        title:
        {
            en: "Instant Messaging",
            he: "תוכנות צ'אט והתכתבות",
        },
        telegram:
        {
            en: "Cloud-based, encrypted instant messaging app, based on the MTProto protocol.",
            he: "תוכנת צ'אט מבוססת ענן. מאובטחת באמצעות פרוטוקול \"MTProto\". ",
        },
        whatsapp:
        {
            en: "One of the most popular instant messaging apps today, owned by Meta.",
            he: "בין תוכנות הצ'אט הפופולאריות ביותר כיום. מאת חברת \"Meta\".",
        },
        discord:
        {
            en: "An instant messaging, VoIP app centered around communities and gaming.",
            he: "תוכנת צ'אט המתרכזת בעיקר בשיחות ועידה. מציעה פלטפורמה נהדרת לתקשורת בין קהילות שונות.",
        },
        zoom:
        {
            en: "A video communication based app, specified for working and lecturing.",
            he: "תוכנת צ'אט מבוססת שיחות וידאו. ייעודית ללימודים ועבודה.",
            
    },
    essential:
    {
        title: 
        {
            en: "Essential for all",
            he: "תוכנות מומלצות",
        },
        raycast:
        {
            en: "Alternative for Spotlight, enhances your workflow.",
            he: "אלטרנטיבה לתוכנת ספוטלייט, מייעלת את השימוש במחשב. ",
        },
        iina:
        {
            en: "Decidedly modern, free, and open-source media player for macOS.",
            he: "תוכנה חינמית להרצת מדיה. מבוססת קוד פתוח וייעודית למק",
        },
        keka:
        {
            en: "A tool for compressing and decompressing files like .zip, .rar, and more.",
            he: "תוכנה לדחיסת קבצים בדומה לזיפ וראר.",
        },
        rectangle:
        {
            en: "Snap your windows to parts of your screen with ease.",
            he: "תוכנה המאפשרת פיצול של חלונות שונים באותו המסך.",
        },
        maccy:
        {
            en: "Keep track of your <⌘ + C>s, go back in history.",
            he: "שמור את הדברים שהעתקת לאחרונה על מנת שתוכל להשתמש בהם מאוחר יותר.",
        },
        aldente:
        {
            en: "Make the most of your Macbook's battery by preserving its health.",
            he: "תשמור על חיי סוללת המק שלך באמצעות תוכנה זו!",
        },
        hiddenbar:
        {
            en: "Hide unwanted menubar icons to keep it nice and tidy.",
            he: "הסתר את סמלי סרגל התפריטים הלא רצויים",
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
            he: "קבל התראה וחסום במידת הצורך כאשר תוכנה שולחת פרטים מחוץ למכשירך.",
        },
        bitwarden:
        {
            en: "Open-source password manager and keep them secure with you across devices.",
            he: "תוכנה חינמית בקוד פתוח לניהול בטוח של הססמאות שלך מכל מקום ובכל מכשיר. ",
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
            he: "תוכנה להרצה ורכישה של משחקים, המשומשת על יידי כולם. שייכת לחברת \"Valve\".",
        },
        prismlauncher:
        {
            en: "A free and open-source modded Minecraft client.",
            he: "תוכנת פתוחה להורדת מודים למיינקראפט",
        },
        origin:
        {
            en: "EA's solution to their digital distribution of games on Mac.",
            he: "תוכנת הרצת המשחקים הרשמית של חברת \"EA\" במחשבי מק.",
        },
        epic_games:
        {
            en: "Epic Games Launcher. At least they give out a free game or two every so often.",
            he: "תוכנה להרצת משחקים. פופולארית בעיקר בעקבות פורנייט. מחלקת משחק חינם אחת לשבוע",
        },
        openemu:
        {
            en: "Emulate nearly any old-school game! ROMs not included.",
            he: "אימולטור למשחקים ישנים. לא כוללת ROM.",
        },
        battle_net:
        {
            en: "Blizzard's games at your fingertips. Could never really get into Warcraft..",
            he: "התוכנה הרשמית של בליזארד למשחקים כמו אוברווץ', דיאבלו וקול אוף דיוטי.",
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
