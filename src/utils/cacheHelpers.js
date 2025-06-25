
export const cleanExpiredCache = (cache, expiryDuration) => {
    const now = new Date();
    const cleanedCache = {};

    for (const key in cache) {
        const weatherEntry = cache[key];
        if (weatherEntry.timestamp && now - weatherEntry.timestamp < expiryDuration ) {
            cleanedCache[key] = weatherEntry // Keep only valid entry..
        }
    }
    return cleanedCache;
};