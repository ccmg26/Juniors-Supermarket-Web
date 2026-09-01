// ──────────────────────────────────────────────────────────────────────────────
// Bilingual translation strings — English (default) + Spanish
// All user-visible text that can be translated goes here.
// ──────────────────────────────────────────────────────────────────────────────

export type Lang = "en" | "es";

export const translations = {
  // ── Site-wide ────────────────────────────────────────────────
  tagline: {
    en: "The Real Meat People",
    es: "La Gente de la Carne Real",
  },
  ebtBanner: {
    en: "EBT / WIC Accepted at All Locations",
    es: "EBT / WIC Aceptado en Todas las Sucursales",
  },
  openHours: {
    en: "Open Daily 7AM–10PM",
    es: "Abierto Todos los Días 7AM–10PM",
  },
  phone: {
    en: "📞 956-JUNIORS",
    es: "📞 956-JUNIORS",
  },

  // ── Navigation ───────────────────────────────────────────────
  nav: {
    weeklyAd:     { en: "🗞 Weekly Ad",         es: "🗞 Ofertas Semanales" },
    thisWeek:     { en: "This Week's Deals",     es: "Ofertas de Esta Semana" },
    adResets:     { en: "Ad resets every Wednesday", es: "Oferta cambia cada miércoles" },
    locations:    { en: "Locations",             es: "Sucursales" },
    departments:  { en: "Departments",           es: "Departamentos" },
    events:       { en: "Events",                es: "Eventos" },
    recipes:      { en: "Recipes",               es: "Recetas" },
    catering:     { en: "Catering",              es: "Catering" },
    rewards:      { en: "Rewards",               es: "Recompensas" },
    juniorsTv:    { en: "Junior's TV",           es: "Junior's TV" },
    orderWhatsapp:{ en: "Order by WhatsApp",     es: "Pedir por WhatsApp" },
    aboutUs:      { en: "About Us",              es: "Quiénes Somos" },
    jobs:         { en: "Jobs",                  es: "Empleos" },
    contact:      { en: "Contact",               es: "Contacto" },
    leasing:      { en: "Leasing",               es: "Arrendamiento" },
    suggestions:  { en: "Suggestions",           es: "Sugerencias" },
    shopExplore:  { en: "Shop & Explore",        es: "Comprar y Explorar" },
    company:      { en: "Company",               es: "Empresa" },
    followUs:     { en: "Follow Us",             es: "Síguenos" },
    openMenu:     { en: "Open menu",             es: "Abrir menú" },
    closeMenu:    { en: "Close menu",            es: "Cerrar menú" },
  },

  // ── Footer ───────────────────────────────────────────────────
  footer: {
    tagline:       { en: "Fresh meat, produce, bakery, tortilleria, and weekly deals at 8 Valley locations.", es: "Carne fresca, verduras, panadería, tortillería y ofertas semanales en 8 sucursales del Valle." },
    openDaily:     { en: "Open Daily", es: "Abierto Todos los Días" },
    ebtWic:        { en: "EBT & WIC", es: "EBT y WIC" },
    accepted:      { en: "Accepted at all locations", es: "Aceptados en todas las sucursales" },
    shop:          { en: "Shop", es: "Comprar" },
    services:      { en: "Services", es: "Servicios" },
    discover:      { en: "Discover", es: "Descubrir" },
    company:       { en: "Company", es: "Empresa" },
    weeklyAd:      { en: "Weekly Ad", es: "Ofertas Semanales" },
    locations:     { en: "Locations", es: "Sucursales" },
    departments:   { en: "Departments", es: "Departamentos" },
    events:        { en: "Events", es: "Eventos" },
    specials:      { en: "Specials", es: "Especiales" },
    catering:      { en: "Catering", es: "Catering" },
    orderWhatsapp: { en: "Order by WhatsApp", es: "Pedir por WhatsApp" },
    financial:     { en: "Financial Services", es: "Servicios Financieros" },
    rewards:       { en: "Rewards (Soon)", es: "Recompensas (Pronto)" },
    recipes:       { en: "Recipes", es: "Recetas" },
    cutsGuide:     { en: "Cuts Guide", es: "Guía de Cortes" },
    juniorsTv:     { en: "Junior's TV", es: "Junior's TV" },
    meatMarket:    { en: "Meat Market", es: "Carnicería" },
    aboutUs:       { en: "About Us", es: "Quiénes Somos" },
    jobs:          { en: "Jobs", es: "Empleos" },
    contact:       { en: "Contact", es: "Contacto" },
    leasing:       { en: "Leasing", es: "Arrendamiento" },
    privacy:       { en: "Privacy Policy", es: "Política de Privacidad" },
    terms:         { en: "Terms of Use", es: "Términos de Uso" },
    rights:        { en: "All rights reserved.", es: "Todos los derechos reservados." },
  },

  // ── Homepage ─────────────────────────────────────────────────
  home: {
    heroHeadline:  { en: "The Real Meat People", es: "La Gente de la Carne Real" },
    heroSubline:   { en: "Fresh-cut meat, produce, bakery & weekly deals at 8 Valley locations.", es: "Carne fresca cortada, verduras, panadería y ofertas semanales en 8 sucursales del Valle." },
    shopDeals:     { en: "🗞 Shop This Week's Deals", es: "🗞 Ver las Ofertas de Esta Semana" },
    findStore:     { en: "📍 Find Your Store", es: "📍 Encuentra Tu Sucursal" },
    weeklyAd:      { en: "Weekly Deals", es: "Ofertas Semanales" },
    viewFullAd:    { en: "View Full Ad", es: "Ver Oferta Completa" },
    featuredRecipes: { en: "Fresh Recipes from Our Butchers", es: "Recetas Frescas de Nuestros Carniceros" },
    viewAllRecipes: { en: "View All Recipes", es: "Ver Todas las Recetas" },
    cateringOrders: { en: "Catering Orders", es: "Pedidos de Catering" },
    cutsGuide:     { en: "Cuts Guide", es: "Guía de Cortes" },
  },

  // ── Common CTAs ──────────────────────────────────────────────
  cta: {
    orderWhatsapp: { en: "💬 Order by WhatsApp", es: "💬 Pedir por WhatsApp" },
    callUs:        { en: "📞 Call Us", es: "📞 Llámanos" },
    findStore:     { en: "📍 Find My Store", es: "📍 Encuentra Mi Sucursal" },
    viewDeals:     { en: "View Deals", es: "Ver Ofertas" },
    learnMore:     { en: "Learn More", es: "Saber Más" },
    submit:        { en: "Submit", es: "Enviar" },
    cancel:        { en: "Cancel", es: "Cancelar" },
    sending:       { en: "Sending…", es: "Enviando…" },
    messageSent:   { en: "Message sent!", es: "¡Mensaje enviado!" },
  },

  // ── Departments ──────────────────────────────────────────────
  departments: {
    meatMarket:    { en: "Meat Market",    es: "Carnicería" },
    produce:       { en: "Produce",        es: "Verduras y Frutas" },
    dairy:         { en: "Dairy",          es: "Lácteos" },
    grocery:       { en: "Grocery",        es: "Abarrotes" },
    deliCuts:      { en: "Deli Cuts",      es: "Cortes de Deli" },
    restaurant:    { en: "Restaurant",     es: "Restaurante" },
    bakery:        { en: "Bakery",         es: "Panadería" },
    tortilleria:   { en: "Tortilleria",    es: "Tortillería" },
    payService:    { en: "Pay & Service",  es: "Pago y Servicio" },
  },

  // ── Language toggle ──────────────────────────────────────────
  langToggle: {
    switchToEs: "Español",
    switchToEn: "English",
  },
} as const;

export type TranslationKey = keyof typeof translations;

/** Get a translated string. Falls back to English if key not found. */
export function t(
  section: TranslationKey,
  key: string,
  lang: Lang = "en"
): string {
  const sect = translations[section] as Record<string, { en: string; es: string }>;
  return sect?.[key]?.[lang] ?? sect?.[key]?.["en"] ?? key;
}
