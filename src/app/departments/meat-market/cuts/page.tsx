import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Meat Cuts Guide",
  description:
    "Your complete guide to beef, pork, and chicken cuts at Junior's Supermarket. Learn which cut is best for carne asada, BBQ, soups, fajitas, and more.",
  openGraph: {
    title: "Meat Cuts Guide | Junior's Supermarket",
    description:
      "Beef, pork, and chicken cuts explained — which one to use for grilling, slow-cooking, fajitas, and more.",
  },
};

const BEEF_CUTS = [
  {
    name: "Flank Steak",
    best_for: "Carne Asada, Fajitas",
    cook: "Grill or sear — medium heat, 3–4 min/side",
    tip: "Always slice thin against the grain after resting.",
    icon: "🥩",
  },
  {
    name: "Skirt Steak",
    best_for: "Carne Asada, Tacos",
    cook: "Grill on high heat, 2–3 min/side",
    tip: "More flavorful than flank — our butchers' top pick for carne asada.",
    icon: "🥩",
  },
  {
    name: "Ribeye",
    best_for: "Grilling, Special Occasions",
    cook: "Grill or cast iron, 4–5 min/side for medium",
    tip: "Let it rest 5 minutes before cutting to keep the juices in.",
    icon: "🥩",
  },
  {
    name: "Chuck Roast",
    best_for: "Barbacoa, Pot Roast, Stews",
    cook: "Slow-cook or braise 3–4 hrs at low heat",
    tip: "The more you cook it, the more tender it gets. Perfect for barbacoa.",
    icon: "🥩",
  },
  {
    name: "Beef Cheeks (Cachete)",
    best_for: "Barbacoa",
    cook: "Slow-cook or braise 4–5 hrs",
    tip: "The traditional cut for Sunday barbacoa — ask our butchers if it's in stock.",
    icon: "🥩",
  },
  {
    name: "Brisket",
    best_for: "Smoking, BBQ, Slow Cook",
    cook: "Smoke at 225°F for 10–14 hrs",
    tip: "Rest at least 1 hour wrapped in butcher paper before slicing.",
    icon: "🥩",
  },
  {
    name: "Ground Beef",
    best_for: "Burgers, Picadillo, Tacos, Spaghetti",
    cook: "Pan-fry over medium-high, 8–10 min",
    tip: "Ground fresh daily at Junior's — no fillers, just beef.",
    icon: "🥩",
  },
  {
    name: "Short Ribs (Costillas)",
    best_for: "Grilling, Braising, BBQ",
    cook: "Grill on medium, or braise 2–3 hrs",
    tip: "Flanken-cut short ribs are perfect for carne asada-style cooking.",
    icon: "🥩",
  },
  {
    name: "T-Bone / Porterhouse",
    best_for: "Grilling",
    cook: "Grill on high heat, 4–5 min/side",
    tip: "You get strip steak on one side and tenderloin on the other.",
    icon: "🥩",
  },
];

const PORK_CUTS = [
  {
    name: "Pork Shoulder (Paleta)",
    best_for: "Carnitas, Pulled Pork, Stews",
    cook: "Slow-cook 3–4 hrs or braise until fork-tender",
    tip: "Bone-in gives the richest flavor. Ask for it cut into 3-inch chunks for carnitas.",
    icon: "🍖",
  },
  {
    name: "Pork Ribs (Costillas de Puerco)",
    best_for: "BBQ, Grilling, Braising",
    cook: "Low-and-slow: 300°F oven for 2.5–3 hrs or grill 45–60 min",
    tip: "Remove the membrane from the back before seasoning for more tender ribs.",
    icon: "🍖",
  },
  {
    name: "Pork Loin",
    best_for: "Roasting, Slicing, Stuffed Pork",
    cook: "Roast at 350°F to internal temp 145°F",
    tip: "Easy to overcook — use a meat thermometer.",
    icon: "🍖",
  },
  {
    name: "Pork Chops (Chuletas)",
    best_for: "Pan-fry, Grill, Baking",
    cook: "Pan-fry or grill 4–5 min/side over medium-high",
    tip: "Bone-in chops stay juicier on the grill.",
    icon: "🍖",
  },
  {
    name: "Ground Pork",
    best_for: "Chorizo, Meatballs, Stuffings",
    cook: "Pan-fry over medium, 8–10 min",
    tip: "Mix 50/50 with ground beef for the best burger or meatball blend.",
    icon: "🍖",
  },
  {
    name: "Pork Belly (Tocino)",
    best_for: "Chicharrones, Slow Roasting, Tacos",
    cook: "Roast at 450°F 30 min then low heat 2 hrs for crispy skin",
    tip: "Score the skin in a crosshatch before roasting to get crispy chicharrón effect.",
    icon: "🍖",
  },
];

