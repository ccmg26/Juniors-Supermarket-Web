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
    <section className="section-pad bg-brand-black">
      <div className="container-max">
        <div className="text-center mb-10">
          <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">
            Everything Under One Roof
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Our Departments
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              className="group bg-white/5 hover:bg-brand-red border border-white/10 hover:border-brand-red rounded-2xl p-4 text-center transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="text-4xl mb-3">{dept.icon}</div>
              <h3 className="text-white font-bold text-sm leading-tight mb-1">{dept.name}</h3>
              <p className="text-gray-400 group-hover:text-white/80 text-xs leading-snug transition-colors">
                {deptDescriptions[dept.slug]}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/departments" className="btn-secondary border-white text-white hover:bg-white hover:text-brand-black">
            Explore All Departments
          </Link>
        </div>
      </div>
    </section>
  );
}
