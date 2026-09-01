import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Junior's TV – Recipes, Tips & Behind the Scenes",
  description:
    "Watch Junior's Supermarket recipe videos, butcher tips, and weekly deal recaps. Follow us on YouTube, Instagram, TikTok, and Facebook for fresh content from The Real Meat People.",
  openGraph: {
    title: "Junior's TV | Junior's Supermarket",
    description:
      "Video recipes, butcher tips, and weekly deal recaps from The Real Meat People. Subscribe on YouTube and follow on Instagram and TikTok.",
  },
};

const SOCIAL_CHANNELS = [
  {
    platform: "YouTube",
    handle: "@juniorssupermarket",
    url: "https://www.youtube.com/@juniorssupermarket",
    icon: "▶",
    iconBg: "bg-[#FF0000]",
    cta: "Subscribe",
    desc: "Recipe videos, butcher tips, and weekly ad breakdowns. Subscribe to get notified when we drop new content.",
    stat: "Subscribe for free",
  },
  {
    platform: "Instagram",
    handle: "@juniorssupermarket_",
    url: "https://www.instagram.com/juniorssupermarket_",
    icon: "📸",
    iconBg: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
    cta: "Follow",
    desc: "Daily fresh specials, behind-the-counter shots, and community highlights. The easiest way to see what's fresh right now.",
    stat: "Daily posts",
  },
  {
    platform: "TikTok",
    handle: "@juniorssupermarket",
    url: "https://www.tiktok.com/@juniorssupermarket",
    icon: "♪",
    iconBg: "bg-black border border-gray-700",
    cta: "Follow",
    desc: "Short recipe demos, butcher techniques, and Valley food culture. Quick hits from The Real Meat People.",
    stat: "Short-form videos",
  },
  {
    platform: "Facebook",
    handle: "juniorssupermarket",
    url: "https://www.facebook.com/juniorssupermarket",
    icon: "f",
    iconBg: "bg-[#1877F2]",
    cta: "Like the Page",
    desc: "Weekly ad posts, store updates, events, and community conversations. The best place for deals and announcements.",
    stat: "Weekly ad posts",
  },
];

const CONTENT_TYPES = [
  {
    emoji: "🥩",
    title: "Carne Asada Masterclass",
    category: "Recipe",
    desc: "Our head butcher walks through the perfect marinade and cut for the Valley's best carne asada.",
    time: "~8 min",
  },
  {
    emoji: "🔪",
    title: "Butcher's Guide to Cuts",
    category: "Tips",
    desc: "What cut for what dish? Flank vs skirt, chuck vs brisket — plain-language breakdown.",
    time: "~6 min",
  },
  {
    emoji: "🌮",
    title: "Carnitas the Right Way",
    category: "Recipe",
    desc: "Pork shoulder rendered in its own fat until golden and crispy. No shortcuts, all flavor.",
    time: "~12 min",
  },
  {
    emoji: "📋",
    title: "This Week's Best Deals",
    category: "Weekly Ad",
    desc: "A quick walk-through of our top weekly specials and how to get the most from each cut.",
    time: "~4 min",
  },
  {
    emoji: "🫓",
    title: "Tamales from Scratch",
    category: "Recipe",
    desc: "Fresh masa, seasoned filling, the traditional steaming technique — end-to-end tamale guide.",
    time: "~20 min",
  },
  {
    emoji: "🍖",
    title: "BBQ Ribs — Low & Slow",
    category: "Recipe",
    desc: "Dry rub, foil wrap, 3-hour cook, finish on the grill. Fall-off-the-bone ribs for your next cookout.",
    time: "~10 min",
  },
];

const CATEGORY_STYLE: Record<string, string> = {
  Recipe:    "bg-red-900/60 text-red-300 border border-red-800",
  Tips:      "bg-blue-900/60 text-blue-300 border border-blue-800",
  "Weekly Ad": "bg-yellow-900/60 text-yellow-300 border border-yellow-800",
};

