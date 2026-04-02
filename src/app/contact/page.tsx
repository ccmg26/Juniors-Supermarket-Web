import type { Metadata } from "next";
import ContactClient from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Junior's Supermarket. Call 956-JUNIORS, find a store near you, or send us a message. Questions, feedback, and suggestions welcome — we're here 7 AM to 10 PM daily.",
};

export default function ContactPage() {
  return <ContactClient />;
}
