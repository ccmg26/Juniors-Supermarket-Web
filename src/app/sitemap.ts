import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { DEPARTMENTS } from "@/lib/constants";

const BASE_URL = "https://www.juniorssupermarket.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const [{ data: stores }, { data: events }] = await Promise.all([
    supabase.from("stores").select("slug, created_at").eq("is_active", true),
    supabase.from("events").select("id, created_at").eq("is_active", true),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/weekly-ad`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/specials`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/locations`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/departments`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/events`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/jobs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/leasing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/suggestions`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const storePages: MetadataRoute.Sitemap = (stores ?? []).map((store) => ({
    url: `${BASE_URL}/locations/${store.slug}`,
    lastModified: new Date(store.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const deptPages: MetadataRoute.Sitemap = DEPARTMENTS.map((dept) => ({
    url: `${BASE_URL}/departments/${dept.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...storePages, ...deptPages];
}
