"use client";

/**
 * Inline translation island — renders the correct string based on the
 * user's language preference. Use inside any server component to create
 * a client-side translated text node without converting the whole page.
 *
 * Usage:
 *   import { T } from "@/components/T";
 *   <h1><T en="Meat Market" es="Carnicería" /></h1>
 */

import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  en: string;
  es: string;
}

export function T({ en, es }: Props) {
  const { lang } = useLanguage();
  return <>{lang === "es" ? es : en}</>;
}
