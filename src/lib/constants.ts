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
  { name: "Meat Market", slug: "meat-market", icon: "🥩" },
  { name: "Produce", slug: "produce", icon: "🥦" },
  { name: "Dairy", slug: "dairy", icon: "🥛" },
  { name: "Grocery", slug: "grocery", icon: "🛒" },
  { name: "Deli Cuts", slug: "deli-cuts", icon: "🍖" },
  { name: "Restaurant", slug: "restaurant", icon: "🍽️" },
  { name: "Bakery", slug: "bakery", icon: "🥖" },
  { name: "Tortilleria", slug: "tortilleria", icon: "🫓" },
  { name: "Pay & Service Center", slug: "pay-service-center", icon: "💳" },
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
