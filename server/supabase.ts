import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface UserData {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  role: 'patient' | 'doctor' | 'admin';
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  mrn?: string;
  createdAt: string;
}

export interface AppointmentData {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  age?: number;
  gender?: string;
  consultationType: 'in-clinic' | 'video';
  hospitalLocation: string;
  specialty: string;
  appointmentDate: string;
  timeSlot: string;
  symptoms: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  doctorNotes?: string;
  createdAt: string;
}

export interface MedicalRecordData {
  id: string;
  patientId: string;
  patientName: string;
  recordTitle: string;
  category: 'lab_report' | 'scan_imaging' | 'endoscopy' | 'prescription' | 'discharge_summary' | 'other';
  recordDate: string;
  uploadedBy: 'patient' | 'doctor';
  doctorNotes?: string;
  fileName: string;
  fileSize: string;
  fileData?: string;
  createdAt: string;
}

// Convert DB snake_case to AppointmentData
function mapRowToAppointment(row: Record<string, any>): AppointmentData {
  return {
    id: row.id,
    patientId: row.patient_id,
    patientName: row.patient_name,
    patientPhone: row.patient_phone,
    patientEmail: row.patient_email || '',
    age: row.age || undefined,
    gender: row.gender || '',
    consultationType: row.consultation_type || 'in-clinic',
    hospitalLocation: row.hospital_location || 'HIMAS Hospital, Basavanagudi, Bangalore',
    specialty: row.specialty,
    appointmentDate: row.appointment_date,
    timeSlot: row.time_slot,
    symptoms: row.symptoms || '',
    status: row.status || 'confirmed',
    doctorNotes: row.doctor_notes || '',
    createdAt: row.created_at || new Date().toISOString(),
  };
}

function mapAppointmentToRow(apt: AppointmentData): Record<string, any> {
  return {
    id: apt.id,
    patient_id: apt.patientId,
    patient_name: apt.patientName,
    patient_phone: apt.patientPhone,
    patient_email: apt.patientEmail || null,
    age: apt.age || null,
    gender: apt.gender || null,
    consultation_type: apt.consultationType,
    hospital_location: apt.hospitalLocation,
    specialty: apt.specialty,
    appointment_date: apt.appointmentDate,
    time_slot: apt.timeSlot,
    symptoms: apt.symptoms,
    status: apt.status,
    doctor_notes: apt.doctorNotes || null,
    created_at: apt.createdAt,
  };
}

// Convert DB snake_case to MedicalRecordData
function mapRowToRecord(row: Record<string, any>): MedicalRecordData {
  return {
    id: row.id,
    patientId: row.patient_id,
    patientName: row.patient_name,
    recordTitle: row.record_title,
    category: row.category,
    recordDate: row.record_date,
    uploadedBy: row.uploaded_by,
    doctorNotes: row.doctor_notes || undefined,
    fileName: row.file_name,
    fileSize: row.file_size || '1.2 MB',
    fileData: row.file_data || undefined,
    createdAt: row.created_at || new Date().toISOString(),
  };
}

function mapRecordToRow(rec: MedicalRecordData): Record<string, any> {
  return {
    id: rec.id,
    patient_id: rec.patientId,
    patient_name: rec.patientName,
    record_title: rec.recordTitle,
    category: rec.category,
    record_date: rec.recordDate,
    uploaded_by: rec.uploadedBy,
    doctor_notes: rec.doctorNotes || null,
    file_name: rec.fileName,
    file_size: rec.fileSize,
    file_data: rec.fileData || null,
    created_at: rec.createdAt,
  };
}

function mapRowToUser(row: Record<string, any>): UserData {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password_hash || undefined,
    phone: row.phone,
    role: row.role,
    age: row.age || undefined,
    gender: row.gender || undefined,
    mrn: row.mrn || undefined,
    createdAt: row.created_at || new Date().toISOString(),
  };
}

function mapUserToRow(user: UserData): Record<string, any> {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password_hash: user.password || null,
    phone: user.phone,
    role: user.role,
    age: user.age || null,
    gender: user.gender || null,
    mrn: user.mrn || null,
    created_at: user.createdAt,
  };
}

class SupabaseService {
  private client: SupabaseClient | null = null;
  private isConnected = false;
  private supabaseUrl: string | null = null;
  private lastHealthCheck: number = 0;
  private healthCheckInterval = 30000; // 30s cache

  constructor() {
    this.initClient();
  }

  private initClient() {
    const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    if (url && key && url.startsWith('http')) {
      try {
        this.supabaseUrl = url;
        this.client = createClient(url, key, {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        });
        console.log(`[Supabase] Initialized client for ${url}`);
      } catch (err) {
        console.error('[Supabase] Failed to initialize client:', err);
        this.client = null;
      }
    } else {
      this.client = null;
    }
  }

  public isConfigured(): boolean {
    return this.client !== null;
  }

  public getMaskedUrl(): string | null {
    if (!this.supabaseUrl) return null;
    try {
      const parsed = new URL(this.supabaseUrl);
      return `${parsed.protocol}//${parsed.hostname}`;
    } catch {
      return null;
    }
  }

