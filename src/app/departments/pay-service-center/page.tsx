import type { Metadata } from "next";
import DepartmentPage from "@/components/DepartmentPage";

export const metadata: Metadata = {
  title: "Pay & Service Center",
  description: "Money orders, bill pay, wire transfers, and more at Junior's Supermarket Pay & Service Center.",
};

export default function PayServiceCenterPage() {
  return (
    <DepartmentPage
      slug="pay-service-center"
      icon="💳"
      title="Pay & Service Center"
      description="Our Pay & Service Center offers a convenient range of financial and community services, so you can take care of business while you shop. No need to make an extra stop — we've got you covered."
      highlights={[
        "Money orders available",
        "Bill payment services",
        "Wire transfers (domestic and international)",
        "Prepaid phone cards and top-ups",
        "Lottery tickets available",
        "Check cashing at select locations",
      ]}
    />
  );
}
