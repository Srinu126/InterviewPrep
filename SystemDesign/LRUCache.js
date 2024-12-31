/**
 * Design LRU
 * LRU evicts the least recently used items when the cache reaches its capacity.
 */
class LRUCache {
    constructor(capacity){
        this.capacity = capacity;
        this.cache = new Map();
    }
    get(key){
        if(!this.cache.has(key)) return -1;
        let value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return this.cache.get(key);

    }
    put(key, value){
        if(this.cache.has(key)) this.cache.delete(key);
        else if(this.cache.size >=this.capacity){
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, value);
    }
}

let lru = new LRUCache(2);
lru.put(1,1);
lru.put(2,2);
lru.get(1);
lru.put(3,3);

console.log("____________________________")
console.log(lru.get(1));
console.log(lru.get(2));
console.log(lru.get(3));