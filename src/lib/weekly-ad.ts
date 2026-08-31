const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

function toLocalDate(value: string): Date {
  if (!DATE_ONLY.test(value)) throw new Error("Invalid date");
  return new Date(`${value}T12:00:00`);
}

function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Return the Wednesday–Tuesday ad week containing the supplied date. */
export function getWednesdayAdWeek(now = new Date()): { from: string; to: string } {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
  const daysSinceWednesday = (start.getDay() - 3 + 7) % 7;
  start.setDate(start.getDate() - daysSinceWednesday);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { from: toDateInputValue(start), to: toDateInputValue(end) };
}

export function getBusinessDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

export function buildWeeklyAdTitle(from: string, to: string): string {
  const format = (value: string) =>
    toLocalDate(value).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `Weekly Ad – ${format(from)}–${format(to)}`;
}

export function isWeeklyAdImage(url: string): boolean {
  try {
    const pathname = new URL(url).pathname.toLowerCase();
    return /\.(png|jpe?g|webp)$/.test(pathname);
  } catch {
    return false;
  }
}

export function isTrustedWeeklyAdUrl(url: string, supabaseUrl: string): boolean {
  try {
    const file = new URL(url);
    const project = new URL(supabaseUrl);
    return (
      file.origin === project.origin &&
      file.pathname.startsWith("/storage/v1/object/public/weekly-ads/") &&
      /\.(png|jpe?g|webp|pdf)$/i.test(file.pathname)
    );
  } catch {
    return false;
  }
}