  public async checkHealth(): Promise<{ connected: boolean; message: string; tablesFound?: string[] }> {
    if (!this.client) {
      return {
        connected: false,
        message: 'Supabase URL or Key not set in environment. Running on local persistent storage.',
      };
    }

    const now = Date.now();
    if (this.isConnected && (now - this.lastHealthCheck < this.healthCheckInterval)) {
      return {
        connected: true,
        message: 'Connected to Supabase PostgreSQL cluster.',
        tablesFound: ['users', 'appointments', 'medical_records'],
      };
    }

    try {
      // Test ping table
      const { data, error } = await this.client.from('appointments').select('id').limit(1);
      if (error) {
        // Table might not exist yet or permissions
        this.isConnected = false;
        return {
          connected: false,
          message: `Supabase client reached, but query failed: ${error.message}. Please ensure the schema has been executed.`,
        };
      }
      this.isConnected = true;
      this.lastHealthCheck = now;
      return {
        connected: true,
        message: 'Connected and synchronized with Supabase PostgreSQL database.',
        tablesFound: ['users', 'appointments', 'medical_records'],
      };
    } catch (err: any) {
      this.isConnected = false;
      return {
        connected: false,
        message: `Supabase health check failed: ${err.message || 'Network error'}`,
      };
    }
  }

  // --- APPOINTMENTS ---
  public async getAppointments(): Promise<AppointmentData[] | null> {
    if (!this.client) return null;
    try {
      const { data, error } = await this.client
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) {
        console.warn('[Supabase] getAppointments error:', error?.message);
        return null;
      }
      return data.map(mapRowToAppointment);
    } catch (err) {
      console.warn('[Supabase] Failed to fetch appointments:', err);
      return null;
    }
  }

  public async createAppointment(apt: AppointmentData): Promise<AppointmentData | null> {
    if (!this.client) return null;
    try {
      const row = mapAppointmentToRow(apt);
      const { data, error } = await this.client
        .from('appointments')
        .insert(row)
        .select()
        .single();

      if (error || !data) {
        console.warn('[Supabase] createAppointment error:', error?.message);
        return null;
      }
      return mapRowToAppointment(data);
    } catch (err) {
      console.warn('[Supabase] Failed to insert appointment:', err);
      return null;
    }
  }

  public async updateAppointmentStatus(
    id: string,
    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled',
    doctorNotes?: string
  ): Promise<AppointmentData | null> {
    if (!this.client) return null;
    try {
      const updates: Record<string, any> = {};
      if (status) updates.status = status;
      if (doctorNotes !== undefined) updates.doctor_notes = doctorNotes;

      const { data, error } = await this.client
        .from('appointments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error || !data) {
        console.warn('[Supabase] updateAppointment error:', error?.message);
        return null;
      }
      return mapRowToAppointment(data);
    } catch (err) {
      console.warn('[Supabase] Failed to update appointment:', err);
      return null;
    }
  }

  // --- MEDICAL RECORDS ---
  public async getRecords(): Promise<MedicalRecordData[] | null> {
    if (!this.client) return null;
    try {
      const { data, error } = await this.client
        .from('medical_records')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) {
        console.warn('[Supabase] getRecords error:', error?.message);
        return null;
      }
      return data.map(mapRowToRecord);
    } catch (err) {
      console.warn('[Supabase] Failed to fetch medical records:', err);
      return null;
    }
  }

  public async createRecord(rec: MedicalRecordData): Promise<MedicalRecordData | null> {
    if (!this.client) return null;
    try {
      const row = mapRecordToRow(rec);
      const { data, error } = await this.client
        .from('medical_records')
        .insert(row)
        .select()
        .single();

      if (error || !data) {
        console.warn('[Supabase] createRecord error:', error?.message);
        return null;
      }
      return mapRowToRecord(data);
    } catch (err) {
      console.warn('[Supabase] Failed to insert record:', err);
      return null;
    }
  }

  public async deleteRecord(id: string): Promise<boolean> {
    if (!this.client) return false;
    try {
      const { error } = await this.client
        .from('medical_records')
        .delete()
        .eq('id', id);

      if (error) {
        console.warn('[Supabase] deleteRecord error:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('[Supabase] Failed to delete record:', err);
      return false;
    }
  }

  // --- USERS ---
  public async getUsers(): Promise<UserData[] | null> {
    if (!this.client) return null;
    try {
      const { data, error } = await this.client.from('users').select('*');
      if (error || !data) {
        return null;
      }
      return data.map(mapRowToUser);
    } catch (err) {
      return null;
    }
  }

  public async createUser(user: UserData): Promise<UserData | null> {
    if (!this.client) return null;
    try {
      const row = mapUserToRow(user);
      const { data, error } = await this.client
        .from('users')
        .insert(row)
        .select()
        .single();

      if (error || !data) {
        console.warn('[Supabase] createUser error:', error?.message);
        return null;
      }
      return mapRowToUser(data);
    } catch (err) {
      console.warn('[Supabase] Failed to create user:', err);
      return null;
    }
  }
}

export const supabaseService = new SupabaseService();
