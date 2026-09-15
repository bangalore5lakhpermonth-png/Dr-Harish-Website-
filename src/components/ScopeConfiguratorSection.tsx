import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Activity, 
  CreditCard, 
  Hospital, 
  Zap, 
  ArrowRight,
  Stethoscope,
  Info
} from 'lucide-react';
import { DOCTOR_INFO } from '../data/doctorData';

interface ScopeConfiguratorSectionProps {
  onSelectProcedureAndBook: (procedureTitle: string) => void;
}

interface ProcedureOption {
  id: string;
  title: string;
  category: string;
  incision: string;
  stay: string;
  recovery: string;
  tech: string;
  insuranceCovered: boolean;
  popular?: boolean;
}

const PROCEDURES: ProcedureOption[] = [
  {
    id: 'gallbladder',
    title: 'Laparoscopic Gallbladder (Cholecystectomy)',
    category: 'Minimal Access GI',
    incision: '3–4 Pinhole Ports (5–10mm)',
    stay: 'Day Care / 24 Hours',
    recovery: '3–5 Days to Normal Work',
    tech: 'Stryker HD 4K Optics & CVS Dissection',
    insuranceCovered: true,
    popular: true,
  },
  {
    id: 'hernia',
    title: 'Advanced 3D Mesh Laparoscopic Hernia Repair',
    category: 'Hernia Specialist (FALS)',
    incision: 'Keyhole Preperitoneal (TEP/TAPP)',
    stay: '24 Hours Observation',
    recovery: 'Walking in 4h, Desk Work in 48h',
    tech: 'Tension-Free 3D Anatomical Polypropylene Mesh',
    insuranceCovered: true,
    popular: true,
  },
  {
    id: 'endoscopy',
    title: 'Painless Diagnostic Upper GI Endoscopy',
    category: 'Endoscopy (EFIGAGES)',
    incision: 'Zero Incision / Natural Orifice',
    stay: 'Outpatient (2 Hours)',
    recovery: 'Same-Day Diet Resumption',
    tech: 'Olympus Narrow-Band Video Endoscope (NBI)',
    insuranceCovered: true,
  },
  {
    id: 'gi-surgery',
    title: 'Gastrointestinal & Laparoscopic Appendix Surgery',
    category: 'Surgical Gastroenterology',
    incision: '3 Minimal Access Ports',
    stay: '24–48 Hours Monitored',
    recovery: 'Structured Rapid Mobilization',
    tech: 'Endo-GIA Stapling & Ultrasonic Energy Shear',
    insuranceCovered: true,
  },
  {
    id: 'proctology',
    title: 'Laser / Stapler Proctology (Piles, Fissure, Fistula)',
    category: 'Minimally Invasive Colorectal',
    incision: 'Laser Fiber / MIPH Stapler',
    stay: 'Day Care / 12–24 Hours',
    recovery: 'Immediate Post-Op Pain Relief',
    tech: 'Diode Laser Ablation & LIFT Sphincter Preservation',
    insuranceCovered: true,
  },
];

