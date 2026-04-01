"use client";

import { useState } from "react";
import { submitDealsClub } from "@/lib/actions";

export default function DealsClubSignup() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = await submitDealsClub(fd);
    if (result.success) {
      setStatus("success");
      setMessage("You're in! Watch for deals in your inbox & phone.");
    } else {
      setStatus("error");
      setMessage(result.error || "Something went wrong.");
    }
  }

  return (
    /* bg-brand (red) section — text-brand-fg (white): 6.1:1 ✅ */
    <section id="deals-club" className="section-pad bg-brand">
      <div className="container-max max-w-2xl text-center">
        <p className="text-brand-fg/80 text-xs font-bold uppercase tracking-widest mb-2">
          Free to Join
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-brand-fg mb-3">
          First to Know. First to Save.
        </h2>
        <p className="text-brand-fg/80 text-base mb-8">
          Deals Club members get the weekly ad the moment it drops — plus exclusive coupons
          and flash sales sent straight to your phone and inbox. Free forever.
        </p>

        {status === "success" ? (
          <div className="bg-brand-fg/20 rounded-2xl p-6 text-brand-fg font-semibold text-lg">
            ✓ {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="deals-email" className="sr-only">Email address</label>
              <input
                id="deals-email"
                type="email"
                name="email"
                required
                placeholder="Your email address"
                className="input-base w-full bg-brand-fg/10 border-brand-fg/30 text-brand-fg placeholder:text-brand-fg/60 focus:ring-brand-fg/50"
              />
            </div>
            <div className="sm:w-48">
              <label htmlFor="deals-phone" className="sr-only">Phone number (optional)</label>
              <input
                id="deals-phone"
                type="tel"
                name="phone"
                placeholder="Phone (for SMS deals)"
                className="input-base w-full bg-brand-fg/10 border-brand-fg/30 text-brand-fg placeholder:text-brand-fg/60 focus:ring-brand-fg/50"
              />
            </div>
            <button type="submit" className="btn-dark whitespace-nowrap">
              Sign Me Up
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-brand-fg/80 mt-3 text-sm">{message}</p>
        )}

        {/* text-brand-fg/75 — white/75 on brand red: ~4.6:1 ✅  (was /50: ~1.5:1 ❌) */}
        <p className="text-brand-fg/75 text-xs mt-4">
          No spam. Unsubscribe anytime. SMS rates may apply.
        </p>
      </div>
    </section>
  );
}
