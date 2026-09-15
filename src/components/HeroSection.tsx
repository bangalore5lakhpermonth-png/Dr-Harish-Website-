import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  Calendar, 
  Phone, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  FileText,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Activity,
  Zap,
  Flame,
  Camera,
  UploadCloud,
  Check,
  RotateCcw
} from 'lucide-react';
import { DOCTOR_INFO } from '../data/doctorData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenPortal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onOpenPortal }) => {
  const [photoSrc, setPhotoSrc] = useState<string>('/images/dr_harish_portrait.jpg');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom photo if saved in localStorage or verified server
  useEffect(() => {
    const saved = localStorage.getItem('dr_custom_portrait');
    if (saved) {
      setPhotoSrc(saved);
    } else {
      fetch('/api/doctor-photo')
        .then((res) => {
          if (res.ok) {
            setPhotoSrc(`/api/doctor-photo?t=${Date.now()}`);
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleFile = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPEG/PNG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setPhotoSrc(dataUrl);
        localStorage.setItem('dr_custom_portrait', dataUrl);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);

        try {
          await fetch('/api/upload-doctor-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageData: dataUrl }),
          });
        } catch (err) {
          console.error('Failed to sync photo to server:', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  return (
    <section id="home" className="relative bg-gradient-to-b from-emerald-50/60 via-slate-50 to-blue-50/40 text-slate-800 pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-grid-pattern">
      {/* Ambient Radial Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-radial-gradient pointer-events-none opacity-90" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-300/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Doctor Identity, Titles & Actions */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Pulsing Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-emerald-300 hover:border-emerald-400 text-xs sm:text-sm font-mono transition-all shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="text-emerald-700 font-bold">GOLD MEDALIST</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 font-medium">MINIMAL ACCESS SURGEON &amp; SURGICAL GASTROENTEROLOGIST</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-slate-900">
                Precision Laparoscopy.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 block sm:inline">
                  Zero Compromise Care.
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl">
                Led by <strong className="text-slate-900 font-bold">{DOCTOR_INFO.name}</strong> at{' '}
                <span className="text-emerald-700 font-semibold">{DOCTOR_INFO.hospital}</span>, Basavanagudi. 
                Delivering advanced pinhole gallbladder surgery, 3D mesh hernia repairs, and therapeutic endoscopy with 18+ years of university-affiliated surgical leadership.
              </p>
            </div>

            {/* Interactive Credentials Chips */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
              <span className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-semibold flex items-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                MBBS (Bangalore Med College)
              </span>
              <span className="px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 font-semibold flex items-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                MS (Mysore Med College)
              </span>
              <span className="px-3 py-1 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 font-bold flex items-center gap-1.5 shadow-xs">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                DipMAS (Gold Medalist)
              </span>
              <span className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold shadow-xs">
                FIAGES • FALS (Hernia)
              </span>
              <span className="px-3 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-800 font-semibold shadow-xs">
                Secretary, SSB
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                id="hero-book-btn"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white font-syne font-bold text-base shadow-xl shadow-emerald-600/20 glow-green transition-all cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Priority Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-records-btn"
                onClick={onOpenPortal}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 hover:border-emerald-500 shadow-sm transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Patient Records Vault</span>
              </button>
            </div>

            {/* Telemetry Metrics Bar */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-200 font-mono">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <p className="font-syne text-2xl font-extrabold text-slate-900">18+</p>
                <p className="text-xs text-slate-500 font-medium">Years Mastery</p>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 shadow-xs">
                <p className="font-syne text-2xl font-extrabold text-emerald-700">15,000+</p>
                <p className="text-xs text-emerald-800 font-medium">Procedures</p>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 shadow-xs">
                <p className="font-syne text-2xl font-extrabold text-amber-700">5.0 ★</p>
                <p className="text-xs text-amber-800 font-medium">Verified Reviews</p>
              </div>
              <div className="p-3.5 rounded-xl bg-cyan-50/70 border border-cyan-200 shadow-xs">
                <p className="font-syne text-2xl font-extrabold text-cyan-700">24/7</p>
                <p className="text-xs text-cyan-800 font-medium">HIMAS OT Ready</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase with Real Portrait & Bento Specs */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Outer Glow Border Box */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-blue-500/30 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500" />
              
              <div className="relative rounded-2xl glass-panel p-5 sm:p-6 space-y-5 overflow-hidden bg-white/95 border-slate-200 shadow-xl">
                
                {/* Doctor Photo Card with Drag & Drop Exact Photo Uploader */}
                <div 
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  className={`relative rounded-xl overflow-hidden aspect-[4/4.4] sm:aspect-[4/4.2] bg-slate-100 border transition-all ${
                    isDragging 
                      ? 'border-emerald-500 ring-4 ring-emerald-500/30 scale-[1.02]' 
                      : 'border-slate-200 group-hover:border-emerald-400'
                  }`}
                >
                  <img
                    src={photoSrc}
                    alt="Dr. Harish Gowda - Surgical Gastroenterologist & Laparoscopic Surgeon"
                    className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Drag-over active indicator overlay */}
                  {isDragging && (
                    <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center z-20 animate-in fade-in duration-150">
                      <UploadCloud className="w-12 h-12 text-emerald-400 animate-bounce mb-2" />
                      <p className="font-syne text-sm font-bold text-white">
                        Drop Doctor Photo Here
                      </p>
                      <p className="font-mono text-xs text-emerald-200 mt-1">
                        Applies your original doctor photo directly
                      </p>
                    </div>
                  )}

                  {/* Upload Success Pill Toast */}
                  {uploadSuccess && (
                    <div className="absolute top-12 left-3 right-3 z-30 bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-syne font-bold flex items-center justify-center gap-1.5 shadow-lg animate-in slide-in-from-top duration-200">
                      <Check className="w-4 h-4" />
                      <span>Original Doctor Photo Applied!</span>
                    </div>
                  )}

                  {/* Overlaid Floating Badge Top Left */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 shadow-md flex items-center gap-2 text-xs font-mono text-slate-800 pointer-events-none font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span>HIMAS Hospital OPD</span>
                  </div>

                  {/* Overlaid Floating Rating Top Right */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-1.5 text-xs text-amber-700 font-bold pointer-events-none">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>5.0 (27+ Reviews)</span>
                  </div>

                  {/* Interactive Button to select local WhatsApp file directly */}
                  <div className="absolute top-12 right-3 z-10">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFile(e.target.files[0]);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      title="Upload original photo from your device"
                      className="px-2.5 py-1.5 rounded-lg bg-white/95 hover:bg-emerald-600 hover:text-white text-slate-800 border border-slate-300 hover:border-emerald-600 backdrop-blur-md text-[11px] font-mono flex items-center gap-1.5 transition-all shadow-md cursor-pointer group/btn"
                    >
                      <Camera className="w-3.5 h-3.5 text-emerald-600 group-hover/btn:text-white transition-colors" />
                      <span>Upload Photo</span>
                    </button>
                  </div>

                  {/* Overlaid Bottom Title & Credentials */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-syne font-bold text-white text-base sm:text-lg">
                        Dr. Harish Gowda
                      </h3>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                        DipMAS Gold
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 font-mono line-clamp-1">
                      MS, FIAGES, FALS (Hernia), EFIGAGES
                    </p>
                  </div>
                </div>

                {/* Hospital Practice Location Spec */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-2 text-emerald-700 font-bold">
                      <MapPin className="w-4 h-4 text-rose-500" />
                      HIMAS Hospital, Basavanagudi
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">Bangalore – 560004</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 pt-2 border-t border-slate-200">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      Mon – Sat: 8:00 AM – 8:00 PM
                    </span>
                    <span className="text-emerald-700 font-bold">24/7 Emergency OT</span>
                  </div>
                </div>

                {/* Instant Quick Slot Button */}
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-syne font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer group/btn"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Reserve Direct Clinic Appointment</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

