import Header from "./components/layout/Header";
import Controller from "./components/sections/Controller";
import CapacityWindow from "./components/sections/CapacityWindow";
import LRUStorageView from "./components/sections/LRUStorageView";
import HowItWorks from "./components/sections/HowItWorks";

import { useLRUCacheView } from "./hooks/useLRUCacheView";
import { useRateLimiterSlots } from "./hooks/useRateLimiterSlots";

export type ApiTodo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

function App() {
  // Capacity window (rate limiter)
  const { slots, totalCalls, isRateLimited, consumeSlot, refillSeconds } =
    useRateLimiterSlots({
      slotCount: 3,
      refillSeconds: 5,
    });

  // LRU cache
  const { cacheItems, maxSize, put } = useLRUCacheView<number, ApiTodo>({
    maxSize: 4,
    makeLabel: (todo) => `Todo ${todo.id}: ${todo.todo}`,
  });

  const handleFetchRandom = async () => {
    const allowed = consumeSlot();
    if (!allowed) return;

    try {
      const res = await fetch("https://dummyjson.com/todos/random");
      if (!res.ok) throw new Error("Failed to fetch random todo");

      const data: ApiTodo = await res.json();
      put(data.id, data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* soft glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_45%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-10">
        <Header />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.2)]">
              <Controller
                onFetchRandom={handleFetchRandom}
                isRateLimited={isRateLimited}
              />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.2)]">
              <CapacityWindow
                slots={slots}
                totalCalls={totalCalls}
                refillSeconds={refillSeconds}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.2)] lg:col-span-2">
            <LRUStorageView items={cacheItems} maxSize={maxSize} />
            <div className="mt-6">
              <HowItWorks />
            </div>
          </div>
        </div>

        <footer className="mt-10 text-center text-[10px] tracking-[0.2em] text-slate-600">
          SELF-HEALING RATE LIMITER DASHBOARD • 2026
        </footer>
      </div>
    </div>
  );
}

export default App;
