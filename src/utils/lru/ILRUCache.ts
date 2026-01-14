export type LRUEntry<K, V> = { key: K; value: V };

export interface ILRUCache<K, V> {
  get(key: K): V | null;
  put(key: K, value: V): void;

  // for UI rendering (LRU -> MRU order)
  entries(): LRUEntry<K, V>[];

  size(): number;
  capacity(): number;

  // optional helpers (nice for debugging)
  has(key: K): boolean;
  clear(): void;
}
