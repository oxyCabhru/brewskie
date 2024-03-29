import type { SelectedBrews } from "./types";
import { hash } from "./types";
import db from "./db.server";


/**
 * @param sb a snapshot of your selected brews
 * @returns the hash under which the selected brews were saved
 */
export async function save_brewskie(sb: SelectedBrews): Promise<string> {
    const h = hash(sb);
    await db.set(h, JSON.stringify(sb));
    return h;
};

/**
 * @param hash hash of the saved selected brews entry
 * @returns JSON.stringify() version of the selected brews
*/
export async function fetch_brewskie(hash: string): Promise<string> {
    const data: string = await db.get(hash) || "{casks: [], formulae: []}";
    return data;
}