// enum CacheType {
//   SESSION = "session",
//   LOCAL = "local"
// }
type cacheType = "session" | "local";
class LocalCache {
  setCache(key: string, value: any, cacheType: cacheType) {
    let flag: never;
    switch (cacheType) {
      case "session":
        sessionStorage.setItem(key, JSON.stringify(value));
        break;
      case "local":
        localStorage.setItem(key, JSON.stringify(value));
        break;
      default:
        flag = cacheType;
        console.log(flag);
        break;
    }
  }

  getCache(key: string, cacheType: cacheType) {
    let flag: never, value: any;
    switch (cacheType) {
      case "session":
        value = sessionStorage.getItem(key);
        break;
      case "local":
        value = localStorage.getItem(key);
        break;
      default:
        flag = cacheType;
        console.log(flag);
        break;
    }
    return value && JSON.parse(value);
  }

  removeCache(key: string, cacheType: cacheType) {
    let flag: never;
    switch (cacheType) {
      case "session":
        sessionStorage.removeItem(key);
        break;
      case "local":
        localStorage.removeItem(key);
        break;
      default:
        flag = cacheType;
        console.log(flag);
        break;
    }
  }

  batchReomveCache(caches: { cacheKey: string; cacheType: cacheType }[]) {
    caches.forEach((cache) => {
      this.removeCache(cache.cacheKey, cache.cacheType);
    });
  }

  clearCache(cacheType: cacheType) {
    let flag: never;
    switch (cacheType) {
      case "session":
        sessionStorage.clear();
        break;
      case "local":
        localStorage.clear();
        break;
      default:
        flag = cacheType;
        console.log(flag);
        break;
    }
  }
}

export default new LocalCache();
