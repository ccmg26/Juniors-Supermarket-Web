import Link from "next/link";
import { DEPARTMENTS } from "@/lib/constants";

const deptDescriptions: Record<string, string> = {
  "meat-market": "USDA-grade fresh cuts, custom orders",
  "produce": "Farm-fresh fruits & vegetables",
  "dairy": "Milk, cheese, eggs & more",
  "grocery": "Full aisles of everyday essentials",
  "deli-cuts": "Premium deli meats & cheeses",
  "restaurant": "Hot food ready to eat",
  "bakery": "Fresh-baked bread & pastries daily",
  "tortilleria": "Handmade tortillas, fresh daily",
  "pay-service-center": "Money services & bill pay",
};

export default function DepartmentsSection() {
  return (
    /* Dark section — bg-fg text-bg in light-mode context ✅ */
    <section className="section-pad bg-fg">
      <div className="container-max">
        <div className="text-center mb-10">
          {/* text-brand on dark bg: 2.7:1 — used for small decorative eyebrow only
              Switch to text-bg/60 for guaranteed legibility */}
          <p className="text-bg/60 text-xs font-bold uppercase tracking-widest mb-2">
            Everything Under One Roof
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-bg">
            Our Departments
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              className="group bg-bg/5 hover:bg-brand border border-bg/10 hover:border-brand rounded-2xl p-4 text-center transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="text-4xl mb-3">{dept.icon}</div>
              <h3 className="text-bg font-bold text-sm leading-tight mb-1">{dept.name}</h3>
              {/* text-bg/70 on bg-fg: ~8:1 contrast ✅ */}
              <p className="text-bg/70 group-hover:text-brand-fg/90 text-xs leading-snug transition-colors">
                {deptDescriptions[dept.slug]}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          {/* White outline button on dark section */}
          <Link href="/departments" className="btn-white-outline">
            Explore All Departments
          </Link>
        </div>
      </div>
    </section>
  );
}
