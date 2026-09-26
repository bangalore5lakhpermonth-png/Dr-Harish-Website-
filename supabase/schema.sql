-- ==============================================================================
-- DR. HARISH GOWDA CLINICAL PORTAL - SUPABASE POSTGRESQL DATABASE SCHEMA
-- ==============================================================================
-- Paste and run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. USERS & PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  phone TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('patient', 'doctor', 'admin')) DEFAULT 'patient',
  age INTEGER,
  gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
  mrn TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT,
  age INTEGER,
  gender TEXT,
  consultation_type TEXT NOT NULL CHECK (consultation_type IN ('in-clinic', 'video')) DEFAULT 'in-clinic',
  hospital_location TEXT NOT NULL DEFAULT 'HIMAS Hospital, Basavanagudi, Bangalore',
  specialty TEXT NOT NULL,
  appointment_date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  symptoms TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'confirmed',
  doctor_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. MEDICAL RECORDS TABLE (LAB REPORTS, SCANS, PRESCRIPTIONS)
CREATE TABLE IF NOT EXISTS public.medical_records (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  record_title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('lab_report', 'scan_imaging', 'endoscopy', 'prescription', 'discharge_summary', 'other')),
  record_date TEXT NOT NULL,
  uploaded_by TEXT NOT NULL CHECK (uploaded_by IN ('patient', 'doctor')),
  doctor_notes TEXT,
  file_name TEXT NOT NULL,
  file_size TEXT NOT NULL DEFAULT '1.2 MB',
  file_data TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON public.appointments (patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments (appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments (status);
CREATE INDEX IF NOT EXISTS idx_medical_records_patient_id ON public.medical_records (patient_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users (email);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;

-- Allow public read & write via service role or authenticated app
CREATE POLICY "Allow public select on users" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Allow insert on users" ON public.users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update on users" ON public.users
  FOR UPDATE USING (true);

CREATE POLICY "Allow select on appointments" ON public.appointments
  FOR SELECT USING (true);

CREATE POLICY "Allow insert on appointments" ON public.appointments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update on appointments" ON public.appointments
  FOR UPDATE USING (true);

CREATE POLICY "Allow select on medical_records" ON public.medical_records
  FOR SELECT USING (true);

CREATE POLICY "Allow insert on medical_records" ON public.medical_records
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow delete on medical_records" ON public.medical_records
  FOR DELETE USING (true);

-- 6. SEED DEFAULT CLINICAL USERS (DR. HARISH GOWDA & SAMPLE PATIENTS)
INSERT INTO public.users (id, name, email, phone, role, mrn, age, gender)
VALUES
  ('doc-harish-gowda', 'Dr. Harish Gowda', 'dr.harish@himashospital.com', '+91 77603 00622', 'doctor', 'HIMAS-SURG-001', 45, 'Male'),
  ('pat-ramesh-kumar', 'Ramesh Kumar', 'ramesh.k@gmail.com', '+91 98450 12345', 'patient', 'HIMAS-2026-0842', 48, 'Male'),
  ('pat-priya-sundaram', 'Priya Sundaram', 'priya.s@outlook.com', '+91 97401 54321', 'patient', 'HIMAS-2026-0915', 36, 'Female')
ON CONFLICT (id) DO NOTHING;

-- 7. SEED INITIAL APPOINTMENTS
INSERT INTO public.appointments (id, patient_id, patient_name, patient_phone, patient_email, age, gender, consultation_type, hospital_location, specialty, appointment_date, time_slot, symptoms, status, doctor_notes)
VALUES
  ('apt-101', 'pat-ramesh-kumar', 'Ramesh Kumar', '+91 98450 12345', 'ramesh.k@gmail.com', 48, 'Male', 'in-clinic', 'HIMAS Hospital, Basavanagudi, Bangalore', 'Laparoscopic Gallbladder Surgery (Cholecystectomy)', '2026-09-12', '11:00 AM', 'Upper right abdominal discomfort after oily meals, confirmed gallstones on ultrasound.', 'confirmed', 'Ultrasound reviewed. Single 14mm calculus in gallbladder neck. Planned for elective laparoscopic cholecystectomy.'),
  ('apt-102', 'pat-priya-sundaram', 'Priya Sundaram', '+91 97401 54321', 'priya.s@outlook.com', 36, 'Female', 'in-clinic', 'HIMAS Hospital, Basavanagudi, Bangalore', 'Hernia Repair (Laparoscopic TAPP/TEP)', '2026-09-14', '05:30 PM', 'Swelling in umbilical region for 6 months, slight pain while coughing.', 'pending', ''),
  ('apt-103', 'pat-ramesh-kumar', 'Ramesh Kumar', '+91 98450 12345', 'ramesh.k@gmail.com', 48, 'Male', 'video', 'HIMAS Tele-Consultation', 'Diagnostic Endoscopy Review', '2026-09-05', '04:00 PM', 'Mild acid reflux evaluation prior to surgical planning.', 'completed', 'Endoscopy shows mild antral gastritis. Advised PPI and proceed with gallbladder clearance.')
ON CONFLICT (id) DO NOTHING;

-- 8. SEED INITIAL MEDICAL RECORDS
INSERT INTO public.medical_records (id, patient_id, patient_name, record_title, category, record_date, uploaded_by, doctor_notes, file_name, file_size)
VALUES
  ('rec-201', 'pat-ramesh-kumar', 'Ramesh Kumar', 'Abdominal Ultrasound Scan - Gallbladder Calculus', 'scan_imaging', '2026-09-01', 'patient', 'Verified by Dr. Harish Gowda. Gallbladder wall normal thickness, single 14mm calculus.', 'USG_Abdomen_RameshKumar_Sept2026.pdf', '2.4 MB'),
  ('rec-202', 'pat-ramesh-kumar', 'Ramesh Kumar', 'Pre-Operative Complete Blood Count & Liver Function Test', 'lab_report', '2026-09-06', 'doctor', 'Bilirubin and liver enzymes within normal parameters.', 'LFT_CBC_Reports_HIMAS_Lab.pdf', '1.1 MB'),
  ('rec-203', 'pat-ramesh-kumar', 'Ramesh Kumar', 'Dr. Harish Gowda - Consultation Prescription & Pre-Surgical Advice', 'prescription', '2026-09-08', 'doctor', 'Tab Pantoprazole 40mg OD before breakfast. Fasting instructions provided.', 'Dr_Harish_Gowda_Prescription_HIMAS.pdf', '650 KB'),
  ('rec-204', 'pat-priya-sundaram', 'Priya Sundaram', 'Abdominal Wall Ultrasound - Umbilical Hernia Defect', 'scan_imaging', '2026-09-07', 'patient', 'Defect measured 1.8cm with omental fat herniation. Reducible.', 'Umbilical_Hernia_Scan_Priya.pdf', '1.8 MB')
ON CONFLICT (id) DO NOTHING;
