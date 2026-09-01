"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import SocialFollowStrip from "@/components/layout/SocialFollowStrip";

interface Props {
  headline?:    string;
  subheadline?: string;
}

const DEFAULT_HEADLINE    = "Fresh Meat. Real Deals. Family Value.";
const DEFAULT_SUBHEADLINE = "8 stores across the Valley — open every day from 7 AM to 10 PM. Fresh meat, produce, bakery, tortilleria, and more, at prices your family will love.";

// Spanish equivalents for the default (DB-overridden strings stay as-is)
const ES_HEADLINE    = "Carne Fresca. Ofertas Reales. Valor Familiar.";
const ES_SUBHEADLINE = "8 sucursales en el Valle — abiertas todos los días de 7 AM a 10 PM. Carne fresca, verduras, panadería, tortillería y más, a precios que su familia va a amar.";

const TRUST_BADGES = {
  en: [
    { icon: '✓',  text: 'EBT / WIC Accepted',       cls: 'border-green-700 text-green-300 bg-green-950/60' },
    { icon: '🥩', text: 'Custom Meat Cuts',          cls: 'border-brand/50  text-brand-fg/80 bg-brand/20'   },
    { icon: '🗞', text: 'Ad Resets Every Wednesday', cls: 'border-yellow-700 text-yellow-300 bg-yellow-950/60' },
    { icon: '📍', text: '8 Valley Locations',        cls: 'border-border/30  text-brand-fg/70 bg-fg/30'      },
  ],
  es: [
    { icon: '✓',  text: 'EBT / WIC Aceptado',        cls: 'border-green-700 text-green-300 bg-green-950/60'  },
    { icon: '🥩', text: 'Cortes de Carne a Pedido',   cls: 'border-brand/50  text-brand-fg/80 bg-brand/20'   },
    { icon: '🗞', text: 'Oferta Cambia los Miércoles', cls: 'border-yellow-700 text-yellow-300 bg-yellow-950/60' },
    { icon: '📍', text: '8 Sucursales en el Valle',   cls: 'border-border/30  text-brand-fg/70 bg-fg/30'      },
  ],
};

const CTA = {
  en: { deals: '🗞 View Weekly Ad', store: '📍 Find Your Store' },
  es: { deals: '🗞 Ver Ofertas',    store: '📍 Encuentra Tu Sucursal' },
};

const STATS = {
  en: [
    { value: '8',       label: 'Store Locations'  },
    { value: '7AM',     label: 'Open Daily'       },
    { value: 'EBT/WIC', label: 'Always Accepted'  },
    { value: 'Fresh',   label: 'Every Single Day' },
  ],
  es: [
    { value: '8',       label: 'Sucursales'        },
    { value: '7AM',     label: 'Abierto Diario'    },
    { value: 'EBT/WIC', label: 'Siempre Aceptado'  },
    { value: 'Fresco',  label: 'Cada Día'          },
  ],
};

export default function HeroSection({ headline, subheadline }: Props) {
  const { lang } = useLanguage();

  // Use DB value if set and non-default; otherwise apply bilingual default
  const isCustomHeadline = headline && headline !== DEFAULT_HEADLINE;
  const displayHeadline = isCustomHeadline
    ? headline
    : (lang === 'es' ? ES_HEADLINE : DEFAULT_HEADLINE);

  const displaySubheadline = subheadline && subheadline !== DEFAULT_SUBHEADLINE
    ? subheadline
    : (lang === 'es' ? ES_SUBHEADLINE : DEFAULT_SUBHEADLINE);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-fg overflow-hidden">

        {/* Background watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-end pr-8 opacity-[0.035] select-none"
        >
          <span className="text-[180px] font-black text-brand-fg leading-none tracking-tighter">
            {lang === 'es' ? 'CARNE' : 'MEAT'}
          </span>
        </div>

        {/* Red gradient wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-hero-pattern opacity-90"
        />

        <div className="relative container-max section-pad">
          <div className="max-w-2xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-5">
              <span className="h-px w-8 bg-brand" />
              <span className="label-eyebrow text-brand/80">
                {lang === 'es'
                  ? 'La Gente de la Carne Real del Valle'
                  : "Rio Grande Valley's Real Meat People"}
              </span>
            </div>

            {/* Headline */}
            {isCustomHeadline ? (
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-fg leading-[1.08] tracking-tight mb-5">
                {displayHeadline}
              </h1>
            ) : lang === 'es' ? (
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-fg leading-[1.08] tracking-tight mb-5">
                Carne{' '}
                <span className="text-brand">Fresca.</span>
                <br />
                Ofertas Reales.
                <br />
                <span style={{ color: 'hsl(var(--brand-yellow))' }}>
                  Valor Familiar.
                </span>
              </h1>
            ) : (
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-fg leading-[1.08] tracking-tight mb-5">
                Fresh{' '}
                <span className="text-brand">Meat.</span>
                <br />
                Real Deals.
                <br />
                <span style={{ color: 'hsl(var(--brand-yellow))' }}>
                  Family Value.
                </span>
              </h1>
            )}

            {/* Subhead */}
            <p className="text-base sm:text-lg text-brand-fg/75 leading-relaxed mb-7 max-w-lg">
              {displaySubheadline}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {TRUST_BADGES[lang].map(({ icon, text, cls }) => (
                <span
                  key={text}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${cls}`}
                >
                  <span className="text-sm">{icon}</span>
                  {text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a href="/weekly-ad" className="btn-primary text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-brand/30">
                {CTA[lang].deals}
              </a>
              <a href="/locations" className="btn-white-outline text-sm px-6 py-3.5 rounded-xl">
                {CTA[lang].store}
              </a>
            </div>

          </div>
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-fg/30"
        />
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────── */}
      <div className="bg-fg border-b border-border/20">
        <div className="container-max px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border/20">
            {STATS[lang].map(({ value, label }) => (
              <div key={label} className="py-4 px-3 text-center">
                <div className="text-lg font-black text-brand">{value}</div>
                <div className="text-xs text-brand-fg/50 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SOCIAL FOLLOW STRIP ──────────────────────────────── */}
      <SocialFollowStrip />
    </>
  );
}
