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
    <section className="section-pad bg-brand">
      <div className="container-max max-w-2xl text-center">
        <p className="text-brand-fg/80 text-xs font-bold uppercase tracking-widest mb-2">
          Exclusive Members
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-brand-fg mb-3">
          Join the Deals Club
        </h2>
        <p className="text-brand-fg/80 text-base mb-8">
          Get early access to weekly specials, exclusive coupons, and event announcements
          straight to your email and phone.
        </p>

        {status === "success" ? (
          <div className="bg-brand-fg/20 rounded-2xl p-6 text-brand-fg font-semibold text-lg">
            ✓ {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              name="email"
              required
              placeholder="Your email address"
              className="input-base flex-1 bg-brand-fg/10 border-brand-fg/30 text-brand-fg placeholder:text-brand-fg/60 focus:ring-brand-fg/50"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone (for SMS deals)"
              className="input-base sm:w-48 bg-brand-fg/10 border-brand-fg/30 text-brand-fg placeholder:text-brand-fg/60 focus:ring-brand-fg/50"
            />
            {/* btn-dark = bg-fg text-bg on red section = dark navy button with white text ✅ */}
            <button type="submit" className="btn-dark whitespace-nowrap">
              Sign Me Up
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-brand-fg/80 mt-3 text-sm">{message}</p>
        )}

        <p className="text-brand-fg/50 text-xs mt-4">
          No spam. Unsubscribe anytime. SMS rates may apply.
        </p>
      </div>
    </section>
  );
}
