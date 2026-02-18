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

export interface WeeklyAd {
  id: string;
  title: string;
  valid_from: string;
  valid_to: string;
  pdf_url: string;
  is_active: boolean;
  created_at: string;
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
  is_active: boolean;
  created_at: string;
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
