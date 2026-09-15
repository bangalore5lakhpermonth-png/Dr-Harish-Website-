import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Award, 
  Activity, 
  Maximize2, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Upload,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Trash2,
  RefreshCw,
  Image as ImageIcon,
  Edit3,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DOCTOR_INFO } from '../data/doctorData';
import { processImageFile } from '../utils/imageUtils';

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category?: string;
  tag: string;
  specs: string;
  isCustom?: boolean;
  isReplaced?: boolean;
}

interface ClinicalGallerySectionProps {
  onOpenBooking?: () => void;
}

const CATEGORIES = [
  'All',
  'OT & Robotic Surgery',
  'Endoscopy Suite',
  'Academic & Awards',
  'Conferences & Teaching',
  'Hospital & Clinical',
];

export const ClinicalGallerySection: React.FC<ClinicalGallerySectionProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Custom items and photo replacements loaded from localStorage
  const [replacements, setReplacements] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('dr_harish_gallery_replacements');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [customItems, setCustomItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('dr_harish_custom_gallery');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [isUploadDrawerOpen, setIsUploadDrawerOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('OT & Robotic Surgery');
  const [newSubtitle, setNewSubtitle] = useState('Clinical Photograph • HIMAS Hospital Bangalore');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Single card photo replacement ref & target
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const [targetReplaceId, setTargetReplaceId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto clear toast
  useEffect(() => {
    if (successToast) {
      const t = setTimeout(() => setSuccessToast(null), 4000);
      return () => clearTimeout(t);
    }
  }, [successToast]);

  // Combine initial gallery with replacements and custom items
  const galleryItems: GalleryItem[] = [
    ...customItems,
    ...DOCTOR_INFO.gallery.map(item => ({
      ...item,
      image: replacements[item.id] || item.image,
      isReplaced: !!replacements[item.id],
    }))
  ];

  // Filtered items
  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const handleSelectFile = async (file: File) => {
    try {
      setIsProcessing(true);
      const dataUrl = await processImageFile(file);
      setPreviewImage(dataUrl);
      if (!newTitle.trim()) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
        setNewTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    } catch (err: any) {
      alert(err?.message || 'Could not process image file');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmAddPhoto = () => {
    if (!previewImage) return;

    const newItem: GalleryItem = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim() || "Clinical Case Photograph",
      subtitle: newSubtitle.trim() || "Uploaded Clinical Photograph • HIMAS Hospital Bangalore",
      image: previewImage,
      category: newCategory,
      tag: "Surgeon Upload",
      specs: "Chief Surgeon Clinical Record",
      isCustom: true,
    };

    const updatedCustom = [newItem, ...customItems];
    setCustomItems(updatedCustom);
    localStorage.setItem('dr_harish_custom_gallery', JSON.stringify(updatedCustom));

    // Reset drawer state
    setPreviewImage(null);
    setNewTitle('');
    setIsUploadDrawerOpen(false);
    setSuccessToast('Photo uploaded successfully to Clinical & Surgical Gallery!');
  };

  const handleCardReplaceClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTargetReplaceId(id);
    replaceInputRef.current?.click();
  };

  const handleCardReplaceFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetReplaceId) return;

    try {
      setIsProcessing(true);
      const dataUrl = await processImageFile(file);

      // Check if target is a custom item
      const isCustomTarget = customItems.some(item => item.id === targetReplaceId);
      if (isCustomTarget) {
        const updated = customItems.map(item => 
          item.id === targetReplaceId ? { ...item, image: dataUrl } : item
        );
        setCustomItems(updated);
        localStorage.setItem('dr_harish_custom_gallery', JSON.stringify(updated));
      } else {
        const updatedReplacements = { ...replacements, [targetReplaceId]: dataUrl };
        setReplacements(updatedReplacements);
        localStorage.setItem('dr_harish_gallery_replacements', JSON.stringify(updatedReplacements));
      }

      setSuccessToast('Gallery card photo replaced with your uploaded picture!');
    } catch (err: any) {
      alert(err?.message || 'Failed to replace photo');
    } finally {
      setIsProcessing(false);
      setTargetReplaceId(null);
      if (e.target) e.target.value = '';
    }
  };

  const handleRemoveItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isCustom = customItems.some(item => item.id === id);
    if (isCustom) {
      const updated = customItems.filter(item => item.id !== id);
      setCustomItems(updated);
      localStorage.setItem('dr_harish_custom_gallery', JSON.stringify(updated));
      setSuccessToast('Custom photo removed.');
    } else if (replacements[id]) {
      const updated = { ...replacements };
      delete updated[id];
      setReplacements(updated);
      localStorage.setItem('dr_harish_gallery_replacements', JSON.stringify(updated));
      setSuccessToast('Card photo reset to original default.');
    }
  };

  const handleResetAllGallery = () => {
    if (window.confirm('Reset all gallery photos and remove custom uploads?')) {
      localStorage.removeItem('dr_harish_custom_gallery');
      localStorage.removeItem('dr_harish_gallery_replacements');
      setCustomItems([]);
      setReplacements({});
      setSuccessToast('Gallery restored to original clinical collection.');
    }
  };

  const hasModifications = customItems.length > 0 || Object.keys(replacements).length > 0;

  // Lightbox Modal Navigation
  const activeItem = activeModalIndex !== null ? filteredItems[activeModalIndex] : null;

  const nextModalImage = () => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex + 1) % filteredItems.length);
    }
  };

  const prevModalImage = () => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      {/* Hidden file input for replacing single card photos */}
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleCardReplaceFileChange}
      />

      {/* Success Toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 sm:right-8 z-50 bg-emerald-700 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-emerald-500"
          >
            <Check className="w-4 h-4 text-emerald-200 shrink-0" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background radial glow */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-800 shadow-xs">
              <Camera className="w-3.5 h-3.5 text-emerald-600" />
              <span>SURGICAL &amp; CLINICAL ARCHIVES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Clinical &amp; Surgical Photo Gallery
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Documentary records of Dr. Harish Gowda&apos;s laparoscopic surgeries, da Vinci robotic consoles, endoscopic interventions, and academic awards.
            </p>
          </div>

          {/* Quick Actions: Upload Photo & Reset */}
          <div className="flex flex-wrap items-center gap-3">
            {hasModifications && (
              <button
                onClick={handleResetAllGallery}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-all cursor-pointer shadow-xs"
                title="Reset all gallery photos back to original defaults"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset to Defaults</span>
              </button>
            )}

            <button
              onClick={() => setIsUploadDrawerOpen(!isUploadDrawerOpen)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all hover:scale-102 cursor-pointer shadow-md"
            >
              <Upload className="w-4 h-4 text-emerald-100" />
              <span>Upload Clinical Photo</span>
              {customItems.length > 0 && (
                <span className="bg-emerald-800 text-emerald-100 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
                  {customItems.length} Added
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Drag & Drop Upload Drawer */}
        <AnimatePresence>
          {isUploadDrawerOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10 bg-white border border-emerald-300 rounded-3xl p-6 sm:p-8 shadow-lg"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Upload Your Clinical Photograph
                    </h4>
                    <p className="text-xs text-slate-500">
                      Add laparoscopic records, OT surgery photos, or endoscopic findings to Dr. Harish Gowda&apos;s gallery.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsUploadDrawerOpen(false);
                    setPreviewImage(null);
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Form Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Photo Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Laparoscopic Hernia Repair with 3D Mesh Placement"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Clinical Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all cursor-pointer"
                    >
                      {CATEGORIES.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Subtitle / Hospital Reference
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Surgical Record • HIMAS Hospital Bangalore"
                      value={newSubtitle}
                      onChange={(e) => setNewSubtitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Right Column: Drag & Drop Zone or Preview */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Select or Drop Photo
                  </label>

                  {previewImage ? (
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-lg bg-white/90 text-slate-900 text-xs font-bold hover:bg-white transition-all"
                        >
                          Change Photo
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewImage(null)}
                          className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-all"
                          title="Remove Preview"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        if (e.dataTransfer.files?.[0]) {
                          handleSelectFile(e.dataTransfer.files[0]);
                        }
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`h-44 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                        isDragging
                          ? 'border-emerald-500 bg-emerald-50/80 scale-101'
                          : 'border-slate-300 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/30'
                      }`}
                    >
                      <ImageIcon className="w-9 h-9 text-emerald-600 mb-2" />
                      <p className="text-xs font-bold text-slate-800 text-center">
                        Drag &amp; Drop your photo here, or <span className="text-emerald-700 underline">Browse files</span>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Supported: JPG, PNG, WEBP • Auto-optimized for browser
                      </p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleSelectFile(e.target.files[0])}
                  />
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsUploadDrawerOpen(false);
                    setPreviewImage(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAddPhoto}
                  disabled={!previewImage || isProcessing}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-2 ${
                    previewImage && !isProcessing
                      ? 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer shadow-md hover:scale-102'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Photo to Gallery</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveModalIndex(idx)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl flex flex-col justify-between hover:border-emerald-400 transition-all relative"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Tag & Custom Badge */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-emerald-400 border border-white/20">
                    {item.tag}
                  </span>
                  {(item.isCustom || item.isReplaced) && (
                    <span className="bg-emerald-600/90 text-white backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border border-emerald-400/40">
                      Your Upload
                    </span>
                  )}
                </div>

                {/* Card Action Overlay Buttons */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {/* Replace Photo Quick Button */}
                  <button
                    onClick={(e) => handleCardReplaceClick(item.id, e)}
                    className="w-8 h-8 rounded-lg bg-black/75 hover:bg-emerald-600 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Upload / Replace this photo"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {/* Expand icon */}
                  <div className="w-8 h-8 rounded-lg bg-black/70 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Custom Delete or Reset Button */}
                {(item.isCustom || item.isReplaced) && (
                  <button
                    onClick={(e) => handleRemoveItem(item.id, e)}
                    className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-rose-600/90 text-white hover:bg-rose-700 transition-colors shadow-sm cursor-pointer"
                    title={item.isCustom ? "Delete custom photo" : "Reset card to default image"}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Information */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-wider mb-1">
                    {item.specs}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1 hover:underline" onClick={(e) => handleCardReplaceClick(item.id, e)}>
                    <Upload className="w-3 h-3 text-emerald-600" /> Replace Photo
                  </span>
                  <span className="text-slate-400 group-hover:text-emerald-700 font-bold flex items-center gap-1">
                    Zoom <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Next / Prev */}
      <AnimatePresence>
        {activeItem && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveModalIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                    {activeItem.tag}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 truncate max-w-md">
                    {activeItem.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleCardReplaceClick(activeItem.id, e)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors cursor-pointer"
                    title="Upload a new photo for this card"
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Replace Image</span>
                  </button>
                  <button
                    onClick={() => setActiveModalIndex(null)}
                    className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Stage */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[400px] max-h-[65vh] overflow-hidden">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-contain max-h-[65vh]"
                  referrerPolicy="no-referrer"
                />

                {/* Left/Right Nav Buttons */}
                {filteredItems.length > 1 && (
                  <>
                    <button
                      onClick={prevModalImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextModalImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Footer Caption */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
                <div>
                  <p className="text-slate-900 font-bold">{activeItem.subtitle}</p>
                  <p className="text-slate-500 mt-0.5">{activeItem.specs}</p>
                </div>
                {onOpenBooking && (
                  <button
                    onClick={() => {
                      setActiveModalIndex(null);
                      onOpenBooking();
                    }}
                    className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-sm"
                  >
                    Consult Dr. Harish Gowda
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
