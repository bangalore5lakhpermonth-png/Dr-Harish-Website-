import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Appointment } from '../types';

export interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  appointment?: Appointment | null;
  title?: string;
  message?: string;
  duration?: number; // duration in ms, default 7000
  onAction?: () => void;
  actionLabel?: string;
  enableSound?: boolean;
}

/**
 * Play a subtle, pleasant clinical confirmation chime
 */
function playConfirmationChime() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    // Note 1: E5 (659.25 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, ctx.currentTime);
    gain1.gain.setValueAtTime(0.06, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.35);

    // Note 2: G#5 (830.61 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(830.61, ctx.currentTime + 0.1);
    gain2.gain.setValueAtTime(0.08, ctx.currentTime + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.1);
    osc2.stop(ctx.currentTime + 0.6);
  } catch {
    // Gracefully handle environments without audio permissions
  }
}

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  onClose,
  appointment,
  title = 'Appointment Reserved Successfully!',
  message,
  duration = 7000,
  onAction,
  actionLabel = 'Open Records Vault',
  enableSound = true,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(duration);

  // Play audio chime when opened
  useEffect(() => {
    if (isOpen && enableSound) {
      playConfirmationChime();
    }
  }, [isOpen, enableSound]);

  // Handle countdown & pause on hover
  useEffect(() => {
    if (!isOpen || duration <= 0) return;

    remainingTimeRef.current = duration;
    startTimeRef.current = Date.now();
    setProgress(100);

    const interval = setInterval(() => {
      if (!isPaused) {
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, remainingTimeRef.current - elapsed);
        const percent = Math.max(0, (remaining / duration) * 100);
        setProgress(percent);

        if (remaining <= 0) {
          clearInterval(interval);
          onClose();
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isOpen, duration, isPaused, onClose]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    // Calculate remaining
    const elapsed = Date.now() - startTimeRef.current;
    remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
  };

  const handleMouseLeave = () => {
    startTimeRef.current = Date.now();
    setIsPaused(false);
  };

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!appointment?.id) return;
    navigator.clipboard.writeText(appointment.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard shortcut: Escape closes toast
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="toast-appointment-notification"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          initial={{ opacity: 0, y: -24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="fixed top-20 sm:top-24 right-4 sm:right-6 md:right-8 z-[60] w-[calc(100vw-2rem)] sm:w-[430px] max-w-full bg-white/98 backdrop-blur-md rounded-2xl border border-emerald-300/80 shadow-2xl shadow-emerald-950/15 overflow-hidden font-sans"
        >
          {/* Top Status Header */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50/60 to-emerald-50/30 px-4 sm:px-5 py-2.5 border-b border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                Booking Feedback • OPD Confirmed
              </span>
            </div>

            {appointment?.id && (
              <button
                id="toast-copy-ref-button"
                type="button"
                onClick={handleCopyId}
                title="Copy Appointment Reference ID"
                className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-400" />
                    <span>REF #{appointment.id.substring(0, 8).toUpperCase()}</span>
                  </>
                )}
              </button>
            )}

            <button
              id="toast-dismiss-button"
              type="button"
              onClick={onClose}
              aria-label="Close notification"
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Content Body */}
          <div className="p-4 sm:p-5 space-y-3.5">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/90 text-emerald-700 flex items-center justify-center border border-emerald-200 shrink-0 shadow-xs mt-0.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-syne text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                  {title}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {message || (
                    appointment ? (
                      <>
                        Slot allocated for <strong className="text-slate-900 font-semibold">{appointment.patientName}</strong> with Dr. Harish Gowda.
                      </>
                    ) : (
                      'Your consultation appointment has been scheduled successfully.'
                    )
                  )}
                </p>
              </div>
            </div>

            {/* Appointment Snapshot Pills */}
            {appointment && (
              <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200/90 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-mono font-semibold truncate">{appointment.appointmentDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-mono font-semibold truncate">{appointment.timeSlot}</span>
                  </div>
                </div>

                <div className="pt-1.5 border-t border-slate-200/60 flex items-center justify-between gap-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5 truncate">
                    {appointment.consultationType === 'video' ? (
                      <>
                        <Video className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">HIMAS Video Tele-Consultation</span>
                      </>
                    ) : (
                      <>
                        <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">HIMAS Hospital, Basavanagudi</span>
                      </>
                    )}
                  </div>

                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] shrink-0">
                    {appointment.specialty ? appointment.specialty.split(' ')[0] : 'GI OPD'}
                  </span>
                </div>
              </div>
            )}

            {/* Actions Row */}
            <div className="flex items-center justify-between gap-2 pt-0.5">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Instant SMS confirmation sent</span>
              </div>

              <div className="flex items-center gap-2">
                {onAction && (
                  <button
                    id="toast-open-portal-button"
                    type="button"
                    onClick={() => {
                      onAction();
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold font-syne shadow-xs transition-colors cursor-pointer"
                  >
                    <span>{actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  id="toast-dismiss-text-button"
                  type="button"
                  onClick={onClose}
                  className="px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 text-xs font-medium hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Countdown Progress Bar */}
          {duration > 0 && (
            <div className="w-full bg-slate-100 h-1 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
