import db from "$lib/db";
import KeyvRedis from "@keyv/redis";
import { version } from "$app/environment";
import type { LayoutServerLoad } from "./$types";

export async function load({}) {
    const db_status = db instanceof KeyvRedis ? "redis" : "dev";
    const revision = version;
    return {
        build_data: {
            db_status,
            revision
        }
    }
}