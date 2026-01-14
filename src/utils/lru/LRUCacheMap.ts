import type { ILRUCache, LRUEntry } from "./ILRUCache";

export class LRUCacheMap<K, V> implements ILRUCache<K, V> {
  private cap: number;
  private map: Map<K, V>;

  constructor(capacity: number) {
    this.cap = capacity;
    this.map = new Map<K, V>();
  }

  get(key: K): V | null {
    if (!this.map.has(key)) return null;

    const value = this.map.get(key)!;

    // move to MRU
    this.map.delete(key);
    this.map.set(key, value);

    return value;
  }

  put(key: K, value: V): void {
    // if exists, delete first so it becomes MRU after set
    if (this.map.has(key)) {
      this.map.delete(key);
    }

    this.map.set(key, value);

    // evict LRU if overflow
    if (this.map.size > this.cap) {
      const lruKey = this.map.keys().next().value as K;
      this.map.delete(lruKey);
    }
  }

  entries(): LRUEntry<K, V>[] {
    // Map preserves insertion order:
    // first = LRU, last = MRU
    return Array.from(this.map.entries()).map(([key, value]) => ({
      key,
      value,
    }));
  }

  size(): number {
    return this.map.size;
  }

  capacity(): number {
    return this.cap;
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  clear(): void {
    this.map.clear();
  }
}
