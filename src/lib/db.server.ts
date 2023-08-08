import { building, dev } from "$app/environment";

import KeyvRedis from "@keyv/redis";
import Keyv from "keyv";
let db: KeyvRedis<any> | Keyv;

if (!building && !dev) {
    db = new KeyvRedis("redis://redis-cluster:6379");
} else {
    db = new Keyv();
}

export default db;