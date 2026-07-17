/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getAdminSiteSettings, saveSiteSettings } from "./actions";
import { 
  Save, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Phone,
  Sparkles
} from "lucide-react";

export default function SettingsAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Settings State
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [earlyBirdText, setEarlyBirdText] = useState("");
  const [earlyBirdDeadline, setEarlyBirdDeadline] = useState("");
  const [earlyBirdEnabled, setEarlyBirdEnabled] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const settings = await getAdminSiteSettings();
      setPhone(settings.phone);
      setWhatsapp(settings.whatsapp);
      setAddress(settings.address);
      setEarlyBirdText(settings.early_bird_text);
      setEarlyBirdDeadline(settings.early_bird_deadline);
      setEarlyBirdEnabled(settings.early_bird_enabled);
    } catch (err: any) {
      setError(err.message || "Failed to fetch settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchSettings();
    }, 0);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await saveSiteSettings({
        phone,
        whatsapp,
        address,
        early_bird_text: earlyBirdText,
        early_bird_deadline: earlyBirdDeadline,
        early_bird_enabled: earlyBirdEnabled,
      });

      setSuccess(true);
      // Auto-clear success message after 4 seconds
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to save configuration settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Site Settings</h1>
        <p className="text-slate-500 mt-1">Configure global details, early bird promotions, and contact information.</p>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-500 bg-white border border-slate-200/80 rounded-xl shadow-sm gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#1B4332]" />
          <span>Loading configurations...</span>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {error && (
            <div className="flex gap-2.5 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex gap-2.5 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm animate-in fade-in-50 duration-200">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
              <div className="flex flex-col">
                <span className="font-semibold">Settings Saved Successfully!</span>
                <span className="text-xs opacity-90 mt-0.5">Global website configuration has been updated instantly.</span>
              </div>
            </div>
          )}

          {/* Contact Details Card */}
          <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#1B4332]" />
              <h2 className="font-bold text-slate-900">Contact Details</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Phone Number</label>
                  <input
                    type="text"
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]"
                  />
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">WhatsApp Number</label>
                  <input
                    type="text"
                    placeholder="e.g. +91 98765 43210"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider font-sans">Office Address</label>
                <textarea
                  rows={3}
                  placeholder="Enter full agency address details..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Promotion Early Bird Settings Card */}
          <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F4A011]" />
              <h2 className="font-bold text-slate-900">Early Bird Promotion Settings</h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Enabled State Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200/60 mb-2">
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold text-slate-800">Enable Early Bird Promo Banner</span>
                  <p className="text-xs text-slate-500">Toggle whether this notice banner is active on the homepage.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEarlyBirdEnabled(!earlyBirdEnabled)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    earlyBirdEnabled ? "bg-[#1B4332]" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      earlyBirdEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Banner Text */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Promotion Banner Text</label>
                <input
                  type="text"
                  placeholder="e.g. Save 15% on Shillong Summer bookings! Offer ends soon."
                  value={earlyBirdText}
                  disabled={!earlyBirdEnabled}
                  onChange={(e) => setEarlyBirdText(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-100"
                />
              </div>

              {/* Deadline */}
              <div className="space-y-1.5 max-w-xs">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Campaign Deadline Date</label>
                <input
                  type="date"
                  value={earlyBirdDeadline}
                  disabled={!earlyBirdEnabled}
                  onChange={(e) => setEarlyBirdDeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B4332] hover:bg-[#235640] text-white font-semibold text-sm rounded-lg transition-colors shadow-sm cursor-pointer disabled:opacity-75"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Settings...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-[#F4A011]" />
                  <span>Save All Settings</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
