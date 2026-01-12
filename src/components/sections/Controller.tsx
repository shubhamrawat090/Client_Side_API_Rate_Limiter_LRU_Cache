import React from "react";

type ControllerProps = {
  onFetchRandom: () => void;
  isRateLimited: boolean;
};

const Controller = ({ onFetchRandom, isRateLimited }: ControllerProps) => {
  return (
    <div>
      <h3>Controller</h3>
      <button
        className="px-4 py-2 border border-gray-400 rounded-md text-sm hover:bg-gray-100 active:bg-gray-200 transition"
        onClick={onFetchRandom}
        disabled={isRateLimited}
      >
        Fetch Random
      </button>

      {isRateLimited && (
        <p style={{ marginTop: "8px" }}>Rate limit exceeded. Please wait.</p>
      )}
    </div>
  );
};

export default Controller;
