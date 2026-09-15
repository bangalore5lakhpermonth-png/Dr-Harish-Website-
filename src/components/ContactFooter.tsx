import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  HeartHandshake, 
  Stethoscope, 
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Activity
} from 'lucide-react';
import { DOCTOR_INFO } from '../data/doctorData';

interface ContactFooterProps {
  onOpenBooking: () => void;
  onOpenPortal: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onOpenBooking, onOpenPortal }) => {
  return (
    <>
      <footer id="contact" className="bg-slate-100 text-slate-700 pt-16 pb-24 lg:pb-16 border-t border-slate-200 text-xs font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
            
            {/* Col 1: Doctor Identity & Summary */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 border-emerald-500 shadow-md bg-slate-900">
                  <img 
                    src="/images/dr_harish_suit.jpg" 
                    alt="Dr. Harish Gowda Logo" 
                    className="w-full h-full object-cover object-[50%_12%]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-syne text-slate-900 font-bold text-base tracking-tight">
                    {DOCTOR_INFO.name}
                  </h3>
                  <p className="text-[11px] font-mono font-bold text-emerald-700">
                    {DOCTOR_INFO.title}
                  </p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed text-xs">
                Gold Medalist laparoscopic surgeon providing high-precision minimal access surgeries for gallbladder, hernia, and gastrointestinal diseases at HIMAS Hospital, Bangalore.
              </p>

              <div className="pt-1 space-y-1.5 text-[11px] font-mono text-slate-600 font-medium">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Secretary, Surgical Society Bangalore (SSB)
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Former Assoc. Professor of Surgery, KIMS &amp; Bowring
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Founder, HIMAS Charitable Trust
                </p>
              </div>
            </div>

            {/* Col 2: Surgical Specialties */}
            <div className="lg:col-span-3 space-y-3 font-mono text-xs">
              <h4 className="font-syne text-slate-900 font-bold uppercase tracking-wider text-xs">
                Specialties &amp; Procedures
              </h4>
              <ul className="space-y-2 text-slate-600 font-medium">
                <li>
                  <a href="#surgeries" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                    <span className="text-slate-400">›</span> Laparoscopic Gallbladder
                  </a>
                </li>
                <li>
                  <a href="#surgeries" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                    <span className="text-slate-400">›</span> 3D Mesh Hernia Repair
                  </a>
                </li>
                <li>
                  <a href="#surgeries" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                    <span className="text-slate-400">›</span> Diagnostic &amp; Video Endoscopy
                  </a>
                </li>
                <li>
                  <a href="#surgeries" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                    <span className="text-slate-400">›</span> Surgical GI &amp; Appendectomy
                  </a>
                </li>
                <li>
                  <a href="#surgeries" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                    <span className="text-slate-400">›</span> Laser / MIPH Proctology
                  </a>
                </li>
                <li>
                  <a href="#scope-configurator" className="text-emerald-700 hover:underline flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3 h-3 text-emerald-600" /> Scope Configurator
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Hospital Clinic Location */}
            <div className="lg:col-span-5 space-y-3">
              <h4 className="font-syne text-slate-900 font-bold uppercase tracking-wider text-xs">
                Hospital Practice Location
              </h4>
              
              <div className="bg-white rounded-xl p-4 sm:p-5 space-y-3 border border-slate-200 shadow-sm font-mono text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-syne font-bold text-sm">
                      {DOCTOR_INFO.hospital}
                    </strong>
                    <span className="text-slate-500 leading-tight block text-[11px] pt-0.5">
                      {DOCTOR_INFO.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2.5 border-t border-slate-100">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Helpline &amp; TPA Desk</span>
                      <a
                        href={`tel:${DOCTOR_INFO.phone.replace(/\s+/g, '')}`}
                        className="text-slate-900 hover:text-emerald-700 font-bold transition-colors"
                      >
                        {DOCTOR_INFO.phone}
                      </a>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                      24/7 Casualty
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">OPD Consultation Hours</span>
                    <span className="text-slate-700 font-semibold">{DOCTOR_INFO.timings}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-syne font-bold rounded-xl transition-all shadow-md cursor-pointer text-xs"
                >
                  Book Appointment Slot
                </button>
                <a
                  href={DOCTOR_INFO.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl border border-blue-200 transition-colors flex items-center gap-1.5 text-xs shadow-2xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Google Profile</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
                <button
                  onClick={onOpenPortal}
                  className="px-3.5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-300 transition-colors cursor-pointer text-xs shadow-2xs"
                >
                  Patient Vault
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
            <p>
              © {new Date().getFullYear()} Dr. Harish Gowda — Minimal Access Surgery &amp; GI Unit, HIMAS Hospital.
            </p>
            <p className="text-center md:text-right max-w-xl">
              Medical Disclaimer: Information presented is for clinical guidance and scheduling. In emergencies, report immediately to the 24/7 triage wing of HIMAS Hospital.
            </p>
          </div>

        </div>
      </footer>

      {/* Mobile Bottom Sticky Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-2.5 flex items-center gap-2 shadow-xl">
        <a
          href={`tel:${DOCTOR_INFO.phone.replace(/\s+/g, '')}`}
          className="flex-1 py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span>Call Hospital</span>
        </a>
        <button
          onClick={onOpenBooking}
          className="flex-1 py-3 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-syne font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Consultation</span>
        </button>
      </div>
    </>
  );
};

