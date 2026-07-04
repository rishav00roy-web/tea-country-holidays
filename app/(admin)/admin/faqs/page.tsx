"use client";

import { useEffect, useState } from "react";
import {
  listFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  reorderFaqs,
  type FAQ,
} from "./actions";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Loader2, 
  Check, 
  AlertCircle,
  ArrowUp,
  ArrowDown
} from "lucide-react";

export default function FAQsAdminPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listFaqs();
      setFaqs(data);
    } catch (err: any) {
      setError(err.message || "Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setQuestion("");
    setAnswer("");
    setError(null);
    setIsOpen(true);
  };

  const openEditModal = (faq: FAQ) => {
    setEditingId(faq.id);
    setQuestion(faq.question || "");
    setAnswer(faq.answer || "");
    setError(null);
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) {
      setError("Both Question and Answer are required.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (editingId) {
        const data = await updateFaq(editingId, question, answer);
        setFaqs(prev => prev.map(f => f.id === editingId ? data : f));
      } else {
        const data = await createFaq(question, answer);
        setFaqs(prev => [...prev, data]);
      }
      setIsOpen(false);
    } catch (err: any) {
      setError(err.message || "An error occurred while saving the FAQ.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, qPreview: string) => {
    if (!confirm(`Are you sure you want to delete the FAQ: "${qPreview.substring(0, 50)}..."?`)) return;

    try {
      await deleteFaq(id);
      setFaqs(prev => prev.filter(f => f.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete FAQ");
    }
  };

  const moveFaq = async (currentIndex: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= faqs.length) return;

    const currentFaq = faqs[currentIndex];
    const targetFaq = faqs[targetIndex];

    // Check if normalization is needed (if orders are identical or null)
    const needsNormalization = 
      faqs.some((faq, idx) => idx > 0 && faq.sort_order === faqs[idx - 1].sort_order) ||
      faqs.some(faq => faq.sort_order === undefined || faq.sort_order === null);

    let updatedFaqs = [...faqs];
    if (needsNormalization) {
      updatedFaqs = updatedFaqs.map((faq, idx) => ({ ...faq, sort_order: idx }));
    }

    // Swap the order values
    const tempOrder = updatedFaqs[currentIndex].sort_order;
    updatedFaqs[currentIndex].sort_order = updatedFaqs[targetIndex].sort_order;
    updatedFaqs[targetIndex].sort_order = tempOrder;

    // Sort immediately in memory
    updatedFaqs.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    setFaqs(updatedFaqs);

    try {
      if (needsNormalization) {
        // Save all
        await reorderFaqs(updatedFaqs.map(faq => ({ id: faq.id, sort_order: faq.sort_order })));
      } else {
        // Swap values in DB
        await reorderFaqs([
          { id: currentFaq.id, sort_order: targetFaq.sort_order },
          { id: targetFaq.id, sort_order: currentFaq.sort_order },
        ]);
      }
    } catch (err: any) {
      console.error("Sorting sync failed:", err);
      alert(err.message || "Sorting update failed on database.");
      fetchFaqs();
    }
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">FAQs</h1>
          <p className="text-slate-500 mt-1">Manage and order frequently asked questions on the homepage.</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B4332] hover:bg-[#235640] text-white font-medium text-sm rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search FAQs by question or answer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/25 focus:border-[#1B4332] transition-all"
          />
        </div>
      </div>

      {/* FAQ Lists */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-500 bg-white border border-slate-200/80 rounded-xl shadow-sm gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#1B4332]" />
          <span>Loading FAQs...</span>
        </div>
      ) : filteredFaqs.length === 0 ? (
        <div className="py-20 text-center text-slate-500 bg-white border border-slate-200/80 rounded-xl shadow-sm">
          {searchQuery ? "No FAQs match your search criteria." : "No FAQs added yet. Click 'Add New FAQ' to build the list."}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className="bg-white border border-slate-200/85 rounded-xl p-5 shadow-sm flex items-start gap-4 hover:border-slate-300 transition-colors group"
            >
              {/* Order Re-arranger Buttons */}
              <div className="flex flex-col items-center justify-center bg-slate-50 rounded-lg border border-slate-200/40 p-1 w-10 shrink-0 select-none">
                <button
                  disabled={index === 0}
                  onClick={() => moveFaq(index, "up")}
                  className="p-1 rounded text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-semibold text-slate-400 my-0.5">{index + 1}</span>
                <button
                  disabled={index === filteredFaqs.length - 1}
                  onClick={() => moveFaq(index, "down")}
                  className="p-1 rounded text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              {/* Text Body */}
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-slate-900 text-base">{faq.question}</h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 pr-4">
                  {faq.answer}
                </p>
              </div>

              {/* Actions Box */}
              <div className="flex items-center gap-1 shrink-0 self-center">
                <button
                  onClick={() => openEditModal(faq)}
                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
                  title="Edit FAQ"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(faq.id, faq.question)}
                  className="p-2 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-600 transition-colors"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit FAQ Modal Dialog */}
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
                  {editingId ? "Edit FAQ" : "Add New FAQ"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {editingId ? "Update existing query/response pairs" : "Draft a new frequently asked question"}
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

              {/* Question */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Question *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. What is the best time to visit North East India?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]"
                />
              </div>

              {/* Answer */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Answer *</label>
                <textarea
                  rows={8}
                  required
                  placeholder="Write a clear, detailed answer to the question..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] resize-y leading-relaxed"
                />
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
                      <span>Save FAQ</span>
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
