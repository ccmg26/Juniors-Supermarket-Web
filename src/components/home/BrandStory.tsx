const PILLARS = [
  {
    icon: "🥩",
    title: "The Real Meat People",
    body: "From custom butcher cuts to USDA-grade beef, our Meat Market sets us apart. We take pride in quality you can see and taste.",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Family Owned & Operated",
    body: "Junior's was built on family values. Every store, every aisle, every employee reflects the community we've grown up in together.",
  },
  {
    icon: "🌮",
    title: "Rio Grande Valley Proud",
    body: "We source local, hire local, and give back local. From Edinburg to Penitas, we're your neighbor — not just your supermarket.",
  },
  {
    icon: "✓",
    title: "EBT & WIC Always Accepted",
    body: "Everyone deserves fresh, quality groceries. We proudly accept EBT and WIC at all locations, no questions asked.",
  },
];

export default function BrandStory() {
  return (
    <section className="section-pad bg-accent">
      <div className="container-max">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="label-eyebrow mb-2">Who We Are</p>
          <h2 className="text-3xl sm:text-4xl font-black text-fg mb-4">
            More Than a Supermarket.{" "}
            <span className="text-brand">We&apos;re Your Community.</span>
          </h2>
          <p className="text-muted-fg text-base leading-relaxed">
            Junior&apos;s Supermarket has been serving the Rio Grande Valley for generations. Eight locations and counting — built on fresh food, fair prices, and genuine care for every family we serve.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p) => (
            <div key={p.title} className="bg-card rounded-2xl border border-border p-6 text-center">
              <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                {p.icon}
              </div>
              <h3 className="font-black text-fg text-base mb-2">{p.title}</h3>
              <p className="text-muted-fg text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
