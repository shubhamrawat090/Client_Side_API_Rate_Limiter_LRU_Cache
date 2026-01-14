import type { ILRUCache, LRUEntry } from "./ILRUCache";

class Node<K, V> {
  key?: K;
  value?: V;
  prev: Node<K, V> | null = null;
  next: Node<K, V> | null = null;

  constructor(key?: K, value?: V) {
    this.key = key;
    this.value = value;
  }
}

export class LRUCacheDLL<K, V> implements ILRUCache<K, V> {
  private cap: number;
  private map: Map<K, Node<K, V>>;
  private head: Node<K, V>; // LRU sentinel
  private tail: Node<K, V>; // MRU sentinel

  constructor(capacity: number) {
    this.cap = capacity;
    this.map = new Map<K, Node<K, V>>();

    // Sentinel nodes (dummy nodes, no key/value needed)
    this.head = new Node<K, V>();
    this.tail = new Node<K, V>();

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  private remove(node: Node<K, V>): void {
    const prev = node.prev!;
    const next = node.next!;
    prev.next = next;
    next.prev = prev;
  }

  private insertAtMRU(node: Node<K, V>): void {
    const prev = this.tail.prev!;
    prev.next = node;
    node.prev = prev;

    node.next = this.tail;
    this.tail.prev = node;
  }

  get(key: K): V | null {
    const node = this.map.get(key);
    if (!node) return null;

    this.remove(node);
    this.insertAtMRU(node);

    return node.value!; // safe: real nodes always have value
  }

  put(key: K, value: V): void {
    const existing = this.map.get(key);

    if (existing) {
      // NOTE: For existing nodes it is better to just update the value and make MRU instead of deleting and recreating the node
      existing.value = value;
      this.remove(existing);
      this.insertAtMRU(existing);
      return;
    }

    const node = new Node<K, V>(key, value);
    this.map.set(key, node);
    this.insertAtMRU(node);

    if (this.map.size > this.cap) {
      const lru = this.head.next!;
      this.remove(lru);
      this.map.delete(lru.key!);
    }
  }

  entries(): LRUEntry<K, V>[] {
    const result: LRUEntry<K, V>[] = [];
    let curr = this.head.next;

    while (curr && curr !== this.tail) {
      result.push({ key: curr.key!, value: curr.value! });
      curr = curr.next;
    }

    return result; // LRU -> MRU
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
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
}
