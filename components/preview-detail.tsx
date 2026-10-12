"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type PreviewPalette = {
  primary: string;
  primaryDark: string;
  accent: string;
  accentSoft: string;
  surface: string;
  ink: string;
  muted: string;
  card: string;
};

type PreviewSite = {
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

export function PreviewDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const [preview, setPreview] = useState<PreviewSite | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPreview() {
      if (!slug) {
        setLoading(false);
        return;
      }

      const response = await fetch("/api/previews");
      const previews = await response.json();
      const match = previews.find((item: PreviewSite) => item.slug === slug) ?? null;
      setPreview(match);
      setLoading(false);
    }

    loadPreview();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-4xl animate-pulse rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="h-6 w-40 rounded bg-slate-200" />
          <div className="mt-6 h-16 w-3/4 rounded bg-slate-200" />
          <div className="mt-4 h-5 w-full rounded bg-slate-200" />
        </div>
      </main>
    );
  }

  if (!preview) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-16">
        <div className="max-w-xl rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Not found</p>
          <h1 className="mt-4 text-3xl font-black text-slate-900">This preview isn’t available yet.</h1>
          <Link href="/" className="mt-6 inline-block rounded-full bg-sky-600 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white">
            Back to index
          </Link>
        </div>
      </main>
    );
  }

  const palette = preview.palette;

  if (preview.layout === "office") {
    const officePhotos = [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80",
    ];

    return (
      <main className="min-h-screen bg-slate-100 text-slate-800 antialiased">
        <section className="relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(47,131,189,0.42),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(214,170,83,0.35),transparent_28%)]" />
          <div className="absolute inset-0 opacity-25">
            <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80" alt="Office property exterior" className="h-full w-full object-cover" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-10 md:pt-16">
            <div className="mb-10 flex items-center justify-between gap-4 text-white">
              <div className="flex shrink-0 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.96] p-3 shadow-[0_12px_28px_rgba(2,15,30,0.16)] backdrop-blur-sm">
                <img src={preview.logo} alt={`${preview.name} logo`} className="h-[120px] w-auto max-w-[440px] object-contain md:h-[140px] lg:h-[160px] xl:h-[180px]" />
              </div>
              <nav className="hidden items-center gap-8 text-sm font-semibold tracking-[0.12em] text-white/85 md:flex">
                <a href="#solutions">Solutions</a>
                <a href="#properties">Properties</a>
                <a href="#contact">Contact</a>
              </nav>
            </div>

            <div className="grid max-w-6xl gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/75">Property business marketing support</p>
                <div className="mt-5 max-w-[620px] text-[clamp(2.4rem,3.5vw,4.2rem)] font-bold leading-[0.92] tracking-[0.01em] text-white" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>
                  Free brochureware
                  <br />
                  for property businesses
                </div>
                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
                  We provide marketing support and brochureware for property businesses, funded by relevant service providers and local specialist advertisers.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#contact" className="rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white" style={{ background: palette.primary }}>
                    Request brochure
                  </a>
                  <a href="#solutions" className="rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                    Explore services
                  </a>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
                <div className="rounded-[24px] border border-white/15 bg-slate-950/40 p-5 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">Who we support</p>
                  <div className="mt-5 grid gap-3">
                    {[
                      ["Estate agents", "Local sales & lettings"],
                      ["Developers", "Launch & brand campaigns"],
                      ["Property services", "Trusted local specialists"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl bg-white/5 p-3">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/65">{label}</p>
                        <p className="mt-2 text-lg font-black">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: palette.primaryDark }}>
              Marketing support for property businesses
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-[0.9] tracking-[0.02em] text-slate-900 md:text-5xl" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>Free brochureware, funded by relevant service providers</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {preview.features.map((feature, index) => (
              <div key={feature} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                <img src={officePhotos[index]} alt={feature} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white" style={{ background: palette.primary }}>
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold leading-[0.95] tracking-[0.02em] text-slate-900" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>{feature}</h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    Structured brochure and marketing support designed to help property businesses communicate clearly, build trust and reach the right local audience.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="properties" className="mx-auto max-w-7xl px-6 pb-16">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
              <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80" alt="Property marketing presentation" className="h-80 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: palette.primaryDark }}>Brochure design</p>
                <h3 className="mt-3 text-2xl font-bold leading-[0.95] tracking-[0.02em] text-slate-900" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>Clear, professional print and digital marketing for property businesses.</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  We create brochureware and campaign materials that help agents, developers and local specialists present their offer with clarity and credibility.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" alt="Property business campaign support" className="h-80 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: palette.primaryDark }}>Campaign support</p>
                <h3 className="mt-3 text-2xl font-bold leading-[0.95] tracking-[0.02em] text-slate-900" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>Support that keeps local property businesses relevant and visible.</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  Through brochureware, advertising placements and supplier-backed campaigns, we help property businesses reach the right audience without the cost barrier.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="rounded-[30px] border border-dashed p-8" style={{ borderColor: `${palette.accent}66`, background: palette.accentSoft }}>
            <div className="mb-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: palette.primaryDark }}>What’s included</p>
              <h3 className="mt-3 text-3xl font-bold leading-[0.9] tracking-[0.02em] text-slate-900" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>Commercial marketing essentials</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {preview.brochureHighlights.map((item) => (
                <div key={item} className="rounded-[22px] bg-white p-5 shadow-sm">
                  <div className="mb-3 inline-flex h-3 w-3 rounded-full" style={{ background: palette.primary }} />
                  <p className="text-lg font-black text-slate-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 lg:grid-cols-2">
          <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: palette.primaryDark }}>Request brochure</p>
            <h3 className="mt-3 text-3xl font-bold leading-[0.9] tracking-[0.02em] text-slate-900" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>Book a property brochure pack</h3>
            <form className="mt-6 grid gap-4">
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Your name" />
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Email address" />
              <textarea className="min-h-28 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Tell us which office or commercial property you want to market" />
              <button type="button" className="rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white" style={{ background: palette.primary }}>
                Send enquiry
              </button>
            </form>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: palette.primaryDark }}>Advertise with us</p>
            <h3 className="mt-3 text-3xl font-bold leading-[0.9] tracking-[0.02em] text-slate-900" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>Reach occupiers, decision-makers and local commercial audiences</h3>
            <form className="mt-6 grid gap-4">
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Company name" />
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Contact email" />
              <textarea className="min-h-28 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Tell us about your service, audience and advertising goals" />
              <button type="button" className="rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-900" style={{ background: palette.accentSoft }}>
                Request rates
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  if (preview.layout === "apollo") {
    const apolloStats = [
      { value: "Free", label: "brochureware" },
      { value: "Local", label: "property reach" },
      { value: "Trusted", label: "service partners" },
    ];

    const apolloServices = [
      {
        title: "Brochure design",
        text: "Printed and digital property literature that feels premium, clear and easy to act on.",
      },
      {
        title: "Campaign support",
        text: "Creative direction and property-market storytelling for launches, lets and continuing visibility.",
      },
      {
        title: "Partner advertising",
        text: "Relevant service provider placement that keeps brochureware free while driving real local value.",
      },
    ];

    const apolloProjects = [
      {
        title: "Agent stories",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Developer launches",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Local property support",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
      },
    ];

    return (
      <main className="min-h-screen bg-[#f2efe9] text-slate-900 antialiased">
        <section className="relative overflow-hidden bg-[#102437] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(47,131,189,0.38),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(214,170,83,0.28),transparent_25%)]" />
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80"
              alt="Property marketing background"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-12 md:pt-16">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <div className="flex items-center justify-center lg:justify-center">
                <div className="flex aspect-square w-[min(76vw,520px)] items-center justify-center rounded-[28px] bg-white p-[20px] shadow-[0_18px_38px_rgba(2,15,30,0.22)]">
                  <img src={preview.logo} alt={`${preview.name} logo`} className="max-h-full max-w-full object-contain" />
                </div>
              </div>

              <div className="animate-[fadeUp_0.8s_ease-out]">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/80">Property business marketing support</p>
                <h2 className="mt-6 max-w-[760px] text-[clamp(2.8rem,4vw,6rem)] font-bold leading-[0.82] tracking-[0.02em] text-white" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>
                  The Property Network
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
                  Free brochureware for property businesses, delivered through relevant local service providers and specialist advertisers.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#contact" className="rounded-full bg-[#2f83bd] px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(47,131,189,0.35)]">
                    Request brochure
                  </a>
                  <a href="#services" className="rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                    Explore services
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {apolloStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="animate-[fadeUp_0.8s_ease-out] rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/10"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.26em] text-white/65">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="who" className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,30,50,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
                alt="Property business marketing scene"
                className="h-[420px] w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-700">Who we are</p>
              <h3 className="mt-4 max-w-xl text-4xl font-bold leading-[0.9] tracking-[0.02em] text-slate-900 md:text-5xl" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>
                A marketing partner for the property sector.
              </h3>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                We help property businesses tell clearer stories, reach the right audience and present their offer with confidence — through brochureware, campaign support and partner-funded visibility.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Brochure & print support",
                  "Brand-led property messaging",
                  "Local audience reach",
                  "Partner-driven visibility",
                ].map((item) => (
                  <div key={item} className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sm font-black text-sky-700">✓</div>
                    <p className="text-base font-black text-slate-900">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-700">What we do</p>
              <h3 className="mt-3 text-4xl font-bold leading-[0.9] tracking-[0.02em] text-slate-900 md:text-5xl" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>Services designed for property businesses</h3>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {apolloServices.map((service, index) => (
                <article
                  key={service.title}
                  className="group rounded-[28px] border border-slate-200 bg-slate-50 p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(15,30,50,0.08)]"
                  style={{ animation: "fadeUp 0.8s ease-out both", animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#102437] text-lg font-black text-white">
                    0{index + 1}
                  </div>
                  <h4 className="text-2xl font-bold leading-[0.95] tracking-[0.02em] text-slate-900" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>{service.title}</h4>
                  <p className="mt-4 leading-7 text-slate-600">{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-700">Recent work</p>
            <h3 className="mt-3 text-4xl font-bold leading-[0.9] tracking-[0.02em] text-slate-900 md:text-5xl" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>Creative support that feels relevant and local</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {apolloProjects.map((project) => (
              <article key={project.title} className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl">
                <div className="overflow-hidden">
                  <img src={project.image} alt={project.title} className="h-64 w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-sky-700">Property campaign</p>
                  <h4 className="mt-3 text-2xl font-bold leading-[0.95] tracking-[0.02em] text-slate-900" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>{project.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#102437] py-20 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-200">Why it works</p>
                <h3 className="mt-3 text-4xl font-bold leading-[0.9] tracking-[0.02em] text-white md:text-5xl" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>Clear stories, stronger visibility, better local reach.</h3>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["Message", "Straightforward, clear and property-focused"],
                  ["Reach", "Built for the audiences that matter"],
                  ["Value", "Free brochureware backed by relevant providers"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-sky-200">{label}</p>
                    <p className="mt-3 text-lg font-black text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-2">
          <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_25px_60px_rgba(15,30,50,0.08)]">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-700">Request brochure</p>
            <h3 className="mt-3 text-3xl font-bold leading-[0.9] tracking-[0.02em] text-slate-900" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>Book your property marketing support</h3>
            <form className="mt-6 grid gap-4">
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Your name" />
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Email address" />
              <textarea className="min-h-28 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Tell us about your property business or campaign" />
              <button type="button" className="rounded-full bg-[#2f83bd] px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5">
                Send enquiry
              </button>
            </form>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-slate-900 p-7 text-white shadow-[0_25px_60px_rgba(15,30,50,0.18)]">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-200">Advertise with us</p>
            <h3 className="mt-3 text-3xl font-bold leading-[0.9] tracking-[0.02em] text-white" style={{ fontFamily: "var(--font-brand-sans), sans-serif" }}>Reach the property market through trusted brochureware</h3>
            <form className="mt-6 grid gap-4">
              <input className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white placeholder:text-slate-300" placeholder="Company name" />
              <input className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white placeholder:text-slate-300" placeholder="Contact email" />
              <textarea className="min-h-28 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white placeholder:text-slate-300" placeholder="Tell us about your service and audience" />
              <button type="button" className="rounded-full bg-[#d6aa53] px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-900 transition hover:-translate-y-0.5">
                Request rates
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  if (preview.layout === "forty") {
    const tiles = [
      { title: "New homes", text: "Launch campaigns", tone: "from-sky-600 to-sky-400" },
      { title: "Agent marketing", text: "Brochure design", tone: "from-slate-700 to-slate-500" },
      { title: "Commercial property", text: "Investor storytelling", tone: "from-amber-500 to-yellow-400" },
      { title: "Lettings", text: "Local demand", tone: "from-cyan-700 to-blue-500" },
      { title: "Property services", text: "Trusted business partners", tone: "from-indigo-700 to-blue-500" },
      { title: "Print & media", text: "Audience reach", tone: "from-amber-600 to-amber-500" },
    ];

    return (
      <main className="min-h-screen bg-slate-50 text-slate-800">
        <header className="border-b border-white/10" style={{ background: palette.primaryDark }}>
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 text-white">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/10">
                <img src={preview.logo} alt={`${preview.name} logo`} className="h-8 w-8 object-contain" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/70">{preview.market}</p>
                <h1 className="text-lg font-black">{preview.name}</h1>
              </div>
            </div>
            <nav className="hidden items-center gap-5 text-sm font-semibold text-white/85 md:flex">
              <a href="#one">Services</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-6 pb-8 pt-8 md:pt-12">
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: palette.primaryDark }}>
                  Local property marketing
                </p>
                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
                  {preview.tagline}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8" style={{ color: palette.muted }}>
                  {preview.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#contact" className="rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white" style={{ background: palette.primary }}>
                    Get started
                  </a>
                  <a href="#about" className="rounded-full border px-5 py-3 text-sm font-bold uppercase tracking-[0.2em]" style={{ borderColor: `${palette.primary}55`, color: palette.primaryDark }}>
                    View offer
                  </a>
                </div>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-md">
                <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80" alt="Modern office building" className="h-72 w-full object-cover" />
                <div className="rounded-b-[28px] p-6" style={{ background: `linear-gradient(135deg, ${palette.primaryDark}, ${palette.primary})` }}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/75">Coverage</p>
                  <h3 className="mt-3 text-3xl font-black text-white">Trusted by agents, developers and local property businesses.</h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {[
                      ["Brochures", "Print & digital"],
                      ["Audience", "Buyers & movers"],
                      ["Support", "Campaign strategy"],
                      ["Reach", "Local visibility"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">{label}</p>
                        <p className="mt-2 text-base font-black text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="one" className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tiles.map((tile) => (
              <article key={tile.title} className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className={`h-52 bg-gradient-to-br ${tile.tone} p-6`}>
                  <div className="flex h-full items-end rounded-[20px] border border-white/40 bg-black/10 p-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/75">The Property Network</p>
                      <h3 className="mt-2 text-2xl font-black text-white">{tile.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: palette.primaryDark }}>{tile.text}</p>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    Tailored marketing and brochure support for local property campaigns, developer launches and business visibility.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-6 py-10">
          <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: palette.primaryDark }}>
                  Why it works
                </p>
                <h3 className="mt-3 text-3xl font-black text-slate-900">A brochure network designed for the property market.</h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {preview.features.map((feature) => (
                  <div key={feature} className="rounded-[22px] border border-slate-200 bg-slate-50 p-5">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white" style={{ background: palette.primary }}>
                      ✓
                    </div>
                    <p className="text-lg font-black text-slate-900">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="rounded-[30px] border border-dashed p-8" style={{ borderColor: `${palette.accent}66`, background: palette.accentSoft }}>
            <div className="mb-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: palette.primaryDark }}>
                Included in every campaign
              </p>
              <h3 className="mt-3 text-3xl font-black text-slate-900">Brochure, print and marketing essentials</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {preview.brochureHighlights.map((item) => (
                <div key={item} className="rounded-[20px] bg-white p-5 shadow-sm">
                  <div className="mb-3 inline-flex h-3 w-3 rounded-full" style={{ background: palette.primary }} />
                  <p className="text-lg font-black text-slate-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-6 pb-20 pt-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: palette.primaryDark }}>
                Send enquiry
              </p>
              <h3 className="mt-3 text-3xl font-black text-slate-900">Request brochure details</h3>
              <form className="mt-6 grid gap-4">
                <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Name" />
                <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Email address" />
                <textarea className="min-h-28 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Tell us about your property, development or campaign" />
                <button type="button" className="rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white" style={{ background: palette.primary }}>
                  Send message
                </button>
              </form>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: palette.primaryDark }}>
                Advertise here
              </p>
              <h3 className="mt-3 text-3xl font-black text-slate-900">Promote your services to property buyers and businesses</h3>
              <form className="mt-6 grid gap-4">
                <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Business name" />
                <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Contact email" />
                <textarea className="min-h-28 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Tell us about your service, audience and campaign needs" />
                <button type="button" className="rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-900" style={{ background: palette.accentSoft }}>
                  Request rates
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (preview.layout === "story") {
    const storySpotlights = [
      {
        eyebrow: "Developers",
        title: "Launch homes with a story buyers remember.",
        copy:
          "From plot brochures to rich sales literature, we turn property launches into polished campaigns that help off-plan developments stand out in a crowded local market.",
        stats: ["Launch packs", "Sales literature", "Digital outreach"],
      },
      {
        eyebrow: "Agents",
        title: "Market your listings with persuasive property storytelling.",
        copy:
          "Whether you’re promoting a premium home, a managed lets portfolio or a seasonal neighbourhood campaign, we create brochureware and creative messaging that sells the lifestyle, not just the square footage.",
        stats: ["Local expertise", "Brochure design", "Campaign support"],
      },
      {
        eyebrow: "Local businesses",
        title: "Reach the right audience in the property ecosystem.",
        copy:
          "Our brochure network gives service providers and local brands direct access to buyers, movers and property professionals through highly relevant editorial and advertising placements.",
        stats: ["Print ads", "Feature spots", "Audience reach"],
      },
    ];

    const galleryCards = [
      { title: "New homes", tagline: "Launch brochures and sales packs", tone: "bg-sky-100" },
      { title: "Commercial spaces", tagline: "Investor-ready property marketing", tone: "bg-amber-100" },
      { title: "Lettings", tagline: "Resident-driven brochure campaigns", tone: "bg-blue-100" },
      { title: "Build-to-rent", tagline: "Brand-led property storytelling", tone: "bg-indigo-100" },
      { title: "Local services", tagline: "Trusted partners for property moves", tone: "bg-stone-100" },
      { title: "Property journal", tagline: "Editorial coverage and local features", tone: "bg-slate-100" },
    ];

    const serviceItems = [
      { title: "Brochure design", text: "Printed and digital property guides shaped for sales, lettings and local positioning." },
      { title: "Campaign planning", text: "Strategic marketing support that keeps each launch aligned with buyer intent and seasonality." },
      { title: "Advertising", text: "Ad placements for local businesses that want to reach the property market at the right moment." },
      { title: "Print production", text: "From leaflets to premium brochure sets, we manage creative and production quality end to end." },
      { title: "Lead generation", text: "Forms, enquiry journeys and local awareness assets built to convert attention into action." },
      { title: "Community reach", text: "Targeted messaging for developers, estate agents and service providers across the region." },
    ];

    return (
      <main className="min-h-screen bg-slate-50 text-slate-800 antialiased">
        <header
          className="sticky top-0 z-30 border-b border-white/10"
          style={{ background: palette.primaryDark, backdropFilter: "blur(8px)" }}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 text-white">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10">
                <img src={preview.logo} alt={`${preview.name} logo`} className="h-9 w-9 object-contain" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">{preview.market}</p>
                <h1 className="text-lg font-black">{preview.name}</h1>
              </div>
            </div>
            <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
              <a href="#about" className="text-white/80 transition hover:text-white">About</a>
              <a href="#campaigns" className="text-white/80 transition hover:text-white">Campaigns</a>
              <a href="#contact" className="text-white/80 transition hover:text-white">Contact</a>
            </nav>
          </div>
        </header>

        <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-12 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="animate-[fadeIn_0.7s_ease-out]">
            <p className="text-xs font-bold uppercase tracking-[0.32em]" style={{ color: palette.primaryDark }}>
              Property marketing & print
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              {preview.tagline}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8" style={{ color: palette.muted }}>
              {preview.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:scale-[1.02]"
                style={{ background: palette.primary }}
              >
                Request brochure
              </a>
              <a
                href="#advertise"
                className="rounded-full border px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] transition hover:scale-[1.02]"
                style={{ borderColor: `${palette.primary}66`, color: palette.primaryDark }}
              >
                Advertise here
              </a>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_25px_60px_rgba(15,30,50,0.12)] transition duration-300 hover:-translate-y-1">
            <div
              className="rounded-[28px] p-6"
              style={{ background: `linear-gradient(135deg, ${palette.primaryDark}, ${palette.primary})` }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/70">Featured network</p>
              <h3 className="mt-4 text-3xl font-black text-white">Property stories that move buyers.</h3>
              <div className="mt-6 grid gap-4">
                {[
                  ["Coverage", preview.location],
                  ["Format", "Brochures & web"],
                  ["Reach", "Local buyers & businesses"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/70">{label}</p>
                    <p className="mt-2 text-lg font-black text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 pb-8">
          <div className="grid gap-6 md:grid-cols-3">
            {storySpotlights.map((item, index) => (
              <div key={item.title} className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-full text-lg font-black text-white"
                  style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})` }}
                >
                  {index + 1}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: palette.primaryDark }}>
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 text-xl font-black text-slate-900">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.copy}</p>
                <ul className="mt-5 space-y-2 text-sm font-semibold text-slate-700">
                  {item.stats.map((stat) => (
                    <li key={stat} className="flex items-center gap-2">
                      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: palette.accent }} />
                      {stat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="campaigns" className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: palette.primaryDark }}>
              Showcase
            </p>
            <h3 className="mt-3 text-3xl font-black text-slate-900 md:text-5xl">Campaigns built for the property market</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {galleryCards.map((card, index) => (
              <article key={card.title} className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <img
                  src={[
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
                  ][index]}
                  alt={card.title}
                  className="h-52 w-full object-cover"
                />
                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: palette.primaryDark }}>
                    Property focus
                  </span>
                  <h4 className="mt-3 text-2xl font-black text-slate-900">{card.title}</h4>
                  <p className="mt-2 text-sm font-medium text-slate-700">{card.tagline}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Tailored marketing collateral, local guidance and print-ready artwork designed to fit the needs of buyers, developers and property professionals.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-8">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: palette.primaryDark }}>
                Our offer
              </p>
              <h3 className="mt-3 text-3xl font-black text-slate-900">Everything property businesses need in one brochure network</h3>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {serviceItems.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-dashed p-5" style={{ borderColor: `${palette.accent}66`, background: palette.accentSoft }}>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-3 w-3 rounded-full" style={{ background: palette.primary }} />
                    <h4 className="text-lg font-black text-slate-900">{item.title}</h4>
                  </div>
                  <p className="mt-3 leading-7 text-slate-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 pt-10 lg:grid-cols-2">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: palette.primaryDark }}>
              Request brochure
            </p>
            <h3 className="mt-3 text-3xl font-black text-slate-900">Get your property brochure pack</h3>
            <form className="mt-6 grid gap-4">
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Your name" />
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Email address" />
              <textarea className="min-h-28 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Tell us which property, development or market you want to feature" />
              <button type="button" className="rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:scale-[1.02]" style={{ background: palette.primary }}>
                Send enquiry
              </button>
            </form>
          </div>

          <div id="advertise" className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: palette.primaryDark }}>
              Advertise with us
            </p>
            <h3 className="mt-3 text-3xl font-black text-slate-900">Promote your business to the property market</h3>
            <form className="mt-6 grid gap-4">
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Company name" />
              <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Contact email" />
              <textarea className="min-h-28 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Tell us about your audience, service and advertising objectives" />
              <button type="button" className="rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-900 transition hover:scale-[1.02]" style={{ background: palette.accentSoft }}>
                Request ad rates
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen"
      style={{
        background: `linear-gradient(180deg, ${palette.surface} 0%, #f8fafc 100%)`,
        color: palette.ink,
      }}
    >
      <header
        className="border-b"
        style={{ borderColor: `${palette.primary}33`, background: palette.primaryDark }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 text-white">
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/8"
              style={{ background: palette.card }}
            >
              <img src={preview.logo} alt={`${preview.name} logo`} className="h-9 w-9 object-contain" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">
                {preview.market}
              </p>
              <h1 className="text-xl font-black">{preview.name}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm font-semibold">
            <Link href="/" className="rounded-full border border-white/20 px-4 py-2 text-white/90">
              Preview index
            </Link>
            <a
              href="#contact"
              className="rounded-full px-4 py-2 text-white"
              style={{ background: palette.primary }}
            >
              Request a booklet
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.34em]" style={{ color: palette.primaryDark }}>
              Free brochureware
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-black tracking-tight md:text-6xl">
              {preview.name}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8" style={{ color: palette.muted }}>
              {preview.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white"
                style={{ background: palette.primary }}
              >
                Request brochure
              </a>
              <a
                href="#advertise"
                className="rounded-full border px-5 py-3 text-sm font-bold uppercase tracking-[0.2em]"
                style={{ borderColor: `${palette.primary}55`, color: palette.primaryDark }}
              >
                Advertise here
              </a>
            </div>
          </div>

          <div
            className="rounded-[28px] border p-6 shadow-sm"
            style={{ background: palette.card, borderColor: `${palette.primary}22` }}
          >
            <div className="rounded-[24px] border border-dashed p-5" style={{ borderColor: `${palette.accent}66` }}>
              <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: palette.primaryDark }}>
                Snapshot
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  ["Local reach", preview.location],
                  ["Audience", "Buyers & tenants"],
                  ["Model", "Ad-funded"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl p-3" style={{ background: palette.accentSoft }}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: palette.primaryDark }}>
                      {label}
                    </p>
                    <p className="mt-2 text-base font-black">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          className="rounded-[28px] border p-7 shadow-sm"
          style={{ background: palette.card, borderColor: `${palette.primary}22` }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: palette.primaryDark }}>
            Why readers use it
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {preview.features.map((feature) => (
              <div key={feature} className="rounded-2xl p-4" style={{ background: palette.surface }}>
                <div
                  className="mb-3 h-10 w-10 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})` }}
                />
                <p className="text-base font-black text-slate-900">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-[28px] border p-7 shadow-sm"
          style={{ background: `linear-gradient(135deg, ${palette.primaryDark}, ${palette.primary})`, borderColor: `${palette.primary}22` }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/75">
            Included in every brochure
          </p>
          <ul className="mt-6 space-y-3 text-lg text-white/90">
            {preview.brochureHighlights.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="inline-flex h-3 w-3 rounded-full bg-white" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
          ].map((photo, index) => (
            <div key={photo} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
              <img src={photo} alt="Property photography" className="h-72 w-full object-cover" />
              <div className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: palette.primaryDark }}>
                  {index === 0 ? "Property view" : index === 1 ? "Commercial space" : "Workplace setting"}
                </p>
                <p className="mt-2 text-lg font-black text-slate-900">
                  {index === 0 ? "Professional office environments" : index === 1 ? "High-visibility commercial locations" : "Premium workspaces and amenity-led settings"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 lg:grid-cols-2">
        <div
          className="rounded-[30px] border p-6 shadow-sm"
          style={{ background: palette.card, borderColor: `${palette.primary}22` }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: palette.primaryDark }}>
            Request brochure
          </p>
          <h3 className="mt-3 text-3xl font-black text-slate-900">Get a printed or digital guide</h3>
          <form className="mt-6 grid gap-4">
            <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Your name" />
            <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Email address" />
            <textarea className="min-h-28 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Tell us what you want in your brochure" />
            <button type="button" className="rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white" style={{ background: palette.primary }}>
              Send enquiry
            </button>
          </form>
        </div>

        <div
          id="advertise"
          className="rounded-[30px] border p-6 shadow-sm"
          style={{ background: palette.card, borderColor: `${palette.accent}55` }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: palette.primaryDark }}>
            Advertise with us
          </p>
          <h3 className="mt-3 text-3xl font-black text-slate-900">Promote your business in the brochure</h3>
          <form className="mt-6 grid gap-4">
            <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Company name" />
            <input className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Contact email" />
            <textarea className="min-h-28 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" placeholder="Tell us about your campaign and audience" />
            <button type="button" className="rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-900" style={{ background: palette.accentSoft }}>
              Request ad rates
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
