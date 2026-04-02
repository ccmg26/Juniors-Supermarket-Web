import type { Metadata } from "next";
import LocationsClient from "@/components/locations/LocationsClient";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find your nearest Junior's Supermarket across the Rio Grande Valley. 8 locations in Alton, Edinburg, Hidalgo, Penitas, Pharr, and San Juan. Open daily 7 AM–10 PM. EBT & WIC accepted.",
};

export default function LocationsPage() {
  return <LocationsClient />;
}
