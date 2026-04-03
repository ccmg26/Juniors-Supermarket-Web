'use client'

import { useState, useEffect } from 'react'
import { submitContact, submitSuggestion } from '@/lib/actions'

type Tab = 'contact' | 'suggestions'

const STORES_LIST = [
  'Alton',
  'Edinburg Closner',
  'Edinburg University',
  'Hidalgo',
  'Penitas',
  'Pharr South Cage',
  'Pharr Veterans',
  'San Juan',
  'General / All Stores',
]

const SUGGESTION_CATEGORIES = [
  'Product Request',
  'Store Experience',
  'Pricing Feedback',
  'Staff Compliment',
  'Complaint',
  'Other',
]

export default function ContactClient() {
  const [tab, setTab] = useState<Tab>('contact')
  const [contactSent, setContactSent] = useState(false)

  useEffect(() => {
    if (window.location.hash === '#suggestions') {
      setTab('suggestions')
    }
  }, [])
  const [suggestionSent, setSuggestionSent] = useState(false)
  const [contactError, setContactError] = useState<string | null>(null)
  const [suggestionError, setSuggestionError] = useState<string | null>(null)

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setContactError(null)
    const fd = new FormData(e.currentTarget)
    const result = await submitContact(fd)
    if (result?.error) {
      setContactError(result.error)
    } else {
      setContactSent(true)
    }
  }

  async function handleSuggestionSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSuggestionError(null)
    const fd = new FormData(e.currentTarget)
    const result = await submitSuggestion(fd)
    if (result?.error) {
      setSuggestionError(result.error)
    } else {
      setSuggestionSent(true)
    }
  }

  return (
    <>
      {/* ── Page hero ─────────────────────────────────────────── */}
      <div className="bg-gray-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
            We&apos;re here to help
          </p>
          <h1 className="text-3xl font-black text-white mb-2">
            Contact Us
          </h1>
          <p className="text-gray-400 text-sm max-w-lg">
            Questions, feedback, or ideas — we love hearing from our community.
            Reach out any time.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* ── Quick contact strip ───────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            {
              icon:  '📞',
              title: '956-JUNIORS',
              sub:   'Call any store · 7 AM – 10 PM',
              href:  'tel:+19565864677',
              cta:   'Call Now',
              style: 'bg-red-600 hover:bg-red-500 text-white',
            },
            {
              icon:  '📍',
              title: '8 Locations',
              sub:   'Rio Grande Valley, Texas',
              href:  '/locations',
              cta:   'Find a Store',
              style: 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200',
            },
            {
              icon:  '🕐',
              title: 'Open Daily',
              sub:   '7:00 AM – 10:00 PM',
              href:  null,
              cta:   null,
              style: '',
            },
          ].map(({ icon, title, sub, href, cta, style }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
            >
              <div className="text-2xl mb-2">{icon}</div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">{title}</p>
              <p className="text-xs text-gray-500 mt-0.5 mb-3">{sub}</p>
              {href && cta && (
                <a
                  href={href}
                  className={`inline-flex text-xs font-bold px-4 py-2 rounded-lg transition-colors ${style}`}
                >
                  {cta}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* ── Tabs ──────────────────────────────────────────── */}
        <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-8">
          {([
            { id: 'contact',     label: '✉️ Send a Message'    },
            { id: 'suggestions', label: '💡 Share a Suggestion' },
          ] as { id: Tab; label: string }[]).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`
                flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150
                ${tab === id
                  ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Contact tab ───────────────────────────────────── */}
        {tab === 'contact' && (
          contactSent ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Message sent!
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                We&apos;ll get back to you within 1–2 business days.
              </p>
              <button
                onClick={() => setContactSent(false)}
                className="text-sm text-red-500 hover:text-red-400 font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleContactSubmit}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="First and last name"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Phone (Optional)
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="(956) 000-0000"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors resize-none"
                />
              </div>

              {contactError && (
                <p role="alert" className="text-sm text-red-500 text-center">{contactError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold py-3.5 rounded-xl text-sm transition-colors"
              >
                Send Message
              </button>

              <p className="text-xs text-gray-400 text-center">
                We typically respond within 1–2 business days.
              </p>
            </form>
          )
        )}

        {/* ── Suggestions tab ───────────────────────────────── */}
        <div id="suggestions" />
        {tab === 'suggestions' && (
          suggestionSent ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🙏</div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Thank you for your feedback!
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Your suggestion helps us make Junior&apos;s better for everyone in
                the Valley.
              </p>
              <button
                onClick={() => setSuggestionSent(false)}
                className="text-sm text-red-500 hover:text-red-400 font-medium"
              >
                Submit another suggestion
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSuggestionSubmit}
              className="flex flex-col gap-4"
            >
              {/* Intro */}
              <div className="rounded-2xl bg-amber-950/30 border border-amber-900/40 px-5 py-4">
                <p className="text-sm font-semibold text-amber-300 mb-1">
                  💡 Your voice shapes our stores
                </p>
                <p className="text-xs text-amber-200/60 leading-relaxed">
                  Product requests, ideas, concerns — we read every submission
                  and use your feedback to improve.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="First and last name"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              {/* Hidden type field required by schema */}
              <input type="hidden" name="type" value="Suggestion" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Store Location <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    name="preferred_location"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-red-500 transition-colors"
                  >
                    <option value="">Select a store…</option>
                    {STORES_LIST.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    name="category"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-red-500 transition-colors"
                  >
                    <option value="">Select a category…</option>
                    {SUGGESTION_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Your Suggestion <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Tell us your idea, request, or feedback…"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Attach a Photo (Optional)
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-100 dark:file:bg-gray-800 file:text-gray-700 dark:file:text-gray-300 hover:file:bg-gray-200 dark:hover:file:bg-gray-700"
                />
              </div>

              {suggestionError && (
                <p role="alert" className="text-sm text-red-500 text-center">{suggestionError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold py-3.5 rounded-xl text-sm transition-colors"
              >
                Submit Suggestion
              </button>
            </form>
          )
        )}

      </div>
    </>
  )
}
