"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const defaultForm = {
  name: "Property Print Studio",
  tagline: "Print, marketing and brochure support for property businesses.",
  market: "Property marketing & print",
  logo: "/logos/the-property-network-building-logo-tight.svg",
  primary: "#2f83bd",
  primaryDark: "#173d67",
  accent: "#d6aa53",
  accentSoft: "#f5ecd7",
  surface: "#edf4fb",
  ink: "#0f1e32",
  muted: "#5c6974",
};

export function PreviewGenerator() {
  const router = useRouter();
  const [form, setForm] = useState(defaultForm);
  const [status, setStatus] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Generating preview...");

    const response = await fetch("/api/previews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        description:
          "A branded brochure website that shares local listings, guides and community partner highlights.",
      }),
    });

    if (!response.ok) {
      const payload = await response.json();
      setStatus(payload.error ?? "Preview generation failed.");
      return;
    }

    const payload = await response.json();
    setStatus("Preview created.");
    router.push(`/previews/${payload.preview.slug}`);
    router.refresh();
  };

  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-4">
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
              New preview
            </p>
            <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
              Generate another brochure site
            </h3>
          </div>
          {status ? (
            <div className="rounded-full border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-900">
              {status}
            </div>
          ) : null}
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Brand name
            <input
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-base text-slate-900 outline-none ring-0 transition focus:border-sky-400"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Market
            <input
              value={form.market}
              onChange={(event) => handleChange("market", event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-base text-slate-900 outline-none ring-0 transition focus:border-sky-400"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Tagline
            <input
              value={form.tagline}
              onChange={(event) => handleChange("tagline", event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-base text-slate-900 outline-none ring-0 transition focus:border-sky-400"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Primary colour
            <input
              type="color"
              value={form.primary}
              onChange={(event) => handleChange("primary", event.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-1 py-1"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Accent colour
            <input
              type="color"
              value={form.accent}
              onChange={(event) => handleChange("accent", event.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-1 py-1"
            />
          </label>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.24em] text-white shadow-sm transition hover:opacity-95"
              style={{ background: form.primary }}
            >
              Generate preview
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
