import { BRAND } from "@/lib/constants";

export default function CallSection() {
  return (
    <section className="section-pad bg-accent">
      <div className="container-max text-center max-w-xl">
        <div className="w-20 h-20 bg-brand rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg className="w-10 h-10 text-brand-fg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <p className="label-eyebrow mb-2">We&apos;re Here to Help</p>
        <h2 className="text-3xl sm:text-4xl font-black text-fg mb-3">
          Call {BRAND.phone.display}
        </h2>
        <p className="text-muted-fg text-base mb-6">
          Questions about hours, departments, or special orders?
          Give us a call — we&apos;re happy to help!
        </p>
        <a href={BRAND.phone.link} className="btn-primary text-lg px-10 py-4">
          Call Now
        </a>
        <p className="text-muted-fg text-sm mt-4">Open Daily · 7:00 AM – 10:00 PM</p>
      </div>
    </section>
  );
}
