import type { Metadata } from "next";
import DepartmentPage from "@/components/DepartmentPage";

export const metadata: Metadata = {
  title: "Bakery",
  description: "Fresh-baked goods daily at Junior's Supermarket – pan dulce, bread, cakes, and pastries.",
};

export default function BakeryPage() {
  return (
    <DepartmentPage
      slug="bakery"
      icon="🥖"
      title="Bakery"
      description="Our bakery fills the store with the warm aroma of fresh-baked goods every morning. From traditional pan dulce to fresh-baked breads, custom cakes, and seasonal pastries — everything is made with care right in our store."
      highlights={[
        "Pan dulce baked fresh daily",
        "Bolillos and Mexican bread varieties",
        "Custom birthday and celebration cakes",
        "Seasonal pastries and sweet breads",
        "Tres leches and specialty cakes",
        "Bulk options for events and parties",
      ]}
    />
  );
}
