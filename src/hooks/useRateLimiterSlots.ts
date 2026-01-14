import { useEffect, useRef, useState } from "react";

export type CapacitySlot = {
  id: number;
  status: "available" | "cooldown";
  cooldownEndsAt?: number; // timestamp in ms
};

type UseRateLimiterSlotsArgs = {
  slotCount?: number;
  refillSeconds?: number;
};

export function useRateLimiterSlots({
  slotCount = 3,
  refillSeconds = 5,
}: UseRateLimiterSlotsArgs = {}) {
  const [slots, setSlots] = useState<CapacitySlot[]>(
    Array.from({ length: slotCount }, (_, i) => ({
      id: i + 1,
      status: "available",
    }))
  );

  const [totalCalls, setTotalCalls] = useState(0);

  // store timeout ids so we can clear if needed
  const timeoutsRef = useRef<Record<number, number>>({});

  useEffect(() => {
    return () => {
      // cleanup on unmount
      Object.values(timeoutsRef.current).forEach((t) => clearTimeout(t));
    };
  }, []);

  const isRateLimited = slots.every((s) => s.status !== "available");

  const consumeSlot = (): boolean => {
    const availableIndex = slots.findIndex((s) => s.status === "available");
    if (availableIndex === -1) return false;

    const slotId = slots[availableIndex].id;
    const endsAt = Date.now() + refillSeconds * 1000;

    // mark cooldown immediately
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === slotId
          ? { ...slot, status: "cooldown", cooldownEndsAt: endsAt }
          : slot
      )
    );

    // schedule refill completion
    if (timeoutsRef.current[slotId]) {
      clearTimeout(timeoutsRef.current[slotId]);
    }

    timeoutsRef.current[slotId] = window.setTimeout(() => {
      setSlots((prev) =>
        prev.map((slot) =>
          slot.id === slotId ? { id: slot.id, status: "available" } : slot
        )
      );
    }, refillSeconds * 1000);

    setTotalCalls((c) => c + 1);
    return true;
  };

  return {
    slots,
    totalCalls,
    isRateLimited,
    consumeSlot,
    refillSeconds,
  };
}
