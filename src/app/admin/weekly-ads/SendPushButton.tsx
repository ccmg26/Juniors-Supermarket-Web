"use client";

import { useState } from "react";

export default function SendPushButton() {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function handleSend() {
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Junior's Weekly Ad is Live! 🔥",
          body: "New deals this week — fresh meat, produce, bakery & more. Tap to browse!",
          url: "/weekly-ad",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(`Sent to ${data.sent} subscriber${data.sent !== 1 ? "s" : ""}.${data.failed > 0 ? ` (${data.failed} failed)` : ""}`);
      } else {
        setResult(data.error ?? "Failed to send.");
      }
    } catch {
      setResult("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleSend}
        disabled={sending}
        className="btn-secondary text-sm disabled:opacity-60"
        title="Send a push notification to all opted-in subscribers"
      >
        {sending ? "Sending…" : "🔔 Send Push"}
      </button>
      {result && (
        <p className="text-xs text-muted-fg">{result}</p>
      )}
    </div>
  );
}
