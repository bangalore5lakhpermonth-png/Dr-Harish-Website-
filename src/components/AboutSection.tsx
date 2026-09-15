import React from 'react';
import { 
  Award, 
  GraduationCap, 
  HeartHandshake, 
  BookOpen, 
  Check, 
  ShieldCheck, 
  Sparkles,
  MapPin,
  Clock,
  UserCheck,
  Stethoscope
} from 'lucide-react';
import { DOCTOR_INFO } from '../data/doctorData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-slate-200">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-mono font-bold text-emerald-800 shadow-xs">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>CLINICAL BIOGRAPHY &amp; PEDIGREE</span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Academic Mastery,{' '}
            <span className="text-emerald-700">Surgical Integrity</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            A Gold Medalist laparoscopic surgeon combining two decades of clinical rigor, university-level professorship, and deep dedication to transparent, affordable healthcare.
          </p>
        </div>

        {/* 2-Column Bio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Narrative Biography & Philosophy (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start pb-2">
                <div className="relative w-32 h-44 sm:w-36 sm:h-48 rounded-2xl overflow-hidden shrink-0 border-2 border-emerald-500/40 shadow-lg bg-slate-900 group">
                  <img
                    src="/images/dr_harish_suit.jpg"
                    alt="Dr. Harish Gowda - Gold Medalist Surgical Gastroenterologist"
                    className="w-full h-full object-cover object-[50%_15%] group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-xs py-0.5 px-1.5 rounded-md border border-white/20 truncate">
                    Dr. Harish Gowda
                  </span>
                </div>
                <div className="space-y-1 text-center sm:text-left flex-1">
                  <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider inline-block mb-1">
                    Gold Medalist • Surgical Gastroenterologist
                  </span>
                  <h3 className="font-syne text-xl font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                    <GraduationCap className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Roots, Education &amp; Surgical Foundations</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Consultant Surgical Gastroenterologist &amp; Minimal Access Surgeon • HIMAS Hospital
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                Born in 1984, Dr. Harish Gowda hails from a humble rural background in <strong className="text-slate-900 font-semibold">Nidasale Village, Kunigal Taluk, Tumkur district</strong>. His determination and passion for surgical excellence led him to graduate with his MBBS from Karnataka&apos;s apex institution, <strong className="text-slate-900 font-semibold">Bangalore Medical College (2002–2008)</strong>, followed by his Master of Surgery (MS) from <strong className="text-slate-900 font-semibold">Mysore Medical College (2008–2012)</strong>.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                To master cutting-edge minimal access techniques, he traveled to leading laparoscopic centers across India and completed his Diploma in Minimal Access Surgery with highest academic honors, graduating as a <strong className="text-emerald-700 font-bold">Gold Medalist in DipMAS</strong>.
              </p>

              {/* Core Philosophy 3D's Bento */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-4 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-syne font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Surgical Philosophy: The 3 Core Pillars</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono">
                  <div className="bg-white py-3 px-1 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="block font-syne font-bold text-slate-900 text-sm">Dedication</span>
                    <span className="text-[10px] text-slate-500 font-medium">To Every Patient</span>
                  </div>
                  <div className="bg-white py-3 px-1 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="block font-syne font-bold text-slate-900 text-sm">Dignity</span>
                    <span className="text-[10px] text-slate-500 font-medium">In Clinical Care</span>
                  </div>
                  <div className="bg-white py-3 px-1 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="block font-syne font-bold text-slate-900 text-sm">Discipline</span>
                    <span className="text-[10px] text-slate-500 font-medium">In Surgical Craft</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic text-center font-sans pt-1">
                  &ldquo;Our goal is to provide high-quality minimal access surgical care at an affordable, transparent cost.&rdquo;
                </p>
              </div>
            </div>

            {/* Academic Mentorship & Public Service */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                <div className="w-full sm:w-44 h-40 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-xs bg-slate-900 group">
                  <img
                    src="/images/dr_harish_teaching.jpg"
                    alt="Dr. Harish Gowda - Professorship and Surgical Masterclass Mentorship"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-syne text-xl font-bold text-slate-900 flex items-center gap-2.5">
                    <BookOpen className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>12 Years of University Professorship &amp; Mentorship</span>
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed font-sans">
                    Dr. Harish served for approximately <strong className="text-slate-900 font-semibold">12 years as an Associate Professor of Surgery at KIMS Hospital and Bowring &amp; Lady Curzon Hospital</strong>. Widely recognized as an inspiring teacher, he has trained dozens of upcoming surgical postgraduates and laparoscopic fellows across Karnataka.
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed font-sans">
                    He is the elected <strong className="text-emerald-700 font-semibold">Secretary of the Surgical Society Bangalore (SSB)</strong>, organizing academic skill conferences and live lap OT workshops. He also established the <strong className="text-slate-900 font-semibold">HIMAS Charitable Trust</strong>, providing subsidized surgical interventions for economically weaker sections.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Qualifications, Fellowships & Memberships (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Major Awards Callout (Top) */}
            <div className="bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/40 rounded-2xl p-6 border border-emerald-300 space-y-4 relative overflow-hidden shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-800 font-syne font-bold text-base">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <span>Distinguished Honors</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                  Gold Medal
                </span>
              </div>
              
              <div className="flex gap-4 items-center">
                <div className="w-24 h-28 rounded-xl overflow-hidden shrink-0 border-2 border-amber-400/40 shadow-sm bg-slate-900">
                  <img
                    src="/images/dr_harish_award.jpg"
                    alt="Dr. Harish Gowda - Awards and Felicitations"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <ul className="space-y-1.5 text-xs font-mono text-slate-800 flex-1">
                  <li className="flex items-start gap-1.5 bg-white/95 p-2 rounded-lg border border-amber-200 shadow-2xs">
                    <span className="font-bold text-amber-600">★</span>
                    <span><strong className="text-amber-800">Gold Medalist:</strong> DipMAS</span>
                  </li>
                  <li className="flex items-start gap-1.5 bg-white/95 p-2 rounded-lg border border-emerald-200 shadow-2xs">
                    <span className="font-bold text-emerald-600">★</span>
                    <span><strong className="text-slate-900">Young Surgeon Award:</strong> SSB</span>
                  </li>
                  <li className="flex items-start gap-1.5 bg-white/95 p-2 rounded-lg border border-blue-200 shadow-2xs">
                    <span className="font-bold text-blue-600">★</span>
                    <span><strong className="text-slate-900">Hon. Secretary:</strong> SSB</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Full Qualifications List */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="font-syne text-base font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Verified Qualifications</span>
                </h3>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                  HIMAS Hospital
                </span>
              </div>

              <div className="space-y-2 font-mono">
                {DOCTOR_INFO.qualifications.map((q, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-3 text-xs pb-2 border-b border-slate-100 last:border-0 last:pb-0"
                  >
                    <span className="font-bold text-emerald-800 min-w-[70px] bg-emerald-50 px-2 py-0.5 rounded text-center shrink-0 border border-emerald-200">
                      {q.code}
                    </span>
                    <span className="text-slate-700 leading-snug">
                      {q.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Memberships */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 font-mono">
              <div className="flex items-center justify-between">
                <h3 className="font-syne text-base font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Fellowships &amp; Memberships</span>
                </h3>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  FIAGES Convocation
                </span>
              </div>
              
              <div className="flex gap-4 items-center">
                <div className="w-24 h-28 rounded-xl overflow-hidden shrink-0 border-2 border-emerald-500/30 shadow-sm bg-slate-900">
                  <img
                    src="/images/dr_harish_convocation.jpg"
                    alt="Dr. Harish Gowda - IAGES Fellowship Convocation Ceremony"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="grid grid-cols-1 gap-1.5 text-xs flex-1">
                  {DOCTOR_INFO.memberships.map((mem, i) => (
                    <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
                      <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{mem}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

