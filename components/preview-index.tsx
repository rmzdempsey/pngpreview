"use client";

import Link from "next/link";
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
};

export function PreviewIndex() {
  const [previews, setPreviews] = useState<PreviewSite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPreviews() {
      const response = await fetch("/api/previews");
      const nextPreviews = await response.json();
      setPreviews(nextPreviews);
      setLoading(false);
    }

    loadPreviews();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-12">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.32em] text-slate-500">
            Property marketing & print
          </p>
          <h2 className="max-w-2xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Websites and brochure campaigns for property businesses that need more enquiries.
          </h2>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Built for
          </p>
          <p className="mt-3 text-lg leading-8 text-slate-700">
            Estate agents, developers, letting teams and local property service providers needing brochureware, print collateral and advertising support.
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900">Live preview sites</h3>
        {!loading ? (
          <span className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-900">
            {previews.length} live preview sites
          </span>
        ) : null}
      </div>

      {loading ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="h-36 rounded-[22px] bg-slate-200" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {previews.map((preview) => (
            <Link
              key={preview.slug}
              href={`/previews/${preview.slug}`}
              className="group rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="rounded-[22px] border p-4"
                style={{
                  borderColor: `${preview.palette.primary}33`,
                  background: `linear-gradient(135deg, ${preview.palette.surface} 0%, white 100%)`,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border"
                      style={{
                        borderColor: preview.palette.primary,
                        background: preview.palette.primary,
                      }}
                    >
                      <img
                        src={preview.logo}
                        alt={`${preview.name} logo`}
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                        {preview.market}
                      </p>
                      <h3 className="text-xl font-black text-slate-900">{preview.name}</h3>
                    </div>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
                    style={{
                      background: `${preview.palette.accent}22`,
                      color: preview.palette.primaryDark,
                    }}
                  >
                    live
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-600">{preview.tagline}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {preview.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border px-2.5 py-1 text-[11px] font-semibold"
                      style={{
                        borderColor: `${preview.palette.primary}44`,
                        background: `${preview.palette.primary}0d`,
                        color: preview.palette.primaryDark,
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="text-sm font-semibold text-slate-500">Open preview</span>
                  <span
                    className="rounded-full px-3 py-1.5 text-sm font-bold text-white"
                    style={{ background: preview.palette.primary }}
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
