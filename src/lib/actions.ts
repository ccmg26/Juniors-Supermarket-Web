"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { randomUUID } from "crypto";
import { checkRateLimit } from "@/lib/rate-limit";
import { buildWeeklyAdTitle, isTrustedWeeklyAdUrl } from "@/lib/weekly-ad";

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Verify the caller is a logged-in admin. Returns error string or null. */
async function requireAdmin(): Promise<string | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return "Not authenticated.";

  const { data } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  if (!data) return "Not authorized.";
  return null;
}

async function requirePublicFormAllowance(action: string): Promise<string | null> {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientId = forwarded || headerStore.get("x-real-ip") || "unknown";
  return checkRateLimit(`${action}:${clientId}`, 5, 60_000)
    ? null
    : "Too many requests. Please wait a minute and try again.";
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC FORM SUBMISSIONS
// ─────────────────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name required").max(100),
  email: z.string().email("Valid email required"),
  phone: z.string().trim().max(30).optional(),
  subject: z.string().trim().min(2, "Subject required").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
});

export async function submitContact(formData: FormData) {
  const rateLimitError = await requirePublicFormAllowance("contact");
  if (rateLimitError) return { error: rateLimitError };
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert(parsed.data);
  if (error) return { error: "Failed to submit. Please try again." };
  return { success: true };
}

const leasingSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().email(),
  phone: z.string().trim().min(10).max(30),
  preferred_location: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(5000),
});

export async function submitLeasing(formData: FormData) {
  const rateLimitError = await requirePublicFormAllowance("leasing");
  if (rateLimitError) return { error: rateLimitError };
  const parsed = leasingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("leasing_inquiries").insert(parsed.data);
  if (error) return { error: "Failed to submit. Please try again." };
  return { success: true };
}

const suggestionSchema = z.object({
  type: z.enum(["Product Request", "Concern", "Suggestion"]),
  name: z.string().trim().min(2).max(100),
  email: z.string().email(),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(10).max(5000),
  preferred_location: z.string().trim().max(150).optional(),
  category: z.string().trim().max(100).optional(),
});

