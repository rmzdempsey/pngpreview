import { Suspense } from "react";
import { PreviewDetail } from "@/components/preview-detail";

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-100 p-6">
          <div className="mx-auto max-w-4xl animate-pulse rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="h-6 w-40 rounded bg-slate-200" />
            <div className="mt-6 h-16 w-3/4 rounded bg-slate-200" />
            <div className="mt-4 h-5 w-full rounded bg-slate-200" />
          </div>
        </main>
      }
    >
      <PreviewDetail />
    </Suspense>
  );
}
