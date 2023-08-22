import { env } from "$env/dynamic/private";
import db from "$lib/db.server";
import KeyvRedis from "@keyv/redis";
import got from "got";
export async function load() {
    const db_status = db instanceof KeyvRedis ? "redis" : "dev";
    const revision = 'VITE_COMMIT_HASH';
    return {
        build_data: {
            db_status,
            revision,
        }
    } 
}