import type { Metadata } from "next";
import WeeklyAdClient from "@/components/weekly-ad/WeeklyAdClient";

export const metadata: Metadata = {
  title: "Weekly Ad",
  description:
    "View this week's Junior's Supermarket deals. Great prices on meat, produce, dairy, bakery, and more. Valid while supplies last.",
};

export const revalidate = 3600;

export default function WeeklyAdPage() {
  return <WeeklyAdClient />;
}
