import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, ExternalLink, Heart, Eye, CheckCircle2, Film, Sparkles } from 'lucide-react';
import { DOCTOR_INFO, ReelItem } from '../data/doctorData';

export const ReelsSuccessSection: React.FC<{
  onOpenBooking?: () => void;
}> = ({ onOpenBooking }) => {
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);

  return (
    <section id="reels" className="py-20 bg-white relative overflow-hidden border-t border-slate-200">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Film className="w-3.5 h-3.5 text-red-600" />
            Patient Recovery Stories &amp; Quick Reels
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Real Stories, Real Recoveries
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Watch short video clips showcasing swift mobilization, pain-free outcomes, and genuine feedback after keyhole procedures.
          </p>
        </div>

        {/* Reels Grid: Vertical 9:16 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {DOCTOR_INFO.reels.map((reel, idx) => (
            <motion.div
              key={reel.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedReel(reel)}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl relative flex flex-col justify-between transition-all"
            >
              {/* Vertical 9:16 Video Canvas */}
              <div className="relative aspect-[9/16] bg-slate-900 overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${reel.youtubeId}/hqdefault.jpg`}
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/dr_harish_portrait.jpg';
                  }}
                />

                {/* Vertical Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />

                {/* Top Badge: Verified Case */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Recovery
                  </div>
                  <div className="bg-red-600 text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-xs">
                    Reel
                  </div>
                </div>

                {/* Center Play Button with ripple effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-red-700 transition-all shadow-2xl shadow-red-600/50">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black via-black/85 to-transparent">
                  <div className="flex items-center gap-3 text-xs text-neutral-300 mb-2">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-neutral-400" />
                      {reel.views}
                    </span>
                    <span className="flex items-center gap-1 text-red-400 font-semibold">
                      <Heart className="w-3.5 h-3.5 fill-red-400" />
                      {reel.likes}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {reel.title}
                  </h3>

                  <p className="text-xs text-emerald-300 font-semibold mt-1 line-clamp-1">
                    {reel.patientCase}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Prompt */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-500 mb-4 font-medium">
            Have questions regarding your surgical diagnosis or recovery expectations?
          </p>
          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
            >
              Consult Dr. Harish Gowda
            </button>
          )}
        </div>
      </div>

      {/* Interactive Shorts Modal Player */}
      <AnimatePresence>
        {selectedReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden w-full max-w-sm shadow-2xl relative flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-3.5 flex items-center justify-between border-b border-slate-200 bg-slate-50">
                <span className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                  {selectedReel.title}
                </span>
                <div className="flex items-center gap-1">
                  <a
                    href={selectedReel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-600 hover:text-red-600 rounded"
                    title="Open on YouTube Shorts"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setSelectedReel(null)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 rounded cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 9:16 Aspect Ratio Shorts Iframe */}
              <div className="relative aspect-[9/16] w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedReel.youtubeId}?autoplay=1&loop=1&playlist=${selectedReel.youtubeId}&rel=0`}
                  title={selectedReel.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-700 text-center">
                <p className="font-bold text-slate-900">{selectedReel.patientCase}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
