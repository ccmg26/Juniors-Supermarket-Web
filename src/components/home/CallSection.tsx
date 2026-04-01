import { BRAND } from "@/lib/constants";

const TRUST_ITEMS = [
  { icon: "🥩", text: "Fresh cuts daily" },
  { icon: "🌽", text: "Local produce" },
  { icon: "💳", text: "EBT & WIC accepted" },
  { icon: "🕖", text: "Open 7 AM – 10 PM" },
];

export default function CallSection() {
  return (
    <section className="relative bg-hero-pattern overflow-hidden">
      {/* Subtle diagonal stripe texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)",
        }}
        aria-hidden="true"
      />

      <div className="relative section-pad">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-fg/70 text-xs font-bold uppercase tracking-widest mb-3">
              Rio Grande Valley&apos;s Own
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-fg leading-tight mb-4">
              The <span className="text-brand-yellow">Real</span> Meat People.<br />
              Your Family&apos;s Supermarket.
            </h2>
            <p className="text-brand-fg/80 text-lg mb-8 max-w-xl mx-auto">
              Eight locations across the Valley. Whether you need a custom butcher order or just tonight&apos;s groceries — we&apos;re here for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <a
                href={BRAND.phone.link}
                className="btn-dark text-base px-8 py-4"
              >
                Call {BRAND.phone.display}
              </a>
              <a
                href="/locations"
                className="btn-white-outline text-base px-8 py-4"
              >
                Find Your Store
              </a>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {TRUST_ITEMS.map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-brand-fg/80 text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
