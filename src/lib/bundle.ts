import type { UserChoices } from "$lib/types";
export function write_brewfile(usr: UserChoices): string {
    let buffer = `
# This Brewfile was generated automatically via Brewskie on ${new Date().toISOString()}
# Feel free to tweak it as needed, the service is still a WIP!
brew tap homebrew/cask-versions\n`;
    const usr_casks = usr.casks.map(csk => `cask "${csk}"`)
    const usr_pkgs = usr.packages.map(pkg => `brew "${pkg}"`)
    const casks = usr_casks.join('\n');
    const pkgs = usr_pkgs.join('\n');
    buffer += (casks + '\n' + pkgs);
    return buffer.trim();
}

export function prepare_brewfile(usr: UserChoices) {
    const brewskie = write_brewfile(usr);
    const homebrew_bureaucracy = `
if ! command -v brew &> /dev/null; then
    read -p "Homebrew isn't installed! Would you like to install it now? (n/y)" install_hw
    case "$install_hw" in
        y|Y )
            echo "Installing Homebrew.."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            ;;
        n|N )
            echo "User aborted, exiting.."
            exit
            ;;
        * )
            echo "Invalid input, taking that as a no.."
            exit
            ;;
    esac
fi`;
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
