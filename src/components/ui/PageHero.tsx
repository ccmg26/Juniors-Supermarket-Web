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
    <div className="bg-fg py-12 px-4">
      <div className={`container-max ${alignClass}`}>
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
