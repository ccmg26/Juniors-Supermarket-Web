import type { Metadata } from "next";
import Link from "next/link";
import { DEPARTMENTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Departments",
  description: "Explore all departments at Junior's Supermarket – Meat Market, Produce, Dairy, Bakery, Tortilleria, Restaurant, and more.",
};

const deptDescriptions: Record<string, string> = {
  "meat-market": "USDA-grade fresh cuts, custom butcher orders, and an unmatched selection of beef, pork, and chicken.",
  "produce": "Farm-fresh fruits and vegetables sourced locally and from across the Valley.",
  "dairy": "Milk, cheese, eggs, yogurt, and all your refrigerated essentials.",
  "grocery": "Full aisles of pantry staples, canned goods, snacks, beverages, and household items.",
  "deli-cuts": "Premium sliced deli meats and cheeses — cut fresh to order.",
  "restaurant": "Hot, ready-to-eat food made fresh in-store. Perfect for a quick family meal.",
  "bakery": "Fresh-baked pan dulce, bread, cakes, and pastries made daily.",
  "tortilleria": "Handmade corn and flour tortillas, made fresh every day.",
  "pay-service-center": "Money orders, bill pay, wire transfers, and more — all under one roof.",
};

export default function DepartmentsPage() {
  return (
    <div>
      <div className="bg-brand-black py-12 px-4">
        <div className="container-max text-center">
          <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">
            Everything in One Place
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Our Departments</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            From fresh-cut meat to hot ready food — Junior&apos;s has it all.
          </p>
        </div>
      </div>

      <section className="section-pad bg-brand-cream">
        <div className="container-max">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEPARTMENTS.map((dept) => (
              <Link
                key={dept.slug}
                href={`/departments/${dept.slug}`}
                className="card p-6 flex gap-4 group hover:border-brand-red/30 transition-all"
              >
                <div className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {dept.icon}
                </div>
                <div>
                  <h2 className="font-black text-brand-black text-lg group-hover:text-brand-red transition-colors">
                    {dept.name}
                  </h2>
                  <p className="text-brand-gray text-sm leading-relaxed mt-1">
                    {deptDescriptions[dept.slug]}
                  </p>
                  <p className="text-brand-red text-xs font-semibold mt-3">
                    Learn more →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
