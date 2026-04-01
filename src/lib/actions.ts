"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

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

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC FORM SUBMISSIONS
// ─────────────────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContact(formData: FormData) {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert(parsed.data);
  if (error) return { error: "Failed to submit. Please try again." };
  return { success: true };
}

const leasingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  preferred_location: z.string().min(2),
  message: z.string().min(10),
});

export async function submitLeasing(formData: FormData) {
  const parsed = leasingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("leasing_inquiries").insert(parsed.data);
  if (error) return { error: "Failed to submit. Please try again." };
  return { success: true };
}

const suggestionSchema = z.object({
  type: z.enum(["Product Request", "Concern", "Suggestion"]),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export async function submitSuggestion(formData: FormData) {
  const parsed = suggestionSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const supabase = await createClient();
  let image_url: string | null = null;
  const imageFile = formData.get("image") as File | null;

  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split(".").pop();
    const filename = `suggestion-${Date.now()}.${ext}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("suggestion-uploads")
      .upload(filename, imageFile);

    if (!uploadError && uploadData) {
      const { data: urlData } = supabase.storage
        .from("suggestion-uploads")
        .getPublicUrl(uploadData.path);
      image_url = urlData.publicUrl;
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
  const parsed = dealsClubSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const supabase = await createClient();
  const { error } = await supabase
    .from("deals_club_subscribers")
    .upsert(parsed.data, { onConflict: "email" });
  if (error) return { error: "Failed to subscribe. Please try again." };
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

  const isPublished = parsed.data.status === "published";
  const supabase = await createClient();

  // If publishing, archive any other currently published ads first (whether creating or editing)
  if (isPublished) {
    let archiveQ = supabase
      .from("weekly_ads")
      .update({ status: "archived", is_active: false })
      .eq("status", "published");
    // Exclude the ad being updated from archiving itself
    if (raw.id) archiveQ = archiveQ.neq("id", raw.id as string);
    await archiveQ;
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
    // Archive all currently published ads
    await supabase
      .from("weekly_ads")
      .update({ status: "archived", is_active: false })
      .eq("status", "published");
  }

  const { error } = await supabase
    .from("weekly_ads")
    .update({ status, is_active: status === "published" })
    .eq("id", id);
  if (error) return { error: error.message };

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

  revalidatePath("/specials");
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
  revalidatePath("/specials");
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  revalidatePath("/specials");
  revalidatePath("/");
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export async function adminUpsertEvent(formData: FormData) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const supabase = await createClient();
  const raw = Object.fromEntries(formData);
  const payload = {
    title: raw.title,
    description: raw.description,
    image_url: raw.image_url || null,
    start_date: raw.start_date,
    end_date: raw.end_date,
    is_featured: raw.is_featured === "true",
    is_active: raw.is_active === "true",
  };

  const { error } = raw.id
    ? await supabase.from("events").update(payload).eq("id", raw.id as string)
    : await supabase.from("events").insert(payload);
  if (error) return { error: error.message };

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

export async function adminUpsertJob(formData: FormData) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const supabase = await createClient();
  const raw = Object.fromEntries(formData);
  const payload = {
    title: raw.title,
    department: raw.department,
    location: raw.location,
    type: raw.type,
    description: raw.description,
    paycom_url: raw.paycom_url,
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
});

export async function adminUpsertSiteSettings(formData: FormData) {
  const authErr = await requireAdmin();
  if (authErr) return { error: authErr };

  const parsed = siteSettingsSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ id: 1, ...parsed.data });
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

  const fmt = (d: string) =>
    new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const title = "Week of " + fmt(validFrom) + " \u2013 " + fmt(validTo);

  // Archive existing published ads
  await supabase
    .from("weekly_ads")
    .update({ status: "archived", is_active: false })
    .eq("status", "published");

  const { error: insertErr } = await supabase.from("weekly_ads").insert({
    title,
    valid_from: validFrom,
    valid_to:   validTo,
    pdf_url:    fileUrl,
    status:     "published",
    is_active:  true,
  });
  if (insertErr) return { error: insertErr.message };

  revalidatePath("/weekly-ad");
  revalidatePath("/");
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: USER MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────

export async function adminCreateUser(formData: FormData) {
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
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("admin_users")
    .select("id, email, created_at")
    .order("created_at", { ascending: true });
  return { data: data ?? [], error: error?.message };
}
