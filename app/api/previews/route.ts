import { NextResponse } from "next/server";
import { getPreviews, savePreviews } from "@/lib/preview-data";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || `preview-${Date.now().toString(36)}`;
}

export async function GET() {
  const previews = await getPreviews();
  return NextResponse.json(previews);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const name = String(payload.name || "New Preview").trim();
  const slug = slugify(String(payload.slug || name));

  const preview = {
    slug,
    name,
    market: String(payload.market || "Local business"),
    tagline: String(
      payload.tagline ||
        "Free brochureware supported by local advertising and community partners.",
    ),
    description: String(
      payload.description ||
        "A brochure website for a local business, funded by advertising and designed for community leads.",
    ),
    location: String(payload.location || "Regional coverage"),
    logo: String(payload.logo || "/logos/the-property-network-building-logo.svg"),
    palette: {
      primary: String(payload.primary || "#2f83bd"),
      primaryDark: String(payload.primaryDark || "#173d67"),
      accent: String(payload.accent || "#d6aa53"),
      accentSoft: String(payload.accentSoft || "#f5ecd7"),
      surface: String(payload.surface || "#edf4fb"),
      ink: String(payload.ink || "#0f1e32"),
      muted: String(payload.muted || "#5c6974"),
      card: String(payload.card || "#ffffff"),
    },
    features: Array.isArray(payload.features)
      ? payload.features.map((item: string) => String(item))
      : ["Brochure guide", "Local deals", "Advertiser spotlights"],
    brochureHighlights: Array.isArray(payload.brochureHighlights)
      ? payload.brochureHighlights.map((item: string) => String(item))
      : ["Open homes", "Service directory", "Community events"],
  };

  const previews = await getPreviews();
  const duplicate = previews.some((entry) => entry.slug === slug);

  if (duplicate) {
    return NextResponse.json({ error: "A preview with that slug already exists." }, { status: 409 });
  }

  const nextPreviews = [preview, ...previews];
  await savePreviews(nextPreviews);

  return NextResponse.json({ preview, previews: nextPreviews.length }, { status: 201 });
}
