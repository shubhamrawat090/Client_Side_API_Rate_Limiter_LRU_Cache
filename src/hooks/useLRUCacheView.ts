import { useRef, useState } from "react";
import type { ILRUCache } from "../utils/lru/ILRUCache";
import { LRUCacheMap } from "../utils/lru/LRUCacheMap";

export type CacheViewItem = {
  key: string;
  label: string;
  isMRU: boolean;
  isLRU: boolean;
  accessedAt: string;
  status: "done" | "pending";
};

type UseLRUCacheViewArgs<K, V> = {
  maxSize: number;
  makeLabel: (value: V, key: K) => string;
  isDone?: (value: V) => boolean;
};

export function useLRUCacheView<K, V>({
  maxSize,
  makeLabel,
  isDone,
}: UseLRUCacheViewArgs<K, V>) {
  const cacheRef = useRef<ILRUCache<K, V>>(new LRUCacheMap<K, V>(maxSize));

  // store last accessed timestamps separately so UI can show them
  const accessedAtRef = useRef<Map<string, string>>(new Map());

  const [cacheItems, setCacheItems] = useState<CacheViewItem[]>([]);

  const formatTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const syncCacheItemsFromCache = () => {
    const entries = cacheRef.current.entries(); // LRU -> MRU

    const items: CacheViewItem[] = entries.map((entry, index) => {
      const keyStr = String(entry.key);

      const accessedAt = accessedAtRef.current.get(keyStr) ?? formatTime();

      const status: CacheViewItem["status"] = isDone
        ? isDone(entry.value)
          ? "done"
          : "pending"
        : "pending";

      return {
        key: keyStr,
        label: makeLabel(entry.value, entry.key),
        isMRU: index === entries.length - 1,
        isLRU: index === 0,
        accessedAt,
        status,
      };
    });

    setCacheItems(items);
  };

  const put = (key: K, value: V) => {
    const keyStr = String(key);

    // update access time whenever it is inserted / updated
    accessedAtRef.current.set(keyStr, formatTime());

    cacheRef.current.put(key, value);
    syncCacheItemsFromCache();
  };

  return {
    maxSize,
    cacheItems,
    put,
  };
}
