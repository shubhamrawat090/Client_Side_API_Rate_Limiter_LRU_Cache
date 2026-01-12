import React from "react";

type CacheItem = {
  key: string;
  label: string;
  isMRU: boolean;
  isLRU: boolean;
};

type LRUStorageViewProps = {
  items: CacheItem[];
  maxSize: number;
};

const LRUStorageView = ({ items, maxSize }: LRUStorageViewProps) => {
  return (
    <div>
      <div>
        <span>LRU Cache Storage</span>
        <div>
          <span>Max Size: </span>
          <span>{maxSize}</span>
        </div>
      </div>

      <div>
        {items.length === 0 ? (
          <p>Cache is empty</p>
        ) : (
          items.map((item) => (
            <div key={item.key}>
              {item.isMRU && <strong>[MRU]</strong>}
              {item.isLRU && <strong>[LRU]</strong>}
              <span>{item.label}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LRUStorageView;
