"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase";
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

interface Package {
  id: string;
  title: string;
  description: string;
  duration: string;
  theme: string;
  category: string;
  image: string;
  published: boolean;
  created_at: string;
}

const CATEGORIES = ["Domestic", "International", "Beach", "Honeymoon", "Adventure", "Pilgrimage"];

export default function PackagesAdminPage() {
  const supabase = createBrowserClient();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [theme, setTheme] = useState("");
  const [category, setCategory] = useState("Domestic");
  const [image, setImage] = useState("");
  const [published, setPublished] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchErr } = await supabase
        .from("packages")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchErr) throw fetchErr;
      setPackages(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setDuration("");
    setTheme("");
    setCategory("Domestic");
    setImage("");
    setPublished(true);
    setError(null);
    setIsOpen(true);
  };

  const openEditModal = (pkg: Package) => {
    setEditingId(pkg.id);
    setTitle(pkg.title || "");
    setDescription(pkg.description || "");
    setDuration(pkg.duration || "");
    setTheme(pkg.theme || "");
    setCategory(pkg.category || "Domestic");
    setImage(pkg.image || "");
    setPublished(pkg.published);
    setError(null);
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !duration) {
      setError("Title and Duration are required fields.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      title,
      description,
      duration,
      theme,
      category,
      image,
      published,
    };

    try {
      if (editingId) {
        // Update
        const { data, error: updateErr } = await supabase
          .from("packages")
          .update(payload)
          .eq("id", editingId)
          .select()
          .single();

        if (updateErr) throw updateErr;
        
        setPackages(prev => prev.map(p => p.id === editingId ? data : p));
      } else {
        // Insert
        const { data, error: insertErr } = await supabase
          .from("packages")
          .insert([payload])
          .select()
          .single();

        if (insertErr) throw insertErr;

        setPackages(prev => [data, ...prev]);
      }
      setIsOpen(false);
    } catch (err: any) {
      setError(err.message || "An error occurred while saving the package.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the package "${name}"?`)) return;

    try {
      const { error: deleteErr } = await supabase
        .from("packages")
        .delete()
        .eq("id", id);

      if (deleteErr) throw deleteErr;

      setPackages(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete package");
    }
  };

  const togglePublished = async (pkg: Package) => {
    const updatedStatus = !pkg.published;
    
    // Optimistic update
    setPackages(prev => prev.map(p => p.id === pkg.id ? { ...p, published: updatedStatus } : p));

    try {
      const { error: patchErr } = await supabase
        .from("packages")
        .update({ published: updatedStatus })
        .eq("id", pkg.id);

      if (patchErr) throw patchErr;
    } catch (err: any) {
      // Revert status on failure
      setPackages(prev => prev.map(p => p.id === pkg.id ? { ...p, published: pkg.published } : p));
      alert(err.message || "Failed to update status");
    }
  };

  const filteredPackages = packages.filter(pkg => 
    pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.theme?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Packages</h1>
          <p className="text-slate-500 mt-1">Manage tour and holiday packages for Tea Country Holidays.</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B4332] hover:bg-[#235640] text-white font-medium text-sm rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Filter and search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, category, theme..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/25 focus:border-[#1B4332] transition-all"
          />
        </div>
      </div>

      {/* Table container */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-500 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#1B4332]" />
            <span>Fetching packages...</span>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            {searchQuery ? "No packages match your search criteria." : "No packages created yet. Click 'Add New Package' to get started."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-sm">
                  <th className="py-4 px-6">Image</th>
                  <th className="py-4 px-6">Title</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Duration</th>
                  <th className="py-4 px-6 text-center">Published</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                {filteredPackages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="relative w-14 h-10 rounded-md overflow-hidden bg-slate-100 border border-slate-200/60">
                        {pkg.image ? (
                          <img
                            src={pkg.image}
                            alt={pkg.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=120&q=80";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-medium">No Image</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-900 max-w-xs truncate">
                      {pkg.title}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800">
                        {pkg.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{pkg.duration}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => togglePublished(pkg)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            pkg.published ? "bg-[#1B4332]" : "bg-slate-200"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                              pkg.published ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(pkg)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
                          title="Edit Package"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(pkg.id, pkg.title)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-600 transition-colors"
                          title="Delete Package"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal Drawer */}
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
                  {editingId ? "Edit Package" : "Create New Package"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {editingId ? "Update existing details and save changes" : "Provide fields to list a new tour package"}
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

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scenic Assam & Meghalaya Tour"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]"
                />
              </div>

              {/* Duration & Theme Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Duration *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 Nights / 6 Days"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Theme</label>
                  <input
                    type="text"
                    placeholder="e.g. Nature, Tea Gardens"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] bg-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Image URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe the main attractions, itinerary highlights, inclusions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] resize-y"
                />
              </div>

              {/* Published Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200/60">
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold text-slate-800">Publish Immediately</span>
                  <p className="text-xs text-slate-500">Enable this to show the package on public pages.</p>
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
              <div className="pt-4 border-t border-slate-150 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
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
                      <span>Save Package</span>
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
