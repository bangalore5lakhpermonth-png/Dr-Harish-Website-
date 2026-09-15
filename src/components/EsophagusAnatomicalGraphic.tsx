import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, CheckCircle2, ChevronRight, Activity, ShieldCheck, Stethoscope } from 'lucide-react';

interface ZoneInfo {
  id: string;
  name: string;
  condition: string;
  symptoms: string;
  surgicalSolution: string;
  keyholeProcedure: string;
  recovery: string;
}

const ZONES: Record<string, ZoneInfo> = {
  upper: {
    id: 'upper',
    name: 'Upper Esophagus & Pharyngoesophageal Junction',
    condition: 'Cervical Esophageal Spasm & Diverticula (Zenker)',
    symptoms: 'Difficulty initiating swallow, regurgitation of undigested food, persistent throat tickle.',
    surgicalSolution: 'Minimally invasive endoscopic myotomy / diverticulopexy.',
    keyholeProcedure: 'Endoscopic Diverticular Division (Z-POEM / Stapler)',
    recovery: 'Oral fluids in 24 hours, discharge next morning.',
  },
  mid: {
    id: 'mid',
    name: 'Mid-Thoracic Esophagus',
    condition: 'Esophageal Motility Disorders & Diffuse Spasms',
    symptoms: 'Non-cardiac chest discomfort, dysphagia to both solids and cold fluids.',
    surgicalSolution: 'High-definition diagnostic manometry followed by precision endoscopic guidance.',
    keyholeProcedure: 'Thoracoscopic / Endoscopic Mucosal Preservation',
    recovery: 'Day-care observation with structured dietary guidance.',
  },
  les: {
    id: 'les',
    name: 'Lower Esophageal Sphincter (LES) & GE Junction',
    condition: 'Severe GERD, Hiatus Hernia & Achalasia Cardia',
    symptoms: 'Chronic nighttime acid heartburn, waterbrash, food impaction, chronic cough.',
    surgicalSolution: 'Laparoscopic Nissen/Toupet Fundoplication & Heller Cardial Myotomy.',
    keyholeProcedure: 'Keyhole 360° Stomach Wrap & Crural Mesh Plasty',
    recovery: 'Complete cessation of antacids, 24-hr hospital discharge.',
  },
  stomach: {
    id: 'stomach',
    name: 'Gastric Cardia & Stomach Fundus',
    condition: 'Gastric Acid Hypersecretion & Hiatal Defect',
    symptoms: 'Post-meal epigastric fullness, acid pooling, burning retrosternal sensation.',
    surgicalSolution: 'Anatomical reduction of stomach back below the diaphragm and anti-reflux valve reconstruction.',
    keyholeProcedure: 'Laparoscopic Hiatal Repair & Gastropexy',
    recovery: 'Normal light diet in 48 hours, rapid return to work.',
  },
};

