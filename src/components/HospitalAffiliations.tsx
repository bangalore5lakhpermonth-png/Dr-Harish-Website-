import React from 'react';
import { Building2, GraduationCap, Award, ShieldCheck, Sparkles } from 'lucide-react';

export const HospitalAffiliations: React.FC = () => {
  const institutions = [
    {
      name: 'HIMAS Hospital',
      tag: 'Primary Practice & OT',
      location: 'Basavanagudi, Bangalore',
      role: 'Lead Laparoscopic & GI Surgeon',
      icon: Building2,
      primary: true,
      color: 'emerald',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      name: 'KIMS Hospital',
      tag: '12+ Yrs Teaching',
      location: 'Bangalore',
      role: 'Former Assoc. Professor of Surgery',
      icon: GraduationCap,
      color: 'indigo',
      badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    },
    {
      name: 'Bowring & Lady Curzon',
      tag: 'BMCRI Allied Teaching Hospital',
      location: 'Shivajinagar, Bangalore',
      role: 'Associate Professor of Surgery',
      icon: GraduationCap,
      color: 'blue',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      name: 'Bangalore Medical College',
      tag: 'Alumnus (MBBS 2002–2008)',
      location: 'BMCRI Bangalore',
      role: 'Medical Foundation & Residency',
      icon: Award,
      color: 'amber',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      name: 'Mysore Medical College',
      tag: 'Alumnus (MS Surgery 2008–2012)',
      location: 'MMCRI Mysore',
      role: 'Postgraduate Surgical Training',
      icon: Award,
      color: 'purple',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
      iconBg: 'bg-purple-50 text-purple-600 border-purple-200',
    },
    {
      name: 'Surgical Society Bangalore (SSB)',
      tag: 'Executive Leadership',
      location: 'State Medical Board',
      role: 'Elected Secretary, SSB',
      icon: ShieldCheck,
      color: 'rose',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
      iconBg: 'bg-rose-50 text-rose-600 border-rose-200',
    },
  ];

  return (
    <section id="experience" className="py-16 bg-white border-t border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-800 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>INSTITUTIONAL PEDIGREE &amp; AFFILIATIONS</span>
          </div>
          <h2 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Teaching Hospitals &amp; Academic Foundations
          </h2>
          <p className="text-sm text-slate-600 font-sans leading-relaxed">
            Dr. Harish Gowda combines 18+ years of clinical surgery with over a decade of teaching as an Associate Professor of Surgery across Karnataka&apos;s apex university hospitals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {institutions.map((inst, idx) => {
            const IconComponent = inst.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all bg-white shadow-xs hover:shadow-md ${
                  inst.primary
                    ? 'border-emerald-400 ring-2 ring-emerald-500/20 bg-gradient-to-br from-emerald-50/40 via-white to-white'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`p-2.5 rounded-xl border ${inst.iconBg}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${inst.badgeBg}`}>
                    {inst.tag}
                  </span>
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="font-syne font-bold text-slate-900 text-base">{inst.name}</h3>
                  <p className="text-xs font-mono font-semibold text-emerald-700">{inst.role}</p>
                  <p className="text-xs text-slate-500 font-sans pt-0.5">{inst.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

