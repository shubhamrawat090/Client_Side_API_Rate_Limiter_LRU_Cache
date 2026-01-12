import React from "react";

export type CapacitySlot = {
  id: number;
  status: "available" | "cooldown";
  remainingTime?: number;
};

type CapacityWindowProps = {
  slots: CapacitySlot[];
  totalCalls: number;
};

const CapacityWindow = ({ slots, totalCalls }: CapacityWindowProps) => {
  return (
    <div>
      <h1>Capacity Window</h1>

      <div>
        <p>Availability Slots</p>
        {slots.map((slot) => (
          <div key={slot.id}>
            {slot.status == "available"
              ? "AVAILABLE"
              : `COOLDOWN ${slot.remainingTime}`}
          </div>
        ))}
      </div>

      <div>
        <p>Total Calls</p>
        <p>{totalCalls}</p>
      </div>
    </div>
  );
};

export default CapacityWindow;
