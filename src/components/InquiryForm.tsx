import React, { useState } from 'react';
import { Vehicle, InquiryFormData } from '../types';
import { Send, CheckCircle2, AlertCircle, Copy, Check, FileText, ArrowRight } from 'lucide-react';

interface InquiryFormProps {
  vehicles: Vehicle[];
  prefilledVehicleId?: string;
  prefilledSpecSummary?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  vehicles,
  prefilledVehicleId,
  prefilledSpecSummary,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    preferredVehicle: prefilledVehicleId || vehicles[0].id,
    contactMethod: 'concierge',
    preferredTrack: 'Circuit Paul Ricard (France)',
    message: prefilledSpecSummary ? `Bespoke Specification: ${prefilledSpecSummary}` : '',
    consent: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedDossier, setSubmittedDossier] = useState<{ id: string; timestamp: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Update preferredVehicle if prefilledVehicleId changes
  React.useEffect(() => {
    if (prefilledVehicleId) {
      setFormData((prev) => ({
        ...prev,
        preferredVehicle: prefilledVehicleId,
      }));
    }
  }, [prefilledVehicleId]);

  React.useEffect(() => {
    if (prefilledSpecSummary) {
      setFormData((prev) => ({
        ...prev,
        message: `Bespoke Specification: ${prefilledSpecSummary}`,
      }));
    }
  }, [prefilledSpecSummary]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof InquiryFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full legal name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Official contact email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact telephone number is required.';
    } else if (formData.phone.length < 6) {
      newErrors.phone = 'Please enter a valid telephone number.';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must confirm acknowledgement of concept terms.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate high-tier private concierge submission flow
    setTimeout(() => {
      const generatedId = `APEX-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedDossier({
        id: generatedId,
        timestamp: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      });
      setIsSubmitting(false);
    }, 900);
  };

  const handleCopyId = () => {
    if (!submittedDossier) return;
    navigator.clipboard.writeText(submittedDossier.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedVehicleObj = vehicles.find((v) => v.id === formData.preferredVehicle) || vehicles[0];

  return (
    <section id="contact" className="py-24 bg-[#08090B] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Editorial Copy (5 cols) */}
          <div className="lg:col-span-5">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#00E5FF] mb-3">
              Private Allocation & Atelier Commissions
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight mb-6">
              YOUR NEXT CHAPTER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-[#00E5FF]">
                STARTS HERE.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-8">
              APEX hypercars are engineered in strictly limited allocation batches. Prospective patrons and collectors are invited to register interest with our bespoke atelier concierge for private viewing, dynamic track evaluation, and custom specification curation.
            </p>

            <div className="p-6 bg-[#17191D] border border-white/10 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#00E5FF] rounded-full" />
                <span className="text-xs font-mono uppercase tracking-wider text-white">
                  Private Atelier Access
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Direct consultation with our aerodynamicists and vehicle dynamics engineers at our Geneva or Silverstone test facilities.
              </p>
              <div className="text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/10">
                Notice: Prototype allocations are non-binding expressions of interest.
              </div>
            </div>
          </div>

          {/* Right Form Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#17191D] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
            {submittedDossier ? (
              /* Success State */
              <div className="py-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] mb-2">
                  Commission Dossier Registered
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-3">
                  Inquiry Successfully Received
                </h3>
                <p className="text-sm text-neutral-300 max-w-md font-light mb-8">
                  Thank you, <span className="font-semibold text-white">{formData.fullName}</span>. 
                  Your concept reservation for the <span className="text-[#00E5FF] font-semibold">{selectedVehicleObj.name}</span> has been simulated in our atelier preview queue.
                </p>

                {/* Dossier Code Card */}
                <div className="w-full max-w-md bg-[#08090B] border border-white/15 rounded-xl p-5 mb-8 text-left font-mono">
                  <div className="flex justify-between items-center text-xs text-neutral-400 pb-3 border-b border-white/10 mb-3">
                    <span>Dossier Reference ID:</span>
                    <span>{submittedDossier.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white tracking-wider">
                      {submittedDossier.id}
                    </span>
                    <button
                      onClick={handleCopyId}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs text-white transition-colors"
                      title="Copy Dossier Code"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      setSubmittedDossier(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        countryCode: '+1',
                        preferredVehicle: vehicles[0].id,
                        contactMethod: 'concierge',
                        preferredTrack: 'Circuit Paul Ricard (France)',
                        message: '',
                        consent: true,
                      });
                    }}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* Active Inquiry Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-1">
                    Request Commission Consultation
                  </h3>
                  <p className="text-xs font-mono text-neutral-400">
                    Interactive prototype registration · Concept vehicle consultation
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Lord Julian Sterling"
                    className={`w-full px-4 py-3 bg-[#08090B] border rounded-lg text-sm text-white focus:outline-none transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-white/10 focus:border-[#00E5FF]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-400 mt-1 font-mono">{errors.fullName}</p>
                  )}
                </div>

                {/* Email & Phone Split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@enterprise.com"
                      className={`w-full px-4 py-3 bg-[#08090B] border rounded-lg text-sm text-white focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-white/10 focus:border-[#00E5FF]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1 font-mono">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Telephone *
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        aria-label="Country Code"
                        className="w-24 px-2 py-3 bg-[#08090B] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#00E5FF]"
                      >
                        <option value="+1">+1 (US/CA)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+49">+49 (DE)</option>
                        <option value="+33">+33 (FR)</option>
                        <option value="+39">+39 (IT)</option>
                        <option value="+971">+971 (UAE)</option>
                        <option value="+81">+81 (JP)</option>
                        <option value="+65">+65 (SG)</option>
                      </select>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="555 019 283"
                        className={`flex-1 px-4 py-3 bg-[#08090B] border rounded-lg text-sm text-white focus:outline-none transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-white/10 focus:border-[#00E5FF]'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-400 mt-1 font-mono">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Model Selection & Contact Method */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="vehicle" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Preferred Vehicle Model
                    </label>
                    <select
                      id="vehicle"
                      value={formData.preferredVehicle}
                      onChange={(e) => setFormData({ ...formData, preferredVehicle: e.target.value })}
                      className="w-full px-4 py-3 bg-[#08090B] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#00E5FF]"
                    >
                      {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} ({v.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contactMethod" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Preferred Consultation Format
                    </label>
                    <select
                      id="contactMethod"
                      value={formData.contactMethod}
                      onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value as any })}
                      className="w-full px-4 py-3 bg-[#08090B] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#00E5FF]"
                    >
                      <option value="concierge">Private Concierge (Direct Call)</option>
                      <option value="video">Secure Atelier Video Conference</option>
                      <option value="atelier">In-Person Geneva Atelier Appointment</option>
                    </select>
                  </div>
                </div>

                {/* Bespoke Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                    Bespoke Requirements / Test Track Preference
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify custom interior materials, aero requirements, or circuit evaluation date preferences..."
                    className="w-full px-4 py-3 bg-[#08090B] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#00E5FF] resize-none"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded bg-[#08090B] border-white/20 text-[#00E5FF] focus:ring-0 focus:ring-offset-0"
                  />
                  <label htmlFor="consent" className="text-xs text-neutral-400 font-light leading-relaxed">
                    I acknowledge that APEX MOTORS concept vehicles are experimental automotive prototypes. Submissions constitute non-binding expressions of interest handled under strict client confidentiality.
                  </label>
                </div>
                {errors.consent && (
                  <p className="text-xs text-red-400 font-mono">{errors.consent}</p>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#00E5FF] hover:bg-[#38bdf8] disabled:opacity-50 text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-xl shadow-[#00E5FF]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Dossier...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Allocation Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
