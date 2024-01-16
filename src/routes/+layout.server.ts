import { env } from "$env/dynamic/private";
import { cache } from "$lib/storage.server";
import KeyvRedis from "@keyv/redis";
export async function load() {
    const db_status = cache instanceof KeyvRedis ? "redis" : "dev";
    const revision = Buffer.from(JSON.parse('commit')).toString().trim();
    return {
        build_data: {
            db_status,
            revision,
        }
    }
}