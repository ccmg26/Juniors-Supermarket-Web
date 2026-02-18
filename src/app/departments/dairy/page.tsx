import type { Metadata } from "next";
import DepartmentPage from "@/components/DepartmentPage";

export const metadata: Metadata = {
  title: "Dairy Department",
  description: "Fresh dairy products at Junior's Supermarket – milk, eggs, cheese, yogurt, and more at great prices.",
};

export default function DairyPage() {
  return (
    <DepartmentPage
      slug="dairy"
      icon="🥛"
      title="Dairy"
      description="Our dairy section is stocked with everything your household needs — from whole milk and butter to a wide selection of cheeses, yogurts, and eggs. Fresh, cold, and always at competitive prices."
      highlights={[
        "Fresh milk — whole, 2%, skim, and lactose-free",
        "Wide selection of cheeses — shredded, sliced, and block",
        "Fresh eggs — large, extra-large, and organic options",
        "Yogurt — single serve and family size",
        "Butter, cream, sour cream, and more",
        "Mexican cremas and specialty dairy products",
      ]}
    />
  );
}
