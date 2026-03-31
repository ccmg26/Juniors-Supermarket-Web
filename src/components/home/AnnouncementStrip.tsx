import Link from "next/link";
import type { WeeklyAd } from "@/types";

interface Props {
  ad: WeeklyAd | null;
}

/**
 * Slim top strip above the hero.
 * When a weekly ad is active it shows a live CTA; otherwise it shows
 * evergreen info so the strip is never empty or placeholder-feeling.
 *
 * To update the evergreen copy, edit the text in the else-branch below.
 */
export default function AnnouncementStrip({ ad }: Props) {
  return (
    <div className="bg-accent border-b border-fg/8">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-3 sm:gap-5 flex-wrap text-sm text-center">
        {ad ? (
          <>
            <span className="text-fg/70 font-medium">
              🏷️ <span className="font-semibold text-fg">{ad.title}</span> — deals are live now
            </span>
            <span className="hidden sm:block text-fg/20">·</span>
            <Link href="/weekly-ad" className="font-bold text-brand hover:underline whitespace-nowrap">
              View This Week&apos;s Ad →
            </Link>
          </>
        ) : (
          <>
            <span className="text-fg/70">
              🥩 New deals added every Wednesday across all 8 locations
            </span>
            <span className="hidden sm:block text-fg/20">·</span>
            <Link href="/specials" className="font-bold text-brand hover:underline whitespace-nowrap">
              Browse Specials →
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
