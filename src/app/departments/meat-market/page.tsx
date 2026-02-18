import type { Metadata } from "next";
import DepartmentPage from "@/components/DepartmentPage";

export const metadata: Metadata = {
  title: "Meat Market",
  description: "Junior's Supermarket Meat Market – Fresh USDA-grade cuts, custom butcher orders, beef, pork, chicken, and more. The Real Meat People.",
};

export default function MeatMarketPage() {
  return (
    <DepartmentPage
      slug="meat-market"
      icon="🥩"
      title="Meat Market"
      description="At Junior's, we are The Real Meat People. Our meat market offers the freshest USDA-grade cuts, custom butcher orders, and an unmatched selection of beef, pork, chicken, and specialty meats. Every cut is handled with care by our experienced butchers."
      highlights={[
        "Fresh USDA-grade beef, pork, and chicken",
        "Custom butcher orders available",
        "Marinated meats and carne asada ready to cook",
        "Specialty cuts on request",
        "Ground beef ground fresh daily",
        "Family packs and bulk pricing available",
      ]}
    />
  );
}
