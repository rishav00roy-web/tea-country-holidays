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
  AlertCircle,
  Star
} from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  city: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  published: boolean;
}

export default function HotelsAdminPage() {
  const supabase = createBrowserClient();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [rating, setRating] = useState<number>(5);
  const [published, setPublished] = useState(true);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchErr } = await supabase
        .from("hotels")
        .select("*")
        .order("name", { ascending: true });

      if (fetchErr) throw fetchErr;
      setHotels(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load hotels");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setCity("");
    setDescription("");
    setImage("");
    setPrice("");
    setRating(5);
    setPublished(true);
    setError(null);
    setIsOpen(true);
  };

  const openEditModal = (hotel: Hotel) => {
    setEditingId(hotel.id);
    setName(hotel.name || "");
    setCity(hotel.city || "");
    setDescription(hotel.description || "");
    setImage(hotel.image || "");
    setPrice(hotel.price ?? "");
    setRating(hotel.rating || 5);
    setPublished(hotel.published);
    setError(null);
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !city || price === "") {
      setError("Name, City, and Price are required fields.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      name,
      city,
      description,
      image,
      price: Number(price),
      rating,
      published,
    };

    try {
      if (editingId) {
        // Update
        const { data, error: updateErr } = await supabase
          .from("hotels")
          .update(payload)
          .eq("id", editingId)
          .select()
          .single();

        if (updateErr) throw updateErr;
        
        setHotels(prev => prev.map(h => h.id === editingId ? data : h));
      } else {
        // Insert
        const { data, error: insertErr } = await supabase
          .from("hotels")
          .insert([payload])
          .select()
          .single();

        if (insertErr) throw insertErr;

        setHotels(prev => [data, ...prev]);
      }
      setIsOpen(false);
    } catch (err: any) {
      setError(err.message || "An error occurred while saving the hotel.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the hotel "${name}"?`)) return;

    try {
      const { error: deleteErr } = await supabase
        .from("hotels")
        .delete()
        .eq("id", id);

      if (deleteErr) throw deleteErr;

      setHotels(prev => prev.filter(h => h.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete hotel");
    }
  };

  const togglePublished = async (hotel: Hotel) => {
    const updatedStatus = !hotel.published;
    
    // Optimistic update
    setHotels(prev => prev.map(h => h.id === hotel.id ? { ...h, published: updatedStatus } : h));

    try {
      const { error: patchErr } = await supabase
        .from("hotels")
        .update({ published: updatedStatus })
        .eq("id", hotel.id);

      if (patchErr) throw patchErr;
    } catch (err: any) {
      // Revert status on failure
      setHotels(prev => prev.map(h => h.id === hotel.id ? { ...h, published: hotel.published } : h));
      alert(err.message || "Failed to update status");
    }
  };

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (count: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star 
            key={idx} 
            className={`w-3.5 h-3.5 fill-current ${
              idx < count ? "text-amber-400" : "text-slate-200"
            }`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Hotels</h1>
          <p className="text-slate-500 mt-1">Manage partner hotels and stays for Tea Country Holidays.</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B4332] hover:bg-[#235640] text-white font-medium text-sm rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Hotel</span>
        </button>
      </div>

      {/* Filter and search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by hotel name or city..."
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
            <span>Fetching hotels...</span>
          </div>
        ) : filteredHotels.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            {searchQuery ? "No hotels match your search criteria." : "No hotels created yet. Click 'Add New Hotel' to get started."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold text-sm">
                  <th className="py-4 px-6">Image</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">City</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Rating</th>
                  <th className="py-4 px-6 text-center">Published</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                {filteredHotels.map((hotel) => (
                  <tr key={hotel.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="relative w-14 h-10 rounded-md overflow-hidden bg-slate-100 border border-slate-200/60">
                        {hotel.image ? (
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&q=80";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-medium">No Image</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-900 max-w-xs truncate">
                      {hotel.name}
                    </td>
                    <td className="py-4 px-6 text-slate-600">{hotel.city}</td>
                    <td className="py-4 px-6 font-medium text-slate-950">
                      ₹{hotel.price?.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">{renderStars(hotel.rating)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => togglePublished(hotel)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            hotel.published ? "bg-[#1B4332]" : "bg-slate-200"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                              hotel.published ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(hotel)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
                          title="Edit Hotel"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(hotel.id, hotel.name)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-600 transition-colors"
                          title="Delete Hotel"
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
                  {editingId ? "Edit Hotel" : "Add New Hotel"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {editingId ? "Update stay parameters and save" : "Enter details for a new hotel accommodation"}
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
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Hotel Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pine Woods Resort & Spa"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]"
                />
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">City / Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shillong, Meghalaya"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]"
                />
              </div>

              {/* Price & Rating Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Price per Night (₹) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    placeholder="e.g. 4500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Rating (Stars)</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] bg-white"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Star" : "Stars"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Image URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/hotel.jpg"
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
                  placeholder="Details about hotel amenities, room standards, scenic views, or inclusions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] resize-y"
                />
              </div>

              {/* Published Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200/60">
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold text-slate-800">Publish Immediately</span>
                  <p className="text-xs text-slate-500">Enable to show this hotel configuration on public listings.</p>
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
                      <span>Save Hotel</span>
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
