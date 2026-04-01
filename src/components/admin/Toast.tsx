"use client";

import { useEffect, useState } from "react";

interface Props {
  message: string;
  type?: "success" | "error";
  /** Auto-dismiss after ms. 0 = no auto-dismiss. Default: 4000 */
  duration?: number;
  onDismiss?: () => void;
}

export default function Toast({ message, type = "success", duration = 4000, onDismiss }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration === 0) return;
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onDismiss]);

  if (!visible) return null;

  const styles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error:   "bg-red-50   border-red-200   text-red-700",
  };
  const icon = type === "success" ? "✓" : "✕";
  const iconStyle = type === "success"
    ? "bg-green-200 text-green-800"
    : "bg-red-200 text-red-700";

  return (
    <div className={`flex items-start gap-3 border rounded-xl px-4 py-3 ${styles[type]}`}>
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${iconStyle}`}>
        {icon}
      </span>
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        type="button"
        onClick={() => { setVisible(false); onDismiss?.(); }}
        className="opacity-50 hover:opacity-100 text-sm leading-none mt-0.5"
      >
        ✕
      </button>
    </div>
  );
}
