import type { ReactNode } from "react";

interface PageHeroProps {
  /** Small uppercase label above the title */
  eyebrow?: string;
  title: string;
  /** Plain text subtitle below the title — compute before JSX, pass as string */
  subtitle?: string;
  /** Left-align all text (default: centered) */
  align?: "left" | "center";
  /** Extra content rendered below subtitle (e.g. EbtBadge) */
  children?: ReactNode;
}

/**
 * Standard dark hero banner used at the top of every public page.
 *
 * Usage:
 *   <PageHero eyebrow="While Supplies Last" title="Weekly Specials"
 *     subtitle="Browse deals across all departments." />
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  align = "center",
  children,
}: PageHeroProps) {
  const alignClass = align === "left" ? "" : "text-center";
  const maxClass = align === "center" ? "mx-auto" : "";

  return (
    <div className="relative bg-fg overflow-hidden py-12 px-4">
      {/* Diagonal stripe texture — matches HeroSection */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.8) 35px, rgba(255,255,255,.8) 70px)",
        }}
        aria-hidden="true"
      />
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-brand opacity-70"
        aria-hidden="true"
      />

      <div className={`relative container-max ${alignClass}`}>
        {eyebrow && (
          <p className="text-bg/60 text-xs font-bold uppercase tracking-widest mb-2">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl sm:text-5xl font-black text-bg mb-3">{title}</h1>
        {subtitle && (
          <p className={`text-bg/80 text-lg max-w-xl ${maxClass}`}>{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
}
