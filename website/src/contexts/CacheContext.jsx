import { useMemo, useRef, createContext, useEffect } from "react";

export const CacheContext = createContext(null);

export function CacheProvider({ children }) {
  const mapRef = useRef(new Map());
  const map = mapRef.current;

  function getCache(key) {
    const value = map.get(key);
    if (!value) return undefined;
    if (new Date().getTime() > value.expiry.getTime()) {
      map.delete(key);
      return undefined;
    }
    return value.data;
  }

  function setCache(key, value, ttl = 10) {
    const expiry = new Date(Date.now() + ttl * 1000);
    map.set(key, {
      expiry,
      data: value,
    });
  }

  function clearCache() {
    map.clear();
  }

  function deleteCache(key) {
    map.delete(key);
  }

  useEffect(() => {
    console.log(map)
  }, [map])

  const contextValue = useMemo(() => ({
    getCache,
    setCache,
    clearCache,
    deleteCache,
  }), []);

  return (
    <CacheContext.Provider value={contextValue}>
      {children}
    </CacheContext.Provider>
  );
}

