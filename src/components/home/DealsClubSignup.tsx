"use client";

import { useState } from "react";
import { submitDealsClub } from "@/lib/actions";

const PERKS = [
  { icon: '📅', title: 'Early access every Tuesday',    sub: 'See deals before the ad drops Wednesday'    },
  { icon: '💸', title: 'Exclusive SMS coupons',         sub: 'Members-only discounts not in the weekly ad' },
  { icon: '🎉', title: 'Event announcements',           sub: 'BBQ season, Lent specials, holiday deals'    },
  { icon: '🥩', title: 'Meat market specials',          sub: 'Custom cut deals just for club members'      },
];

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
    <section id="deals-club" className="relative overflow-hidden bg-gray-950 py-14">

      {/* Decorative background text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03] select-none"
      >
        <span className="text-[140px] font-black text-white leading-none tracking-tighter">
          DEALS
        </span>
      </div>

      {/* Left red glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-72 h-72 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #991b1b, transparent 70%)', transform: 'translate(-30%, -30%)' }}
      />

      <div className="relative max-w-2xl mx-auto px-4 text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-900/60 rounded-full px-4 py-1.5 mb-5">
          <span className="text-red-400 text-xs font-bold uppercase tracking-widest">
            Exclusive Members
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
          Join the Deals Club
        </h2>
        <p className="text-gray-400 text-base mb-2">
          Get deals before they go public — straight to your phone or inbox.
        </p>

        {/* Social proof */}
        <p className="text-sm text-amber-400 font-semibold mb-8">
          🌟 Join 5,000+ Valley families already saving every week
        </p>

        {/* Perks grid */}
        <div className="grid grid-cols-2 gap-3 mb-8 text-left">
          {PERKS.map(({ icon, title, sub }) => (
            <div
              key={title}
              className="flex gap-3 bg-white/5 border border-white/10 rounded-xl p-3"
            >
              <span className="text-xl shrink-0 mt-0.5">{icon}</span>
              <div>
                <p className="text-sm font-semibold text-white leading-tight">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form / success state */}
        {status === "success" ? (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-white font-semibold text-lg">
            ✓ {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="deals-email" className="sr-only">Email address</label>
            <input
              id="deals-email"
              type="email"
              name="email"
              required
              placeholder="Your email address"
              className="
                w-full bg-white/10 border border-white/20 rounded-xl
                px-4 py-3.5 text-sm text-white placeholder-gray-500
                focus:outline-none focus:border-red-500 focus:bg-white/15
                transition-colors
              "
            />
            <label htmlFor="deals-phone" className="sr-only">Phone number (optional)</label>
            <input
              id="deals-phone"
              type="tel"
              name="phone"
              placeholder="Phone number (optional — for SMS deals)"
              className="
                w-full bg-white/10 border border-white/20 rounded-xl
                px-4 py-3.5 text-sm text-white placeholder-gray-500
                focus:outline-none focus:border-red-500 focus:bg-white/15
                transition-colors
              "
            />
            <button
              type="submit"
              className="
                w-full bg-red-600 hover:bg-red-500 active:bg-red-700
                text-white font-bold py-4 rounded-xl text-sm
                transition-colors shadow-lg shadow-red-900/40
              "
            >
              Sign Me Up — It&apos;s Free 🎁
            </button>
          </form>
        )}

        {status === "error" && (
          <p role="alert" className="text-red-400 text-sm mt-3">{message}</p>
        )}

        <p className="text-xs text-gray-600 mt-4">
          No spam. Unsubscribe anytime. SMS rates may apply.
        </p>

      </div>
    </section>
  );
}
