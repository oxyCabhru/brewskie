const TIMEOUT = 86_400_000; // milliseconds per day

export const stupid_cache = new Map();
stupid_cache.set("TIMESTAMP", Date.now());
export function cache_refresh() {
    if (Date.now() - stupid_cache.get("TIMESTAMP") >= TIMEOUT) {
        stupid_cache.clear();
        stupid_cache.set("TIMESTAMP", Date.now());
    };
}