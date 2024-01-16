import { VercelKV, kv } from "@vercel/kv";
import Keyv from "keyv";

export let cache: Keyv = new Keyv();
export let db: VercelKV = kv;
