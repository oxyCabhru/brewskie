import { building, dev } from "$app/environment";
import KeyvRedis from "@keyv/redis";
const TIMEOUT = 86_400_000; // milliseconds per day
let db: KeyvRedis<any> | Map<any, any>;

if (!building && !dev) {
    db = new KeyvRedis("redis://redis-cluster:6379");
} else {
    console.warn("defaulting to stupid cache..")
    db = new Map();
    db.set("TIMESTAMP", Date.now());
}
export function cache_refresh() {
    if (db instanceof KeyvRedis) return;
    if (Date.now() - db.get("TIMESTAMP") >= TIMEOUT) {
        db.clear();
        db.set("TIMESTAMP", Date.now());
    };
}

export default db;