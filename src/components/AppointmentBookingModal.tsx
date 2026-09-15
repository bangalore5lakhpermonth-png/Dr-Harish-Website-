import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Phone, 
  Mail, 
  FileText,
  Building2,
  Loader2
} from 'lucide-react';
import { DOCTOR_INFO } from '../data/doctorData';
import { api } from '../services/api';
import { Appointment, ConsultationType, User as UserType } from '../types';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserType | null;
  initialSpecialty?: string;
  onBookingSuccess?: (appointment: Appointment) => void;
  onOpenPortal?: () => void;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  initialSpecialty = 'Laparoscopic Gallbladder Surgery',
  onBookingSuccess,
  onOpenPortal,
}) => {
  const [consultationType, setConsultationType] = useState<ConsultationType>('in-clinic');
  const [specialty, setSpecialty] = useState(initialSpecialty);
  
  // Tomorrow's date formatted as YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDateStr);
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [patientName, setPatientName] = useState(currentUser?.name || '');
  const [patientPhone, setPatientPhone] = useState(currentUser?.phone || '');
  const [patientEmail, setPatientEmail] = useState(currentUser?.email || '');
  const [age, setAge] = useState(currentUser?.age ? String(currentUser.age) : '42');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>(currentUser?.gender || 'Male');
  const [symptoms, setSymptoms] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedApt, setConfirmedApt] = useState<Appointment | null>(null);

  // Sync with initialSpecialty if changed
  React.useEffect(() => {
    if (initialSpecialty) {
      setSpecialty(initialSpecialty);
    }
  }, [initialSpecialty]);

  // Sync user info if user logs in
  React.useEffect(() => {
    if (currentUser) {
      if (!patientName) setPatientName(currentUser.name);
      if (!patientPhone) setPatientPhone(currentUser.phone);
      if (!patientEmail) setPatientEmail(currentUser.email);
      if (currentUser.age) setAge(String(currentUser.age));
      if (currentUser.gender) setGender(currentUser.gender);
    }
  }, [currentUser]);

  if (!isOpen) return null;

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
    if (!patientPhone.trim() || patientPhone.trim().length < 8) {
      setError('Please provide a valid contact phone number.');
      return;
    }
    if (!date) {
      setError('Please choose an appointment date.');
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
        symptoms: symptoms || 'Consultation for ' + specialty,
      });

      setConfirmedApt(apt);
      if (onBookingSuccess) {
        onBookingSuccess(apt);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to book appointment. Please check network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setConfirmedApt(null);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-200 shadow-xs">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-syne font-bold text-base leading-tight text-slate-900">
                Schedule Consultation
              </h3>
              <p className="text-xs font-mono text-slate-500">
                With {DOCTOR_INFO.name} • {DOCTOR_INFO.hospital}
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {confirmedApt ? (
            /* Confirmation Screen */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  CONFIRMED REF: {confirmedApt.id.toUpperCase()}
                </span>
                <h4 className="font-syne text-xl sm:text-2xl font-extrabold text-slate-900 pt-2">
                  Appointment Scheduled!
                </h4>
                <p className="text-xs font-sans text-slate-600 max-w-md mx-auto">
                  A confirmation SMS &amp; portal notification have been generated for <strong>{confirmedApt.patientName}</strong>.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-slate-50 rounded-xl p-4 text-left text-xs font-mono space-y-2.5 max-w-md mx-auto border border-slate-200">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Doctor:</span>
                  <span className="font-bold text-slate-900">{DOCTOR_INFO.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Specialty / Procedure:</span>
                  <span className="font-semibold text-emerald-700">{confirmedApt.specialty}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Date &amp; Slot:</span>
                  <span className="font-bold text-slate-900">{confirmedApt.appointmentDate} at {confirmedApt.timeSlot}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Consultation Type:</span>
                  <span className="font-semibold text-slate-900 capitalize">
                    {confirmedApt.consultationType === 'in-clinic' ? 'In-Clinic at HIMAS Hospital' : 'Video Tele-Consultation'}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Hospital Address:</span>
                  <span className="font-medium text-slate-700 text-right max-w-[220px]">
                    Basavanagudi, Bangalore
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                {onOpenPortal && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPortal();
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-syne font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View in Patient Portal</span>
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs border border-slate-200 transition-colors cursor-pointer"
                >
                  Done / Close
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleBooking} className="space-y-4">
              
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Consultation Type Selector */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Consultation Mode
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setConsultationType('in-clinic')}
                    className={`p-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      consultationType === 'in-clinic'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    <span>In-Clinic (HIMAS)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsultationType('video')}
                    className={`p-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      consultationType === 'video'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Video className="w-4 h-4 text-emerald-600" />
                    <span>Video Tele-Consult</span>
                  </button>
                </div>
              </div>

              {/* Specialty Selector */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Surgical Specialty / Procedure
                </label>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-sans focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                >
                  {DOCTOR_INFO.surgeries.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Second Opinion on Surgical Reports">
                    Second Opinion on Surgical / Ultrasound Reports
                  </option>
                  <option value="General Surgical Consultation">
                    General Surgical &amp; Gastrointestinal Consultation
                  </option>
                </select>
              </div>

              {/* Date and Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Time Slot (Mon–Sat)
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Basic Information */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Patient Information
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-sans text-slate-600 mb-1">
                      Patient Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Kumar"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        required
                        className="w-full text-xs p-3 pl-9 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-hidden font-sans"
                      />
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans text-slate-600 mb-1">
                      Contact Phone *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+91 98450 12345"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        required
                        className="w-full text-xs p-3 pl-9 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                      />
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="col-span-1">
                    <label className="block text-xs font-sans text-slate-600 mb-1">Age</label>
                    <input
                      type="number"
                      min="1"
                      max="110"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-sans text-slate-600 mb-1">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-sans focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans text-slate-600 mb-1">
                    Brief Symptoms / Prior Scans (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Diagnosed with gallstones, or abdominal swelling for past 4 months..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-hidden font-sans"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-syne font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Securing Appointment Slot...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Consultation with Dr. Harish</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] font-mono text-slate-500 text-center mt-2.5">
                  HIMAS Hospital OPD desk will confirm your slot via SMS / WhatsApp.
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
