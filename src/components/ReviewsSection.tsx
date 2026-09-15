import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Quote } from 'lucide-react';
import { DOCTOR_INFO, ReviewItem } from '../data/doctorData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Rating Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono font-bold text-amber-900 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>5.0 / 5.0 RATING • 27+ VERIFIED GOOGLE &amp; HOSPITAL REVIEWS</span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Patient Stories &{' '}
            <span className="text-emerald-700">Recovery Outcomes</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            Read firsthand clinical outcomes from patients treated for laparoscopic gallbladder removal, hernia repairs, and GI conditions by Dr. Harish Gowda at HIMAS Hospital.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DOCTOR_INFO.reviews.map((rev: ReviewItem) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Header with Star Rating & Date */}
                <div className="flex items-center justify-between font-mono">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">
                    {rev.date}
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* Highlights Pills */}
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                  {rev.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-medium"
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>

              </div>

              {/* Patient Attribution */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-syne font-bold text-slate-900 text-sm sm:text-base">
                    {rev.patientName}
                  </h4>
                  <p className="text-xs font-mono text-emerald-700 font-bold">
                    {rev.procedure}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-mono font-bold bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Patient</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Source citation */}
        <div className="mt-10 text-center text-xs font-mono text-slate-500 font-medium">
          Reviews verified from HIMAS Hospital Patient Quality Registry &amp; Google Verified Clinical Reviews.
        </div>

      </div>
    </section>
  );
};

