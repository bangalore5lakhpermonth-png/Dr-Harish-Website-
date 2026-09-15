import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeftRight, CheckCircle2, ShieldAlert, Stethoscope, Clock, Upload, RefreshCw } from 'lucide-react';
import { DOCTOR_INFO } from '../data/doctorData';

export const BeforeAfterSection: React.FC<{
  onOpenBooking?: () => void;
}> = ({ onOpenBooking }) => {
  const caseData = DOCTOR_INFO.beforeAfterCase;
  
  // Interactive Slider State (0 to 100 percentage)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom uploaded images support (localStorage fallback)
  const [customBefore, setCustomBefore] = useState<string>(() => {
    return localStorage.getItem('dr_harish_before_image') || caseData.beforeImage;
  });
  const [customAfter, setCustomAfter] = useState<string>(() => {
    return localStorage.getItem('dr_harish_after_image') || caseData.afterImage;
  });

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleFileUpload = (type: 'before' | 'after', file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      if (type === 'before') {
        setCustomBefore(dataUrl);
        localStorage.setItem('dr_harish_before_image', dataUrl);
      } else {
        setCustomAfter(dataUrl);
        localStorage.setItem('dr_harish_after_image', dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const resetImages = () => {
    setCustomBefore(caseData.beforeImage);
    setCustomAfter(caseData.afterImage);
    localStorage.removeItem('dr_harish_before_image');
    localStorage.removeItem('dr_harish_after_image');
  };

  return (
    <section id="before-after" className="py-20 bg-gradient-to-b from-slate-50 via-white to-emerald-50/20 relative overflow-hidden border-t border-b border-slate-200">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Clinical Transformation Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Dr. Harish Gowda: Before &amp; After
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Real surgical evidence of how Dr. Harish Gowda resolves complex gastrointestinal blockages and restores normal luminal anatomy with minimal access.
          </p>
        </div>

        {/* Interactive Comparison Card & Case Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Before/After Split Slider */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xl">
            {/* Quick Switch / Percentage Indicator Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Pre-Op Obstruction</span>
                <span className="text-slate-400 font-mono text-xs">vs</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Post-Op Resolution</span>
              </div>

              {/* Slider Mode Presets */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSliderPosition(10)}
                  className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${sliderPosition <= 20 ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  After View
                </button>
                <button
                  onClick={() => setSliderPosition(50)}
                  className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${sliderPosition > 20 && sliderPosition < 80 ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  Split 50/50
                </button>
                <button
                  onClick={() => setSliderPosition(90)}
                  className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${sliderPosition >= 80 ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  Before View
                </button>
              </div>
            </div>

            {/* Interactive Image Slider Container */}
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onClick={(e) => handleMove(e.clientX)}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-slate-200 bg-slate-950 shadow-inner"
            >
              {/* AFTER IMAGE (Base Layer) */}
              <img
                src={customAfter}
                alt="Post-operative surgical restoration"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-300 text-emerald-800 text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                AFTER (Resolved)
              </div>

              {/* BEFORE IMAGE (Clipped Overlay Layer) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={customBefore}
                  alt="Pre-operative endoscopic obstruction"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none max-w-none"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                    height: containerRef.current ? `${containerRef.current.clientHeight}px` : '100%',
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-rose-300 text-rose-800 text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-md">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  BEFORE (Stricture)
                </div>
              </div>

              {/* Slider Divider Line with Glowing Handle */}
              <div
                className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(16,185,129,0.9)] flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-9 h-9 -ml-4.5 rounded-full bg-white border-2 border-emerald-500 text-emerald-700 flex items-center justify-center shadow-xl">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Drag instruction & Upload Bar */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-2 text-slate-700 font-medium">
                <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-600" />
                Drag divider left or right to compare pre-op vs post-op anatomy
              </span>

              {/* Optional Local Photo Upload Triggers */}
              <div className="flex items-center gap-2">
                <label className="cursor-pointer inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 px-2 py-1 rounded bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors font-medium">
                  <Upload className="w-3 h-3 text-emerald-600" />
                  Upload Before
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('before', e.target.files[0])}
                  />
                </label>
                <label className="cursor-pointer inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 px-2 py-1 rounded bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors font-medium">
                  <Upload className="w-3 h-3 text-emerald-600" />
                  Upload After
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('after', e.target.files[0])}
                  />
                </label>
                {(customBefore !== caseData.beforeImage || customAfter !== caseData.afterImage) && (
                  <button
                    onClick={resetImages}
                    title="Reset to default case photos"
                    className="text-slate-400 hover:text-rose-600 p-1 rounded cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Case Summary & Medical Stats */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-6 shadow-xl">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                  <Clock className="w-4 h-4" />
                  {caseData.timeframe}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                  {caseData.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {caseData.caseSummary}
                </p>
              </div>

              {/* Pre-Op vs Post-Op Contrast List */}
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    Pre-Operative Pathology
                  </div>
                  <ul className="space-y-1.5">
                    {caseData.preOpFindings.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="text-rose-600 font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Post-Operative Clinical Outcome
                  </div>
                  <ul className="space-y-1.5">
                    {caseData.postOpResolution.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Doctor's Clinical Note */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Stethoscope className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Chief Surgeon&apos;s Review</div>
                  <p className="text-xs text-slate-600 mt-1 italic leading-relaxed">
                    &ldquo;{caseData.doctorNote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Direct Booking CTA */}
              {onOpenBooking && (
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 cursor-pointer"
                >
                  Schedule Second Opinion / Case Review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
