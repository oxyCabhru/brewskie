import type { RecCat } from "./types";

const browsers: RecCat<"static"> = {
    category: "Browsers",
    ionicon_html: '<ion-icon name="globe-outline" class="i" />',
    toggle_all: true,
    brews: [
      {
        //based on gecko
        token: "firefox",
        type: "cask",
        description:
          "Supported by non-profit Mozilla Foundation, runs on the Gecko engine.",
      },
      {
        //based on blink
        token: "google-chrome",
        type: "cask",
        description:
          "Made by Google, the most popular web browser in the world. Runs on the Blink engine.",
      },
      {
        //based on webkit
        token: "orion",
        type: "cask",
        description:
          "Made by Kagi, built specifically for macOS. Runs on the webkit engine, much like Safari.",
      },
    ],
  };

  const social: RecCat<"static"> = {
    category: "Instant Messaging",
    ionicon_html: '<ion-icon name="chatbubbles-outline" class="i" />',
    toggle_all: true,
    brews: [
      {
        token: "telegram",
        type: "cask",
        description:
          "Cloud-based, encrypted instant messaging app, based on the MTProto protocol.",
      },
      {
        token: "whatsapp",
        type: "cask",
        description:
          "One of the most popular instant messaging apps today, owned by Meta.",
      },
      {
        token: "discord",
        type: "cask",
        description:
          "An instant messaging, VoIP app centered around communities and gaming.",
      },
    ],
  };

  const essential: RecCat<"static"> = {
    category: "Essentials",
    ionicon_html: '<ion-icon name="cafe-outline" class="i" />',
    toggle_all: true,
    brews: [
      //the apps here are meant for the computer to be handle anything thrown at it, providing a bit of context for the user
      {
        //better spotlight
        token: "raycast",
        type: "cask",
        description: "Alternative for Spotlight, enhances your workflow.",
      },
      {
        //versatile media player
        token: "iina",
        type: "cask",
        description:
          "Decidedly modern, free, and open-source media player for macOS.",
      },
      {
        //handle any and all compressed archives
        token: "keka",
        type: "cask",
        description:
          "A tool for compressing and decompressing files like .zip, .rar, and more.",
      },
      {
        //QOL
        token: "rectangle",
        type: "cask",
        description: "Snap your windows to parts of your screen with ease.",
      },
      {
        token: "maccy",
        type: "cask",
        description: "Keep track of your <⌘ + C>s, go back in history.",
      },
      {
        token: "aldente",
        type: "cask",
        description:
          "Make the most of your Macbook's battery by preserving its health.",
      },
      {
        token: "hiddenbar",
        type: "cask",
        description: "Hide unwanted menubar icons to keep it nice and tidy.",
      },
      {
        token: "latest",
        type: "cask",
        description: "Check and update your apps anywhere, anytime.",
      }
    ],
  };

  const privacy: RecCat<"static"> = {
    category: "Privacy-conscious",
    ionicon_html: '<ion-icon name="eye-off-outline" class="i" />',
    toggle_all: true,
    brews: [
      {
        token: "lulu",
        type: "cask",
        description:
          "Get notified and block when an app tries to communicate outside your machine.",
      },
      {
        token: "bitwarden",
        type: "cask",
        description:
          "Open-source password manager and keep them secure with you across devices.",
      },
    ],
  };

  const gaming: RecCat<"static"> = {
    category: "Gaming",
    ionicon_html: '<ion-icon name="game-controller-outline" class="i" />',
    toggle_all: true,
    brews: [
      //i do *not* want to add the epic games launcher here. it sucks.
      {
        token: "steam",
        type: "cask",
        description:
          "Steam, made by Valve. Most people who play games have an account.",
      },
      {
        token: "prismlauncher",
        type: "cask",
        description: "A free and open-source modded Minecraft client.",
      },
      {
        token: "whisky",
        type: "cask",
        description:
          "Use Wine & Apple's GPTK to run Windows games on your Mac, Apple Silicon supported.",
      },
      {
        token: "origin",
        type: "cask",
        description:
          "EA's solution to their digital distribution of games on Mac.",
      },
      {
        //sigh
        token: "epic-games",
        type: "cask",
        description:
          "Epic Games Launcher. At least they give out a free game or two every so often.",
      },
      {
        token: "openemu",
        type: "cask",
        description: "Emulate nearly any old-school game! ROMs not included.",
      },
      {
        token: "battle-net",
        type: "cask",
        description:
          "Blizzard's games at your fingertips. Could never really get into Warcraft..",
      },
    ],
  };

  const developer: RecCat<"static"> = {
    category: "Developer's Tools",
    ionicon_html: '<ion-icon name="code-slash-outline" class="i" />',
    toggle_all: true,
    brews: [
      {
        token: "visual-studio-code",
        type: "cask",
        description: "Most popular and versatile code editor. Developed and maintained by Microsoft."
      },
      {
        token: "coteditor",
        type: "cask",
        description: "Plain text editor, macOS's Notepad++."
      },
      {
        token: "nova",
        type: "cask",
        description: "Native code editor, platform-competitor to Visual Studio Code. Developed by Panic."
      },
      {
        token: "python@3.11",
        type: "formula",
        description: "It's Python. Version 3.11."
      },
      {
        token: "rust",
        type: "formula",
        description: "A compiler for Rust, a safe, concurrent, and practical language."
      },
      {
        token: "gh",
        type: "formula",
        description: "GitHub cli. Better interactions with Github when it comes to authentication, and more."
      },
      {
        token: "docker",
        type: "cask",
        description: "Docker CE, dockerize your apps and run them in an isolated runtime."
      },
      {
        token: "kubernetes-cli",
        type: "formula",
        description: "Kubectl, for orchestrating your Docker containers and making the most out of your resources."
      },
      {
        token: "terraform",
        type: "formula",
        description: "Manage your resources with a code-first approach, on any (supported) cloud provider. Developed by Hashicorp."
      }
      
    ]
  }

  export default [browsers, social, essential, privacy, gaming, developer] as RecCat<"static">[];
