import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Stethoscope, 
  Share2, 
  Upload, 
  Camera, 
  Edit3, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Check, 
  Image as ImageIcon 
} from 'lucide-react';
import { DOCTOR_INFO, BlogItem } from '../data/doctorData';
import { processImageFile } from '../utils/imageUtils';

export const BlogsSection: React.FC<{
  onOpenBooking?: () => void;
}> = ({ onOpenBooking }) => {
  // Photo replacements for existing articles
  const [blogPhotoOverrides, setBlogPhotoOverrides] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('dr_harish_blog_photos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Custom user-authored articles
  const [customBlogs, setCustomBlogs] = useState<BlogItem[]>(() => {
    try {
      const saved = localStorage.getItem('dr_harish_custom_blogs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeBlog, setActiveBlog] = useState<BlogItem | null>(null);
  const [isNewArticleDrawerOpen, setIsNewArticleDrawerOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Hidden file input for replacing single article photos
  const singleFileInputRef = useRef<HTMLInputElement>(null);
  const [targetArticleId, setTargetArticleId] = useState<string | null>(null);

  // New Article Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Esophagus & Upper GI');
  const [newReadTime, setNewReadTime] = useState('4 min read');
  const [newSummary, setNewSummary] = useState('');
  const [newKeyPointsText, setNewKeyPointsText] = useState('');
  const [newContentText, setNewContentText] = useState('');
  const [newTakeaway, setNewTakeaway] = useState('');
  const [newArticleImage, setNewArticleImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const newArticleFileRef = useRef<HTMLInputElement>(null);

  // Auto clear toast
  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => setSuccessToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  // Combine custom blogs and original blogs with photos
  const displayBlogs: (BlogItem & { isCustomPhoto?: boolean; isCustomArticle?: boolean })[] = [
    ...customBlogs.map(b => ({
      ...b,
      image: blogPhotoOverrides[b.id] || b.image,
      isCustomPhoto: true,
      isCustomArticle: true,
    })),
    ...DOCTOR_INFO.blogs.map(b => ({
      ...b,
      image: blogPhotoOverrides[b.id] || b.image,
      isCustomPhoto: !!blogPhotoOverrides[b.id],
      isCustomArticle: false,
    }))
  ];

  // Keep activeBlog's image synchronized if changed
  useEffect(() => {
    if (activeBlog) {
      const updated = displayBlogs.find(b => b.id === activeBlog.id);
      if (updated && updated.image !== activeBlog.image) {
        setActiveBlog(updated);
      }
    }
  }, [blogPhotoOverrides, customBlogs]);

  // Handle clicking "Replace / Upload Photo" on a specific article
  const handleTriggerPhotoUpload = (articleId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setTargetArticleId(articleId);
    singleFileInputRef.current?.click();
  };

  // Process chosen photo for single article
  const handleSinglePhotoChosen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetArticleId) return;

    try {
      setIsProcessing(true);
      const dataUrl = await processImageFile(file);

      const isCustomArticle = customBlogs.some(b => b.id === targetArticleId);
      if (isCustomArticle) {
        const updated = customBlogs.map(b => 
          b.id === targetArticleId ? { ...b, image: dataUrl } : b
        );
        setCustomBlogs(updated);
        localStorage.setItem('dr_harish_custom_blogs', JSON.stringify(updated));
      } else {
        const updated = { ...blogPhotoOverrides, [targetArticleId]: dataUrl };
        setBlogPhotoOverrides(updated);
        localStorage.setItem('dr_harish_blog_photos', JSON.stringify(updated));
      }

      setSuccessToast('Article photo updated successfully!');
    } catch (err: any) {
      alert(err?.message || 'Failed to upload photo');
    } finally {
      setIsProcessing(false);
      setTargetArticleId(null);
      if (e.target) e.target.value = '';
    }
  };

  // Revert photo for an article
  const handleRevertArticlePhoto = (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (blogPhotoOverrides[articleId]) {
      const updated = { ...blogPhotoOverrides };
      delete updated[articleId];
      setBlogPhotoOverrides(updated);
      localStorage.setItem('dr_harish_blog_photos', JSON.stringify(updated));
      setSuccessToast('Article photo reset to default.');
    }
  };

  // Remove a custom article entirely
  const handleDeleteCustomArticle = (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customBlogs.filter(b => b.id !== articleId);
    setCustomBlogs(updated);
    localStorage.setItem('dr_harish_custom_blogs', JSON.stringify(updated));
    if (activeBlog?.id === articleId) {
      setActiveBlog(null);
    }
    setSuccessToast('Custom article deleted.');
  };

  // Handle image drag & drop or selection for new article
  const handleSelectNewArticleImage = async (file: File) => {
    try {
      setIsProcessing(true);
      const dataUrl = await processImageFile(file);
      setNewArticleImage(dataUrl);
    } catch (err: any) {
      alert(err?.message || 'Could not process image file');
    } finally {
      setIsProcessing(false);
    }
  };

  // Submit new article
  const handlePublishNewArticle = () => {
    if (!newTitle.trim()) {
      alert('Please enter an article title.');
      return;
    }
    if (!newArticleImage) {
      alert('Please upload a photo for your article.');
      return;
    }

    const keyPoints = newKeyPointsText
      ? newKeyPointsText.split('\n').map(s => s.trim()).filter(Boolean)
      : [
          'Evidence-based clinical observation by Dr. Harish Gowda',
          'Minimally invasive protocol prioritizing patient comfort and rapid recovery',
          'Consult HIMAS Hospital Bangalore for personalized diagnostic evaluation'
        ];

    const content = newContentText
      ? newContentText.split('\n\n').map(s => s.trim()).filter(Boolean)
      : [newSummary || 'Detailed clinical analysis prepared by Dr. Harish Gowda.'];

    const newBlog: BlogItem = {
      id: `custom-blog-${Date.now()}`,
      title: newTitle.trim(),
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newCategory,
      readTime: newReadTime.trim() || '4 min read',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      image: newArticleImage,
      summary: newSummary.trim() || 'Comprehensive clinical review and surgical guidance.',
      keyPoints,
      content,
      clinicalTakeaway: newTakeaway.trim() || 'Prompt consultation prevents clinical progression. Contact Dr. Harish Gowda for expert guidance.',
      isCustom: true,
    };

    const updated = [newBlog, ...customBlogs];
    setCustomBlogs(updated);
    localStorage.setItem('dr_harish_custom_blogs', JSON.stringify(updated));

    // Reset Form
    setNewTitle('');
    setNewSummary('');
    setNewKeyPointsText('');
    setNewContentText('');
    setNewTakeaway('');
    setNewArticleImage(null);
    setIsNewArticleDrawerOpen(false);
    setSuccessToast('New clinical article with photo published successfully!');
  };

  const handleResetAllBlogPhotos = () => {
    if (window.confirm('Reset all article photos to original defaults?')) {
      localStorage.removeItem('dr_harish_blog_photos');
      setBlogPhotoOverrides({});
      setSuccessToast('All article photos restored to defaults.');
    }
  };

  const hasModifications = Object.keys(blogPhotoOverrides).length > 0 || customBlogs.length > 0;

  return (
    <section id="blogs" className="py-20 bg-white relative overflow-hidden border-t border-slate-200">
      {/* Hidden file input for photo replacement */}
      <input
        ref={singleFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleSinglePhotoChosen}
      />

      {/* Success Toast Notification */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              Surgical Insights &amp; Patient Education
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Clinical Articles by Dr. Harish Gowda
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              Clear, evidence-based guidance on gastrointestinal surgery, reflux disease, gallstones, and keyhole recovery.
            </p>
          </div>

          {/* Action buttons: Add Article & Reset */}
          <div className="flex flex-wrap items-center gap-3">
            {hasModifications && (
              <button
                onClick={handleResetAllBlogPhotos}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-all cursor-pointer shadow-xs"
                title="Reset all article photos back to defaults"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset Photos</span>
              </button>
            )}

            <button
              onClick={() => setIsNewArticleDrawerOpen(!isNewArticleDrawerOpen)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all hover:scale-102 cursor-pointer shadow-md"
            >
              <Upload className="w-4 h-4 text-emerald-100" />
              <span>Upload Article &amp; Photo</span>
            </button>
          </div>
        </div>

        {/* Upload New Article & Photo Drawer */}
        <AnimatePresence>
          {isNewArticleDrawerOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12 bg-slate-50 border border-emerald-300 rounded-3xl p-6 sm:p-8 shadow-lg"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Publish Clinical Article with Photo
                    </h4>
                    <p className="text-xs text-slate-500">
                      Upload your clinical photographs, patient case reports, or surgical educational articles.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsNewArticleDrawerOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Laparoscopic Management of Large Hiatus Hernia &amp; GERD"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Category
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
                      >
                        <option value="Esophagus & Upper GI">Esophagus &amp; Upper GI</option>
                        <option value="Gallbladder & Biliary">Gallbladder &amp; Biliary</option>
                        <option value="Hernia & Abdominal Wall">Hernia &amp; Abdominal Wall</option>
                        <option value="Laser Proctology">Laser Proctology</option>
                        <option value="Colorectal & Bariatric">Colorectal &amp; Bariatric</option>
                        <option value="Clinical Case Study">Clinical Case Study</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Read Time
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 4 min read"
                        value={newReadTime}
                        onChange={(e) => setNewReadTime(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Short Summary / Overview
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Brief 2-sentence summary that appears on the card preview..."
                      value={newSummary}
                      onChange={(e) => setNewSummary(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Key Clinical Takeaways (1 per line)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Enter bullet points (one per line)..."
                      value={newKeyPointsText}
                      onChange={(e) => setNewKeyPointsText(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>

                {/* Right Column: Photo Upload and Content */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Featured Photo * (Drag &amp; drop or click)
                    </label>

                    {newArticleImage ? (
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group">
                        <img
                          src={newArticleImage}
                          alt="Uploaded Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => newArticleFileRef.current?.click()}
                            className="px-3 py-1.5 rounded-lg bg-white/90 text-slate-900 text-xs font-bold hover:bg-white transition-all cursor-pointer"
                          >
                            Change Photo
                          </button>
                          <button
                            type="button"
                            onClick={() => setNewArticleImage(null)}
                            className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-all cursor-pointer"
                            title="Remove Photo"
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
                            handleSelectNewArticleImage(e.dataTransfer.files[0]);
                          }
                        }}
                        onClick={() => newArticleFileRef.current?.click()}
                        className={`h-40 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                          isDragging
                            ? 'border-emerald-500 bg-emerald-50 scale-101'
                            : 'border-slate-300 bg-white hover:border-emerald-400 hover:bg-emerald-50/20'
                        }`}
                      >
                        <ImageIcon className="w-8 h-8 text-emerald-600 mb-2" />
                        <p className="text-xs font-bold text-slate-800 text-center">
                          Drag &amp; Drop article photo, or <span className="text-emerald-700 underline font-extrabold">Browse</span>
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          JPG, PNG, WEBP • Auto-compressed for rapid display
                        </p>
                      </div>
                    )}

                    <input
                      ref={newArticleFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleSelectNewArticleImage(e.target.files[0])}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Surgeon&apos;s Advice Note
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. In case of recurrent heartburn, undergo endoscopy without delay."
                      value={newTakeaway}
                      onChange={(e) => setNewTakeaway(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Article Body (Paragraphs)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write your clinical paragraphs here..."
                      value={newContentText}
                      onChange={(e) => setNewContentText(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewArticleDrawerOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePublishNewArticle}
                  disabled={!newTitle.trim() || !newArticleImage || isProcessing}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-2 ${
                    newTitle.trim() && newArticleImage && !isProcessing
                      ? 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer shadow-md hover:scale-102'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Article to Website</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayBlogs.map((blog) => (
            <motion.article
              key={blog.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveBlog(blog)}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden cursor-pointer group shadow-md hover:shadow-xl flex flex-col justify-between transition-all relative"
            >
              {/* Image & Category Banner */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-800 shadow-sm border border-emerald-100">
                    {blog.category}
                  </span>
                  {blog.isCustomPhoto && (
                    <span className="bg-emerald-600/90 text-white backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-400/40 w-fit">
                      Your Photo Uploaded
                    </span>
                  )}
                </div>

                {/* Top Right Quick Upload / Replace Photo Button */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
                  <button
                    onClick={(e) => handleTriggerPhotoUpload(blog.id, e)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 hover:bg-emerald-600 backdrop-blur-md text-white text-xs font-bold transition-all border border-white/20 cursor-pointer shadow-sm"
                    title="Upload or change photo for this article"
                  >
                    <Camera className="w-3.5 h-3.5 text-emerald-300" />
                    <span className="hidden sm:inline">Upload Photo</span>
                  </button>

                  {/* Revert / Delete button */}
                  {blog.isCustomArticle ? (
                    <button
                      onClick={(e) => handleDeleteCustomArticle(blog.id, e)}
                      className="p-1.5 rounded-xl bg-rose-600/90 text-white hover:bg-rose-700 transition-colors shadow-sm cursor-pointer"
                      title="Delete this article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  ) : blog.isCustomPhoto ? (
                    <button
                      onClick={(e) => handleRevertArticlePhoto(blog.id, e)}
                      className="p-1.5 rounded-xl bg-slate-800/80 text-white hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
                      title="Reset to default photo"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  ) : null}
                </div>

                {/* Read time badge bottom right */}
                <div className="absolute bottom-4 right-4 flex items-center gap-3 text-xs text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                  <span className="flex items-center gap-1 font-mono font-medium">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    {blog.readTime}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-2.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700">Dr. Harish Gowda</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {blog.summary}
                  </p>

                  {/* Bullet Takeaways */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                    {blog.keyPoints.slice(0, 2).map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Read Button & Upload Hint */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    Read Complete Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <button
                    onClick={(e) => handleTriggerPhotoUpload(blog.id, e)}
                    className="text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Upload className="w-3 h-3 text-emerald-600" /> Change Photo
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Full Article Modal */}
      <AnimatePresence>
        {activeBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden w-full max-w-3xl shadow-2xl relative my-8"
            >
              {/* Modal Top Bar */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-200 bg-slate-50 sticky top-0 z-20">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {activeBlog.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-semibold hidden sm:inline">
                    {activeBlog.readTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleTriggerPhotoUpload(activeBlog.id, e)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors cursor-pointer"
                    title="Upload a new photo for this article"
                  >
                    <Camera className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Change Article Photo</span>
                  </button>
                  <button
                    onClick={() => setActiveBlog(null)}
                    className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative aspect-[21/9] w-full bg-slate-900 overflow-hidden group">
                <img
                  src={activeBlog.image}
                  alt={activeBlog.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <button
                  onClick={(e) => handleTriggerPhotoUpload(activeBlog.id, e)}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/75 hover:bg-emerald-600 text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Cover Photo</span>
                </button>
              </div>

              {/* Article Content */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-2">
                    <span>Published: {activeBlog.date}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700">By Dr. Harish Gowda, MS, DipMAS, FIAGES</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                    {activeBlog.title}
                  </h3>
                </div>

                {/* Key Takeaways Box */}
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Key Clinical Takeaways
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800 font-medium">
                    {activeBlog.keyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Article Paragraphs */}
                <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {activeBlog.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Surgeon's Advice Banner */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <Stethoscope className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-900">Surgeon&apos;s Advice</div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 italic">
                      &ldquo;{activeBlog.clinicalTakeaway}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Booking Callout Inside Modal */}
                {onOpenBooking && (
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setActiveBlog(null);
                        onOpenBooking();
                      }}
                      className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md cursor-pointer text-center"
                    >
                      Book In-Clinic Consultation at HIMAS Hospital
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
