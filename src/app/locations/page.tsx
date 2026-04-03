import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import LocationsClient from "@/components/locations/LocationsClient";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find your nearest Junior's Supermarket across the Rio Grande Valley. 8 locations in Alton, Edinburg, Hidalgo, Penitas, Pharr, and San Juan. Open daily 7 AM–10 PM. EBT & WIC accepted.",
};

export const revalidate = 3600;

export default async function LocationsPage() {
  const supabase = await createClient();
  const { data: stores } = await supabase
    .from("stores")
    .select("*")
    .eq("is_active", true)
    .order("name");

  return <LocationsClient stores={stores ?? []} />;
}
