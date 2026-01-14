import React from "react";
import type { CacheViewItem } from "../../hooks/useLRUCacheView";

type LRUStorageViewProps = {
  items: CacheViewItem[];
  maxSize: number;
};

const LRUStorageView = ({ items, maxSize }: LRUStorageViewProps) => {
  const getQuote = (status: CacheViewItem["status"]) => {
    if (status === "done") {
      return "Nice! This task is done. Keep the momentum going.";
    }
    return "Focus on this next. One small step at a time.";
  };

  return (
    <div>
      {/* Header row */}
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-emerald-300">🗄️</span>
          <h3 className="text-lg font-semibold text-emerald-300">
            LRU Cache Storage
          </h3>
        </div>

        <div className="text-xs text-slate-400">
          Max Size:{" "}
          <span className="text-slate-200 font-semibold">{maxSize}</span>
        </div>
      </div>

      {/* Empty state */}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/30 p-10 text-center">
          <p className="text-sm text-slate-400">
            Cache is empty. Start making requests!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* MRU should be on top, so reverse list */}
          {[...items].reverse().map((item) => (
            <div
              key={item.key}
              className={`rounded-2xl border bg-slate-950/30 px-5 py-4 shadow-sm ${
                item.isMRU
                  ? "border-emerald-500/40 shadow-[0_0_0_1px_rgba(16,185,129,0.12)]"
                  : "border-slate-800"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Left icon */}
                <div
                  className={`mt-1 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                    item.status === "done"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "bg-amber-500/15 text-amber-300"
                  }`}
                >
                  {item.status === "done" ? "✓" : "🕒"}
                </div>

                {/* Middle content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs text-slate-400">
                      ID: <span className="text-slate-300">{item.key}</span>
                    </div>

                    <div className="text-[10px] text-slate-500">
                      Accessed: {item.accessedAt}
                    </div>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-slate-100">
                    {item.label.replace(/^Todo \d+:\s*/, "")}
                  </p>

                  <p className="mt-1 text-xs italic text-emerald-300/80">
                    "{getQuote(item.status)}"
                  </p>
                </div>

                {/* Right badge */}
                <div className="flex items-center">
                  {item.isMRU && (
                    <span className="rounded-md bg-emerald-500/15 px-2 py-1 text-center text-[10px] font-semibold text-emerald-300">
                      MRU (MOST RECENT)
                    </span>
                  )}

                  {item.isLRU && (
                    <span className="rounded-md bg-rose-500/15 px-2 py-1 text-center text-[10px] font-semibold text-rose-300">
                      LRU (NEXT TO EVICT)
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LRUStorageView;
