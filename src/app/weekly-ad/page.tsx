import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import WeeklyAdClient from "@/components/weekly-ad/WeeklyAdClient"

export const metadata: Metadata = {
  title: "Weekly Ad",
  description:
    "View this week's Junior's Supermarket deals. Great prices on meat, produce, dairy, bakery, and more. Valid while supplies last.",
}

export const revalidate = 1800

export default async function WeeklyAdPage() {
  const supabase = await createClient()

  const { data: specials, error } = await supabase
    .from("specials")
    .select("*")
    .eq("is_active", true)
    .order("sort_order")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Weekly ad fetch error:", error)
  }

  return <WeeklyAdClient specials={specials ?? []} />
}
