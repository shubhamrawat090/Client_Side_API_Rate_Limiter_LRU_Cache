import React, { useEffect, useState } from "react";
import type { CapacitySlot } from "../../hooks/useRateLimiterSlots";

type CapacityWindowProps = {
  slots: CapacitySlot[];
  totalCalls: number;
  refillSeconds: number;
};

const CapacityWindow = ({
  slots,
  totalCalls,
  refillSeconds,
}: CapacityWindowProps) => {
  const availableCount = slots.filter((s) => s.status === "available").length;

  // ✅ keep "now" in state so render stays pure
  const [now, setNow] = useState(() => Date.now());

  // Smooth animation loop
  useEffect(() => {
    let rafId: number;

    const loop = () => {
      setNow(Date.now());
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-amber-300">🔋</span>
          <h3 className="text-lg font-semibold text-slate-100">
            Capacity Window
          </h3>
        </div>

        <div className="text-xs text-slate-400">
          <span className="font-semibold text-emerald-300">
            {availableCount}
          </span>{" "}
          / {slots.length} available
        </div>
      </div>

      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Availability Slots
      </p>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {slots.map((slot) => {
          const isAvailable = slot.status === "available";

          // Smooth progress (0 -> 100) based on time
          let progress = 100;
          let secondsLeft = 0;

          if (!isAvailable && slot.cooldownEndsAt) {
            const totalMs = refillSeconds * 1000;
            const remainingMs = Math.max(0, slot.cooldownEndsAt - now);

            progress = Math.min(
              100,
              Math.max(0, ((totalMs - remainingMs) / totalMs) * 100)
            );

            secondsLeft = Math.ceil(remainingMs / 1000);
          }

          return (
            <div
              key={slot.id}
              className={`relative overflow-hidden rounded-xl border px-3 py-3 text-center text-xs font-semibold transition ${
                isAvailable
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-slate-700 bg-slate-950/30 text-slate-300"
              }`}
            >
              {/* Smooth Fill Layer */}
              {!isAvailable && (
                <div
                  className="absolute inset-y-0 left-0 bg-emerald-500/15"
                  style={{ width: `${progress}%` }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase tracking-wide opacity-70">
                  Slot {slot.id}
                </span>

                {isAvailable ? (
                  <span className="text-emerald-300">✓</span>
                ) : (
                  <span className="text-slate-200">{secondsLeft}s</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Total Calls
        </p>
        <p className="text-sm font-semibold text-slate-100">{totalCalls}</p>
      </div>
    </div>
  );
};

export default CapacityWindow;
