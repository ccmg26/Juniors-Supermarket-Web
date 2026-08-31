import { describe, expect, it } from "vitest";
import {
  buildWeeklyAdTitle,
  getBusinessDate,
  getWednesdayAdWeek,
  isTrustedWeeklyAdUrl,
  isWeeklyAdImage,
} from "./weekly-ad";

describe("weekly ad publishing helpers", () => {
  it("uses Wednesday through Tuesday for the current ad week", () => {
    expect(getWednesdayAdWeek(new Date(2026, 7, 30, 9))).toEqual({
      from: "2026-08-26",
      to: "2026-09-01",
    });
  });

  it("keeps Wednesday as the first day of the new week", () => {
    expect(getWednesdayAdWeek(new Date(2026, 8, 2, 9))).toEqual({
      from: "2026-09-02",
      to: "2026-09-08",
    });
  });

  it("uses the store's Central time business date", () => {
    expect(getBusinessDate(new Date("2026-09-02T03:30:00Z"))).toBe("2026-09-01");
  });

  it("builds a human-readable title", () => {
    expect(buildWeeklyAdTitle("2026-09-02", "2026-09-08")).toBe(
      "Weekly Ad – Sep 2–Sep 8",
    );
  });

  it("only trusts supported assets from the configured weekly-ads bucket", () => {
    const base = "https://project.supabase.co";
    expect(
      isTrustedWeeklyAdUrl(
        `${base}/storage/v1/object/public/weekly-ads/2026-09-02.png`,
        base,
      ),
    ).toBe(true);
    expect(isTrustedWeeklyAdUrl("https://evil.example/ad.png", base)).toBe(false);
    expect(
      isTrustedWeeklyAdUrl(`${base}/storage/v1/object/public/suggestion-uploads/ad.png`, base),
    ).toBe(false);
    expect(
      isTrustedWeeklyAdUrl(`${base}/storage/v1/object/public/weekly-ads/ad.svg`, base),
    ).toBe(false);
  });

  it("recognizes supported image assets", () => {
    expect(isWeeklyAdImage("https://example.com/ad.PNG")).toBe(true);
    expect(isWeeklyAdImage("https://example.com/ad.pdf")).toBe(false);
  });
});
