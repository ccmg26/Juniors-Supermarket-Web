import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
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
      {/* Hero — dark section (bg-fg text-bg) */}
      <div className="bg-fg py-12 px-4">
        <div className="container-max text-center">
          {/* text-bg/60 — white/60 on dark navy: readable ✅ */}
          <p className="text-bg/60 text-xs font-bold uppercase tracking-widest mb-2">
            While Supplies Last
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-bg mb-3">Weekly Specials</h1>
          {/* text-bg/80 — white/80 on dark navy: strong contrast ✅ */}
          <p className="text-bg/80 text-lg max-w-xl mx-auto">
            Browse deals across all departments. Filter by category to find exactly what you need.
          </p>
        </div>
      </div>

      <SpecialsClient specials={specials ?? []} />
    </div>
  );
}
