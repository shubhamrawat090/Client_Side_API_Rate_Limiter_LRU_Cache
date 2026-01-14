export default function Header() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-emerald-400 sm:text-6xl">
        API RATE LIMITER
      </h1>

      <p className="mt-3 text-sm text-slate-300 sm:text-base">
        A visual demonstration of{" "}
        <span className="font-semibold text-emerald-300">Auto-Refilling</span>{" "}
        capacity slots and{" "}
        <span className="font-semibold text-emerald-300">LRU Persistence</span>.
      </p>
    </div>
  );
}
