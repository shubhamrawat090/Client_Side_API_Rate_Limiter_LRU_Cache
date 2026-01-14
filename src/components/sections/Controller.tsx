import React from "react";

type ControllerProps = {
  onFetchRandom: () => void;
  isRateLimited: boolean;
};

const Controller = ({ onFetchRandom, isRateLimited }: ControllerProps) => {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className="text-emerald-300">🎛️</span>
        <h3 className="text-lg font-semibold text-slate-100">Controller</h3>
      </div>

      <button
        className="cursor-pointer w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-sm hover:bg-emerald-400 active:bg-emerald-600 transition disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onFetchRandom}
        disabled={isRateLimited}
      >
        ⚡ Fetch Random
      </button>

      <p className="mt-3 text-xs text-slate-400">
        {isRateLimited
          ? "Rate limit exceeded. Waiting for a slot to refill..."
          : "Click to simulate an API call and store it in the LRU cache."}
      </p>
    </div>
  );
};

export default Controller;
