import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import WeeklyAdClient from "@/components/weekly-ad/WeeklyAdClient";
import PushOptIn from "@/components/ui/PushOptIn";
import { getBusinessDate } from "@/lib/weekly-ad";

export const metadata: Metadata = {
  title: "Weekly Ad",
  description:
    "View this week's Junior's Supermarket deals. Great prices on meat, produce, dairy, bakery, and more. Valid while supplies last.",
};

export const revalidate = 1800;

export default async function WeeklyAdPage() {
  const supabase = await createClient();
  const today = getBusinessDate();

  const [{ data: currentAd, error: adError }, { data: specials, error }] = await Promise.all([
    supabase
      .from("weekly_ads")
      .select("*")
      .eq("is_active", true)
      .lte("valid_from", today)
      .gte("valid_to", today)
      .order("valid_from", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("specials")
      .select("*")
      .eq("is_active", true)
      .lte("valid_from", today)
      .gte("valid_to", today)
      .order("sort_order")
      .order("created_at", { ascending: false }),
  ]);

  if (error || adError) {
    console.error("Weekly ad fetch error:", error ?? adError);
  }

  const first = specials?.[0];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Junior's Supermarket Weekly Ad",
    description: "This week's grocery deals at Junior's Supermarket across the Rio Grande Valley.",
    url: "https://www.juniorssupermarket.com/weekly-ad",
    ...(first && {
      validFrom: first.valid_from,
      validThrough: first.valid_to,
    }),
    numberOfItems: (specials ?? []).length,
    itemListElement: (specials ?? []).slice(0, 10).map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Offer",
        name: s.title,
        price: s.price.replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
        category: s.category,
        seller: { "@type": "GroceryStore", name: "Junior's Supermarket" },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-max pt-4 pb-2 flex justify-end">
        <PushOptIn />
      </div>
      <WeeklyAdClient specials={specials ?? []} currentAd={currentAd ?? null} />
    </>
  );
}
