import React from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Calendar, 
  FileText, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X,
  Stethoscope,
  ArrowRight
} from 'lucide-react';
import { User } from '../types';
import { DOCTOR_INFO } from '../data/doctorData';

interface NavbarProps {
  user: User | null;
  onOpenBooking: () => void;
  onOpenAuth: () => void;
  onOpenPortal: () => void;
  onLogout: () => void;
  onQuickDemoSwitch: (role: 'doctor' | 'patient') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenBooking,
  onOpenAuth,
  onOpenPortal,
  onLogout,
  onQuickDemoSwitch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-xs transition-all">
      {/* Top Telemetry & Status Bar */}
      <div className="bg-gradient-to-r from-slate-50 via-emerald-50/40 to-blue-50/40 text-slate-600 text-xs py-2 px-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[11px]">
            {/* Pulsing Status Dot */}
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="font-bold tracking-wide uppercase text-[10px]">OPD Live at HIMAS Hospital</span>
            </div>

            <a 
              href={`tel:${DOCTOR_INFO.phone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-1.5 text-slate-700 hover:text-emerald-700 font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{DOCTOR_INFO.phone}</span>
            </a>

            <div className="hidden md:flex items-center gap-1.5 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>{DOCTOR_INFO.timings}</span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Basavanagudi, Bangalore</span>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Quick Demo Role Switcher */}
            <div className="hidden sm:flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-slate-200 text-[11px] font-mono shadow-xs">
              <span className="text-slate-500 font-medium">Role:</span>
              <button
                onClick={() => onQuickDemoSwitch('patient')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  user?.role === 'patient' 
                    ? 'bg-emerald-600 text-white font-bold shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to patient mode"
              >
                Patient
              </button>
              <button
                onClick={() => onQuickDemoSwitch('doctor')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  user?.role === 'doctor' 
                    ? 'bg-blue-600 text-white font-bold shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Dr. Harish Gowda mode"
              >
                Dr. Harish
              </button>
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenPortal}
                  className="flex items-center gap-1.5 text-sm text-slate-800 hover:text-emerald-600 transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="max-w-[130px] truncate font-semibold">{user.name}</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {user.role}
                  </span>
                </button>
                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="text-xs text-slate-700 hover:text-emerald-700 transition-colors flex items-center gap-1.5 font-semibold"
              >
                <UserIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Patient Portal Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Brand Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-md group-hover:shadow-emerald-500/25 transition-all border-2 border-emerald-500 bg-slate-900 shrink-0">
            <img 
              src="/images/dr_harish_suit.jpg" 
              alt="Dr. Harish Gowda Logo" 
              className="w-full h-full object-cover object-[50%_12%] group-hover:scale-110 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-syne font-bold text-lg sm:text-xl text-slate-900 tracking-tight leading-tight group-hover:text-emerald-700 transition-all">
                {DOCTOR_INFO.name}
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                Gold Medalist DipMAS
              </span>
            </div>
            <p className="text-xs text-emerald-800 font-medium tracking-wide line-clamp-1">
              Gold Medalist • Surgical Gastroenterologist
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-700">
          <a href="#home" className="hover:text-emerald-700 transition-colors">
            Home
          </a>
          <a href="#about" className="hover:text-emerald-700 transition-colors">
            About Us
          </a>
          <a href="#specialities" className="hover:text-emerald-700 transition-colors">
            Specialities &amp; Services
          </a>
          <a href="#gallery" className="hover:text-emerald-700 transition-colors">
            Gallery
          </a>
          <a href="#blogs" className="hover:text-emerald-700 transition-colors">
            Blogs
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="nav-book-appointment-btn"
            onClick={onOpenBooking}
            className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 rounded-xl glow-green-sm transition-all cursor-pointer shadow-md shadow-emerald-600/20"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            id="mobile-book-btn"
            onClick={onOpenBooking}
            className="sm:hidden px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-emerald-600 rounded-lg border border-slate-200 hover:border-emerald-300 bg-white shadow-xs"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 shadow-xl">
          {/* Mobile Doctor Profile Card */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 mb-1">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-emerald-500/30 bg-slate-900 shadow-2xs">
              <img
                src="/images/dr_harish_suit.jpg"
                alt="Dr. Harish Gowda"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-syne text-sm font-bold text-slate-900 truncate">Dr. Harish Gowda</p>
              <p className="text-[11px] font-mono font-semibold text-emerald-700 truncate">Gold Medalist • Surgical Gastroenterologist</p>
              <p className="text-[10px] text-slate-500 truncate">HIMAS Hospital, Basavanagudi</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200 font-mono text-xs">
            <button
              onClick={() => {
                onQuickDemoSwitch('patient');
                setMobileMenuOpen(false);
              }}
              className={`p-2 rounded-lg text-center border cursor-pointer ${
                user?.role === 'patient' 
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold' 
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              Demo: Patient Mode
            </button>
            <button
              onClick={() => {
                onQuickDemoSwitch('doctor');
                setMobileMenuOpen(false);
              }}
              className={`p-2 rounded-lg text-center border cursor-pointer ${
                user?.role === 'doctor' 
                  ? 'bg-blue-50 border-blue-500 text-blue-800 font-bold' 
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              Demo: Doctor Mode
            </button>
          </div>

          <div className="flex flex-col space-y-1 text-sm font-semibold text-slate-800">
            <a 
              href="#home" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 hover:bg-emerald-50 rounded-lg hover:text-emerald-700 transition-colors"
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 hover:bg-emerald-50 rounded-lg hover:text-emerald-700 transition-colors"
            >
              About Us
            </a>
            <a 
              href="#specialities" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 hover:bg-emerald-50 rounded-lg hover:text-emerald-700 transition-colors"
            >
              Specialities &amp; Services
            </a>
            <a 
              href="#gallery" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 hover:bg-emerald-50 rounded-lg hover:text-emerald-700 transition-colors"
            >
              Gallery
            </a>
            <a 
              href="#blogs" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 hover:bg-emerald-50 rounded-lg hover:text-emerald-700 transition-colors"
            >
              Blogs
            </a>
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-mono font-semibold text-slate-800 bg-slate-100 border border-slate-200 rounded-xl hover:border-emerald-400"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Medical Records &amp; Portal</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Book In-Clinic Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

