export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  mrn?: string; // Medical Record Number
  createdAt: string;
}

export type ConsultationType = 'in-clinic' | 'video';

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  age?: number;
  gender?: string;
  consultationType: ConsultationType;
  hospitalLocation: string;
  specialty: string;
  appointmentDate: string;
  timeSlot: string;
  symptoms: string;
  status: AppointmentStatus;
  doctorNotes?: string;
  createdAt: string;
}

export type RecordCategory =
  | 'lab_report'
  | 'scan_imaging'
  | 'endoscopy'
  | 'prescription'
  | 'discharge_summary'
  | 'other';

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  recordTitle: string;
  category: RecordCategory;
  recordDate: string;
  uploadedBy: 'patient' | 'doctor';
  doctorNotes?: string;
  fileName: string;
  fileSize: string;
  fileData?: string; // base64 or data URI for simulated file download/viewing
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
