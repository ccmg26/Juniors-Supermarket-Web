import type { Metadata } from "next";
import DepartmentPage from "@/components/DepartmentPage";

export const metadata: Metadata = {
  title: "Grocery Department",
  description: "Full grocery aisles at Junior's Supermarket – pantry staples, canned goods, snacks, beverages, and household essentials.",
};

export default function GroceryPage() {
  return (
    <DepartmentPage
      slug="grocery"
      icon="🛒"
      title="Grocery"
      description="Junior's full grocery aisles carry everything from pantry staples and canned goods to snacks, beverages, cleaning supplies, and household essentials. We stock both national brands and authentic Hispanic products you love."
      highlights={[
        "Pantry staples — rice, beans, pasta, and more",
        "Canned goods and dry goods in bulk",
        "Mexican and Hispanic specialty products",
        "Snacks, chips, and beverages",
        "Cleaning and household supplies",
        "Baby products and personal care items",
      ]}
    />
  );
}
