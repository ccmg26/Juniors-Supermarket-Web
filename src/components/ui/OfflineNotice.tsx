"use client";

import { useEffect, useState } from "react";

export default function OfflineNotice() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!offline) return null;
  return (
    <div role="status" aria-live="polite" className="bg-amber-400 px-4 py-2 text-center text-sm font-semibold text-black">
      You are offline. Some current prices, forms, and store information may be unavailable.
    </div>
  );
}
