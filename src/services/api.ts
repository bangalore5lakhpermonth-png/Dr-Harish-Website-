import { Appointment, MedicalRecord, User } from '../types';

const TOKEN_KEY = 'himas_auth_token';
const USER_KEY = 'himas_auth_user';

export const authStorage = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  getUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  setUser(user: User | null) {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  const token = authStorage.getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  // Auth
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Login failed' }));
      throw new Error(err.error || 'Failed to login');
    }
    const data = await res.json();
    authStorage.setToken(data.token);
    authStorage.setUser(data.user);
    return data;
  },

  async register(params: {
    name: string;
    email: string;
    password: string;
    phone: string;
    age?: number;
    gender?: 'Male' | 'Female' | 'Other';
  }): Promise<{ user: User; token: string }> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Registration failed' }));
      throw new Error(err.error || 'Failed to register account');
    }
    const data = await res.json();
    authStorage.setToken(data.token);
    authStorage.setUser(data.user);
    return data;
  },

  async demoLogin(role: 'doctor' | 'patient'): Promise<{ user: User; token: string }> {
    const res = await fetch('/api/auth/demo-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Demo login failed' }));
      throw new Error(err.error || 'Failed to demo login');
    }
    const data = await res.json();
    authStorage.setToken(data.token);
    authStorage.setUser(data.user);
    return data;
  },

  async getMe(): Promise<User | null> {
    const token = authStorage.getToken();
    if (!token) return null;
    try {
      const res = await fetch('/api/auth/me', {
        headers: getHeaders(),
      });
      if (!res.ok) {
        authStorage.clear();
        return null;
      }
      const data = await res.json();
      authStorage.setUser(data.user);
      return data.user;
    } catch {
      return authStorage.getUser();
    }
  },

  logout() {
    authStorage.clear();
  },

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    const res = await fetch('/api/appointments', {
      headers: getHeaders(),
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data.appointments || [];
  },

  async createAppointment(booking: {
    patientName: string;
    patientPhone: string;
    patientEmail?: string;
    age?: number;
    gender?: string;
    consultationType: 'in-clinic' | 'video';
    hospitalLocation?: string;
    specialty: string;
    appointmentDate: string;
    timeSlot: string;
    symptoms?: string;
  }): Promise<Appointment> {
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(booking),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to book appointment' }));
      throw new Error(err.error || 'Failed to book appointment');
    }
    const data = await res.json();
    return data.appointment;
  },

  async updateAppointmentStatus(
    id: string,
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled',
    doctorNotes?: string
  ): Promise<Appointment> {
    const res = await fetch(`/api/appointments/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status, doctorNotes }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to update appointment' }));
      throw new Error(err.error || 'Failed to update appointment');
    }
    const data = await res.json();
    return data.appointment;
  },

  // Medical Records
  async getRecords(patientId?: string): Promise<MedicalRecord[]> {
    const url = patientId ? `/api/records?patientId=${encodeURIComponent(patientId)}` : '/api/records';
    const res = await fetch(url, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data.records || [];
  },

  async uploadRecord(record: {
    patientId?: string;
    recordTitle: string;
    category: string;
    recordDate?: string;
    doctorNotes?: string;
    fileName: string;
    fileSize?: string;
    fileData?: string;
  }): Promise<MedicalRecord> {
    const res = await fetch('/api/records', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(record),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to upload medical record' }));
      throw new Error(err.error || 'Failed to upload record');
    }
    const data = await res.json();
    return data.record;
  },

  async deleteRecord(id: string): Promise<void> {
    const res = await fetch(`/api/records/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to delete record' }));
      throw new Error(err.error || 'Failed to delete record');
    }
  },
};
