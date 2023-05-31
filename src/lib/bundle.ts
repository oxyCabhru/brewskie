import type { UserChoices } from "$lib/types";
export function write_brewfile(usr: UserChoices): string {
    let buffer = `
# This Brewfile was generated automatically via Brewskie on ${new Date().toISOString()}
# Feel free to tweak it as needed, the service is still a WIP!\n`;
    const usr_casks = usr.casks.map(csk => `cask "${csk}"`)
    const usr_pkgs = usr.packages.map(pkg => `brew "${pkg}"`)
    const casks = usr_casks.join('\n');
    const pkgs = usr_pkgs.join('\n');
    buffer += (casks + '\n' + pkgs);
    return buffer.trim();
}
