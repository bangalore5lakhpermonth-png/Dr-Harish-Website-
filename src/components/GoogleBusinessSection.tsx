import React from 'react';
import { MapPin, Star, Navigation, Phone, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import { DOCTOR_INFO } from '../data/doctorData';

export const GoogleBusinessSection: React.FC = () => {
  const gbmUrl = DOCTOR_INFO.googleBusinessUrl || "https://maps.app.goo.gl/jzbiaZ7hdyRDiZds5";

  return (
    <section id="location" className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            Verified Hospital Location &amp; Google Profile
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Consult Dr. Harish Gowda at HIMAS Hospital
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Conveniently situated in Basavanagudi, South Bangalore, with state-of-the-art operating suites and round-the-clock surgical emergency admission.
          </p>
        </div>

        {/* Grid: Details Left + Map Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Google Business Profile Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-xl space-y-6">
            <div className="space-y-6">
              {/* Google Review Badge */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs border border-slate-200">
                    {/* Google G Multi-color SVG */}
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.27-2.09 3.66-5.17 3.66-9.14z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.35 24 12 24z" />
                      <path fill="#FBBC05" d="M5.28 14.28c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.59H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.41l4.03-3.13z" />
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.59l4.03 3.13c.95-2.83 3.6-4.97 6.72-4.97z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-slate-900 font-extrabold text-base">5.0</span>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">27+ Verified Google Reviews</div>
                  </div>
                </div>

                <a
                  href={gbmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-bold flex items-center gap-1 shrink-0"
                >
                  View on GBM <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Hospital Address Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200">
                    <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold text-slate-500">Hospital Address</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                      HIMAS Hospital
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      No. 3, Kariyappa Road, Opp. Krishna Rao Park, Basavanagudi, Bangalore – 560004
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-xl border border-blue-200">
                    <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold text-slate-500">OPD Consultation Hours</div>
                    <div className="text-xs text-slate-800 mt-0.5 font-semibold">
                      Monday to Saturday: 8:00 AM – 8:00 PM
                    </div>
                    <div className="text-[11px] text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 24/7 Surgical Emergency Admissions Open
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-50 rounded-xl border border-amber-200">
                    <Phone className="w-5 h-5 text-amber-600 shrink-0" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold text-slate-500">Direct Helpline</div>
                    <a
                      href={`tel:${DOCTOR_INFO.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors mt-0.5 block"
                    >
                      {DOCTOR_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action CTA Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-slate-200">
              <a
                href={gbmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20"
              >
                <Navigation className="w-4 h-4" />
                Get Directions on Google Maps
              </a>

              <a
                href={gbmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                Rate &amp; Review Dr. Harish on Google
              </a>
            </div>
          </div>

          {/* Right Column: Google Map Embed */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl relative min-h-[380px] flex flex-col">
            {/* Top Bar inside Map */}
            <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Live Navigation: Basavanagudi Center
                </span>
              </div>
              <a
                href={gbmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-bold"
              >
                Open Full Screen <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Responsive Google Maps Iframe */}
            <div className="relative flex-1 w-full min-h-[340px] bg-slate-100">
              <iframe
                title="HIMAS Hospital Basavanagudi Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.423081977799!2d77.57162467598816!3d12.944747987368297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1590ef50d7a1%3A0x6d90a5996f0ba823!2sHIMAS%20Hospital!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Overlay Badge on Map */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 text-xs shadow-lg pointer-events-none">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> HIMAS Hospital
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Opp. Krishna Rao Park, Basavanagudi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
