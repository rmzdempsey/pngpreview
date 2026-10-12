import fs from "node:fs/promises";
import path from "node:path";

export type PreviewPalette = {
  primary: string;
  primaryDark: string;
  accent: string;
  accentSoft: string;
  surface: string;
  ink: string;
  muted: string;
  card: string;
};

export type PreviewSite = {
  slug: string;
  name: string;
  market: string;
  tagline: string;
  description: string;
  location: string;
  logo: string;
  palette: PreviewPalette;
  features: string[];
  brochureHighlights: string[];
  layout?: "classic" | "story" | "forty" | "office" | "apollo";
};

const defaultPreviews: PreviewSite[] = [
  {
    slug: "the-property-network",
    name: "The Property Network",
    market: "Property marketing & print",
    tagline:
      "Print, brochure and marketing support for estate agents, developers and property businesses.",
    description:
      "A property-focused brochure and marketing network helping agents, developers and local businesses promote homes, services and sales campaigns with professional print and digital support.",
    location: "Across the property sector",
    logo: "/logos/the-property-network-building-logo-tight.svg",
    palette: {
      primary: "#2f83bd",
      primaryDark: "#173d67",
      accent: "#d6aa53",
      accentSoft: "#f5ecd7",
      surface: "#edf4fb",
      ink: "#0f1e32",
      muted: "#5c6974",
      card: "#ffffff",
    },
    features: ["Property brochures", "Print campaigns", "Agent marketing"],
    brochureHighlights: [
      "Developer launch packs",
      "Estate agent flyers",
      "Property signage & window graphics",
    ],
    layout: "classic",
  },
  {
    slug: "property-network-story",
    name: "The Property Network",
    market: "Property marketing & print",
    tagline:
      "Brochure-led property marketing that gives homes, developers and local services a stronger story.",
    description:
      "A story-driven property network for new homes, sales campaigns and local business promotion, combining brochure design, print support and audience-led marketing across the property sector.",
    location: "Across local property markets",
    logo: "/logos/the-property-network-building-logo-tight.svg",
    palette: {
      primary: "#2f83bd",
      primaryDark: "#173d67",
      accent: "#d6aa53",
      accentSoft: "#f5ecd7",
      surface: "#edf4fb",
      ink: "#0f1e32",
      muted: "#5c6974",
      card: "#ffffff",
    },
    features: [
      "Developer launches",
      "Sales brochures",
      "Local property promotion",
    ],
    brochureHighlights: [
      "New home launch packs",
      "Estate agent campaign design",
      "Local service advertising",
    ],
    layout: "story",
  },
  {
    slug: "property-network-forty",
    name: "The Property Network",
    market: "Property marketing & print",
    tagline:
      "A flexible property brochure platform for agents, developers and local services that want to stand out.",
    description:
      "A tile-based property marketing experience built to showcase new-home launches, local services, developer campaigns and brochure opportunities in a modern, high-clarity format.",
    location: "Across property sectors",
    logo: "/logos/the-property-network-building-logo-tight.svg",
    palette: {
      primary: "#2f83bd",
      primaryDark: "#173d67",
      accent: "#d6aa53",
      accentSoft: "#f5ecd7",
      surface: "#edf4fb",
      ink: "#0f1e32",
      muted: "#5c6974",
      card: "#ffffff",
    },
    features: [
      "Development launches",
      "Agent brochure support",
      "Property advertising",
    ],
    brochureHighlights: [
      "Property launch packs",
      "Estate agency campaigns",
      "Local business placement",
    ],
    layout: "forty",
  },
  {
    slug: "property-network-office",
    name: "The Property Network",
    market: "Marketing support for property businesses",
    tagline:
      "Free brochureware for property businesses, funded by relevant service providers and specialist advertisers.",
    description:
      "A property-business marketing support preview focused on brochureware, campaign support and partner-funded visibility for estate agents, developers and local property services.",
    location: "Property business marketing",
    logo: "/logos/the-property-network-building-logo-original.svg",
    palette: {
      primary: "#2f83bd",
      primaryDark: "#173d67",
      accent: "#d6aa53",
      accentSoft: "#f5ecd7",
      surface: "#edf4fb",
      ink: "#0f1e32",
      muted: "#5c6974",
      card: "#ffffff",
    },
    features: [
      "Brochureware support",
      "Property business campaigns",
      "Service-provider funded visibility",
    ],
    brochureHighlights: [
      "Estate agent brochure packs",
      "Developer launch marketing",
      "Supplier-backed property advertising",
    ],
    layout: "office",
  },
  {
    slug: "property-network-apollo",
    name: "The Property Network",
    market: "Property business marketing support",
    tagline:
      "Free brochureware for property businesses, funded by relevant service providers and specialist advertisers.",
    description:
      "A motion-led marketing preview built for property businesses, estate agents and developers who want clear, memorable brochure support backed by relevant local partners.",
    location: "Property business marketing",
    logo: "/logos/the-property-network-building-logo-original.svg",
    palette: {
      primary: "#2f83bd",
      primaryDark: "#173d67",
      accent: "#d6aa53",
      accentSoft: "#f5ecd7",
      surface: "#edf4fb",
      ink: "#0f1e32",
      muted: "#5c6974",
      card: "#ffffff",
    },
    features: [
      "Brochureware support",
      "Campaign storytelling",
      "Supplier-backed visibility",
    ],
    brochureHighlights: [
      "Estate agent brochure packs",
      "Developer launch support",
      "Local service advertising",
    ],
    layout: "apollo",
  },
];

const dataFilePath = path.join(process.cwd(), "data", "previews.json");

export async function getPreviews(): Promise<PreviewSite[]> {
  try {
    const file = await fs.readFile(dataFilePath, "utf8");
    const parsed = JSON.parse(file) as PreviewSite[];
    return parsed.length ? parsed : defaultPreviews;
  } catch {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    await fs.writeFile(dataFilePath, JSON.stringify(defaultPreviews, null, 2), "utf8");
    return defaultPreviews;
  }
}

export async function getPreviewBySlug(slug: string): Promise<PreviewSite | null> {
  const previews = await getPreviews();
  return previews.find((preview) => preview.slug === slug) ?? null;
}

export async function savePreviews(previews: PreviewSite[]): Promise<void> {
  await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
  await fs.writeFile(dataFilePath, JSON.stringify(previews, null, 2), "utf8");
}
