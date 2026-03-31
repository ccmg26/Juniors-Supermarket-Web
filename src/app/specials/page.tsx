import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import PageHero from "@/components/ui/PageHero";
import SpecialsClient from "./SpecialsClient";

export const metadata: Metadata = {
  title: "Weekly Specials",
  description: "Browse this week's specials at Junior's Supermarket. Filter by category: Meat, Produce, Dairy, Bakery, and more. While supplies last.",
};

export const revalidate = 3600;

export default async function SpecialsPage() {
  const supabase = await createClient();

  const { data: specials } = await supabase
    .from("specials")
    .select("*")
    .eq("is_active", true)
    .order("category")
    .order("created_at", { ascending: false });

  return (
    <div>
      <PageHero
        eyebrow="While Supplies Last"
        title="Weekly Specials"
        subtitle="Browse deals across all departments. Filter by category to find exactly what you need."
      />

      <SpecialsClient specials={specials ?? []} />
    </div>
  );
}