export default function VideosPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-gray-950 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 90% at 10% 50%, rgba(120,0,0,0.45) 0%, transparent 65%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <span className="h-px w-8 bg-red-500" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-widest">
                Junior&apos;s TV
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
              Real Recipes.
              <br />
              <span className="text-red-400">Real Meat.</span>
              <br />
              Real People.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              Recipe tutorials, butcher tips, and weekly deal recaps from The Real
              Meat People. New content dropping across all our channels — follow us
              so you never miss a thing.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.youtube.com/@juniorssupermarket"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF0000] hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors inline-flex items-center gap-2"
              >
                ▶ Subscribe on YouTube
              </a>
              <a
                href={BRAND.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                📸 Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── YouTube embed ─────────────────────────────────────── */}
      <section className="bg-gray-900 border-b border-gray-800 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
              Our Channel
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Watch on YouTube
            </h2>
            <p className="text-gray-400 max-w-xl">
              Subscribe to{" "}
              <a
                href="https://www.youtube.com/@juniorssupermarket"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 font-semibold"
              >
                @juniorssupermarket
              </a>{" "}
              and turn on notifications so you catch every new recipe and weekly deal breakdown.
            </p>
          </div>

          {/* YouTube channel embed */}
          <div className="rounded-2xl overflow-hidden border border-gray-800 mb-6" style={{ aspectRatio: "16/9", maxHeight: "500px" }}>
            <iframe
              src="https://www.youtube.com/embed?listType=user_uploads&list=juniorssupermarket&rel=0&modestbranding=1"
              title="Junior's Supermarket YouTube Channel"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.youtube.com/@juniorssupermarket"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF0000] hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors inline-flex items-center gap-2"
            >
              ▶ Open YouTube Channel
            </a>
            <a
              href="https://www.youtube.com/@juniorssupermarket?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              🔔 Subscribe &amp; Notify
            </a>
          </div>
        </div>
      </section>

      {/* ── Social channels ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="mb-10">
          <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-2">
            Follow Us Everywhere
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-3">
            Find us on every platform
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl">
            We post daily on Instagram and TikTok, weekly ad breakdowns on Facebook, and
            longer recipe videos on YouTube. Follow whichever platform you use most.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {SOCIAL_CHANNELS.map(({ platform, handle, url, icon, iconBg, cta, desc, stat }) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex gap-5 items-start hover:border-gray-300 dark:hover:border-gray-600 transition-colors group"
            >
              <div
                className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-black shrink-0`}
              >
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-black text-gray-900 dark:text-white">{platform}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">{handle}</span>
                  <span className="ml-auto text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full px-2 py-0.5 border border-gray-200 dark:border-gray-700 shrink-0">
                    {stat}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{desc}</p>
                <span className="text-sm font-bold text-red-600 dark:text-red-400 group-hover:underline">
                  {cta} →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Coming up content ─────────────────────────────────── */}
      <section className="bg-gray-950 border-t border-b border-gray-800 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
              Original Content
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Videos we&apos;re making
            </h2>
            <p className="text-gray-400 max-w-xl">
              Our butchers and kitchen team are putting together these episodes.
              Subscribe on YouTube to be the first to watch.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONTENT_TYPES.map((video) => (
              <div
                key={video.title}
                className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gray-800 flex flex-col items-center justify-center relative">
                  <span className="text-5xl">{video.emoji}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <span className="absolute bottom-2 right-2 text-xs bg-gray-900/90 text-gray-300 px-2 py-0.5 rounded font-mono">
                    {video.time}
                  </span>
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-lg">
                      ▶
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${CATEGORY_STYLE[video.category] ?? "bg-gray-800 text-gray-400"} inline-block mb-3`}>
                    {video.category}
                  </span>
                  <h3 className="font-black text-white text-sm leading-snug mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{video.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://www.youtube.com/@juniorssupermarket?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF0000] hover:bg-red-500 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors inline-flex items-center gap-2"
            >
              🔔 Subscribe — Don&apos;t Miss a Video
            </a>
          </div>
        </div>
      </section>

      {/* ── Read recipes now CTA ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 flex flex-col">
            <div className="text-4xl mb-4">🍽️</div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
              Can&apos;t wait for the video?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1">
              Every recipe in our video lineup is already available in written form.
              Full ingredient lists, step-by-step instructions, and butcher tips.
            </p>
            <Link
              href="/recipes"
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors text-center"
            >
              🥩 Browse Written Recipes
            </Link>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 flex flex-col">
            <div className="text-4xl mb-4">🔪</div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
              Learn the cuts first
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1">
              Before you watch the butcher videos, our visual cuts guide breaks down
              every beef, pork, and chicken cut — what it&apos;s best for and how to cook it.
            </p>
            <Link
              href="/departments/meat-market/cuts"
              className="bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold px-6 py-3 rounded-xl text-sm transition-colors text-center"
            >
              📖 Open Cuts Guide
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
