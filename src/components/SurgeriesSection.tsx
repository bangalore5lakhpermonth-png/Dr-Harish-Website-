import React, { useState } from 'react';
import { 
  ShieldPlus, 
  Activity, 
  HeartPulse, 
  Eye, 
  Stethoscope, 
  Ambulance, 
  CheckCircle2, 
  Clock, 
  Calendar,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { DOCTOR_INFO, SurgeryDetail } from '../data/doctorData';
import { EsophagusAnatomicalGraphic } from './EsophagusAnatomicalGraphic';

interface SurgeriesSectionProps {
  onSelectSpecialty: (specialtyTitle: string) => void;
}

export const SurgeriesSection: React.FC<SurgeriesSectionProps> = ({ onSelectSpecialty }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSurgery, setExpandedSurgery] = useState<string | null>(null);
  const [showAnatomyMap, setShowAnatomyMap] = useState<boolean>(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldPlus':
        return <ShieldPlus className="w-5 h-5 text-[#2ecc71]" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-cyan-400" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case 'Eye':
        return <Eye className="w-5 h-5 text-amber-400" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-emerald-400" />;
      case 'Ambulance':
        return <Ambulance className="w-5 h-5 text-red-400" />;
      default:
        return <Activity className="w-5 h-5 text-[#2ecc71]" />;
    }
  };

  const filteredSurgeries = selectedCategory === 'all'
    ? DOCTOR_INFO.surgeries
    : DOCTOR_INFO.surgeries.filter((s) => {
        if (selectedCategory === 'laparoscopy') return s.id === 'gallbladder' || s.id === 'hernia';
        if (selectedCategory === 'gi') return s.id === 'surgical-gi' || s.id === 'endoscopy';
        if (selectedCategory === 'emergency') return s.id === 'proctology' || s.id === 'general-emergency';
        return true;
      });

  return (
    <section id="specialities" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <div id="surgeries" className="absolute -top-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-mono font-bold text-emerald-800 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>EXPANDABLE SERVICE BENTO GRIDS</span>
            </div>
            <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Minimal Access Surgeries &amp;{' '}
              <span className="text-emerald-700">Digestive Procedures</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Every procedure is executed using high-definition laparoscopic instrumentation ensuring pinhole incisions, negligible blood loss, and rapid 24-hour return home.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer font-bold ${
                selectedCategory === 'all'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-500'
              }`}
            >
              All Specialties
            </button>
            <button
              onClick={() => setSelectedCategory('laparoscopy')}
              className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer font-bold ${
                selectedCategory === 'laparoscopy'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-500'
              }`}
            >
              Laparoscopy &amp; Hernia
            </button>
            <button
              onClick={() => setSelectedCategory('gi')}
              className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer font-bold ${
                selectedCategory === 'gi'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-500'
              }`}
            >
              GI &amp; Endoscopy
            </button>
            <button
              onClick={() => setShowAnatomyMap(!showAnatomyMap)}
              className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 font-bold ${
                showAnatomyMap
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{showAnatomyMap ? 'Hide Anatomical Map' : 'View Esophagus Anatomical Map'}</span>
            </button>
          </div>
        </div>

        {/* Optional Upper GI & Esophagus Anatomical Map */}
        {showAnatomyMap && (
          <div className="mb-10">
            <EsophagusAnatomicalGraphic onSelectProcedure={onSelectSpecialty} />
          </div>
        )}

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSurgeries.map((surgery: SurgeryDetail) => {
            const isExpanded = expandedSurgery === surgery.id;
            return (
              <div
                key={surgery.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden shadow-xs hover:shadow-lg hover:border-slate-300 transition-all"
              >
                {/* Top Subtle Ambient Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />

                <div className="space-y-4">
                  
                  {/* Card Header: Photo Thumbnail, Icon & Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {surgery.image && (
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100 shadow-2xs">
                          <img
                            src={surgery.image}
                            alt={surgery.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 group-hover:border-emerald-300 group-hover:bg-emerald-50 transition-all">
                        {getIcon(surgery.iconName)}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 group-hover:border-emerald-300 group-hover:text-emerald-700 group-hover:bg-emerald-50 transition-colors shrink-0">
                      {surgery.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-syne text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {surgery.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-sans">
                      {surgery.shortDesc}
                    </p>
                  </div>

                  {/* Telemetry Metrics Bar */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold">Stay Duration:</span>
                      <p className="text-slate-900 font-semibold">{surgery.stayDuration}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold">Recovery:</span>
                      <p className="text-emerald-700 font-bold">{surgery.recoveryTime.split('to')[0] || 'Rapid'}</p>
                    </div>
                  </div>

                  {/* Common Indications */}
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Key Clinical Indications
                    </p>
                    <ul className="space-y-1.5 font-sans">
                      {surgery.indications.slice(0, isExpanded ? undefined : 3).map((ind, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                    {surgery.indications.length > 3 && (
                      <button
                        onClick={() => setExpandedSurgery(isExpanded ? null : surgery.id)}
                        className="mt-2 text-[11px] font-mono font-bold text-emerald-700 hover:underline cursor-pointer"
                      >
                        {isExpanded ? 'Show less' : `+${surgery.indications.length - 3} more indications`}
                      </button>
                    )}
                  </div>

                  {/* Technique breakdown when expanded */}
                  {isExpanded && (
                    <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono space-y-1 animate-fadeIn">
                      <span className="text-emerald-800 font-bold">Surgical Technique:</span>
                      <p className="text-slate-700 text-[11px] leading-relaxed">{surgery.technique}</p>
                    </div>
                  )}

                </div>

                {/* Bottom Card Action */}
                <div className="pt-6 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onSelectSpecialty(surgery.title)}
                    className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-emerald-600 text-slate-800 hover:text-white font-syne font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200 hover:border-emerald-600 group/btn shadow-2xs"
                  >
                    <Calendar className="w-3.5 h-3.5 text-emerald-600 group-hover/btn:text-white transition-colors" />
                    <span>Consult for {surgery.title.split(' ')[1] || 'Procedure'}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Emergency Callout Strip */}
        <div className="mt-14 bg-gradient-to-r from-emerald-700 to-teal-800 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left font-sans">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-200 mb-1 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
              <span>24/7 SURGICAL CASUALTY ADMISSION</span>
            </div>
            <h3 className="font-syne text-xl sm:text-2xl font-bold text-white">
              Require an Urgent Surgical Evaluation or Second Opinion?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100">
              Immediate triage with Dr. Harish Gowda at HIMAS Hospital Basavanagudi. Direct cashless insurance pre-authorization desk.
            </p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${DOCTOR_INFO.phone.replace(/\s+/g, '')}`}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-900 font-syne font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Ambulance className="w-4 h-4 text-emerald-600" />
              <span>Emergency Helpline: {DOCTOR_INFO.phone}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

