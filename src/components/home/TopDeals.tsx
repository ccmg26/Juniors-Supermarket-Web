import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import DealCard from "@/components/ui/DealCard";
import type { Special } from "@/types";

interface Props {
  specials: Special[];
}

export default function TopDeals({ specials }: Props) {
  if (specials.length === 0) return null;

  return (
    <section className="section-pad bg-bg">
      <div className="container-max">
        <div className="mb-8">
          <SectionHeader label="Don't Miss Out" title="Top Deals This Week" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {specials.map((special) => (
            <DealCard key={special.id} special={special} />
          ))}
        </div>
        <p className="text-xs text-muted-fg text-center mt-4">
          * While Supplies Last. Prices valid at participating locations.
        </p>
      </div>
    </section>
  );
}
