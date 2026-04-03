import type { Metadata } from "next";
import DepartmentPage from "@/components/DepartmentPage";

export const metadata: Metadata = {
  title: "Restaurant",
  description: "Hot, ready-to-eat meals made fresh daily at Junior's Supermarket. Authentic Mexican and American dishes for breakfast, lunch, and dinner — affordable, fast, and perfect for the whole family. Dine-in at select RGV locations.",
};

export default function RestaurantPage() {
  return (
    <DepartmentPage
      slug="restaurant"
      icon="🍽️"
      title="Restaurant"
      description="Skip the cooking — our in-store restaurant serves hot, made-fresh meals perfect for the whole family. From breakfast to dinner, enjoy authentic flavors at affordable prices, all ready when you are."
      highlights={[
        "Hot meals prepared fresh daily",
        "Breakfast served in the mornings",
        "Lunch and dinner options all day",
        "Authentic Mexican and American dishes",
        "Perfect for quick family meals",
        "Dine-in available at select locations",
      ]}
    />
  );
}
