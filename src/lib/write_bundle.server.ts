import type { SelectedBrews } from "$lib/types"
import { dedup } from "$lib/types";

function write_brewfile(usr: SelectedBrews): string {
    let buffer = `
# This Brewfile was generated automatically via Brewskie on ${new Date().toISOString()}
# Feel free to tweak it as needed, the service is still a work-in-progress!
tap "homebrew/cask-versions"\n`;
    const usr_casks = dedup(usr.casks.map(cask => `cask "${cask}"`))
    const usr_pkgs = dedup(usr.formulae.map(pkg => `brew "${pkg}"`))
    const casks = usr_casks.join('\n');
    const pkgs = usr_pkgs.join('\n');
    buffer += (casks + '\n' + pkgs);
    return buffer.trim();
}

export function prepare_brewfile(usr: SelectedBrews) {
    const installs_readable = `CASKS:\n${usr.casks.join("\n")}\nFORMULAE:\n${usr.formulae.join("\n")}`;
    const brewskie = write_brewfile(usr);
    const homebrew_bureaucracy = `
if ! command -v brew &> /dev/null; then
    read -p "Homebrew isn't installed! Would you like to install it now? (N/y)" install_hw
    case "$install_hw" in
        y|Y )
            echo "Installing Homebrew.."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            ;;
        * )
            echo "User aborted, exiting.."
            exit
            ;;
    esac
fi
echo "${installs_readable}"
read -p "Would you like to install your brewskie now? (N/y) " install_now
case "$install_now" in
    y|Y|yes|Yes )
        echo "Right on 🤙!"
        ;;
    * )
        echo "I'll keep this one nice and cold for you 🤙"
        exit
        ;;
esac`;
    const running_brewfile = `
BREWFILE_PATH="/tmp/brewskie"
echo "$BREWSKIE" > "$BREWFILE_PATH"
brew bundle --file="$BREWFILE_PATH"
rm "$BREWFILE_PATH"`;

const finished_script = `
BREWSKIE=$(cat <<EOF
${brewskie}
EOF
)
${homebrew_bureaucracy}
${running_brewfile}`

    return finished_script;
}