const CHICKEN_CUTS = [
  {
    name: "Whole Chicken",
    best_for: "Roasting, Caldo de Pollo, Grilling",
    cook: "Roast at 425°F for 1 hr (4–5 lb bird)",
    tip: "Butterflied (spatchcock) whole chicken cooks in half the time on the grill.",
    icon: "🍗",
  },
  {
    name: "Chicken Thighs (Muslos)",
    best_for: "Grilling, Frying, Stewing, Fajitas",
    cook: "Grill 6–8 min/side or bake 400°F for 25–30 min",
    tip: "Bone-in, skin-on thighs are the most forgiving cut — hard to dry out.",
    icon: "🍗",
  },
  {
    name: "Chicken Breast",
    best_for: "Grilling, Salads, Sandwiches, Low-Cal Meals",
    cook: "Grill or bake to 165°F internal temp — 6 min/side on medium-high",
    tip: "Pound breasts even thickness so they cook evenly. Don't overcook!",
    icon: "🍗",
  },
  {
    name: "Chicken Legs (Piernas)",
    best_for: "Grilling, Baking, Pollo Asado",
    cook: "Grill on medium-low 20–25 min, turning every 5 min",
    tip: "Perfect for pollo asado — marinate in citrus and achiote overnight.",
    icon: "🍗",
  },
  {
    name: "Chicken Wings (Alitas)",
    best_for: "Frying, BBQ Wings, Baking",
    cook: "Fry at 375°F for 8–10 min or bake at 425°F for 45 min",
    tip: "Pat dry before cooking — moisture is the enemy of crispy wings.",
    icon: "🍗",
  },
];

