/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  listReviews,
  createReview,
  updateReview,
  deleteReview,
  toggleReviewPublished,
  type Review,
} from "./actions";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Loader2, 
  Check, 
  AlertCircle 
} from "lucide-react";

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [tripType, setTripType] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [published, setPublished] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listReviews();
      setReviews(data);
    } catch (err: any) {
      setError(err.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchReviews();
    }, 0);
  }, []);

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setReviewText("");
    setTripType("");
    setPhotoUrl("");
    setPublished(true);
    setError(null);
    setIsOpen(true);
  };

  const openEditModal = (review: Review) => {
    setEditingId(review.id);
    setName(review.name || "");
    setReviewText(review.review_text || "");
    setTripType(review.trip_type || "");
    setPhotoUrl(review.photo_url || "");
    setPublished(review.published);
    setError(null);
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !reviewText || !tripType) {
      setError("Name, Review Text, and Trip Type are required.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      name,
      review_text: reviewText,
      trip_type: tripType,
      photo_url: photoUrl,
      published,
    };

    try {
      if (editingId) {
        const data = await updateReview(editingId, payload);
        setReviews(prev => prev.map(r => r.id === editingId ? data : r));
      } else {
        const data = await createReview(payload);
        setReviews(prev => [data, ...prev]);
      }
      setIsOpen(false);
    } catch (err: any) {
      setError(err.message || "An error occurred while saving the review.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, reviewerName: string) => {
    if (!confirm(`Are you sure you want to delete the review by "${reviewerName}"?`)) return;

    try {
      await deleteReview(id);
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete review");
    }
  };

  const togglePublished = async (review: Review) => {
    const updatedStatus = !review.published;
    
    // Optimistic update
    setReviews(prev => prev.map(r => r.id === review.id ? { ...r, published: updatedStatus } : r));

    try {
      await toggleReviewPublished(review.id, updatedStatus);
    } catch (err: any) {
      // Revert status on failure
      setReviews(prev => prev.map(r => r.id === review.id ? { ...r, published: review.published } : r));
      alert(err.message || "Failed to update status");
    }
  };

  const filteredReviews = reviews.filter(review => 
    review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.trip_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.review_text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Customer Reviews</h1>
          <p className="text-slate-500 mt-1">Manage reviews and testimonials displayed on Tea Country Holidays.</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B4332] hover:bg-[#235640] text-white font-medium text-sm rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Review</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search reviews by name, destination, content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/25 focus:border-[#1B4332] transition-all"
          />
        </div>
      </div>

      {/* Reviews Cards List */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-500 bg-white border border-slate-200/80 rounded-xl shadow-sm gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#1B4332]" />
          <span>Loading reviews...</span>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="py-20 text-center text-slate-500 bg-white border border-slate-200/80 rounded-xl shadow-sm">
          {searchQuery ? "No reviews match your search criteria." : "No reviews created yet. Click 'Add New Review' to get started."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white border border-slate-200/85 rounded-xl p-5 shadow-sm flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200 group"
            >
              <div>
                {/* Reviewer Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    {review.photo_url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={review.photo_url}
                        alt={review.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                          const fallback = (e.target as HTMLImageElement).nextSibling as HTMLDivElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div 
                      className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[#1B4332]"
                      style={{ display: review.photo_url ? "none" : "flex" }}
                    >
                      {getInitials(review.name)}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 leading-tight truncate">{review.name}</h3>
                    <span className="inline-block text-xs font-medium text-slate-500 mt-0.5">{review.trip_type}</span>
                  </div>
                </div>

                {/* Review Body */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                  {"\""}{review.review_text.substring(0, 100)}{review.review_text.length > 100 ? "..." : ""}{"\""}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublished(review)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      review.published ? "bg-[#1B4332]" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        review.published ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="text-xs text-slate-500 font-medium">
                    {review.published ? "Published" : "Draft"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(review)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
                    title="Edit Review"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(review.id, review.name)}
                    className="p-1.5 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-600 transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Review Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop overlay */}
          <div 
            onClick={() => !submitting && setIsOpen(false)} 
            className="absolute inset-0 bg-black/50 transition-opacity duration-300"
          />

          {/* Modal content drawer */}
          <div className="relative bg-white w-full max-w-xl h-full flex flex-col shadow-2xl z-10 transition-transform duration-300 transform animate-in slide-in-from-right">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-150 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingId ? "Edit Review" : "Add New Review"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {editingId ? "Update existing reviewer input details" : "Add a new client testimonial"}
                </p>
              </div>
              <button
                disabled={submitting}
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-slate-200 rounded-full text-slate-500 hover:text-slate-800 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
              {error && (
                <div className="flex gap-2.5 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Reviewer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Sen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]"
                />
              </div>

              {/* Trip Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Trip Type / Route *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meghalaya Backpacking Tour"
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]"
                />
              </div>

              {/* Photo URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Photo URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]"
                />
              </div>

              {/* Review Text */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Review Content *</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write the details of the customer review, tour experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] resize-y leading-relaxed"
                />
              </div>

              {/* Published Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200/60">
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold text-slate-800">Publish Immediately</span>
                  <p className="text-xs text-slate-500">Visible on active testimonial marquee grids.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPublished(!published)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    published ? "bg-[#1B4332]" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      published ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-150 flex items-center justify-end gap-3 bg-white sticky bottom-0">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-semibold text-slate-700 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1B4332] hover:bg-[#235640] text-white font-semibold text-sm rounded-lg transition-colors shadow-sm cursor-pointer disabled:opacity-75"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Save Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
