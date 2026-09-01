"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  /** Visual variant: "header" (compact pill) or "floating" (larger) */
  variant?: "header" | "floating";
}

export default function LanguageToggle({ variant = "header" }: Props) {
  const { lang, toggle } = useLanguage();

  if (variant === "floating") {
    return (
      <button
        onClick={toggle}
        aria-label={lang === "en" ? "Cambiar a Español" : "Switch to English"}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-card border border-border shadow-lg rounded-full px-4 py-2.5 text-sm font-semibold text-fg hover:bg-muted transition-colors"
      >
        <span className="text-base leading-none">{lang === "en" ? "🇲🇽" : "🇺🇸"}</span>
        <span>{lang === "en" ? "Español" : "English"}</span>
      </button>
    );
  }

  // Header variant — compact inline pill
  return (
    <button
      onClick={toggle}
      aria-label={lang === "en" ? "Cambiar a Español" : "Switch to English"}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold text-bg/70 hover:text-bg hover:bg-bg/10 transition-colors border border-bg/20"
    >
      <span className="leading-none">{lang === "en" ? "🇲🇽" : "🇺🇸"}</span>
      <span className="hidden sm:inline">{lang === "en" ? "ES" : "EN"}</span>
    </button>
  );
}
