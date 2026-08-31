import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Junior's TV",
  description:
    "Watch Junior's Supermarket video recipes, butcher tips, weekly ad highlights, and behind-the-scenes content. Carne asada, BBQ, carnitas, and more.",
};

// Static video data — update YouTube IDs with real videos when available.
// IDs prefixed with "PL" are placeholder text shown instead of embeds when real IDs aren't set.
const VIDEOS = [
  {
    id: null,
    title: "How to Make Carne Asada",
    desc: "Our head butcher shows the perfect cut and marinade for the best carne asada in the Valley.",
    category: "Recipes",
    duration: "8 min",
  },
  {
    id: null,
    title: "BBQ Pork Ribs — Low & Slow",
    desc: "Step-by-step guide to tender, fall-off-the-bone pork ribs using our fresh-cut ribs.",
    category: "Recipes",
    duration: "12 min",
  },
  {
    id: null,
    title: "Butcher's Tips: Choosing the Right Cut",
    desc: "Not sure which cut to buy? Our butcher walks through beef, pork, and chicken in plain language.",
    category: "Butcher Tips",
    duration: "6 min",
  },
  {
    id: null,
    title: "This Week's Best Deals",
    desc: "A quick look at this week's freshest specials and what to cook with them.",
    category: "Weekly Deals",
    duration: "3 min",
  },
  {
    id: null,
    title: "How to Make Tamales at Home",
    desc: "Learn the classic masa and filling technique from our tortilleria team.",
    category: "Recipes",
    duration: "15 min",
  },
  {
    id: null,
    title: "Slow-Cooked Beef Barbacoa",
    desc: "The Sunday staple. Our butcher shares the secret to rich, tender barbacoa from beef cheeks.",
    category: "Recipes",
    duration: "10 min",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Recipes":       "bg-red-100 text-red-700",
  "Butcher Tips":  "bg-blue-100 text-blue-700",
  "Weekly Deals":  "bg-green-100 text-green-700",
};

export default function VideosPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-hero-pattern py-14 px-4">
        <div className="container-max">
          <div className="flex items-center gap-4 mt-3">
            <div className="text-5xl">📺</div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-brand-fg leading-tight">
                Junior&apos;s TV
              </h1>
              <p className="text-brand-fg/80 mt-1 text-base">
                Recipes, butcher tips, and behind-the-scenes from The Real Meat People.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-pad bg-accent">
        <div className="container-max">

          {/* Coming Soon Banner */}
          <div className="card p-6 sm:p-8 text-center mb-10 border-2 border-brand/20">
            <div className="text-5xl mb-4">🎬</div>
            <h2 className="font-black text-fg text-xl mb-2">Videos Coming Soon</h2>
            <p className="text-muted-fg max-w-md mx-auto text-sm leading-relaxed">
              We&apos;re putting together recipes, butcher tutorials, and weekly deal recaps.
              Subscribe to our social channels so you don&apos;t miss the first drop.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <a
                href="https://www.youtube.com/@juniorssupermarket"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                🎥 Subscribe on YouTube
              </a>
              <a
                href="https://www.instagram.com/juniorssupermarket_"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
              >
                📸 Follow on Instagram
              </a>
            </div>
          </div>

          {/* Upcoming videos preview */}
          <h2 className="text-xl font-black text-fg mb-1">Coming Up</h2>
          <p className="text-muted-fg text-sm mb-6">Videos we&apos;re working on — stay tuned.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {VIDEOS.map((video, i) => (
              <div key={i} className="card overflow-hidden flex flex-col">
                {/* Thumbnail placeholder */}
                <div className="aspect-video bg-gradient-to-br from-fg/90 to-brand/40 flex flex-col items-center justify-center relative">
                  <span className="text-5xl text-brand-fg/40">▶</span>
                  <span className="absolute bottom-2 right-2 text-xs bg-fg/80 text-brand-fg px-2 py-0.5 rounded font-mono">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      CATEGORY_COLORS[video.category] ?? "bg-muted text-muted-fg"
                    }`}>
                      {video.category}
                    </span>
                  </div>
                  <h3 className="font-black text-fg leading-snug">{video.title}</h3>
                  <p className="text-muted-fg text-sm leading-relaxed flex-1">{video.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="card p-6 text-center">
              <p className="text-3xl mb-3">🍽️</p>
              <h3 className="font-black text-fg mb-2">Try a Recipe Now</h3>
              <p className="text-muted-fg text-sm mb-4">
                Can&apos;t wait for the videos? Our written recipes are ready today.
              </p>
              <Link href="/recipes" className="btn-primary w-full">
                View Recipes
              </Link>
            </div>
            <div className="card p-6 text-center">
              <p className="text-3xl mb-3">🔪</p>
              <h3 className="font-black text-fg mb-2">Learn the Cuts</h3>
              <p className="text-muted-fg text-sm mb-4">
                Our visual cuts guide shows every beef, pork, and chicken cut and what to do with it.
              </p>
              <Link href="/departments/meat-market/cuts" className="btn-secondary w-full">
                Cuts Guide
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
