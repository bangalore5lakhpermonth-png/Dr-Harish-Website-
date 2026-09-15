import React, { useState, useEffect } from 'react';
import { 
  X, 
  User as UserIcon, 
  Calendar, 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  ShieldCheck, 
  Lock, 
  Key, 
  Stethoscope, 
  Eye, 
  FileCheck,
  RefreshCw,
  LogOut,
  Building2,
  Video
} from 'lucide-react';
import { Appointment, MedicalRecord, RecordCategory, User } from '../types';
import { api } from '../services/api';
import { DOCTOR_INFO } from '../data/doctorData';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onUserChange: (user: User | null) => void;
  onOpenBooking: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChange,
  onOpenBooking,
}) => {
  // Tabs: 'appointments' | 'records' | 'upload' | 'auth'
  const [activeTab, setActiveTab] = useState<'appointments' | 'records' | 'upload'>(
    currentUser ? 'appointments' : 'appointments'
  );

  // Auth form states
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Data states
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  // Upload Form state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<RecordCategory>('lab_report');
  const [uploadDate, setUploadDate] = useState(new Date().toISOString().split('T')[0]);
  const [uploadDoctorNotes, setUploadDoctorNotes] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadFileSize, setUploadFileSize] = useState('');
  const [uploadFileData, setUploadFileData] = useState<string | undefined>();
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Filter category
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Load appointments and records whenever modal opens or user changes
  const fetchData = async () => {
    if (!currentUser) return;
    setLoadingData(true);
    try {
      const [apts, recs] = await Promise.all([
        api.getAppointments(),
        api.getRecords(),
      ]);
      setAppointments(apts);
      setRecords(recs);
    } catch (e) {
      console.error('Failed to fetch portal data', e);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      fetchData();
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      const res = await api.login(authEmail, authPassword);
      onUserChange(res.user);
      setActiveTab('appointments');
    } catch (err: any) {
      setAuthError(err.message || 'Login failed. Verify your email and password.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      const res = await api.register({
        name: authName,
        email: authEmail,
        password: authPassword,
        phone: authPhone,
      });
      onUserChange(res.user);
      setActiveTab('appointments');
    } catch (err: any) {
      setAuthError(err.message || 'Registration failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Demo switch
  const handleQuickDemo = async (role: 'doctor' | 'patient') => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      const res = await api.demoLogin(role);
      onUserChange(res.user);
      setActiveTab('appointments');
    } catch (err: any) {
      setAuthError(err.message || 'Demo login failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    api.logout();
    onUserChange(null);
  };

  // Handle Appointment Status Update (Doctor confirm or patient cancel)
  const handleUpdateStatus = async (
    id: string,
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled',
    notes?: string
  ) => {
    try {
      const updated = await api.updateAppointmentStatus(id, status, notes);
      setAppointments((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch (err: any) {
      alert(err.message || 'Failed to update appointment status.');
    }
  };

  // Handle File Upload Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFileName(file.name);
      setUploadFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      
      const reader = new FileReader();
      reader.onload = () => {
        setUploadFileData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Record Upload Submission
  const handleRecordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) {
      alert('Please provide a document title.');
      return;
    }
    const fileName = uploadFileName || `${uploadTitle.replace(/\s+/g, '_')}.pdf`;

    setUploading(true);
    try {
      const newRec = await api.uploadRecord({
        recordTitle: uploadTitle,
        category: uploadCategory,
        recordDate: uploadDate,
        doctorNotes: uploadDoctorNotes,
        fileName,
        fileSize: uploadFileSize || '1.4 MB',
        fileData: uploadFileData,
      });

      setRecords((prev) => [newRec, ...prev]);
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setUploadTitle('');
        setUploadDoctorNotes('');
        setUploadFileName('');
        setActiveTab('records');
      }, 1200);
    } catch (err: any) {
      alert(err.message || 'Failed to upload record.');
    } finally {
      setUploading(false);
    }
  };

  // Handle Record Deletion
  const handleDeleteRecord = async (id: string) => {
    if (!confirm('Are you sure you want to remove this medical document from your storage vault?')) {
      return;
    }
    try {
      await api.deleteRecord(id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
      if (selectedRecord?.id === id) {
        setSelectedRecord(null);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete record.');
    }
  };

  const filteredRecords = records.filter((r) => {
    if (categoryFilter === 'all') return true;
    return r.category === categoryFilter;
  });

  const getCategoryBadge = (cat: RecordCategory) => {
    switch (cat) {
      case 'scan_imaging':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">Scan / Ultrasound</span>;
      case 'lab_report':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">Lab & Blood Work</span>;
      case 'endoscopy':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">Endoscopy Report</span>;
      case 'prescription':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Rx Prescription</span>;
      case 'discharge_summary':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">Discharge Summary</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">Medical Document</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="bg-slate-50 text-slate-900 px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-200 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-syne font-bold text-lg leading-tight text-slate-900">
                  Patient &amp; Medical Records Portal
                </h3>
                {currentUser && (
                  <span className={`text-[10px] font-mono font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    currentUser.role === 'doctor' 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                      : 'bg-blue-100 text-blue-800 border-blue-200'
                  }`}>
                    {currentUser.role === 'doctor' ? 'Dr. Harish Gowda (Admin)' : 'Patient Account'}
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-slate-500">
                Encrypted Health Vault • HIMAS Hospital, Bangalore
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={handleLogout}
                className="text-xs font-mono text-slate-500 hover:text-rose-600 flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Logged In Screen */}
        {!currentUser ? (
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-slate-50">
            <div className="max-w-md mx-auto space-y-6">
              
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-syne text-xl font-bold text-slate-900 pt-2">
                  Access Your Health Records
                </h4>
                <p className="text-xs text-slate-600">
                  Sign in to view scheduled consultations with Dr. Harish Gowda and safely access your medical records vault.
                </p>
              </div>

              {/* Fast Demo One-Click Access */}
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-xs">
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 text-center font-bold">
                  Try Demo Accounts (1-Click Instant Login)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleQuickDemo('patient')}
                    disabled={authLoading}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs font-mono font-bold text-slate-800 flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Patient (Ramesh K.)</span>
                  </button>
                  <button
                    onClick={() => handleQuickDemo('doctor')}
                    disabled={authLoading}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs font-mono font-bold text-slate-800 flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dr. Harish Gowda</span>
                  </button>
                </div>
              </div>

              {/* Login / Register Toggle */}
              <div className="flex border-b border-slate-200">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2 text-xs font-syne font-bold transition-all border-b-2 cursor-pointer ${
                    authMode === 'login'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthMode('register')}
                  className={`flex-1 py-2 text-xs font-syne font-bold transition-all border-b-2 cursor-pointer ${
                    authMode === 'register'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  New Patient Registration
                </button>
              </div>

              {authError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{authError}</span>
                </div>
              )}

              {authMode === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="ramesh.k@gmail.com"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {authLoading ? 'Signing In...' : 'Sign In to Portal'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Patient Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Ramesh Kumar"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98450 12345"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="patient@example.com"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Create Secure Password
                    </label>
                    <input
                      type="password"
                      placeholder="At least 6 characters"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {authLoading ? 'Creating Account...' : 'Register Patient Account'}
                  </button>
                </form>
              )}

            </div>
          </div>
        ) : (
          /* Authenticated Portal Screen */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Top Navigation Tabs */}
            <div className="bg-slate-50 px-6 py-2 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'appointments'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {currentUser.role === 'doctor' ? 'Clinical Appointments' : 'My Appointments'}
                  </span>
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-black/20">
                    {appointments.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('records')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'records'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Medical Records Vault</span>
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-black/20">
                    {records.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('upload')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'upload'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-teal-700 hover:text-teal-900 hover:bg-teal-50'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Medical Document</span>
                </button>
              </div>

              {currentUser.role === 'patient' && (
                <button
                  onClick={onOpenBooking}
                  className="text-xs bg-white hover:bg-slate-100 text-blue-700 font-semibold px-3 py-1.5 rounded-lg border border-blue-200 flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Book New Slot</span>
                </button>
              )}
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-6">
              
              {/* TAB 1: APPOINTMENTS */}
              {activeTab === 'appointments' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        {currentUser.role === 'doctor'
                          ? 'Scheduled Patient Consultations (Doctor Desk)'
                          : 'Your Scheduled Consultations'}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {currentUser.role === 'doctor'
                          ? 'Review incoming patient symptoms, confirm slots, and record clinical recommendations.'
                          : `Consultations with ${DOCTOR_INFO.name} at HIMAS Hospital.`}
                      </p>
                    </div>
                    <button
                      onClick={fetchData}
                      className="p-1.5 text-slate-500 hover:text-blue-600 rounded-md border border-slate-200"
                      title="Refresh"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {appointments.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                      <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
                      <p className="text-sm font-semibold text-slate-700">
                        No appointments found.
                      </p>
                      <p className="text-xs text-slate-500">
                        Schedule a surgical or GI consultation with Dr. Harish Gowda.
                      </p>
                      <button
                        onClick={onOpenBooking}
                        className="px-4 py-2 bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-xs"
                      >
                        Book Consultation
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {appointments.map((apt) => (
                        <div
                          key={apt.id}
                          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 shadow-xs space-y-3"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 text-sm">
                                  {apt.patientName}
                                </span>
                                {apt.age && (
                                  <span className="text-xs text-slate-500">
                                    ({apt.age}y, {apt.gender})
                                  </span>
                                )}
                                <span className="text-[11px] text-slate-400">
                                  Ref: {apt.id.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-xs font-semibold text-blue-700 mt-0.5">
                                {apt.specialty}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              {apt.status === 'confirmed' && (
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Confirmed
                                </span>
                              )}
                              {apt.status === 'pending' && (
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> Pending Review
                                </span>
                              )}
                              {apt.status === 'completed' && (
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                  Completed
                                </span>
                              )}
                              {apt.status === 'cancelled' && (
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                  Cancelled
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Details strip */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span>{apt.appointmentDate} at {apt.timeSlot}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {apt.consultationType === 'in-clinic' ? (
                                <Building2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                              ) : (
                                <Video className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                              )}
                              <span className="capitalize">{apt.consultationType} Consultation</span>
                            </div>
                            <div className="truncate">
                              <span className="text-slate-500">Contact:</span> {apt.patientPhone}
                            </div>
                          </div>

                          {/* Symptoms / Clinical reason */}
                          {apt.symptoms && (
                            <div className="text-xs text-slate-700 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
                              <strong className="text-blue-900">Reported Symptoms:</strong>{' '}
                              <span>{apt.symptoms}</span>
                            </div>
                          )}

                          {/* Doctor Clinical Advice / Notes */}
                          {apt.doctorNotes && (
                            <div className="text-xs bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200 text-emerald-950">
                              <strong className="text-emerald-900">Dr. Harish Gowda's Notes:</strong>{' '}
                              <span>{apt.doctorNotes}</span>
                            </div>
                          )}

                          {/* Action controls */}
                          <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                            {currentUser.role === 'doctor' ? (
                              <>
                                {apt.status === 'pending' && (
                                  <button
                                    onClick={() => handleUpdateStatus(apt.id, 'confirmed', 'Appointment confirmed by Dr. Harish Gowda. Please report at HIMAS OPD counter 15 mins prior.')}
                                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold"
                                  >
                                    Confirm Slot
                                  </button>
                                )}
                                {apt.status !== 'completed' && (
                                  <button
                                    onClick={() => {
                                      const notes = prompt('Enter Clinical Advice / Post-Op Notes for patient:', apt.doctorNotes || '');
                                      if (notes !== null) {
                                        handleUpdateStatus(apt.id, 'completed', notes);
                                      }
                                    }}
                                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold"
                                  >
                                    Mark Completed & Add Notes
                                  </button>
                                )}
                              </>
                            ) : (
                              <>
                                {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                                  <button
                                    onClick={() => {
                                      if (confirm('Are you sure you wish to cancel this appointment?')) {
                                        handleUpdateStatus(apt.id, 'cancelled');
                                      }
                                    }}
                                    className="text-xs text-rose-600 hover:text-rose-800 font-medium"
                                  >
                                    Cancel Appointment
                                  </button>
                                )}
                              </>
                            )}
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: MEDICAL RECORDS VAULT */}
              {activeTab === 'records' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        Secure Medical Records & Reports
                      </h4>
                      <p className="text-xs text-slate-500">
                        Ultrasound scans, endoscopy findings, blood panels, prescriptions, and surgical discharge summaries.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="text-xs p-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 font-medium"
                      >
                        <option value="all">All Categories ({records.length})</option>
                        <option value="scan_imaging">Scans & Ultrasound</option>
                        <option value="lab_report">Lab & Blood Reports</option>
                        <option value="endoscopy">Endoscopy Reports</option>
                        <option value="prescription">Prescriptions</option>
                        <option value="discharge_summary">Discharge Summaries</option>
                      </select>
                    </div>
                  </div>

                  {filteredRecords.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                      <FileText className="w-10 h-10 text-slate-400 mx-auto" />
                      <p className="text-sm font-semibold text-slate-700">
                        No medical records stored in this category.
                      </p>
                      <button
                        onClick={() => setActiveTab('upload')}
                        className="px-4 py-2 bg-teal-600 text-white font-semibold text-xs rounded-lg shadow-xs"
                      >
                        Upload First Document
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {filteredRecords.map((rec) => (
                        <div
                          key={rec.id}
                          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              {getCategoryBadge(rec.category)}
                              <span className="text-[11px] text-slate-400">{rec.recordDate}</span>
                            </div>

                            <h5 className="font-bold text-slate-900 text-sm leading-snug">
                              {rec.recordTitle}
                            </h5>

                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <FileCheck className="w-3.5 h-3.5 text-teal-600" />
                              <span className="truncate">{rec.fileName}</span>
                              <span>•</span>
                              <span>{rec.fileSize}</span>
                            </div>

                            {rec.doctorNotes && (
                              <div className="text-[11px] bg-slate-50 p-2 rounded border border-slate-100 text-slate-700">
                                <strong>Clinical Note:</strong> {rec.doctorNotes}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                            <span className="text-[11px] text-slate-400">
                              Uploaded by {rec.uploadedBy === 'doctor' ? 'Dr. Harish' : 'Patient'}
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedRecord(rec)}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-xs flex items-center gap-1 transition-colors"
                              >
                                <Eye className="w-3 h-3" /> View
                              </button>
                              <button
                                onClick={() => handleDeleteRecord(rec.id)}
                                className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                                title="Delete document"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: UPLOAD DOCUMENT */}
              {activeTab === 'upload' && (
                <div className="max-w-xl mx-auto space-y-4">
                  <div className="text-center space-y-1">
                    <h4 className="text-base font-bold text-slate-900">
                      Upload Medical Record to Encrypted Vault
                    </h4>
                    <p className="text-xs text-slate-500">
                      Upload ultrasound films, lab tests, blood reports, or surgical referral documents.
                    </p>
                  </div>

                  {uploadSuccess ? (
                    <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                      <h5 className="font-bold text-emerald-900 text-sm">
                        Medical Record Uploaded Successfully!
                      </h5>
                      <p className="text-xs text-emerald-700">
                        Document safely stored and linked with your patient clinical profile.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleRecordSubmit} className="space-y-3 bg-white p-5 rounded-xl border border-slate-200">
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Document Title *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Abdomen Ultrasound Scan - HIMAS Lab"
                          value={uploadTitle}
                          onChange={(e) => setUploadTitle(e.target.value)}
                          required
                          className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Document Category
                          </label>
                          <select
                            value={uploadCategory}
                            onChange={(e) => setUploadCategory(e.target.value as RecordCategory)}
                            className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                          >
                            <option value="scan_imaging">Scan / Ultrasound / CT</option>
                            <option value="lab_report">Laboratory & Blood Report</option>
                            <option value="endoscopy">Endoscopy / Colonoscopy</option>
                            <option value="prescription">Medical Prescription</option>
                            <option value="discharge_summary">Discharge Summary</option>
                            <option value="other">Other Clinical Document</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Report / Test Date
                          </label>
                          <input
                            type="date"
                            value={uploadDate}
                            onChange={(e) => setUploadDate(e.target.value)}
                            className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                          />
                        </div>
                      </div>

                      {/* File Selection */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Select Document File (PDF, Image, Scans)
                        </label>
                        <div className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-xl p-4 text-center bg-slate-50 transition-colors cursor-pointer relative">
                          <input
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg,.dcm"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          <Upload className="w-7 h-7 text-slate-400 mx-auto mb-1" />
                          <p className="text-xs font-semibold text-slate-700">
                            {uploadFileName ? uploadFileName : 'Click or Drag & Drop Document'}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            PDF, JPG, PNG up to 15MB
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Clinical Notes / Remarks (Optional)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Findings shown to Dr. Harish during morning rounds..."
                          value={uploadDoctorNotes}
                          onChange={(e) => setUploadDoctorNotes(e.target.value)}
                          className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={uploading}
                        className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>{uploading ? 'Encrypting & Storing...' : 'Upload & Save to Vault'}</span>
                      </button>

                    </form>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

        {/* Document Preview Lightbox */}
        {selectedRecord && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-slate-200">
              <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
                <div>
                  <h4 className="font-bold text-base text-slate-900">
                    {selectedRecord.recordTitle}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {selectedRecord.fileName} • {selectedRecord.recordDate}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-1 text-slate-400 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Simulated Clinical Report Viewer */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-800 space-y-4 font-mono text-xs max-h-[50vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-300 pb-2 text-[11px]">
                  <span>HIMAS HOSPITAL — DEPARTMENT OF SURGICAL GASTROENTEROLOGY</span>
                  <span>CONFIDENTIAL MEDICAL REPORT</span>
                </div>

                <div className="space-y-1">
                  <p><strong>Patient Name:</strong> {selectedRecord.patientName}</p>
                  <p><strong>Consultant:</strong> Dr. Harish Gowda, MS, DipMAS (Gold Medalist)</p>
                  <p><strong>Document Type:</strong> {selectedRecord.category.toUpperCase()}</p>
                  <p><strong>Date:</strong> {selectedRecord.recordDate}</p>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded space-y-2">
                  <p className="font-bold text-slate-900">CLINICAL FINDINGS & DIAGNOSTIC SUMMARY:</p>
                  <p className="text-slate-700">
                    {selectedRecord.doctorNotes || 'Document validated and encrypted on HIMAS Hospital Clinical Health Records System. Relevant anatomical scans and surgical notes archived.'}
                  </p>
                </div>

                <div className="text-[10px] text-slate-500 text-center pt-2">
                  Digitally signed & authorized under Dr. Harish Gowda's surgical unit.
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  Storage Status: Verified 256-bit AES Encrypted
                </span>
                <button
                  onClick={() => {
                    alert(`Simulated secure download for ${selectedRecord.fileName}`);
                  }}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Document</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
