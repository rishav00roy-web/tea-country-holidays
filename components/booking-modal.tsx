"use client";

import { useState } from "react";
import { X, CreditCard, Wallet, DollarSign, CheckCircle, Smartphone } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SkeletonLoader() {
  return (
    <div className="space-y-4 p-6">
      <div className="skeleton h-8 w-3/4 rounded-lg" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-5/6 rounded" />
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="skeleton h-32 rounded-xl" />
        <div className="skeleton h-32 rounded-xl" />
      </div>
      <div className="skeleton h-12 w-full rounded-xl mt-4" />
      <div className="skeleton h-12 w-full rounded-xl" />
      <div className="skeleton h-14 w-full rounded-xl mt-6" />
    </div>
  );
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-brand-evergreen/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-brand-floral rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-brand-gold/20">
        {/* Header */}
        <div className="bg-brand-evergreen px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-white text-xl font-bold">Book Your Journey</h3>
            <p className="text-brand-gold/70 text-xs">Secure & Instant Confirmation</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <SkeletonLoader />
        ) : paid ? (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-brand-evergreen dark:text-white mb-2">Booking Confirmed!</h4>
            <p className="text-brand-ink/60 text-sm mb-6">
              Your inquiry has been received. Our team will call you within 30 minutes to confirm details.
            </p>
            <button onClick={onClose}
              className="bg-brand-gold text-brand-evergreen font-bold px-8 py-3 rounded-full hover:bg-amber-400 transition-colors">
              Done
            </button>
          </div>
        ) : (
          /* Form */
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-brand-evergreen/70 dark:text-brand-cream/80 uppercase tracking-wider block mb-1">First Name</label>
                <input type="text" placeholder="Rahul"
                  className="w-full px-4 py-3 bg-white dark:bg-[#12291f] text-brand-evergreen dark:text-brand-cream border border-brand-gold/20 rounded-xl text-sm focus:border-brand-gold outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-brand-evergreen/70 dark:text-brand-cream/80 uppercase tracking-wider block mb-1">Last Name</label>
                <input type="text" placeholder="Sharma"
                  className="w-full px-4 py-3 bg-white dark:bg-[#12291f] text-brand-evergreen dark:text-brand-cream border border-brand-gold/20 rounded-xl text-sm focus:border-brand-gold outline-none" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-brand-evergreen/70 dark:text-brand-cream/80 uppercase tracking-wider block mb-1">Phone (WhatsApp)</label>
              <input type="tel" placeholder="+91 98765 43210"
                className="w-full px-4 py-3 bg-white dark:bg-[#12291f] text-brand-evergreen dark:text-brand-cream border border-brand-gold/20 rounded-xl text-sm focus:border-brand-gold outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-brand-evergreen/70 dark:text-brand-cream/80 uppercase tracking-wider block mb-1">Destination</label>
              <select className="w-full px-4 py-3 bg-white dark:bg-[#12291f] text-brand-evergreen dark:text-brand-cream border border-brand-gold/20 rounded-xl text-sm focus:border-brand-gold outline-none appearance-none">
                {["Meghalaya","Sikkim","Bhutan","Kerala","Rajasthan","Dubai","Thailand","Maldives","Bali","Singapore"].map(d=>(
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Payment button (Uiverse style) */}
            <div className="pt-2">
              <button className="pay-btn w-full justify-center" onClick={handlePay}>
                <div className="icon-container">
                  <Wallet className="icon wallet-icon default-icon" />
                  <CreditCard className="icon card-icon" />
                  <Smartphone className="icon payment-icon" />
                  <DollarSign className="icon dollar-icon" />
                  <CheckCircle className="icon check-icon" />
                </div>
                <span className="btn-text">Confirm Booking Enquiry</span>
              </button>
              <p className="text-center text-xs text-brand-ink/40 mt-3">
                🔒 No payment required now · We will call you to confirm
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
