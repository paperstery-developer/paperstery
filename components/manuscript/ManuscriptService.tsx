// app/services/manuscript-development/page.tsx
import React from "react";
import {
  CheckCircle2,
  Search,
  PenTool,
  Fingerprint,
  ArrowRight,
} from "lucide-react";

export default function ManuscriptService() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 selection:bg-amber-100">
      {/* Hero Section */}
      <section className="px-6 py-20 lg:py-32 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-amber-700 font-medium tracking-widest uppercase text-sm mb-4 block">
              Service Excellence
            </span>
            <h1 className="text-5xl lg:text-6xl font-serif leading-tight mb-6">
              Refine Your Vision with <br />
              <span className="italic text-slate-700">Professional Rigor.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-lg">
              For authors who have a draft but need structure, clarity, and
              professional refinement to prepare for the world stage.
            </p>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-medium hover:bg-slate-800 transition-all flex items-center gap-2 group">
              Submit Your Draft for Review
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center text-sm">
                ?
              </span>
              Who it is for
            </h3>
            <ul className="space-y-4">
              {[
                "Fiction writers",
                "Memoirists",
                "Poets with completed or partial drafts",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif mb-6">Our Approach</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We provide deep editorial guidance to ensure your work meets high
            professional standards while honoring the core of your story.
          </p>
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Benefit 1 */}
          <div className="group p-8 bg-white border border-slate-100 rounded-2xl hover:border-amber-200 transition-colors">
            <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-50 transition-colors">
              <Search className="w-6 h-6 text-slate-700 group-hover:text-amber-700" />
            </div>
            <h4 className="text-xl font-bold mb-3">Structural Analysis</h4>
            <p className="text-slate-600 leading-relaxed">
              Deep-dive clarity enhancement to ensure your narrative arc and
              logic are airtight.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="group p-8 bg-white border border-slate-100 rounded-2xl hover:border-amber-200 transition-colors">
            <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-50 transition-colors">
              <PenTool className="w-6 h-6 text-slate-700 group-hover:text-amber-700" />
            </div>
            <h4 className="text-xl font-bold mb-3">Professional Refinement</h4>
            <p className="text-slate-600 leading-relaxed">
              Polishing every sentence to ensure publication readiness for the
              global market.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="group p-8 bg-white border border-slate-100 rounded-2xl hover:border-amber-200 transition-colors">
            <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-50 transition-colors">
              <Fingerprint className="w-6 h-6 text-slate-700 group-hover:text-amber-700" />
            </div>
            <h4 className="text-xl font-bold mb-3">Voice Preservation</h4>
            <p className="text-slate-600 leading-relaxed">
              We refine the technicality without losing the unique "soul" and
              style of the author.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 text-center">
        <div className="inline-block p-1 bg-amber-50 rounded-full px-4 py-1 text-amber-800 text-sm font-medium mb-6">
          Ready to start?
        </div>
        <h2 className="text-4xl font-serif mb-8">
          Let's make your story a legacy.
        </h2>
        <button className="bg-amber-700 text-white px-10 py-4 rounded-full font-medium hover:bg-amber-800 transition-all shadow-lg shadow-amber-200">
          Submit Your Draft
        </button>
      </section>
    </div>
  );
}
