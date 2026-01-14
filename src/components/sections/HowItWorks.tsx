import React from "react";

const HowItWorks = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-slate-400">ℹ️</span>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          How this works
        </h4>
      </div>

      <ol className="space-y-3 text-sm text-slate-300">
        <li className="flex gap-3">
          <span className="text-emerald-300 font-semibold">1.</span>
          <span>
            Each request consumes a capacity token shown in the battery slots.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="text-emerald-300 font-semibold">2.</span>
          <span>
            Tokens{" "}
            <span className="font-semibold text-slate-100">auto-refill</span>{" "}
            individually after 5 seconds, rather than all at once.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="text-emerald-300 font-semibold">3.</span>
          <span>
            The cache stores up to 5 items. The{" "}
            <span className="font-semibold text-slate-100">
              Least Recently Used
            </span>{" "}
            item is purged when capacity is exceeded.
          </span>
        </li>
      </ol>
    </div>
  );
};

export default HowItWorks;
