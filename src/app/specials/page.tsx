import { redirect } from "next/navigation";

// Weekly Specials page has been removed — redirect to the Weekly Ad page.
export default function SpecialsPage() {
  redirect("/weekly-ad");
}
