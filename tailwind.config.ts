import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Semantic tokens (CSS variable–backed) ────────────
           Preferred classes:
             bg-bg / text-fg           page canvas / body text
             bg-muted / text-muted-fg  subdued surfaces / muted copy
             bg-card / text-card-fg    card surfaces
             bg-accent / text-accent-fg warm accent sections
             bg-brand / text-brand-fg  CTA / brand elements
             border-border             universal border
        ──────────────────────────────────────────────────── */
        bg:     "hsl(var(--bg))",
        fg:     "hsl(var(--fg))",

        muted: {
          DEFAULT: "hsl(var(--muted))",
          fg:      "hsl(var(--muted-fg))",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          fg:      "hsl(var(--card-fg))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          fg:      "hsl(var(--accent-fg))",
        },

        border: "hsl(var(--border))",

        /* ── Brand palette ──────────────────────────────────── */
        brand: {
          DEFAULT:    "hsl(var(--brand))",   /* bg-brand  = brand red  */
          fg:         "hsl(var(--brand-fg))", /* text-brand-fg = white  */
          /* Legacy hardcoded values — prefer semantic tokens above */
          red:        "#B91C1C",
          "red-dark": "#7F1D1D",
          "red-light":"#DC2626",
          yellow:     "hsl(var(--brand-yellow))", /* #FFE100 accent gold */
          black:      "#0F172A",             /* updated to match --fg  */
          white:      "#FAFAFA",
          cream:      "#F5EDE0",             /* matches --accent       */
          warm:       "#F5EDE0",
          "warm-dark":"#E8D5BC",
          /* Darkened from #6B7280 for WCAG AA compliance:
               on white #FFFFFF : 7.0:1 ✅ */
          gray:       "#4B5563",
          "gray-light":"#F3F4F6",
        },
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(135deg, #7F1D1D 0%, #B91C1C 50%, #0F172A 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
