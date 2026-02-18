import type { Metadata } from "next";
import DepartmentPage from "@/components/DepartmentPage";

export const metadata: Metadata = {
  title: "Deli Cuts",
  description: "Premium deli meats and cheeses at Junior's Supermarket – sliced fresh to order.",
};

export default function DeliCutsPage() {
  return (
    <DepartmentPage
      slug="deli-cuts"
      icon="🍖"
      title="Deli Cuts"
      description="Our deli counter offers premium sliced meats and cheeses, cut fresh to your order. From turkey and ham to specialty cured meats and imported cheeses, our deli has something for every taste."
      highlights={[
        "Fresh-sliced deli meats — turkey, ham, bologna, and more",
        "Premium cheese selection — American, Swiss, Provolone, and specialty",
        "Custom thickness slicing available",
        "Pre-packaged options for convenience",
        "Party platters available on request",
        "Competitive pricing on bulk orders",
      ]}
    />
  );
}
