import { PreviewGenerator } from "@/components/preview-generator";
import { PreviewIndex } from "@/components/preview-index";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
              Property marketing network
            </p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
              Print & brochure portfolio
            </h1>
          </div>
        </div>
      </header>

      <PreviewIndex />
      <PreviewGenerator />
    </main>
  );
}
