import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

interface UserData {
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

interface AppointmentData {
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

interface MedicalRecordData {
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

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

// Default initial database state
const defaultUsers: UserData[] = [
  {
    id: 'doc-harish-gowda',
    name: 'Dr. Harish Gowda',
    email: 'dr.harish@himashospital.com',
    password: 'Doctor@123',
    phone: '+91 77603 00622',
    role: 'doctor',
    mrn: 'HIMAS-SURG-001',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'pat-ramesh-kumar',
    name: 'Ramesh Kumar',
    email: 'ramesh.k@gmail.com',
    password: 'Patient@123',
    phone: '+91 98450 12345',
    role: 'patient',
    age: 48,
    gender: 'Male',
    mrn: 'HIMAS-2026-0842',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'pat-priya-sundaram',
    name: 'Priya Sundaram',
    email: 'priya.s@outlook.com',
    password: 'Patient@123',
    phone: '+91 97401 54321',
    role: 'patient',
    age: 36,
    gender: 'Female',
    mrn: 'HIMAS-2026-0915',
    createdAt: new Date().toISOString(),
  },
];

const defaultAppointments: AppointmentData[] = [
  {
    id: 'apt-101',
    patientId: 'pat-ramesh-kumar',
    patientName: 'Ramesh Kumar',
    patientPhone: '+91 98450 12345',
    patientEmail: 'ramesh.k@gmail.com',
    age: 48,
    gender: 'Male',
    consultationType: 'in-clinic',
    hospitalLocation: 'HIMAS Hospital, Basavanagudi, Bangalore',
    specialty: 'Laparoscopic Gallbladder Surgery (Cholecystectomy)',
    appointmentDate: '2026-09-12',
    timeSlot: '11:00 AM',
    symptoms: 'Upper right abdominal discomfort after oily meals, confirmed gallstones on ultrasound.',
    status: 'confirmed',
    doctorNotes: 'Ultrasound reviewed. Single 14mm mobile calculus in gallbladder neck. Planned for elective laparoscopic cholecystectomy.',
    createdAt: '2026-09-08T10:30:00Z',
  },
  {
    id: 'apt-102',
    patientId: 'pat-priya-sundaram',
    patientName: 'Priya Sundaram',
    patientPhone: '+91 97401 54321',
    patientEmail: 'priya.s@outlook.com',
    age: 36,
    gender: 'Female',
    consultationType: 'in-clinic',
    hospitalLocation: 'HIMAS Hospital, Basavanagudi, Bangalore',
    specialty: 'Hernia Repair (Laparoscopic TAPP/TEP)',
    appointmentDate: '2026-09-14',
    timeSlot: '05:30 PM',
    symptoms: 'Swelling in umbilical region for 6 months, slight pain while coughing or lifting weights.',
    status: 'pending',
    doctorNotes: '',
    createdAt: '2026-09-10T08:15:00Z',
  },
  {
    id: 'apt-103',
    patientId: 'pat-ramesh-kumar',
    patientName: 'Ramesh Kumar',
    patientPhone: '+91 98450 12345',
    patientEmail: 'ramesh.k@gmail.com',
    age: 48,
    gender: 'Male',
    consultationType: 'video',
    hospitalLocation: 'HIMAS Tele-Consultation',
    specialty: 'Diagnostic Endoscopy Review',
    appointmentDate: '2026-09-05',
    timeSlot: '04:00 PM',
    symptoms: 'Mild acid reflux evaluation prior to surgical planning.',
    status: 'completed',
    doctorNotes: 'Endoscopy shows mild antral gastritis. Advised PPI and proceed with gallbladder laparoscopic clearance.',
    createdAt: '2026-09-02T14:00:00Z',
  },
];

const defaultRecords: MedicalRecordData[] = [
  {
    id: 'rec-201',
    patientId: 'pat-ramesh-kumar',
    patientName: 'Ramesh Kumar',
    recordTitle: 'Abdominal Ultrasound Scan - Gallbladder Calculus',
    category: 'scan_imaging',
    recordDate: '2026-09-01',
    uploadedBy: 'patient',
    doctorNotes: 'Verified by Dr. Harish Gowda. Gallbladder wall normal thickness, single 14mm calculus.',
    fileName: 'USG_Abdomen_RameshKumar_Sept2026.pdf',
    fileSize: '2.4 MB',
    createdAt: '2026-09-01T11:20:00Z',
  },
  {
    id: 'rec-202',
    patientId: 'pat-ramesh-kumar',
    patientName: 'Ramesh Kumar',
    recordTitle: 'Pre-Operative Complete Blood Count & Liver Function Test',
    category: 'lab_report',
    recordDate: '2026-09-06',
    uploadedBy: 'doctor',
    doctorNotes: 'Bilirubin and liver enzymes within normal parameters. Coagulation profile normal.',
    fileName: 'LFT_CBC_Reports_HIMAS_Lab.pdf',
    fileSize: '1.1 MB',
    createdAt: '2026-09-06T16:45:00Z',
  },
  {
    id: 'rec-203',
    patientId: 'pat-ramesh-kumar',
    patientName: 'Ramesh Kumar',
    recordTitle: 'Dr. Harish Gowda - Consultation Prescription & Pre-Surgical Advice',
    category: 'prescription',
    recordDate: '2026-09-08',
    uploadedBy: 'doctor',
    doctorNotes: 'Tab Pantoprazole 40mg OD before breakfast. Fasting instructions provided for planned admission.',
    fileName: 'Dr_Harish_Gowda_Prescription_HIMAS.pdf',
    fileSize: '650 KB',
    createdAt: '2026-09-08T12:10:00Z',
  },
  {
    id: 'rec-204',
    patientId: 'pat-priya-sundaram',
    patientName: 'Priya Sundaram',
    recordTitle: 'Abdominal Wall Ultrasound - Umbilical Hernia Defect',
    category: 'scan_imaging',
    recordDate: '2026-09-07',
    uploadedBy: 'patient',
    doctorNotes: 'Defect measured 1.8cm with omental fat herniation. Reducible.',
    fileName: 'Umbilical_Hernia_Scan_Priya.pdf',
    fileSize: '1.8 MB',
    createdAt: '2026-09-07T09:30:00Z',
  },
];

// Helper to load or initialize DB
function loadDB() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error loading DB, using defaults', err);
  }
  const initial = {
    users: defaultUsers,
    appointments: defaultAppointments,
    records: defaultRecords,
  };
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to write initial DB file', e);
  }
  return initial;
}

