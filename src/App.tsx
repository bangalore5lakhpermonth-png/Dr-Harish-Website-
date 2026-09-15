import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HospitalAffiliations } from './components/HospitalAffiliations';
import { SurgeriesSection } from './components/SurgeriesSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { VideoShowcaseSection } from './components/VideoShowcaseSection';
import { ReelsSuccessSection } from './components/ReelsSuccessSection';
import { ClinicalGallerySection } from './components/ClinicalGallerySection';
import { BlogsSection } from './components/BlogsSection';
import { AboutSection } from './components/AboutSection';
import { ScopeConfiguratorSection } from './components/ScopeConfiguratorSection';
import { GoogleBusinessSection } from './components/GoogleBusinessSection';
import { BookingSection } from './components/BookingSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { ContactFooter } from './components/ContactFooter';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { PatientPortalModal } from './components/PatientPortalModal';
import { api, authStorage } from './services/api';
import { Appointment, User } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [portalModalOpen, setPortalModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Laparoscopic Gallbladder Surgery');
  const [latestAppointment, setLatestAppointment] = useState<Appointment | null>(null);

  // Initialize user from local session storage
  useEffect(() => {
    const cachedUser = authStorage.getUser();
    if (cachedUser) {
      setCurrentUser(cachedUser);
    }
    // Verify with server
    api.getMe().then((user) => {
      if (user) {
        setCurrentUser(user);
      }
    }).catch(() => {
      // ignore
    });
  }, []);

  const handleOpenBookingWithSpecialty = (specialtyTitle: string) => {
    setSelectedSpecialty(specialtyTitle);
    setBookingModalOpen(true);
  };

  const handleQuickDemoSwitch = async (role: 'doctor' | 'patient') => {
    try {
      const res = await api.demoLogin(role);
      setCurrentUser(res.user);
    } catch (err) {
      console.error('Demo login switch error', err);
    }
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
  };

  const handleBookingSuccess = (apt: Appointment) => {
    setLatestAppointment(apt);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        user={currentUser}
        onOpenBooking={() => setBookingModalOpen(true)}
        onOpenAuth={() => setPortalModalOpen(true)}
        onOpenPortal={() => setPortalModalOpen(true)}
        onLogout={handleLogout}
        onQuickDemoSwitch={handleQuickDemoSwitch}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenBooking={() => setBookingModalOpen(true)}
          onOpenPortal={() => setPortalModalOpen(true)}
        />

        {/* Hospital Affiliations & Teaching Pedigree */}
        <HospitalAffiliations />

        {/* Dr. Harish Gowda: Before & After Interactive Slider */}
        <BeforeAfterSection />

        {/* Surgical Specialties & Procedures Bento Grid (with Esophagus Anatomical Map) */}
        <SurgeriesSection
          onSelectSpecialty={handleOpenBookingWithSpecialty}
        />

        {/* YouTube Video Showcase with horizontal scroll effect */}
        <VideoShowcaseSection />

        {/* Success Stories & Patient Recovery Reels */}
        <ReelsSuccessSection
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* Clinical & Surgical Photo Gallery (Nikhil Shellagi Style + Option A Upload) */}
        <ClinicalGallerySection
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* 4 Clinical Educational Blogs with Medical Images */}
        <BlogsSection
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* Detailed Surgeon Profile, Philosophy & Qualifications */}
        <AboutSection />

        {/* Interactive Scope & Surgical Procedure Configurator */}
        <ScopeConfiguratorSection
          onSelectProcedure={handleOpenBookingWithSpecialty}
        />

        {/* Google Business Profile (GBM) & Hospital Navigation */}
        <GoogleBusinessSection />

        {/* Interactive In-Page Appointment Booking Form */}
        <BookingSection
          currentUser={currentUser}
          onBookingSuccess={handleBookingSuccess}
          onOpenPortal={() => setPortalModalOpen(true)}
        />

        {/* Verified Patient Reviews & Recovery Stories */}
        <ReviewsSection />

        {/* Clinical Protocol FAQs */}
        <FaqSection />
      </main>

      {/* Footer and Mobile Action Bar */}
      <ContactFooter
        onOpenBooking={() => setBookingModalOpen(true)}
        onOpenPortal={() => setPortalModalOpen(true)}
      />

      {/* Booking Modal */}
      <AppointmentBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        currentUser={currentUser}
        initialSpecialty={selectedSpecialty}
        onBookingSuccess={handleBookingSuccess}
        onOpenPortal={() => setPortalModalOpen(true)}
      />

      {/* Patient & Doctor Medical Portal Modal */}
      <PatientPortalModal
        isOpen={portalModalOpen}
        onClose={() => setPortalModalOpen(false)}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
        onOpenBooking={() => {
          setPortalModalOpen(false);
          setBookingModalOpen(true);
        }}
      />
    </div>
  );
}

