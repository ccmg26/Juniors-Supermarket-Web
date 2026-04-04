import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Fresh Meat, Produce & Weekly Deals – Rio Grande Valley",
  description:
    "Junior's Supermarket — The Real Meat People. Fresh-cut meat, produce, bakery, tortilleria, and weekly deals at 8 locations across Edinburg, Pharr, San Juan, Hidalgo, Penitas, and Alton. Open daily 7 AM–10 PM. EBT & WIC accepted.",
  openGraph: {
    title: "Junior's Supermarket – Fresh Meat & Weekly Deals | Rio Grande Valley",
    description:
      "The Real Meat People. Fresh-cut meat, produce, bakery, tortilleria, and weekly deals at 8 locations across the Rio Grande Valley, TX. Open daily 7 AM–10 PM. EBT & WIC accepted.",
    url: "https://www.juniorssupermarket.com",
  },
  twitter: {
    title: "Junior's Supermarket – The Real Meat People",
    description:
      "Fresh meat, produce, bakery, and weekly deals across 8 Rio Grande Valley locations. Open daily 7 AM–10 PM. EBT & WIC accepted.",
  },
};

import HeroSection from "@/components/home/HeroSection";
import WeeklyAdPreview from "@/components/home/WeeklyAdPreview";
import TopDeals from "@/components/home/TopDeals";
import BrandStory from "@/components/home/BrandStory";
import StoreLocations from "@/components/home/StoreLocations";
import DepartmentsSection from "@/components/home/DepartmentsSection";
import EventsPreview from "@/components/home/EventsPreview";
import SocialFollowSection from "@/components/home/SocialFollowSection";
import DealsClubSignup from "@/components/home/DealsClubSignup";
import CallSection from "@/components/home/CallSection";

export const revalidate = 3600;

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: weeklyAd }, { data: specials }, { data: stores }, { data: events }] =
    await Promise.all([
      supabase
        .from("weekly_ads")
        .select("*")
        .eq("is_active", true)
        .order("valid_from", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("specials")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(8),
      supabase
        .from("stores")
        .select("*")
        .eq("is_active", true)
        .order("name"),
      supabase
        .from("events")
        .select("*")
        .eq("is_active", true)
        .order("start_date", { ascending: false })
        .limit(4),
    ]);

  const storeCount = (stores ?? []).length;
  const hasEvents = (events ?? []).length > 0;

  return (
    <>
      <HeroSection />
      <WeeklyAdPreview ad={weeklyAd} />
      <TopDeals specials={specials ?? []} />
      <BrandStory />
      <StoreLocations stores={stores ?? []} />
      <DepartmentsSection />
      {hasEvents && <EventsPreview events={events ?? []} />}
      <SocialFollowSection />
      <DealsClubSignup />
      <CallSection />
    </>
  );
}
