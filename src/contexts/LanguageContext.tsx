"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Lang } from "@/lib/translations";

const STORAGE_KEY = "juniors-lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  // Read from localStorage on mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "es" || stored === "en") {
        setLangState(stored);
      }
    } catch {
      // localStorage unavailable (private mode, etc.) — stay English
    }
    setMounted(true);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "es" : "en");
  }, [lang, setLang]);

  // Suppress hydration mismatch: render children with `en` on server,
  // then after mount the client can switch. Wrap in a span with lang attr.
  return (
    <LanguageContext.Provider value={{ lang: mounted ? lang : "en", setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