export const EsophagusAnatomicalGraphic: React.FC<{
  onSelectProcedure?: (name: string) => void;
  className?: string;
}> = ({ onSelectProcedure, className = '' }) => {
  const [activeZone, setActiveZone] = useState<string>('les');

  const currentInfo = ZONES[activeZone] || ZONES.les;

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-md ${className}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            Upper GI Anatomical Map
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Esophagus &amp; Gastroesophageal Junction Anatomy
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Interactive clinical overview of esophageal disorders &amp; Dr. Harish Gowda&apos;s keyhole solutions.
          </p>
        </div>

        {/* Quick Zone Selector Buttons */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(ZONES).map(([key, zone]) => (
            <button
              key={key}
              onClick={() => setActiveZone(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeZone === key
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {key === 'upper' ? 'Upper Cervical' : key === 'mid' ? 'Mid Esophagus' : key === 'les' ? 'LES & Valve' : 'Gastric Fundus'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Graphic Left + Clinical Insight Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
        {/* Left: Anatomical Visual */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden">
          {/* SVG Diagram */}
          <svg
            viewBox="0 0 320 420"
            className="w-full max-w-[260px] h-auto drop-shadow-md select-none"
          >
            <defs>
              <linearGradient id="esophagusGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
              <linearGradient id="stomachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="50%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="activeHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* Background Body Outline Silhouette */}
            <path
              d="M 100 40 Q 160 30 220 40 Q 240 100 245 200 Q 250 300 235 400 L 85 400 Q 70 300 75 200 Q 80 100 100 40 Z"
              fill="#e2e8f0"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Trachea / Throat guideline */}
            <path
              d="M 152 40 L 152 90 M 168 40 L 168 90"
              stroke="#3b82f6"
              strokeWidth="2.5"
              strokeOpacity="0.6"
            />

            {/* UPPER ESOPHAGUS (Clickable) */}
            <g
              onClick={() => setActiveZone('upper')}
              className="cursor-pointer transition-all duration-300"
            >
              <rect
                x="142"
                y="55"
                width="36"
                height="65"
                rx="14"
                fill={activeZone === 'upper' ? 'url(#activeHighlight)' : 'url(#esophagusGrad)'}
                className="transition-all duration-300 hover:opacity-90"
              />
              <text x="75" y="85" fill={activeZone === 'upper' ? '#047857' : '#475569'} fontSize="11" fontWeight="700" textAnchor="end">
                Upper Esophagus
              </text>
              <line x1="80" y1="82" x2="138" y2="82" stroke={activeZone === 'upper' ? '#047857' : '#94a3b8'} strokeWidth="1.5" strokeDasharray="3 3" />
            </g>

            {/* MID ESOPHAGUS (Clickable) */}
            <g
              onClick={() => setActiveZone('mid')}
              className="cursor-pointer transition-all duration-300"
            >
              <rect
                x="144"
                y="125"
                width="32"
                height="70"
                rx="12"
                fill={activeZone === 'mid' ? 'url(#activeHighlight)' : 'url(#esophagusGrad)'}
                className="transition-all duration-300 hover:opacity-90"
              />
              <text x="245" y="155" fill={activeZone === 'mid' ? '#047857' : '#475569'} fontSize="11" fontWeight="700">
                Mid Thoracic
              </text>
              <line x1="180" y1="152" x2="240" y2="152" stroke={activeZone === 'mid' ? '#047857' : '#94a3b8'} strokeWidth="1.5" strokeDasharray="3 3" />
            </g>

            {/* LOWER ESOPHAGEAL SPHINCTER (LES) & GE JUNCTION (Clickable) */}
            <g
              onClick={() => setActiveZone('les')}
              className="cursor-pointer transition-all duration-300"
            >
              {/* Diaphragm muscular line */}
              <path
                d="M 90 208 Q 160 196 230 208"
                stroke="#64748b"
                strokeWidth="3"
                strokeDasharray="2 4"
                fill="none"
              />
              <text x="65" y="212" fill="#64748b" fontSize="9" textAnchor="end">Diaphragm</text>

              {/* Valve Ring */}
              <ellipse
                cx="160"
                cy="208"
                rx="22"
                ry="12"
                fill={activeZone === 'les' ? '#059669' : '#d97706'}
                stroke="#fff"
                strokeWidth="2"
                className="animate-pulse"
              />
              <text x="75" y="235" fill={activeZone === 'les' ? '#047857' : '#b45309'} fontSize="11" fontWeight="bold" textAnchor="end">
                LES Anti-Reflux Valve
              </text>
              <line x1="80" y1="230" x2="135" y2="214" stroke={activeZone === 'les' ? '#047857' : '#d97706'} strokeWidth="1.5" />
            </g>

            {/* STOMACH (Clickable) */}
            <g
              onClick={() => setActiveZone('stomach')}
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d="M 152 216 
                   C 130 216, 95 240, 95 285 
                   C 95 340, 150 365, 195 365 
                   C 235 365, 255 330, 245 290 
                   C 238 260, 205 255, 195 260 
                   C 185 265, 175 250, 172 225 Z"
                fill={activeZone === 'stomach' ? 'url(#activeHighlight)' : 'url(#stomachGrad)'}
                className="transition-all duration-300 hover:opacity-90"
              />
              <text x="245" y="325" fill={activeZone === 'stomach' ? '#047857' : '#e11d48'} fontSize="11" fontWeight="700">
                Stomach Fundus
              </text>
              <line x1="210" y1="315" x2="240" y2="322" stroke={activeZone === 'stomach' ? '#047857' : '#f43f5e'} strokeWidth="1.5" strokeDasharray="3 3" />
            </g>
          </svg>

          <p className="text-xs text-slate-500 mt-4 text-center">
            Tap any anatomical zone to review surgical indications &amp; keyhole repair
          </p>
        </div>

        {/* Right: Clinical Details Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentInfo.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  Targeted Zone: {currentInfo.id.toUpperCase()}
                </span>
                <span className="text-xs text-slate-600 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Minimal Access
                </span>
              </div>

              <h4 className="text-2xl font-bold text-slate-900 leading-tight">
                {currentInfo.name}
              </h4>

              {/* Primary Condition */}
              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-2">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs text-amber-900 font-bold uppercase tracking-wide">Common Condition</div>
                    <div className="text-sm font-semibold text-slate-900">{currentInfo.condition}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-700 pl-6.5 leading-relaxed">
                  <span className="text-slate-900 font-bold">Symptoms:</span> {currentInfo.symptoms}
                </div>
              </div>

              {/* Dr Harish Keyhole Solution */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex items-start gap-2.5">
                  <Stethoscope className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs text-emerald-900 font-bold uppercase tracking-wide">Dr. Harish Gowda&apos;s Solution</div>
                    <div className="text-sm font-bold text-emerald-950">{currentInfo.keyholeProcedure}</div>
                  </div>
                </div>
                <p className="text-xs text-slate-700 pl-6.5 leading-relaxed">
                  {currentInfo.surgicalSolution}
                </p>
              </div>

              {/* Key Recovery Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Recovery Timeline</div>
                  <div className="text-xs font-bold text-emerald-700 mt-0.5">{currentInfo.recovery}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Surgical Approach</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">Pinhole Laparoscopic / HD Scope</div>
                </div>
              </div>

              {/* Action Button */}
              {onSelectProcedure && (
                <button
                  onClick={() => onSelectProcedure(currentInfo.name)}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  Book Upper GI Consultation for {currentInfo.name.split('&')[0]}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
