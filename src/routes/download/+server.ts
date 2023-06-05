import { prepare_brewfile } from "$lib/bundle.js";
import type { UserChoices } from "$lib/types.js";

export async function POST({ request }) {
    const ch = await request.json() as UserChoices;
    const brewfile = prepare_brewfile(ch);
    let res = new Response(
        brewfile,
        {
            headers: {
                "Content-type" : "application/x-sh",
                "Content-Disposition" : "attachment; filename=brewskie.sh",
            }
        }
    );
    return res;
}