export async function submitSuggestion(formData: FormData) {
  const rateLimitError = await requirePublicFormAllowance("suggestion");
  if (rateLimitError) return { error: rateLimitError };
  const parsed = suggestionSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const supabase = await createClient();
  let image_url: string | null = null;
  const imageFile = formData.get("image") as File | null;

  if (imageFile && imageFile.size > 0) {
    const allowedTypes = new Map([
      ["image/jpeg", "jpg"],
      ["image/png", "png"],
      ["image/webp", "webp"],
    ]);
    const ext = allowedTypes.get(imageFile.type);
    if (!ext) return { error: "Image must be a JPG, PNG, or WebP file." };
    if (imageFile.size > 5 * 1024 * 1024) return { error: "Image must be 5 MB or smaller." };
    const filename = `${randomUUID()}.${ext}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("suggestion-uploads")
      .upload(filename, imageFile);

    if (!uploadError && uploadData) {
      image_url = uploadData.path;
    }
  }

  const { error } = await supabase
    .from("customer_suggestions")
    .insert({ ...parsed.data, image_url });
  if (error) return { error: "Failed to submit. Please try again." };
  return { success: true };
}

const dealsClubSchema = z.object({
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
});

export async function submitDealsClub(formData: FormData) {
  const rateLimitError = await requirePublicFormAllowance("deals-club");
  if (rateLimitError) return { error: rateLimitError };
  const parsed = dealsClubSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  // Use the service-role client so this public insert always succeeds
  // regardless of RLS policy state (anon INSERT can be blocked by default).
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    // Fallback to anon client if service key not available (dev without .env)
    const supabase = await createClient();
    const { error } = await supabase
      .from("deals_club_subscribers")
      .upsert(parsed.data, { onConflict: "email" });
    if (error) {
      console.error("[DealsClub] Supabase error:", error.message, error.code);
      return { error: "Failed to subscribe. Please try again." };
    }
    return { success: true };
  }

  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
  const { error } = await admin
    .from("deals_club_subscribers")
    .upsert(parsed.data, { onConflict: "email" });
  if (error) {
    console.error("[DealsClub] Supabase error:", error.message, error.code);
    return { error: "Failed to subscribe. Please try again." };
  }
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: STORES
// ─────────────────────────────────────────────────────────────────────────────

export async function adminUpsertStore(formData: FormData) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const supabase = await createClient();
  const raw = Object.fromEntries(formData);
  const services = formData.getAll("services") as string[];
  const images = formData.getAll("images") as string[];

  const payload = {
    name: raw.name,
    slug: raw.slug,
    address: raw.address,
    city: raw.city,
    state: raw.state,
    zip: raw.zip,
    phone: raw.phone,
    hours: raw.hours,
    ebt_wic: raw.ebt_wic === "true",
    google_maps_url: raw.google_maps_url,
    lat: raw.lat ? parseFloat(raw.lat as string) : null,
    lng: raw.lng ? parseFloat(raw.lng as string) : null,
    services,
    images,
    is_active: raw.is_active === "true",
  };

  const { error } = raw.id
    ? await supabase.from("stores").update(payload).eq("id", raw.id)
    : await supabase.from("stores").insert(payload);
  if (error) return { error: error.message };

  revalidatePath("/locations");
  return { success: true };
}

export async function adminDeleteStore(id: string) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const supabase = await createClient();
  const { error } = await supabase.from("stores").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/locations");
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: WEEKLY ADS
// ─────────────────────────────────────────────────────────────────────────────

const weeklyAdSchema = z.object({
  title: z.string().min(2, "Title is required"),
  valid_from: z.string().min(1, "Start date is required"),
  valid_to: z.string().min(1, "End date is required"),
  status: z.enum(["draft", "scheduled", "published", "archived"]),
  pdf_url: z.string().url("A valid PDF or image URL is required"),
  mobile_image_url: z.string().url().optional().or(z.literal("")),
}).refine(
  (d) => new Date(d.valid_from) <= new Date(d.valid_to),
  { message: "Start date must be before end date", path: ["valid_from"] }
);

export async function adminUpsertWeeklyAd(formData: FormData) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const raw = Object.fromEntries(formData);
  const parsed = weeklyAdSchema.safeParse({
    title: raw.title,
    valid_from: raw.valid_from,
    valid_to: raw.valid_to,
    status: raw.status ?? "published",
    pdf_url: raw.pdf_url,
    mobile_image_url: raw.mobile_image_url || undefined,
  });
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || !isTrustedWeeklyAdUrl(parsed.data.pdf_url, supabaseUrl)) {
    return { error: "The ad must be uploaded to the approved weekly-ads storage bucket." };
  }
  if (
    parsed.data.mobile_image_url &&
    !isTrustedWeeklyAdUrl(parsed.data.mobile_image_url, supabaseUrl)
  ) {
    return { error: "The mobile image must be uploaded to the approved weekly-ads storage bucket." };
  }

  const isPublished = parsed.data.status === "published";
  const supabase = await createClient();

  // Publish through one database transaction so a failed insert/update cannot
  // leave the website without a live ad.
  if (isPublished) {
    const { error } = await supabase.rpc("publish_weekly_ad", {
      p_id: raw.id ? String(raw.id) : null,
      p_title: parsed.data.title,
      p_valid_from: parsed.data.valid_from,
      p_valid_to: parsed.data.valid_to,
      p_file_url: parsed.data.pdf_url,
      p_mobile_image_url: parsed.data.mobile_image_url || null,
    });
    if (error) return { error: error.message };

    revalidatePath("/admin/weekly-ads");
    revalidatePath("/weekly-ad");
    revalidatePath("/");
    return { success: true };
  }

  const payload = {
    ...parsed.data,
    mobile_image_url: parsed.data.mobile_image_url || null,
    is_active: isPublished,
  };

  const { error } = raw.id
    ? await supabase.from("weekly_ads").update(payload).eq("id", raw.id as string)
    : await supabase.from("weekly_ads").insert(payload);
  if (error) return { error: error.message };

  revalidatePath("/weekly-ad");
  revalidatePath("/");
  return { success: true };
}

/**
 * Set the status of a weekly ad directly (e.g. from the list page).
 * Publishing an ad will archive all other published ads.
 */
export async function adminSetWeeklyAdStatus(id: string, status: string) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  if (!["draft", "scheduled", "published", "archived"].includes(status)) {
    return { error: "Invalid status." };
  }

  const supabase = await createClient();

  if (status === "published") {
    const { data: ad, error: readError } = await supabase
      .from("weekly_ads")
      .select("title,valid_from,valid_to,pdf_url,mobile_image_url")
      .eq("id", id)
      .single();
    if (readError || !ad) return { error: readError?.message ?? "Ad not found." };

    const { error } = await supabase.rpc("publish_weekly_ad", {
      p_id: id,
      p_title: ad.title,
      p_valid_from: ad.valid_from,
      p_valid_to: ad.valid_to,
      p_file_url: ad.pdf_url,
      p_mobile_image_url: ad.mobile_image_url,
    });
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase
      .from("weekly_ads")
      .update({ status, is_active: false })
      .eq("id", id);
    if (error) return { error: error.message };
  }

  revalidatePath("/admin/weekly-ads");
  revalidatePath("/weekly-ad");
  revalidatePath("/");
  return { success: true };
}

export async function adminDeleteWeeklyAd(id: string) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const supabase = await createClient();
  const { error } = await supabase.from("weekly_ads").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/weekly-ads");
  revalidatePath("/weekly-ad");
  revalidatePath("/");
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: SPECIALS
// ─────────────────────────────────────────────────────────────────────────────

const specialSchema = z.object({
  title: z.string().min(2, "Title is required"),
  price: z.string().min(1, "Price is required"),
  original_price: z.string().optional(),
  category: z.enum([
    "Meat", "Produce", "Dairy", "Grocery", "Deli Cuts",
    "Restaurant", "Bakery", "Tortilleria", "Pay & Service Center",
  ], { errorMap: () => ({ message: "Invalid category" }) }),
  image_url: z.string().url().optional().or(z.literal("")),
  valid_from: z.string().min(1, "Start date is required"),
  valid_to: z.string().min(1, "End date is required"),
  disclaimer: z.string().optional(),
  is_featured: z.boolean().default(false),
  sort_order: z.coerce.number().int().min(0).default(0),
}).refine(
  (d) => new Date(d.valid_from) <= new Date(d.valid_to),
  { message: "Start date must be before end date", path: ["valid_from"] }
);

export async function adminUpsertSpecial(formData: FormData) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const raw = Object.fromEntries(formData);
  const parsed = specialSchema.safeParse({
    title: raw.title,
    price: raw.price,
    original_price: raw.original_price || undefined,
    category: raw.category,
    image_url: raw.image_url || undefined,
    valid_from: raw.valid_from,
    valid_to: raw.valid_to,
    disclaimer: raw.disclaimer || undefined,
    is_featured: raw.is_featured === "true",
    sort_order: raw.sort_order || 0,
  });
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const supabase = await createClient();
  const payload = {
    ...parsed.data,
    original_price: parsed.data.original_price || null,
    image_url: parsed.data.image_url || null,
    disclaimer: parsed.data.disclaimer || null,
    is_active: raw.is_active !== "false",
  };

  const { error } = raw.id
    ? await supabase.from("specials").update(payload).eq("id", raw.id as string)
    : await supabase.from("specials").insert(payload);
  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

/** Toggle is_active or is_featured for a special inline from the list */
export async function adminToggleSpecial(
  id: string,
  field: "is_active" | "is_featured",
  value: boolean
) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const supabase = await createClient();
  const { error } = await supabase
    .from("specials")
    .update({ [field]: value })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/specials");
  revalidatePath("/");
  return { success: true };
}

/** Duplicate a special (copy to a new draft record) */
export async function adminDuplicateSpecial(id: string) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const supabase = await createClient();
  const { data: original, error: fetchErr } = await supabase
    .from("specials")
    .select("*")
    .eq("id", id)
    .single();
  if (fetchErr || !original) return { error: "Special not found." };

  const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = original;
  const { error } = await supabase.from("specials").insert({
    ...rest,
    title: "Copy of " + original.title,
    is_active: false,
    is_featured: false,
  });
  if (error) return { error: error.message };

  revalidatePath("/admin/specials");
  return { success: true };
}

export async function adminDeleteSpecial(id: string) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const supabase = await createClient();
  const { error } = await supabase.from("specials").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/specials");
  revalidatePath("/");
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: EVENTS
// ─────────────────────────────────────────────────────────────────────────────

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image_url: z.string().url().optional().or(z.literal("")),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  is_featured: z.string().optional(),
  is_active: z.string().optional(),
});

export async function adminUpsertEvent(formData: FormData) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const raw = Object.fromEntries(formData);
  const parsed = eventSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const supabase = await createClient();
  const payload = {
    title: parsed.data.title,
    description: parsed.data.description,
    image_url: parsed.data.image_url || null,
    start_date: parsed.data.start_date,
    end_date: parsed.data.end_date,
    is_featured: raw.is_featured === "true",
    is_active: raw.is_active === "true",
  };

  const { error } = raw.id
    ? await supabase.from("events").update(payload).eq("id", raw.id as string)
    : await supabase.from("events").insert(payload);
  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  revalidatePath("/events");
  return { success: true };
}

export async function adminDeleteEvent(id: string) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const supabase = await createClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  revalidatePath("/events");
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: JOBS
// ─────────────────────────────────────────────────────────────────────────────

const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Type is required"),
  description: z.string().min(1, "Description is required"),
  paycom_url: z.string().url("Valid Paycom URL required"),
  is_active: z.string().optional(),
});

export async function adminUpsertJob(formData: FormData) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const raw = Object.fromEntries(formData);
  const parsed = jobSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const supabase = await createClient();
  const payload = {
    title: parsed.data.title,
    department: parsed.data.department,
    location: parsed.data.location,
    type: parsed.data.type,
    description: parsed.data.description,
    paycom_url: parsed.data.paycom_url,
    is_active: raw.is_active === "true",
  };

  const { error } = raw.id
    ? await supabase.from("jobs").update(payload).eq("id", raw.id as string)
    : await supabase.from("jobs").insert(payload);
  if (error) return { error: error.message };

  revalidatePath("/jobs");
  return { success: true };
}

export async function adminDeleteJob(id: string) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const supabase = await createClient();
  const { error } = await supabase.from("jobs").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/jobs");
  revalidatePath("/jobs");
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: SITE SETTINGS (Homepage Content)
// ─────────────────────────────────────────────────────────────────────────────

const siteSettingsSchema = z.object({
  promo_strip_text: z.string().min(1, "Promo strip text is required"),
  hero_headline: z.string().min(1, "Hero headline is required"),
  hero_subheadline: z.string().min(1, "Hero subheadline is required"),
  deals_club_headline: z.string().min(1, "Deals Club headline is required"),
  deals_club_subheadline: z.string().min(1, "Deals Club subheadline is required"),
  banner_text: z.string().optional().default(""),
  banner_link_url: z.string().optional().default(""),
  banner_link_label: z.string().optional().default(""),
  banner_style: z.enum(["red", "yellow", "green", "blue", "dark"]).default("red"),
});

export async function adminUpsertSiteSettings(formData: FormData) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const raw = Object.fromEntries(formData);
  const parsed = siteSettingsSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({
      id: 1,
      ...parsed.data,
      // checkbox sends "true" when checked; absent when unchecked
      banner_active: raw.banner_active === "true",
    });
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/homepage");
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: QUICK PUBLISH WEEKLY AD
// ─────────────────────────────────────────────────────────────────────────────

export async function adminPublishWeeklyAd(formData: FormData) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const supabase = await createClient();
  const fileUrl  = formData.get("file_url")   as string;
  const validFrom = formData.get("valid_from") as string;
  const validTo   = formData.get("valid_to")   as string;

  if (!fileUrl)              return { error: "Please upload a file first." };
  if (!validFrom || !validTo) return { error: "Please set the week dates." };
  if (new Date(validFrom) > new Date(validTo)) {
    return { error: "Start date must be before end date." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || !isTrustedWeeklyAdUrl(fileUrl, supabaseUrl)) {
    return { error: "The ad must be uploaded to the approved weekly-ads storage bucket." };
  }

  const { error: publishError } = await supabase.rpc("publish_weekly_ad", {
    p_id: null,
    p_title: buildWeeklyAdTitle(validFrom, validTo),
    p_valid_from: validFrom,
    p_valid_to: validTo,
    p_file_url: fileUrl,
    p_mobile_image_url: null,
  });
  if (publishError) return { error: publishError.message };

  revalidatePath("/admin/weekly-ads");
  revalidatePath("/weekly-ad");
  revalidatePath("/");
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC: CATERING REQUESTS
// ─────────────────────────────────────────────────────────────────────────────

const cateringSchema = z.object({
  name: z.string().trim().min(2, "Name required").max(100),
  email: z.string().email("Valid email required"),
  phone: z.string().trim().min(7, "Phone required").max(30),
  event_type: z.string().trim().min(2, "Event type required").max(100),
  event_date: z.string().optional(),
  guest_count: z.string().optional(),
  items: z.string().trim().max(2000).optional(),
  notes: z.string().trim().max(2000).optional(),
  location_preference: z.string().trim().max(150).optional(),
});

export async function submitCatering(formData: FormData) {
  const rateLimitError = await requirePublicFormAllowance("catering");
  if (rateLimitError) return { error: rateLimitError };

  const raw = Object.fromEntries(formData);
  const parsed = cateringSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("catering_requests").insert({
    ...parsed.data,
    event_date: parsed.data.event_date || null,
    guest_count: parsed.data.guest_count || null,
    items: parsed.data.items || null,
    notes: parsed.data.notes || null,
    location_preference: parsed.data.location_preference || null,
  });
  if (error) {
    console.error("[Catering] Supabase error:", error.message);
    return { error: "Failed to submit. Please try again or call us directly." };
  }
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: RECIPES
// ─────────────────────────────────────────────────────────────────────────────

const recipeSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  cook_time: z.string().optional(),
  prep_time: z.string().optional(),
  servings: z.string().optional(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).default("Easy"),
  ingredients: z.string().transform((s) => JSON.parse(s) as string[]).pipe(z.array(z.string())),
  instructions: z.string().transform((s) => JSON.parse(s) as string[]).pipe(z.array(z.string())),
  tips: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal("")),
  sort_order: z.coerce.number().int().min(0).default(0),
});

export async function adminUpsertRecipe(formData: FormData) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const raw = Object.fromEntries(formData);
  const parsed = recipeSchema.safeParse({
    ...raw,
    image_url: raw.image_url || undefined,
    sort_order: raw.sort_order || 0,
  });
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const supabase = await createClient();
  const payload = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    description: parsed.data.description || null,
    category: parsed.data.category,
    cook_time: parsed.data.cook_time || null,
    prep_time: parsed.data.prep_time || null,
    servings: parsed.data.servings || null,
    difficulty: parsed.data.difficulty,
    ingredients: parsed.data.ingredients,
    instructions: parsed.data.instructions,
    tips: parsed.data.tips || null,
    image_url: parsed.data.image_url || null,
    is_featured: raw.is_featured === "true",
    is_active: raw.is_active === "true",
    sort_order: parsed.data.sort_order,
  };

  const { error } = raw.id
    ? await supabase.from("recipes").update(payload).eq("id", raw.id as string)
    : await supabase.from("recipes").insert(payload);
  if (error) return { error: error.message };

  revalidatePath("/recipes");
  revalidatePath("/admin/recipes");
  revalidatePath("/");
  return { success: true };
}

export async function adminDeleteRecipe(id: string) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const supabase = await createClient();
  const { error } = await supabase.from("recipes").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/recipes");
  revalidatePath("/admin/recipes");
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: USER MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────

export async function adminCreateUser(formData: FormData) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return { error: "SUPABASE_SERVICE_ROLE_KEY is not set in .env.local" };

  const email    = (formData.get("email")    as string)?.trim().toLowerCase();
  const password = (formData.get("password") as string)?.trim();

  if (!email || !password) return { error: "Email and password are required." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: userData, error: createErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (createErr) return { error: createErr.message };

  const { error: insertErr } = await admin
    .from("admin_users")
    .insert({ id: userData.user.id, email });

  if (insertErr) {
    await admin.auth.admin.deleteUser(userData.user.id);
    return { error: insertErr.message };
  }

  return { success: true };
}

export async function adminListAdminUsers() {
  const authErr = await requireAdmin();
  if (authErr) return { data: [], error: authErr };
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("admin_users")
    .select("id, email, created_at")
    .order("created_at", { ascending: true });
  return { data: data ?? [], error: error?.message };
}
