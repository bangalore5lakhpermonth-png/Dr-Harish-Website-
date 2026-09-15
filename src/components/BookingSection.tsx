import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Phone, 
  Building2, 
  Loader2,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { DOCTOR_INFO } from '../data/doctorData';
import { api } from '../services/api';
import { Appointment, ConsultationType, User as UserType } from '../types';

interface BookingSectionProps {
  currentUser: UserType | null;
  onBookingSuccess: (apt: Appointment) => void;
  onOpenPortal: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  currentUser,
  onBookingSuccess,
  onOpenPortal,
}) => {
  const [consultationType, setConsultationType] = useState<ConsultationType>('in-clinic');
  const [specialty, setSpecialty] = useState('Laparoscopic Gallbladder Surgery');
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDateStr);
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [patientName, setPatientName] = useState(currentUser?.name || '');
  const [patientPhone, setPatientPhone] = useState(currentUser?.phone || '');
  const [patientEmail, setPatientEmail] = useState(currentUser?.email || '');
  const [age, setAge] = useState(currentUser?.age ? String(currentUser.age) : '45');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>(currentUser?.gender || 'Male');
  const [symptoms, setSymptoms] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedApt, setConfirmedApt] = useState<Appointment | null>(null);

  // Sync user details if logged in
  React.useEffect(() => {
    if (currentUser) {
      if (!patientName) setPatientName(currentUser.name);
      if (!patientPhone) setPatientPhone(currentUser.phone);
      if (!patientEmail) setPatientEmail(currentUser.email);
      if (currentUser.age) setAge(String(currentUser.age));
      if (currentUser.gender) setGender(currentUser.gender);
    }
  }, [currentUser]);

  const timeSlots = [
    '09:30 AM',
    '10:30 AM',
    '11:30 AM',
    '12:30 PM',
    '04:30 PM',
    '05:30 PM',
    '06:30 PM',
    '07:30 PM',
  ];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!patientName.trim()) {
      setError('Please provide the patient name.');
      return;
    }
    if (!patientPhone.trim()) {
      setError('Please provide a contact phone number.');
      return;
    }

    setLoading(true);
    try {
      const apt = await api.createAppointment({
        patientName,
        patientPhone,
        patientEmail,
        age: age ? Number(age) : undefined,
        gender,
        consultationType,
        hospitalLocation: consultationType === 'in-clinic' ? DOCTOR_INFO.address : 'HIMAS Secure Tele-Consultation',
        specialty,
        appointmentDate: date,
        timeSlot,
        symptoms: symptoms || 'Clinical consultation for ' + specialty,
      });

      setConfirmedApt(apt);
      onBookingSuccess(apt);
    } catch (err: any) {
      setError(err.message || 'Failed to book appointment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking-section" className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-800 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>INSTANT OPD SLOT ALLOCATION</span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Schedule Consultation with{' '}
            <span className="text-emerald-700">Dr. Harish Gowda</span>
          </h2>
          <p className="text-sm text-slate-600 font-sans max-w-2xl mx-auto">
            Directly reserve your in-clinic or video consultation time slot at HIMAS Hospital Basavanagudi. Instant digital confirmation and SMS notification.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          {confirmedApt ? (
            <div className="p-8 sm:p-12 text-center space-y-5 bg-emerald-50/30">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-300 shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                  SLOT CONFIRMED • REF #{confirmedApt.id.toUpperCase()}
                </span>
                <h3 className="font-syne text-2xl sm:text-3xl font-bold text-slate-900 pt-2">
                  Appointment Reserved for {confirmedApt.patientName}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Scheduled for <strong className="text-slate-900 font-mono">{confirmedApt.appointmentDate} at {confirmedApt.timeSlot}</strong> with Dr. Harish Gowda at HIMAS Hospital, Basavanagudi.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={onOpenPortal}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-syne font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Open Patient Records Vault</span>
                </button>
                <button
                  onClick={() => setConfirmedApt(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-semibold text-xs rounded-xl border border-slate-300 transition-colors cursor-pointer"
                >
                  Book Another Patient Slot
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="p-6 sm:p-10 space-y-6">
              {error && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Consultation Mode */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2.5">
                  1. Consultation Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultationType('in-clinic')}
                    className={`p-3.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      consultationType === 'in-clinic'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    <span>In-Clinic Visit (HIMAS Hospital, Basavanagudi)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationType('video')}
                    className={`p-3.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      consultationType === 'video'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900'
                    }`}
                  >
                    <Video className="w-4 h-4 text-emerald-600" />
                    <span>Video Tele-Consultation (Remote Care)</span>
                  </button>
                </div>
              </div>

              {/* Specialty and Date Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                    2. Surgical Specialty
                  </label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans font-medium focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                  >
                    {DOCTOR_INFO.surgeries.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Second Opinion on Surgical Advice">
                      Second Opinion on Surgical Advice
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                    3. Preferred Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-medium focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                    4. Available Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-medium focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-sans text-slate-600 font-medium mb-1.5">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Patient full name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-slate-600 font-medium mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98450 12345"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    required
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-slate-600 font-medium mb-1.5">
                    Age &amp; Gender
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-16 text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                    />
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="flex-1 text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans text-slate-600 font-medium mb-1.5">
                  Symptoms, Ultrasound findings, or Questions for Dr. Harish (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Diagnosed with gallbladder calculus, experiencing post-prandial pain..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Zero pre-payment obligation. Complete on arrival or digital TPA.</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-syne font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Slot...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Confirm Appointment Slot</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
