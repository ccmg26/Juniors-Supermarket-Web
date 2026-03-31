/** Update this whenever the Privacy Policy or Terms of Use are revised. */
export const LEGAL_LAST_UPDATED = "March 2025";

export const BRAND = {
  name: "Junior's Supermarket",
  tagline: "The Real Meat People",
  phone: {
    display: "956-JUNIORS",
    link: "tel:+19565864677",
    number: "+1 (956) 586-4677",
  },
  address: "Rio Grande Valley, Texas",
  social: {
    facebook: "https://www.facebook.com/juniorssupermarket",
    instagram: "https://www.instagram.com/juniorssupermarket",
  },
} as const;

export const SPECIAL_CATEGORIES = [
  "Meat",
  "Produce",
  "Dairy",
  "Grocery",
  "Deli Cuts",
  "Restaurant",
  "Bakery",
  "Tortilleria",
  "Pay & Service Center",
] as const;

export const DEPARTMENTS = [
  {
    name: "Meat Market",
    slug: "meat-market",
    icon: "🥩",
    tagline: "USDA-grade fresh cuts, custom orders",
    description: "USDA-grade fresh cuts, custom butcher orders, and an unmatched selection of beef, pork, and chicken.",
  },
  {
    name: "Produce",
    slug: "produce",
    icon: "🥦",
    tagline: "Farm-fresh fruits & vegetables",
    description: "Farm-fresh fruits and vegetables sourced locally and from across the Valley.",
  },
  {
    name: "Dairy",
    slug: "dairy",
    icon: "🥛",
    tagline: "Milk, cheese, eggs & more",
    description: "Milk, cheese, eggs, yogurt, and all your refrigerated essentials.",
  },
  {
    name: "Grocery",
    slug: "grocery",
    icon: "🛒",
    tagline: "Full aisles of everyday essentials",
    description: "Full aisles of pantry staples, canned goods, snacks, beverages, and household items.",
  },
  {
    name: "Deli Cuts",
    slug: "deli-cuts",
    icon: "🍖",
    tagline: "Premium deli meats & cheeses",
    description: "Premium sliced deli meats and cheeses — cut fresh to order.",
  },
  {
    name: "Restaurant",
    slug: "restaurant",
    icon: "🍽️",
    tagline: "Hot food ready to eat",
    description: "Hot, ready-to-eat food made fresh in-store. Perfect for a quick family meal.",
  },
  {
    name: "Bakery",
    slug: "bakery",
    icon: "🥖",
    tagline: "Fresh-baked bread & pastries daily",
    description: "Fresh-baked pan dulce, bread, cakes, and pastries made daily.",
  },
  {
    name: "Tortilleria",
    slug: "tortilleria",
    icon: "🫓",
    tagline: "Handmade tortillas, fresh daily",
    description: "Handmade corn and flour tortillas, made fresh every day.",
  },
  {
    name: "Pay & Service Center",
    slug: "pay-service-center",
    icon: "💳",
    tagline: "Money services & bill pay",
    description: "Money orders, bill pay, wire transfers, and more — all under one roof.",
  },
] as const;

export const STORE_SERVICES = [
  "Meat",
  "Produce",
  "Dairy",
  "Grocery",
  "Deli Cuts",
  "Restaurant",
  "Bakery",
  "Tortilleria",
  "Pay & Service Center",
] as const;

export const STORE_HOURS = "Open Daily 7:00 AM – 10:00 PM";
export const STORE_HOURS_RANGE = "7:00 AM – 10:00 PM";

/** Names that appear in the leasing inquiry location picker. Keep in sync with actual store list. */
export const STORE_LOCATION_NAMES = [
  "Edinburg University",
  "Pharr Veterans",
  "Penitas",
  "Pharr South Cage",
  "San Juan",
  "Edinburg Closner",
  "Alton",
  "Hidalgo",
] as const;
