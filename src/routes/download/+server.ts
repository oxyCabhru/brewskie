import { save_brewskie } from "$lib/persist_bundles.server.js";
import type { SelectedBrews } from "$lib/types.js";
import { prepare_brewfile } from "$lib/write_bundle.server";

export async function POST({ request }) {
    const sb = await request.json() as SelectedBrews;
    const hash = await save_brewskie(sb);
    const brewfile = prepare_brewfile(sb);
    let res = new Response(
        JSON.stringify({hash, brewfile}),
        {
            headers: {
                "Content-type" : "application/x-sh",
                "Content-Disposition" : `attachment; filename=brewskie-${hash}.sh`,
            }
        }
    );
    return res;
}