export const ScopeConfiguratorSection: React.FC<ScopeConfiguratorSectionProps> = ({
  onSelectProcedureAndBook,
}) => {
  const [selectedId, setSelectedId] = useState<string>('gallbladder');
  const [consultType, setConsultType] = useState<'in-clinic' | 'video'>('in-clinic');
  const [insuranceType, setInsuranceType] = useState<'cashless' | 'private'>('cashless');

  const selectedProcedure = PROCEDURES.find((p) => p.id === selectedId) || PROCEDURES[0];

  return (
    <section id="scope-configurator" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-800 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>INTERACTIVE SURGICAL SCOPE BUILDER</span>
          </div>

          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Configure Your Treatment &{' '}
            <span className="text-emerald-700">Clinical Roadmap</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            Select your clinical condition to view real-time surgical specs, hospitalization duration, minimally invasive techniques, and insurance coverage at HIMAS Hospital.
          </p>
        </div>

        {/* Interactive Scope Configurator Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Procedure Selectors & Parameters (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Select Surgical Procedure */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">1</span>
                  Select Required Specialty / Procedure
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700">5 Available Options</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {PROCEDURES.map((proc) => {
                  const isSelected = proc.id === selectedId;
                  return (
                    <button
                      key={proc.id}
                      onClick={() => setSelectedId(proc.id)}
                      className={`text-left p-4 rounded-xl transition-all border flex items-center justify-between gap-4 cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50/80 border-emerald-500 shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-syne font-bold text-sm sm:text-base ${isSelected ? 'text-emerald-950' : 'text-slate-800'}`}>
                            {proc.title}
                          </span>
                          {proc.popular && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                              Top Specialty
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs font-mono text-slate-500 font-medium">
                          <span>{proc.category}</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-bold">{proc.stay}</span>
                        </div>
                      </div>

                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Consultation Format & Payment Channel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Consultation Format */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                <span className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">2</span>
                  Consultation Mode
                </span>
                
                <div className="space-y-2">
                  <button
                    onClick={() => setConsultType('in-clinic')}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                      consultType === 'in-clinic'
                        ? 'bg-emerald-50/80 border-emerald-500 text-slate-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-slate-900">In-Clinic at HIMAS</p>
                      <p className="text-[11px] text-slate-500">Basavanagudi, Bangalore</p>
                    </div>
                    {consultType === 'in-clinic' && <Check className="w-4 h-4 text-emerald-600 font-bold" />}
                  </button>

                  <button
                    onClick={() => setConsultType('video')}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                      consultType === 'video'
                        ? 'bg-emerald-50/80 border-emerald-500 text-slate-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-slate-900">Pre-Op Tele-Consult</p>
                      <p className="text-[11px] text-slate-500">Review scan reports remotely</p>
                    </div>
                    {consultType === 'video' && <Check className="w-4 h-4 text-emerald-600 font-bold" />}
                  </button>
                </div>
              </div>

              {/* Insurance Billing */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                <span className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">3</span>
                  Hospital Coverage
                </span>

                <div className="space-y-2">
                  <button
                    onClick={() => setInsuranceType('cashless')}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                      insuranceType === 'cashless'
                        ? 'bg-emerald-50/80 border-emerald-500 text-slate-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-slate-900">Cashless Mediclaim / TPA</p>
                      <p className="text-[11px] text-emerald-700 font-semibold">All major TPAs accepted</p>
                    </div>
                    {insuranceType === 'cashless' && <Check className="w-4 h-4 text-emerald-600 font-bold" />}
                  </button>

                  <button
                    onClick={() => setInsuranceType('private')}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                      insuranceType === 'private'
                        ? 'bg-emerald-50/80 border-emerald-500 text-slate-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-slate-900">Direct Hospital Billing</p>
                      <p className="text-[11px] text-slate-500">Transparent affordable pack</p>
                    </div>
                    {insuranceType === 'private' && <Check className="w-4 h-4 text-emerald-600 font-bold" />}
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Live Clinical Scope Summary (Span 5) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-emerald-300 shadow-xl relative space-y-6">
              
              {/* Telemetry Badge Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>SURGICAL TELEMETRY SPEC</span>
                </div>
                <span className="text-[11px] font-mono bg-slate-100 px-2.5 py-0.5 rounded text-slate-700 font-semibold">
                  HIMAS Basavanagudi
                </span>
              </div>

              {/* Chosen Procedure Card */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-500">Selected Treatment Protocol:</span>
                <h3 className="font-syne text-xl font-bold text-slate-900">
                  {selectedProcedure.title}
                </h3>
                <p className="text-xs text-emerald-700 font-mono font-semibold">
                  Primary Operator: Dr. Harish Gowda, MS, DipMAS (Gold Medalist)
                </p>
              </div>

              {/* Data Specifications Bento */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 text-[11px]">Incision Geometry:</span>
                  <p className="text-slate-900 font-bold">{selectedProcedure.incision}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 text-[11px]">Hospital Stay:</span>
                  <p className="text-emerald-700 font-bold">{selectedProcedure.stay}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 text-[11px]">Recovery Horizon:</span>
                  <p className="text-slate-900 font-bold">{selectedProcedure.recovery}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 text-[11px]">Mediclaim Status:</span>
                  <p className="text-emerald-700 font-bold">100% Cashless Eligible</p>
                </div>
              </div>

              {/* Technology Specification */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-emerald-900">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-bold">Technology &amp; Precision Standards:</span>
                </div>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {selectedProcedure.tech}
                </p>
              </div>

              {/* Action Call to Reserve */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => onSelectProcedureAndBook(selectedProcedure.title)}
                  className="w-full py-4 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-syne font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Slot for {selectedProcedure.category}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[11px] font-mono text-slate-500">
                  Pre-configured consultation request • No upfront deposit needed
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
