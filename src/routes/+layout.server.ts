import db from "$lib/db.server";
import KeyvRedis from "@keyv/redis";
import got from "got";
export async function load() {
    const db_status = db instanceof KeyvRedis ? "redis" : "dev";
    const revision = (await got("https://api.github.com/repos/oxycabhru/brewskie/commits/production").json() as any).sha as string; //im so sorry
    // const revision = ""
    return {
        build_data: {
            db_status,
            revision,
        }
    } 
}