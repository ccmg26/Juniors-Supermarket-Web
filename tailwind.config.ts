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
        brand: {
          red: "#B91C1C",
          "red-dark": "#7F1D1D",
          "red-light": "#DC2626",
          black: "#0A0A0A",
          white: "#FAFAFA",
          cream: "#FDF8F3",
          warm: "#F5EDE0",
          "warm-dark": "#E8D5BC",
          gray: "#6B7280",
          "gray-light": "#F3F4F6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "linear-gradient(135deg, #7F1D1D 0%, #B91C1C 50%, #0A0A0A 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
