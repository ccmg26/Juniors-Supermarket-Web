"use client";

import { useState, useEffect } from "react";

type State = "idle" | "loading" | "subscribed" | "denied" | "unsupported";

function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const output = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    output[i] = rawData.charCodeAt(i);
  }
  return output.buffer;
}

export default function PushOptIn() {
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setState("unsupported");
      return;
    }
    if (Notification.permission === "denied") {
      setState("denied");
    } else if (Notification.permission === "granted") {
      // Check if already subscribed
      navigator.serviceWorker.ready.then((reg) =>
        reg.pushManager.getSubscription().then((sub) => {
          if (sub) setState("subscribed");
        })
      );
    }
  }, []);

  async function subscribe() {
    setState("loading");
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;

      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidKey) throw new Error("VAPID key not configured");

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      const json = sub.toJSON();
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: sub.endpoint,
          keys: { p256dh: json.keys?.p256dh, auth: json.keys?.auth },
        }),
      });

      setState("subscribed");
    } catch (err) {
      if (Notification.permission === "denied") {
        setState("denied");
      } else {
        setState("idle");
        console.error("Push subscribe error:", err);
      }
    }
  }

  async function unsubscribe() {
    setState("loading");
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch("/api/push/subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setState("idle");
    } catch {
      setState("subscribed");
    }
  }

  if (state === "unsupported") return null;

  return (
    <div className="flex items-center gap-3">
      {state === "subscribed" ? (
        <button
          onClick={unsubscribe}
          className="flex items-center gap-2 text-sm font-semibold text-muted-fg hover:text-fg transition-colors"
          aria-label="Turn off weekly ad push notifications"
        >
          <span className="text-base">🔔</span>
          <span>Notifications On</span>
          <span className="text-xs opacity-60">(tap to disable)</span>
        </button>
      ) : state === "denied" ? (
        <p className="text-xs text-muted-fg">
          Notifications blocked. Enable in browser settings.
        </p>
      ) : (
        <button
          onClick={subscribe}
          disabled={state === "loading"}
          className="flex items-center gap-2 text-sm font-semibold bg-brand text-brand-fg rounded-full px-4 py-2 hover:opacity-90 transition-opacity disabled:opacity-60"
          aria-label="Get push notifications for weekly ad drops"
        >
          <span className="text-base">🔔</span>
          {state === "loading" ? "Subscribing…" : "Notify Me of Deals"}
        </button>
      )}
    </div>
  );
}