const COOKING_METHODS = [
  { method: "High-Heat Grill", emoji: "🔥", cuts: "Carne asada, skirt steak, chicken thighs, pork chops" },
  { method: "Low & Slow", emoji: "⏱", cuts: "Chuck roast, beef cheeks, brisket, pork ribs, pork shoulder" },
  { method: "Pan Sear / Stovetop", emoji: "🍳", cuts: "Ribeye, NY strip, ground beef/pork, chicken breast" },
  { method: "Braise / Stew", emoji: "🥘", cuts: "Beef chuck, short ribs, pork shoulder, chicken legs" },
  { method: "Deep Fry", emoji: "🫕", cuts: "Chicken wings, pork belly, milanesa" },
  { method: "Smoke / BBQ Pit", emoji: "💨", cuts: "Brisket, whole pork shoulder, ribs (all types)" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Complete Meat Cuts Guide — Beef, Pork & Chicken",
  description:
    "Your guide to every cut of beef, pork, and chicken — what each one is best for and how to cook it perfectly.",
  publisher: {
    "@type": "Organization",
    name: "Junior's Supermarket",
    url: "https://www.juniorssupermarket.com",
    logo: "https://www.juniorssupermarket.com/logo.png",
  },
  url: "https://www.juniorssupermarket.com/departments/meat-market/cuts",
};

export default function MeatCutsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="bg-hero-pattern py-14 px-4">
        <div className="container-max">
          <Link
            href="/departments/meat-market"
            className="text-brand-fg/70 hover:text-brand-fg text-sm mb-4 inline-flex items-center gap-1 transition-colors"
          >
            ← Meat Market
          </Link>
          <div className="flex items-start gap-4 mt-3">
            <div className="text-5xl">🔪</div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-fg leading-tight">
                Meat Cuts Guide
              </h1>
              <p className="text-brand-fg/80 mt-2 text-base max-w-xl">
                Every cut explained — what it&apos;s best for, how to cook it, and the
                pro tips our butchers swear by.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-pad bg-accent">
        <div className="container-max space-y-14">

          {/* Quick Find by Method */}
          <section>
            <h2 className="text-xl font-black text-fg mb-1">Find by Cooking Method</h2>
            <p className="text-muted-fg text-sm mb-5">
              Know how you want to cook it? Start here.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {COOKING_METHODS.map((m) => (
                <div key={m.method} className="card p-4 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{m.emoji}</span>
                  <div>
                    <p className="font-bold text-fg text-sm">{m.method}</p>
                    <p className="text-muted-fg text-xs mt-1 leading-relaxed">{m.cuts}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Beef */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-xl flex-shrink-0">🐄</div>
              <div>
                <h2 className="text-xl font-black text-fg">Beef Cuts</h2>
                <p className="text-muted-fg text-sm">Ground fresh daily · USDA-grade · Custom orders welcome</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BEEF_CUTS.map((cut) => (
                <CutCard key={cut.name} cut={cut} />
              ))}
            </div>
          </section>

          {/* Pork */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-xl flex-shrink-0">🐷</div>
              <div>
                <h2 className="text-xl font-black text-fg">Pork Cuts</h2>
                <p className="text-muted-fg text-sm">From carnitas to BBQ ribs — always fresh</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PORK_CUTS.map((cut) => (
                <CutCard key={cut.name} cut={cut} />
              ))}
            </div>
          </section>

          {/* Chicken */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-xl flex-shrink-0">🐔</div>
              <div>
                <h2 className="text-xl font-black text-fg">Chicken Cuts</h2>
                <p className="text-muted-fg text-sm">Whole or parts — seasoned or plain, your choice</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CHICKEN_CUTS.map((cut) => (
                <CutCard key={cut.name} cut={cut} />
              ))}
            </div>
          </section>

          {/* CTAs */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="card p-6 text-center">
              <p className="text-3xl mb-3">📍</p>
              <h3 className="font-black text-fg mb-2">Visit a Store</h3>
              <p className="text-muted-fg text-sm mb-4">Our butchers are in every store, ready to cut exactly what you need.</p>
              <Link href="/locations" className="btn-primary w-full text-sm">Find a Store</Link>
            </div>
            <div className="card p-6 text-center">
              <p className="text-3xl mb-3">🍽️</p>
              <h3 className="font-black text-fg mb-2">Get Inspired</h3>
              <p className="text-muted-fg text-sm mb-4">See our recipes for carne asada, carnitas, BBQ ribs, and more.</p>
              <Link href="/recipes" className="btn-secondary w-full text-sm">View Recipes</Link>
            </div>
            <div className="card p-6 bg-fg text-center">
              <p className="text-3xl mb-3">🎉</p>
              <h3 className="font-black text-bg mb-2">Catering an Event?</h3>
              <p className="text-bg/70 text-sm mb-4">Bulk orders for any size. Quinceañeras, BBQs, weddings, and more.</p>
              <Link href="/catering" className="btn-primary w-full text-sm">Request a Quote</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

function CutCard({
  cut,
}: {
  cut: {
    name: string;
    best_for: string;
    cook: string;
    tip: string;
    icon: string;
  };
}) {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xl">{cut.icon}</span>
        <h3 className="font-black text-fg">{cut.name}</h3>
      </div>
      <div>
        <p className="text-xs font-bold text-brand uppercase tracking-wide mb-0.5">Best For</p>
        <p className="text-sm text-fg">{cut.best_for}</p>
      </div>
      <div>
        <p className="text-xs font-bold text-muted-fg uppercase tracking-wide mb-0.5">How to Cook</p>
        <p className="text-sm text-muted-fg">{cut.cook}</p>
      </div>
      <div className="mt-auto pt-2 border-t border-border">
        <p className="text-xs text-muted-fg">
          <span className="font-semibold text-fg">Tip:</span> {cut.tip}
        </p>
      </div>
    </div>
  );
}
