export interface SurgeryDetail {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  image?: string;
  indications: string[];
  technique: string;
  stayDuration: string;
  recoveryTime: string;
  badge: string;
}

export interface ReviewItem {
  id: string;
  patientName: string;
  procedure: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
  highlights: string[];
}

export interface VideoItem {
  id: string;
  youtubeId: string;
  url: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  views: string;
}

export interface ReelItem {
  id: string;
  youtubeId: string;
  url: string;
  title: string;
  patientCase: string;
  duration: string;
  views: string;
  likes: string;
}

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  summary: string;
  keyPoints: string[];
  content: string[];
  clinicalTakeaway: string;
  isCustom?: boolean;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  subtitle: string;
  procedureName: string;
  timeframe: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  caseSummary: string;
  preOpFindings: string[];
  postOpResolution: string[];
  doctorNote: string;
}

export const DOCTOR_INFO = {
  name: "Dr. Harish Gowda",
  title: "Laparoscopic Surgeon & Surgical Gastroenterologist",
  designation: "Consultant Surgical Gastroenterologist & Minimal Access Surgeon",
  hospital: "HIMAS Hospital",
  address: "No. 3, Kariyappa Road, Opp. Krishna Rao Park, Basavanagudi, Bangalore – 560004",
  phone: "+91 77603 00622",
  email: "contact@himashospital.com",
  timings: "Monday – Saturday: 8:00 AM – 8:00 PM",
  emergencyAvailability: "24/7 Surgical Emergency Backup",
  googleBusinessUrl: "https://maps.app.goo.gl/jzbiaZ7hdyRDiZds5",
  rating: 5.0,
  totalReviews: 27,
  yearsExperience: "18+ Years",
  surgeriesPerformed: "15,000+",
  birthYear: 1984,
  origin: "Nidasale Village, Kunigal Taluk, Tumkur District",
  philosophy: "To provide high-quality surgical healthcare at an affordable cost, anchored by Dedication, Dignity, and Discipline.",
  charitableTrust: "HIMAS Charitable Trust (advancing health and medical education for underprivileged communities)",

  images: {
    portrait: "/images/dr_harish_portrait.jpg",
    operatingTheater: "/images/dr_harish_ot.jpg",
    endoscopy: "/images/dr_harish_endoscopy.jpg",
    convocation: "/images/dr_harish_convocation.jpg",
  },

  gallery: [
    {
      id: "gal-1",
      title: "Senior Surgical Consultant & Director",
      subtitle: "Dr. Harish Gowda at HIMAS Hospital consultation executive wing",
      image: "/images/dr_harish_portrait.jpg",
      category: "Hospital & Clinical",
      tag: "Executive Profile",
      specs: "18+ Yrs Clinical Mastery • Basavanagudi",
    },
    {
      id: "gal-2",
      title: "Operating Suite & Laparoscopic Command",
      subtitle: "Sterile pre-op preparation inside HIMAS surgical theater with HD laparoscopic imaging",
      image: "/images/dr_harish_ot.jpg",
      category: "OT & Robotic Surgery",
      tag: "OT Theater",
      specs: "Stryker HD Laparoscopy • Hepa Filter Class 100",
    },
    {
      id: "gal-3",
      title: "da Vinci Xi Robotic Console Navigation",
      subtitle: "Advanced robotic-assisted gastrointestinal surgery with 3D high-magnification",
      image: "/images/dr_harish_robotic.jpg",
      category: "OT & Robotic Surgery",
      tag: "Robotic Console",
      specs: "da Vinci Xi Minimal Access System",
    },
    {
      id: "gal-4",
      title: "Live Endoscopic & Diagnostic Precision",
      subtitle: "Real-time diagnostic GI endoscopy and mucosal evaluation with surgical team",
      image: "/images/dr_harish_endoscopy.jpg",
      category: "Endoscopy Suite",
      tag: "Intervention Suite",
      specs: "Olympus NBI High-Definition Video Endoscopy",
    },
    {
      id: "gal-5",
      title: "14th National Congress Fellowship Honor",
      subtitle: "Fellowship Convocation of Indian Association of Gastrointestinal Endo-Surgeons (IAGES)",
      image: "/images/dr_harish_convocation.jpg",
      category: "Academic & Awards",
      tag: "Academic Convocation",
      specs: "IAGES Fellowship • National Surgical Honor",
    },
    {
      id: "gal-6",
      title: "Surgical Excellence & Conference Felicitations",
      subtitle: "Dr. Harish receiving memento plaque at prestigious clinical summit",
      image: "/images/dr_harish_award.jpg",
      category: "Academic & Awards",
      tag: "Excellence Award",
      specs: "State Surgical Society Recognition",
    },
    {
      id: "gal-7",
      title: "Endoscopic Eyes & Surgical Masterclass",
      subtitle: "Dr. Harish mentoring young surgical fellows on advanced endoscopy and minimally invasive access",
      image: "/images/dr_harish_teaching.jpg",
      category: "Conferences & Teaching",
      tag: "Surgical Masterclass",
      specs: "HIMAS Academic Wing & Mentorship",
    },
    {
      id: "gal-8",
      title: "HIMAS 21st Century Hospital Center",
      subtitle: "State-of-the-art surgical hospital facility in Basavanagudi, Bangalore",
      image: "/images/dr_harish_suit.jpg",
      category: "Hospital & Clinical",
      tag: "HIMAS Hospital",
      specs: "24/7 Surgical Emergency • Advanced ICU",
    },
  ],
  
  qualifications: [
    { code: "MBBS", detail: "Bangalore Medical College & Research Institute (2002–2008)" },
    { code: "MS", detail: "General Surgery — Mysore Medical College (2008–2012)" },
    { code: "DipMAS", detail: "Diploma in Minimal Access Surgery (Gold Medalist)" },
    { code: "DMAS", detail: "Diploma in Minimal Access Surgery" },
    { code: "FAMSI", detail: "Fellowship of Association of Minimal Access Surgeons of India" },
    { code: "FACRSI", detail: "Fellowship of Association of Colon & Rectal Surgeons of India" },
    { code: "FMAS", detail: "Fellowship in Minimal Access Surgery" },
    { code: "FIAGES", detail: "Fellow of Indian Association of Gastrointestinal Endo-Surgeons" },
    { code: "FALS (Hernia)", detail: "Fellowship in Advanced Laparoscopic Surgery (Hernia)" },
    { code: "EFIGAGES", detail: "Endoscopy Fellowship of IAGES" },
    { code: "FCLS", detail: "Fellow of International College of Laparoscopic Surgeons" },
    { code: "FICS", detail: "Fellow of International College of Surgeons" },
  ],

  academicExperience: [
    {
      role: "Associate Professor of Surgery",
      institutions: "KIMS Hospital & Bowring and Lady Curzon Hospital",
      duration: "~12 Years of Academic Teaching",
      description: "Trained and mentored undergraduate and postgraduate surgical residents. Recognized as a motivational mentor for young medical students.",
    },
  ],

  careerTimeline: [
    { period: "2002–2008", institution: "Bangalore Medical College", role: "Medical Training (MBBS)" },
    { period: "2008–2012", institution: "Mysore Medical College", role: "Surgical Residency (MS General Surgery)" },
    { period: "2013–2020", institution: "KIMS Hospital", role: "Associate Professor & Consultant Surgeon" },
    { period: "2020–2022", institution: "Bowring and Lady Curzon Hospital", role: "Associate Professor of Surgery" },
    { period: "Ongoing", institution: "HIMAS Hospital, Basavanagudi", role: "Consultant Surgical Gastroenterologist" },
    { period: "Visiting / Surgical Experience", institution: "Rangadore Memorial, Apollo Hospitals, Aster Hospital & HCG Hospital", role: "Advanced Surgical Attachments" },
  ],

  awards: [
    {
      title: "Gold Medalist in Diploma in Minimal Access Surgery",
      by: "World Laparoscopy Hospital / Academic Board",
      year: "Excellence in Laparoscopy",
    },
    {
      title: "Young Surgeon Award",
      by: "Surgical Society Bangalore (SSB)",
      year: "State Recognition",
    },
    {
      title: "Secretary — Surgical Society Bangalore",
      by: "Surgical Society Bangalore Executive Council",
      year: "Leadership Post",
    },
  ],

  memberships: [
    "Association of Surgeons of India (ASI)",
    "Indian Medical Association (IMA)",
    "World Association of Laparoscopic Surgeons (WALS)",
    "International Robotic Association",
    "Indian Association of Gastrointestinal Endo-surgeons (IAGES)",
    "Association of Minimal Access Surgery of India (AMASI)",
  ],

  surgeries: [
    {
      id: "gallbladder",
      title: "Laparoscopic Gallbladder Surgery",
      shortDesc: "Keyhole surgery (cholecystectomy) for gallstones, biliary colic, and gallbladder polyps with pinhole incisions and rapid recovery.",
      iconName: "ShieldPlus",
      image: "/images/dr_harish_ot.jpg",
      indications: ["Symptomatic Gallstones", "Cholecystitis (Inflammation)", "Gallbladder Polyps", "Biliary Dysplasia"],
      technique: "4-port minimal access laparoscopy, HD optical magnification, safe critical view of safety (CVS) dissection.",
      stayDuration: "Day care / 24 Hours",
      recoveryTime: "3 to 5 Days to resume routine activities",
      badge: "High Precision Keyhole",
    },
    {
      id: "hernia",
      title: "Advanced Laparoscopic Hernia Repair",
      shortDesc: "Comprehensive repair of Inguinal, Umbilical, Incisional, and Ventral hernias using tension-free 3D anatomical mesh.",
      iconName: "Activity",
      image: "/images/dr_harish_robotic.jpg",
      indications: ["Groin / Inguinal Hernia (Unilateral/Bilateral)", "Umbilical & Paraumbilical Hernia", "Post-surgical Incisional Hernia", "Ventral / Epigastric Hernia"],
      technique: "TAPP (Transabdominal Preperitoneal) & TEP (Totally Extraperitoneal) laparoscopic mesh plasty.",
      stayDuration: "24 Hours hospital stay",
      recoveryTime: "Minimal pain, return to light desk work in 48 hours",
      badge: "FALS Hernia Certified",
    },
    {
      id: "surgical-gi",
      title: "Surgical Gastroenterology & GI Care",
      shortDesc: "Surgical treatment of diseases of the esophagus, stomach, small intestine, colon, appendix, and gastrointestinal blockages.",
      iconName: "HeartPulse",
      image: "/images/dr_harish_endoscopy.jpg",
      indications: ["Recurrent Acid Reflux / Hiatus Hernia", "Acute Appendicitis", "Intestinal Strictures & Bowel Obstruction", "Gastrointestinal Tumors"],
      technique: "Minimally invasive laparoscopic resection and anatomical reconstruction.",
      stayDuration: "2 to 4 Days depending on case",
      recoveryTime: "Structured post-operative dietary transition and rapid mobilization",
      badge: "Digestive Care Specialist",
    },
    {
      id: "endoscopy",
      title: "Diagnostic & Therapeutic Endoscopy",
      shortDesc: "Advanced high-definition upper GI endoscopy and colonoscopy for diagnosis of ulcers, bleeding, reflux, and polyp resection.",
      iconName: "Eye",
      image: "/images/dr_harish_endoscopy.jpg",
      indications: ["Chronic Dyspepsia / GERD", "Unexplained Anemia or GI Bleed", "Stomach & Duodenal Ulcers", "Colorectal Screening & Polypectomy"],
      technique: "Narrow-band imaging (NBI) video endoscopy under conscious sedation for painless examination.",
      stayDuration: "Outpatient / 2 Hours Observation",
      recoveryTime: "Same day return to normal diet",
      badge: "EFIGAGES Certified",
    },
    {
      id: "proctology",
      title: "Piles, Fissure & Fistula Treatment",
      shortDesc: "Compassionate, modern surgical and minimally invasive care for hemorrhoids, anal fissures, and perianal fistulas.",
      iconName: "Stethoscope",
      image: "/images/dr_harish_suit.jpg",
      indications: ["Grade 2-4 Internal & External Piles", "Chronic Painful Anal Fissure", "Complex Anal Fistula", "Pilonidal Sinus"],
      technique: "MIPH (Stapler Hemorrhoidectomy), Laser treatment, and LIFT procedure for fistula preservation.",
      stayDuration: "Day care / 24 Hours",
      recoveryTime: "Immediate pain relief with smooth bowel movement care",
      badge: "Minimally Invasive",
    },
    {
      id: "general-emergency",
      title: "Emergency & General Surgical Care",
      shortDesc: "Round-the-clock surgical emergency response for acute abdominal emergencies, trauma, and soft tissue infections at HIMAS Hospital.",
      iconName: "Ambulance",
      image: "/images/dr_harish_ot.jpg",
      indications: ["Perforated Peptic Ulcer", "Obstructed Hernia", "Intra-abdominal Sepsis", "Trauma & Abscess Drainage"],
      technique: "Emergency diagnostic laparoscopy and open surgical intervention with ICU support.",
      stayDuration: "Case-specific monitored recovery",
      recoveryTime: "Comprehensive ICU and dedicated surgical ward care",
      badge: "24/7 HIMAS Hospital Backup",
    },
  ],

  reviews: [
    {
      id: "rev-1",
      patientName: "Nagaraj V.",
      procedure: "Laparoscopic Gallbladder Surgery",
      rating: 5,
      date: "August 2026",
      verified: true,
      comment: "Dr. Harish Gowda is an exceptional surgeon. I was very nervous about my gallbladder stones, but he calmly explained the entire keyhole procedure on my scan reports. Surgery at HIMAS Hospital went seamlessly without any pain. Discharged the next day!",
      highlights: ["Painless surgery", "Clear explanation", "Discharged next day"],
    },
    {
      id: "rev-2",
      patientName: "Siddeshwarappa M.",
      procedure: "Bilateral Inguinal Hernia Mesh Repair",
      rating: 5,
      date: "July 2026",
      verified: true,
      comment: "Highly knowledgeable and patient-friendly doctor. He took time to answer all my family's questions before the hernia surgery. The nursing care and hospital cleanliness in Basavanagudi were top notch. I was walking comfortably on day 2.",
      highlights: ["Experienced surgeon", "Clean hospital", "Caring nursing staff"],
    },
    {
      id: "rev-3",
      patientName: "Sunitha Rao",
      procedure: "Upper GI Endoscopy & Gastric Care",
      rating: 5,
      date: "June 2026",
      verified: true,
      comment: "Underwent endoscopy with Dr. Harish. The procedure was done so gently under light sedation that I felt nothing. His diagnosis was spot-on, and he avoided unnecessary heavy medications. A doctor who truly cares about the patient's well-being.",
      highlights: ["Gentle procedure", "Accurate diagnosis", "Affordable care"],
    },
    {
      id: "rev-4",
      patientName: "Kishore Kumar B.",
      procedure: "Laparoscopic Appendix & GI Surgery",
      rating: 5,
      date: "May 2026",
      verified: true,
      comment: "Admitted in emergency for acute appendicitis. Dr. Harish operated via laparoscopy at night with utmost precision. His post-operative follow-up and calm attitude gave us huge confidence. Bangalore is lucky to have such dedicated surgeons.",
      highlights: ["24/7 Emergency response", "Quick recovery", "Compassionate doctor"],
    },
  ],

  faqs: [
    {
      question: "Why is laparoscopic surgery preferred over traditional open surgery?",
      answer: "Laparoscopic (keyhole) surgery utilizes miniature 5–10 mm incisions, a high-definition camera, and specialized micro-instruments. This results in minimal tissue trauma, significantly lower post-operative pain, negligible blood loss, minimal scarring, and allows most patients to return home within 24 hours.",
    },
    {
      question: "How do I schedule an in-clinic consultation at HIMAS Hospital?",
      answer: "You can book directly through the online appointment portal on this website, select your preferred morning or evening time slot, or call the hospital consultation desk directly at +91 77603 00622. Emergency surgical cases are admitted 24/7.",
    },
    {
      question: "How does the Secure Medical Record Storage work?",
      answer: "Patients can log into their private portal to upload ultrasound scans, blood tests, endoscopy reports, and discharge summaries. Dr. Harish Gowda reviews these directly, attaches clinical notes or digital prescriptions, and you retain lifelong encrypted access to all your records without carrying paper files.",
    },
    {
      question: "Are cashless health insurance and Mediclaim policies accepted at HIMAS Hospital?",
      answer: "Yes, HIMAS Hospital has tie-ups with leading TPAs and major public & private health insurance providers for cashless surgical hospitalization for hernia, gallbladder, appendicitis, and gastrointestinal procedures.",
    },
    {
      question: "How long is the recovery period following laparoscopic hernia or gallbladder surgery?",
      answer: "Most patients are mobilized and walking within 4–6 hours post-surgery, discharged the following morning (24 hours), and are able to resume light desk work and regular home activities within 3 to 5 days.",
    },
  ],

  videos: [
    {
      id: "vid-1",
      youtubeId: "ynf7uqvyNak",
      url: "https://youtu.be/ynf7uqvyNak?si=JJIQtu4tpI-5OxFy",
      title: "Minimally Invasive GI Surgery & Surgical Protocols",
      description: "Comprehensive clinical overview of laparoscopic techniques for gastrointestinal conditions and patient safety standards.",
      duration: "12:45",
      category: "Surgical Mastery",
      views: "14.2K views",
    },
    {
      id: "vid-2",
      youtubeId: "Kng-8fx_njM",
      url: "https://youtu.be/Kng-8fx_njM?si=xEJn5VySYWcF3YVr",
      title: "Laparoscopic Gallbladder & Hernia Surgery Guide",
      description: "Dr. Harish Gowda explains keyhole incisions, 3D anatomical mesh placement, and smooth post-op recovery timeline.",
      duration: "08:20",
      category: "Patient Guidance",
      views: "19.8K views",
    },
    {
      id: "vid-3",
      youtubeId: "MhKdLoE8QME",
      url: "https://youtu.be/MhKdLoE8QME?si=c1pJnQ3HXi7keItS",
      title: "Advanced Surgical Standards at HIMAS Hospital",
      description: "Inside the modern operating suites, laminar flow airflow, and high-definition laparoscopic imaging.",
      duration: "10:15",
      category: "Clinical Excellence",
      views: "22.5K views",
    },
  ],

  reels: [
    {
      id: "reel-1",
      youtubeId: "jmyksh8RodQ",
      url: "https://youtube.com/shorts/jmyksh8RodQ?si=4uEEYRizn5boJ1rn",
      title: "Same-Day Mobilization Post Laparoscopy",
      patientCase: "Discharged within 24 Hours • Pain-Free Walking",
      duration: "0:58",
      views: "34.5K",
      likes: "2.8K",
    },
    {
      id: "reel-2",
      youtubeId: "4AjDJXypKLo",
      url: "https://youtube.com/shorts/4AjDJXypKLo?si=EIIXC28LeCLQKb8N",
      title: "Severe Gallstone Colic to Instant Relief",
      patientCase: "Keyhole Cholecystectomy • Zero Incision Scars",
      duration: "0:45",
      views: "28.2K",
      likes: "2.1K",
    },
    {
      id: "reel-3",
      youtubeId: "GqE6HBUhweo",
      url: "https://youtube.com/shorts/GqE6HBUhweo?si=7YrjCrNF7tMm0PBZ",
      title: "Complex Inguinal Hernia Mesh Repair Success",
      patientCase: "Anatomical 3D Mesh • Back to Active Life in 48 Hrs",
      duration: "0:52",
      views: "41.9K",
      likes: "3.4K",
    },
  ],

  beforeAfterCase: {
    id: "case-before-after-1",
    title: "Dr. Harish Gowda: Endoscopic Pre-Op Obstruction to Healed Patency",
    subtitle: "Clinical Case Transformation — Pre-Operative Endoscopy vs Post-Surgical Resolution",
    procedureName: "High-Definition Diagnostic Endoscopy & Minimal Access Reconstructive Care",
    timeframe: "24-Hour Transformation",
    beforeLabel: "BEFORE — Severe Stricture & Luminal Narrowing",
    afterLabel: "AFTER — Complete Luminal Clearance & Healed Anatomy",
    beforeImage: "/images/dr_harish_endoscopy.jpg",
    afterImage: "/images/dr_harish_ot.jpg",
    caseSummary: "Patient presented with refractory dysphagia, acute digestive obstruction, and severe mucosal congestion. Under high-definition endoscopic visualization and minimally invasive technique, normal GI patency was restored with zero open incisions.",
    preOpFindings: [
      "Severe luminal stricture with mucosal congestion & edema",
      "Inability to pass standard endoscope through upper GI junction",
      "Chronic regurgitation, pain, and marked weight loss",
    ],
    postOpResolution: [
      "100% restored luminal patency and healthy mucosal vascularity",
      "Immediate oral liquid tolerance within 6 hours post-procedure",
      "Discharged next morning in stable, symptom-free condition",
    ],
    doctorNote: "Early diagnostic endoscopy combined with precision keyhole intervention prevents permanent structural damage, eliminates prolonged hospital stays, and allows instant clinical relief.",
  },

  blogs: [
    {
      id: "blog-1",
      title: "Understanding Acid Reflux & GERD: When to Consider Laparoscopic Fundoplication",
      slug: "acid-reflux-gerd-laparoscopic-fundoplication",
      category: "Esophagus & Upper GI",
      readTime: "4 min read",
      date: "September 2026",
      image: "/images/dr_harish_portrait.jpg",
      summary: "Chronic heartburn, nighttime acid reflux, and regurgitation often point to a weakened lower esophageal sphincter (LES). Discover when lifestyle tweaks end and keyhole surgery cures the root cause.",
      keyPoints: [
        "Weakened Lower Esophageal Sphincter (LES) allows gastric acid into esophagus",
        "Long-term untreated reflux risks Barrett's esophagus and ulceration",
        "Laparoscopic Nissen Fundoplication creates a 360° natural valve wrap",
        "Over 92% permanent cure rate with 24-hour hospital stay",
      ],
      content: [
        "Gastroesophageal Reflux Disease (GERD) affects millions of people across India, often exacerbated by irregular dietary routines, stress, and anatomical factors such as a Hiatus Hernia.",
        "While antacids and PPIs offer temporary symptom masking, they do not repair a mechanically incompetent valve. When stomach contents continuously wash back into the esophagus, mucosal erosion occurs, increasing the risk of Barrett's esophagus.",
        "Through minimal access keyhole surgery (Laparoscopic Fundoplication), Dr. Harish Gowda reinforces the lower esophageal sphincter by wrapping the upper portion of the stomach around the lower esophagus, restoring normal one-way valve mechanics.",
        "Patients experience immediate cessation of burning sensations, can sleep flat without choking, and transition off lifelong acid-suppressing medications."
      ],
      clinicalTakeaway: "If you depend on daily antacids for more than 6 months or experience regurgitation when lying down, an upper GI endoscopy and surgical evaluation is vital.",
    },
    {
      id: "blog-2",
      title: "Gallstone Disease & Laparoscopic Cholecystectomy: When Keyhole Surgery is Essential",
      slug: "gallstone-disease-laparoscopic-cholecystectomy",
      category: "Gallbladder & Biliary",
      readTime: "3 min read",
      date: "August 2026",
      image: "/images/dr_harish_ot.jpg",
      summary: "Gallstones rarely dissolve on their own. Learn why keyhole surgery is the gold standard for preventing severe pancreatitis, jaundice, and acute cholecystitis.",
      keyPoints: [
        "Gallstones form due to cholesterol imbalance and sluggish gallbladder motility",
        "Recurrent pain after fatty meals is the classic warning signal",
        "Delaying treatment risks bile duct blockages and life-threatening pancreatitis",
        "Modern keyhole cholecystectomy takes 45 minutes with 24-hour discharge",
      ],
      content: [
        "The gallbladder stores bile produced by the liver. When the balance of bile salts and cholesterol is disrupted, crystalline stones develop.",
        "Contrary to common myths, medicines cannot permanently dissolve or flush out hard gallstones; attempting to do so often drives small stones down the common bile duct, causing obstructive jaundice or acute biliary pancreatitis.",
        "Laparoscopic cholecystectomy removes the diseased gallbladder through 3 to 4 tiny incisions (5–10 mm) under high-definition optical magnification.",
        "Patients walk comfortably a few hours after anesthesia wears off, consume normal meals the following morning, and can return to work within 3 to 5 days."
      ],
      clinicalTakeaway: "Symptomatic gallstones should not be ignored. Elective laparoscopic surgery before an acute infection ensures the safest, most comfortable recovery.",
    },
    {
      id: "blog-3",
      title: "Advances in Robotic & Minimally Invasive GI Surgery: Precision, 3D Vision & Faster Recovery",
      slug: "advances-robotic-laparoscopic-gi-surgery",
      category: "Robotic & Technology",
      readTime: "4 min read",
      date: "July 2026",
      image: "/images/dr_harish_robotic.jpg",
      summary: "How modern robotic systems like da Vinci Xi empower surgeons with 3D high-magnification and tremor-filtered articulated instruments for delicate gastrointestinal surgeries.",
      keyPoints: [
        "10x 3D High-Definition binocular visualization of delicate nerves and vessels",
        "EndoWrist instruments rotate beyond the limits of human wrist dexterity",
        "Unprecedented precision in confined pelvic and upper abdominal spaces",
        "Significantly lower blood loss and reduced requirement for post-op analgesics",
      ],
      content: [
        "Minimally invasive surgery has undergone a quantum leap with the advent of robotic-assisted surgical consoles.",
        "Sitting at the ergonomic master console, Dr. Harish Gowda controls robotic arms that translate his hand movements into sub-millimeter micro-movements inside the patient's abdomen without any physiological tremor.",
        "This level of optical clarity and freedom of motion is especially revolutionary for complex colorectal reconstructions, esophageal hiatus repairs, and incisional hernia plasties.",
        "For patients, the clinical benefits are tangible: smaller wounds, virtually no wound infection risks, minimal post-surgical discomfort, and rapid return to family and professional duties."
      ],
      clinicalTakeaway: "Robotic surgery combines the judgment of an experienced gastrointestinal surgeon with the highest degree of mechanical precision.",
    },
    {
      id: "blog-4",
      title: "Esophageal Motility Disorders & Achalasia Cardia: Endoscopic & Surgical Solutions",
      slug: "esophageal-motility-achalasia-cardia-solutions",
      category: "Esophagus & Endoscopy",
      readTime: "3 min read",
      date: "June 2026",
      image: "/images/dr_harish_endoscopy.jpg",
      summary: "Difficulty swallowing food and fluids (dysphagia) is not normal aging. Understand Achalasia Cardia, high-resolution manometry, and precision myotomy.",
      keyPoints: [
        "Achalasia is caused by the failure of the lower esophageal sphincter muscle to relax",
        "Early symptoms include sensation of food sticking in the chest",
        "Diagnosed with high-resolution endoscopy and esophageal manometry",
        "Laparoscopic Heller Myotomy with partial fundoplication provides long-term relief",
      ],
      content: [
        "In a healthy digestive tract, rhythmic muscular waves (peristalsis) carry food down the esophagus, and the muscular ring at the stomach entrance relaxes smoothly.",
        "In Achalasia Cardia, the nerve plexuses governing this ring deteriorate, causing the valve to remain clamped shut while the upper esophagus dilates like an elastic reservoir.",
        "Patients often spend years being treated for simple acid reflux before being correctly diagnosed via endoscopy and manometry.",
        "With Laparoscopic Heller Myotomy, Dr. Harish divides the tight outer muscle fibers while preserving the inner lining, allowing food to pass effortlessly into the stomach again."
      ],
      clinicalTakeaway: "Swallowing difficulties should always be promptly investigated with high-definition endoscopy to catch motility disorders in their treatable early stages.",
    },
  ],
};
