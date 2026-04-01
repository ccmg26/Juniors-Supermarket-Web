import type { Metadata } from "next";
import Link from "next/link";
import { DEPARTMENTS } from "@/lib/constants";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Departments",
  description: "Explore all departments at Junior's Supermarket – Meat Market, Produce, Dairy, Bakery, Tortilleria, Restaurant, and more.",
};

export default function DepartmentsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Everything in One Place"
        title="Our Departments"
        subtitle="From fresh-cut meat to hot ready food — Junior's has it all."
      />

      <section className="section-pad bg-accent">
        <div className="container-max">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEPARTMENTS.map((dept) => (
              <Link
                key={dept.slug}
                href={`/departments/${dept.slug}`}
                className="card p-6 flex gap-4 group hover:border-brand/30 transition-all"
              >
                <div className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {dept.icon}
                </div>
                <div>
                  <h2 className="font-black text-fg text-lg group-hover:text-brand transition-colors">
                    {dept.name}
                  </h2>
                  <p className="text-muted-fg text-sm leading-relaxed mt-1">
                    {dept.description}
                  </p>
                  <p className="text-brand text-xs font-semibold mt-3">
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
