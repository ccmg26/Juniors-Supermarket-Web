import type { Metadata } from "next";
import DepartmentPage from "@/components/DepartmentPage";

export const metadata: Metadata = {
  title: "Produce",
  description: "Fresh fruits and vegetables at Junior's Supermarket — farm-fresh produce sourced locally and from trusted farms across the Rio Grande Valley. Herbs, chiles, seasonal items, and everyday staples at affordable prices.",
};

export default function ProducePage() {
  return (
    <DepartmentPage
      slug="produce"
      icon="🥦"
      title="Produce"
      description="Our produce department brings you the freshest fruits and vegetables, sourced locally and from trusted farms. From everyday staples to seasonal favorites, we keep our shelves stocked with quality produce your family will love."
      highlights={[
        "Fresh fruits and vegetables daily",
        "Locally sourced when available",
        "Seasonal produce and specialty items",
        "Competitive pricing on family staples",
        "Bulk produce options available",
        "Herbs, peppers, chiles, and aromatics",
      ]}
    />
  );
}
