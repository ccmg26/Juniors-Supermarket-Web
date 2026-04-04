export interface Store {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
  ebt_wic: boolean;
  google_maps_url: string;
  lat: number | null;
  lng: number | null;
  services: string[];
  images: string[];
  is_active: boolean;
  created_at: string;
}

export type WeeklyAdStatus = "draft" | "scheduled" | "published" | "archived";

export interface WeeklyAd {
  id: string;
  title: string;
  valid_from: string;
  valid_to: string;
  pdf_url: string;
  mobile_image_url: string | null; // optional mobile-friendly image version
  status: WeeklyAdStatus;          // workflow state (Phase 3+)
  is_active: boolean;              // true only when status = published
  created_at: string;
  updated_at: string;
}

export interface Special {
  id: string;
  title: string;
  price: string;
  original_price: string | null;
  category: SpecialCategory;
  image_url: string | null;
  valid_from: string;
  valid_to: string;
  disclaimer: string | null;
  is_featured: boolean;  // pinned to homepage Top Deals
  sort_order: number;    // manual ordering within category
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type SpecialCategory =
  | "Meat"
  | "Produce"
  | "Dairy"
  | "Grocery"
  | "Deli Cuts"
  | "Restaurant"
  | "Bakery"
  | "Tortilleria"
  | "Pay & Service Center";

export interface Department {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  hero_image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface DepartmentGalleryImage {
  id: string;
  department_id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  start_date: string;
  end_date: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  paycom_url: string;
  is_active: boolean;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
}

export interface LeasingInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferred_location: string;
  message: string;
  created_at: string;
}

export interface CustomerSuggestion {
  id: string;
  type: "Product Request" | "Concern" | "Suggestion";
  name: string;
  email: string;
  phone: string | null;
  message: string;
  image_url: string | null;
  created_at: string;
}

export interface DealsClubSubscriber {
  id: string;
  email: string;
  phone: string | null;
  created_at: string;
}

/** Single-row site configuration table (Phase 3+) */
export interface SiteSettings {
  id: 1;
  promo_strip_text: string;
  hero_headline: string;
  hero_subheadline: string;
  deals_club_headline: string;
  deals_club_subheadline: string;
  // Promo banner (Phase 4)
  banner_active: boolean;
  banner_text: string;
  banner_link_url: string;
  banner_link_label: string;
  banner_style: "red" | "yellow" | "green" | "blue" | "dark";
  updated_at: string;
}

export interface PushSubscription {
  id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  created_at: string;
}
