"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ── Contact ──────────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContact(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert(parsed.data);

  if (error) return { error: "Failed to submit. Please try again." };
  return { success: true };
}

// ── Leasing ───────────────────────────────────────────────────────────────────
const leasingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  preferred_location: z.string().min(2),
  message: z.string().min(10),
});

export async function submitLeasing(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = leasingSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leasing_inquiries").insert(parsed.data);

  if (error) return { error: "Failed to submit. Please try again." };
  return { success: true };
}

// ── Suggestions ───────────────────────────────────────────────────────────────
const suggestionSchema = z.object({
  type: z.enum(["Product Request", "Concern", "Suggestion"]),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export async function submitSuggestion(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = suggestionSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

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

// ── Deals Club ────────────────────────────────────────────────────────────────
const dealsClubSchema = z.object({
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
});

export async function submitDealsClub(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = dealsClubSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("deals_club_subscribers")
    .upsert(parsed.data, { onConflict: "email" });

  if (error) return { error: "Failed to subscribe. Please try again." };
  return { success: true };
}

// ── Admin: Store CRUD ─────────────────────────────────────────────────────────
export async function adminUpsertStore(formData: FormData) {
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

  if (raw.id) {
    const { error } = await supabase
      .from("stores")
      .update(payload)
      .eq("id", raw.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("stores").insert(payload);
    if (error) return { error: error.message };
  }

  revalidatePath("/locations");
  return { success: true };
}

export async function adminDeleteStore(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("stores").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/locations");
  return { success: true };
}

// ── Admin: Weekly Ad CRUD ─────────────────────────────────────────────────────
export async function adminUpsertWeeklyAd(formData: FormData) {
  const supabase = await createClient();
  const raw = Object.fromEntries(formData);

  const payload = {
    title: raw.title,
    valid_from: raw.valid_from,
    valid_to: raw.valid_to,
    pdf_url: raw.pdf_url,
    is_active: raw.is_active === "true",
  };

  if (raw.id) {
    const { error } = await supabase
      .from("weekly_ads")
      .update(payload)
      .eq("id", raw.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("weekly_ads").insert(payload);
    if (error) return { error: error.message };
  }

  revalidatePath("/weekly-ad");
  return { success: true };
}

// ── Admin: Special CRUD ───────────────────────────────────────────────────────
export async function adminUpsertSpecial(formData: FormData) {
  const supabase = await createClient();
  const raw = Object.fromEntries(formData);

  const payload = {
    title: raw.title,
    price: raw.price,
    original_price: raw.original_price || null,
    category: raw.category,
    image_url: raw.image_url || null,
    valid_from: raw.valid_from,
    valid_to: raw.valid_to,
    disclaimer: raw.disclaimer || null,
    is_active: raw.is_active === "true",
  };

  if (raw.id) {
    const { error } = await supabase
      .from("specials")
      .update(payload)
      .eq("id", raw.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("specials").insert(payload);
    if (error) return { error: error.message };
  }

  revalidatePath("/specials");
  return { success: true };
}

// ── Admin: Event CRUD ─────────────────────────────────────────────────────────
export async function adminUpsertEvent(formData: FormData) {
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

  if (raw.id) {
    const { error } = await supabase
      .from("events")
      .update(payload)
      .eq("id", raw.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("events").insert(payload);
    if (error) return { error: error.message };
  }

  revalidatePath("/events");
  return { success: true };
}

// ── Admin: Job CRUD ───────────────────────────────────────────────────────────
export async function adminUpsertJob(formData: FormData) {
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

  if (raw.id) {
    const { error } = await supabase
      .from("jobs")
      .update(payload)
      .eq("id", raw.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("jobs").insert(payload);
    if (error) return { error: error.message };
  }

  revalidatePath("/jobs");
  return { success: true };
}
