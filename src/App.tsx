import Header from "./components/layout/Header";
import CapacityWindow, {
  type CapacitySlot,
} from "./components/sections/CapacityWindow";
import Controller from "./components/sections/Controller";
import LRUCacheView from "./components/sections/LRUStorageView";

function App() {
  // Dummy Data
  const slots: CapacitySlot[] = [
    { id: 1, status: "available" },
    { id: 2, status: "cooldown", remainingTime: 3 },
    { id: 3, status: "available" },
  ];

  const totalCalls = 7;

  const isRateLimited = false;
  const handleFetchRandom = () => {
    alert("Fetch triggered from APP");
  };

  const cacheItems = [
    { key: "1", label: "Todo 1", isMRU: true, isLRU: false },
    { key: "2", label: "Todo 2", isMRU: false, isLRU: false },
    { key: "3", label: "Todo 3", isMRU: false, isLRU: true },
  ];

  return (
    <div>
      <Header />
      <hr />
      <Controller
        onFetchRandom={handleFetchRandom}
        isRateLimited={isRateLimited}
      />
      <hr />
      <CapacityWindow slots={slots} totalCalls={totalCalls} />
      <hr />
      <LRUCacheView items={cacheItems} maxSize={5} />
    </div>
  );
}

export default App;
