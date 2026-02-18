import type { Metadata } from "next";
import DepartmentPage from "@/components/DepartmentPage";

export const metadata: Metadata = {
  title: "Tortilleria",
  description: "Handmade fresh tortillas daily at Junior's Supermarket. Corn and flour tortillas made the traditional way.",
};

export default function TortilleriaPage() {
  return (
    <DepartmentPage
      slug="tortilleria"
      icon="🫓"
      title="Tortilleria"
      description="Our tortilleria makes handmade corn and flour tortillas fresh every single day — the traditional way. There's nothing like a warm tortilla straight from our press. Families across the Valley trust Junior's for the best tortillas around."
      highlights={[
        "Fresh corn tortillas made daily",
        "Fresh flour tortillas in multiple sizes",
        "Traditional stone-ground masa",
        "Available by the dozen or in bulk",
        "Hot off the press in the morning",
        "Masa and masa preparada also available",
      ]}
    />
  );
}
