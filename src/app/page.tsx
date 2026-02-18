import { createClient } from "@/lib/supabase/server";
import HeroSection from "@/components/home/HeroSection";
import WeeklyAdPreview from "@/components/home/WeeklyAdPreview";
import TopDeals from "@/components/home/TopDeals";
import StoreLocations from "@/components/home/StoreLocations";
import DepartmentsSection from "@/components/home/DepartmentsSection";
import EventsPreview from "@/components/home/EventsPreview";
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

  return (
    <>
      <HeroSection />
      <WeeklyAdPreview ad={weeklyAd} />
      <TopDeals specials={specials ?? []} />
      <StoreLocations stores={stores ?? []} />
      <DepartmentsSection />
      <EventsPreview events={events ?? []} />
      <DealsClubSignup />
      <CallSection />
    </>
  );
}