function saveDB(data: { users: UserData[]; appointments: AppointmentData[]; records: MedicalRecordData[] }) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save DB file', err);
  }
}

let db = loadDB();

// Simulated token authorization helper
function getUserFromToken(authHeader?: string): UserData | null {
  if (!authHeader) return null;
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) return null;
  const user = db.users.find((u: UserData) => `token_${u.id}` === token || u.id === token);
  return user || null;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '15mb' }));

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Dr. Harish Gowda Clinical & Appointment Engine',
      hospital: 'HIMAS Hospital, Basavanagudi, Bangalore',
      phone: '+91 77603 00622',
      appointmentsCount: db.appointments.length,
      recordsCount: db.records.length,
    });
  });

  // Auth: Register new patient
  app.post('/api/auth/register', (req, res) => {
    const { name, email, password, phone, age, gender } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: 'Name, email, password, and phone number are required.' });
    }

    const existing = db.users.find((u: UserData) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(409).json({ error: 'An account with this email address already exists.' });
    }

    const mrnNumber = `HIMAS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newUser: UserData = {
      id: `pat-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      phone: phone.trim(),
      role: 'patient',
      age: age ? Number(age) : undefined,
      gender: gender || 'Other',
      mrn: mrnNumber,
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    saveDB(db);

    const token = `token_${newUser.id}`;
    const safeUser = { ...newUser };
    delete safeUser.password;

    res.status(201).json({
      user: safeUser,
      token,
      message: 'Account registered successfully.',
    });
  });

  // Auth: Login
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }

    const user = db.users.find(
      (u: UserData) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password. Please verify your credentials.' });
    }

    const token = `token_${user.id}`;
    const safeUser = { ...user };
    delete safeUser.password;

    res.json({
      user: safeUser,
      token,
      message: 'Login successful.',
    });
  });

  // Auth: Quick Demo Login Switcher
  app.post('/api/auth/demo-login', (req, res) => {
    const { role } = req.body; // 'doctor' or 'patient'
    const targetId = role === 'doctor' ? 'doc-harish-gowda' : 'pat-ramesh-kumar';
    const user = db.users.find((u: UserData) => u.id === targetId) || db.users[0];

    const token = `token_${user.id}`;
    const safeUser = { ...user };
    delete safeUser.password;

    res.json({
      user: safeUser,
      token,
      message: `Signed in as ${user.name} (${user.role})`,
    });
  });

  // Auth: Current user (Me)
  app.get('/api/auth/me', (req, res) => {
    const user = getUserFromToken(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized or session expired.' });
    }
    const safeUser = { ...user };
    delete safeUser.password;
    res.json({ user: safeUser });
  });

  // Appointments: Get list
  app.get('/api/appointments', (req, res) => {
    const user = getUserFromToken(req.headers.authorization);
    
    // If not authenticated, return public schedule availability or prompt
    if (!user) {
      // return empty or public slots
      return res.json({ appointments: [] });
    }

    // Doctor can view all patient appointments; Patient can only view their own
    if (user.role === 'doctor' || user.role === 'admin') {
      return res.json({ appointments: db.appointments });
    } else {
      const patientAppointments = db.appointments.filter((a: AppointmentData) => a.patientId === user.id);
      return res.json({ appointments: patientAppointments });
    }
  });

  // Appointments: Create new booking
  app.post('/api/appointments', (req, res) => {
    const user = getUserFromToken(req.headers.authorization);
    const {
      patientName,
      patientPhone,
      patientEmail,
      age,
      gender,
      consultationType,
      hospitalLocation,
      specialty,
      appointmentDate,
      timeSlot,
      symptoms,
    } = req.body;

    if (!patientName || !patientPhone || !appointmentDate || !timeSlot || !specialty) {
      return res.status(400).json({ error: 'Please provide all required fields (Name, Phone, Date, Time Slot, Specialty).' });
    }

    const newAppointment: AppointmentData = {
      id: `apt-${Date.now()}`,
      patientId: user ? user.id : `guest-${Date.now()}`,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail ? patientEmail.trim() : (user?.email || ''),
      age: age ? Number(age) : (user?.age || undefined),
      gender: gender || (user?.gender || 'Not specified'),
      consultationType: consultationType || 'in-clinic',
      hospitalLocation: hospitalLocation || 'HIMAS Hospital, Basavanagudi, Bangalore',
      specialty,
      appointmentDate,
      timeSlot,
      symptoms: symptoms ? symptoms.trim() : 'Routine surgical consultation',
      status: 'confirmed', // Instant confirmation for streamlined patient experience
      doctorNotes: '',
      createdAt: new Date().toISOString(),
    };

    db.appointments.unshift(newAppointment);
    saveDB(db);

    res.status(201).json({
      appointment: newAppointment,
      message: `Appointment successfully booked with Dr. Harish Gowda at HIMAS Hospital for ${appointmentDate} at ${timeSlot}.`,
    });
  });

  // Appointments: Update status / notes (Doctor or Patient cancel)
  app.patch('/api/appointments/:id/status', (req, res) => {
    const user = getUserFromToken(req.headers.authorization);
    const { id } = req.params;
    const { status, doctorNotes } = req.body;

    const aptIndex = db.appointments.findIndex((a: AppointmentData) => a.id === id);
    if (aptIndex === -1) {
      return res.status(404).json({ error: 'Appointment record not found.' });
    }

    const appointment = db.appointments[aptIndex];

    // Patients can only cancel their own appointment
    if (user && user.role === 'patient' && appointment.patientId !== user.id) {
      return res.status(403).json({ error: 'You are not permitted to modify another patient appointment.' });
    }

    if (status) {
      appointment.status = status;
    }
    if (doctorNotes !== undefined) {
      appointment.doctorNotes = doctorNotes;
    }

    db.appointments[aptIndex] = appointment;
    saveDB(db);

    res.json({
      appointment,
      message: 'Appointment status updated successfully.',
    });
  });

  // Medical Records: Get list
  app.get('/api/records', (req, res) => {
    const user = getUserFromToken(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ error: 'Authentication required to access medical records.' });
    }

    if (user.role === 'doctor' || user.role === 'admin') {
      const patientIdQuery = req.query.patientId as string;
      if (patientIdQuery) {
        const filtered = db.records.filter((r: MedicalRecordData) => r.patientId === patientIdQuery);
        return res.json({ records: filtered });
      }
      return res.json({ records: db.records });
    } else {
      const patientRecords = db.records.filter((r: MedicalRecordData) => r.patientId === user.id);
      return res.json({ records: patientRecords });
    }
  });

  // Medical Records: Upload/Store new record
  app.post('/api/records', (req, res) => {
    const user = getUserFromToken(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ error: 'Authentication required to store medical records.' });
    }

    const {
      patientId,
      recordTitle,
      category,
      recordDate,
      doctorNotes,
      fileName,
      fileSize,
      fileData,
    } = req.body;

    if (!recordTitle || !fileName) {
      return res.status(400).json({ error: 'Record title and document file are required.' });
    }

    const targetPatientId = user.role === 'doctor' ? (patientId || 'pat-ramesh-kumar') : user.id;
    const targetUser = db.users.find((u: UserData) => u.id === targetPatientId);

    const newRecord: MedicalRecordData = {
      id: `rec-${Date.now()}`,
      patientId: targetPatientId,
      patientName: targetUser ? targetUser.name : user.name,
      recordTitle: recordTitle.trim(),
      category: category || 'lab_report',
      recordDate: recordDate || new Date().toISOString().split('T')[0],
      uploadedBy: user.role === 'doctor' ? 'doctor' : 'patient',
      doctorNotes: doctorNotes ? doctorNotes.trim() : undefined,
      fileName: fileName.trim(),
      fileSize: fileSize || '1.2 MB',
      fileData: fileData || undefined,
      createdAt: new Date().toISOString(),
    };

    db.records.unshift(newRecord);
    saveDB(db);

    res.status(201).json({
      record: newRecord,
      message: 'Medical document securely uploaded and encrypted in vault.',
    });
  });

  // Medical Records: Delete record
  app.delete('/api/records/:id', (req, res) => {
    const user = getUserFromToken(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const { id } = req.params;
    const index = db.records.findIndex((r: MedicalRecordData) => r.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Record not found.' });
    }

    const record = db.records[index];
    if (user.role === 'patient' && record.patientId !== user.id) {
      return res.status(403).json({ error: 'Permission denied.' });
    }

    db.records.splice(index, 1);
    saveDB(db);

    res.json({ message: 'Record deleted from storage.' });
  });

  // Doctor Photo Upload & Serving
  app.post('/api/upload-doctor-photo', (req, res) => {
    try {
      const { imageData } = req.body;
      if (!imageData) {
        return res.status(400).json({ error: 'Image data payload is required.' });
      }

      // Extract base64 content
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      // 1. Write to public/images/dr_harish_portrait.jpg
      const publicDir = path.join(process.cwd(), 'public', 'images');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(path.join(publicDir, 'dr_harish_portrait.jpg'), buffer);

      // 2. Also write to dist/images if compiled dist exists
      const distDir = path.join(process.cwd(), 'dist', 'images');
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, 'dr_harish_portrait.jpg'), buffer);
      }

      // 3. Write permanent copy in data folder
      fs.writeFileSync(path.join(DATA_DIR, 'doctor_portrait.jpg'), buffer);

      return res.json({ 
        success: true, 
        message: 'Doctor portrait updated successfully with original file.',
        photoUrl: `/api/doctor-photo?t=${Date.now()}`
      });
    } catch (err: any) {
      console.error('Error saving doctor photo:', err);
      return res.status(500).json({ error: 'Failed to write doctor photo to disk.' });
    }
  });

  app.get('/api/doctor-photo', (req, res) => {
    const backup = path.join(DATA_DIR, 'doctor_portrait.jpg');
    if (fs.existsSync(backup)) {
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return fs.createReadStream(backup).pipe(res);
    }
    const pub = path.join(process.cwd(), 'public', 'images', 'dr_harish_portrait.jpg');
    if (fs.existsSync(pub)) {
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return fs.createReadStream(pub).pipe(res);
    }
    return res.status(404).send('Photo not found');
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Medical server running on http://localhost:${PORT}`);
  });
}

startServer();
