import React, { useState } from 'react';
import { ArrowUp, ShieldCheck, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-white/10 text-neutral-400 text-xs">
      {/* Top Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Manifesto (2 cols) */}
          <div className="lg:col-span-2">
            <a
              href="#"
              className="text-xl font-black tracking-widest text-white uppercase flex items-center gap-2 mb-4"
            >
              <span className="w-2.5 h-2.5 bg-[#00E5FF] rotate-45 transform" />
              <span>APEX MOTORS</span>
            </a>
            <p className="text-neutral-400 font-light leading-relaxed max-w-sm mb-6">
              Pioneering hypercar design through computational fluid dynamics, titanium additive manufacturing, and high-voltage hybrid propulsion.
            </p>
            <div className="text-[11px] font-mono text-[#00E5FF] tracking-wider uppercase">
              ENGINEERED BEYOND LIMITS
            </div>
          </div>

          {/* Fleet Models */}
          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-4 font-mono">
              Concept Fleet
            </div>
            <ul className="space-y-2.5">
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  APEX Vortex · Hypercar
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  APEX Stratos · Electric GT
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  APEX Phantom · Track Spec
                </a>
              </li>
              <li>
                <a href="#configurator" className="hover:text-[#00E5FF] transition-colors">
                  Interactive 3D Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Engineering Domains */}
          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-4 font-mono">
              Engineering
            </div>
            <ul className="space-y-2.5">
              <li>
                <a href="#performance" className="hover:text-white transition-colors">
                  Active Venturi Aero
                </a>
              </li>
              <li>
                <a href="#performance" className="hover:text-white transition-colors">
                  T1000 Carbon Monocoque
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-white transition-colors">
                  Silicon-Carbide Inverters
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-white transition-colors">
                  Dyno Benchmark Telemetry
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Dispatch */}
          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-4 font-mono">
              Atelier Dispatch
            </div>
            <p className="text-neutral-400 font-light leading-relaxed mb-3">
              Receive confidential design study bulletins and allocation notices.
            </p>

            {newsletterSubscribed ? (
              <div className="p-3 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-xs text-[#00E5FF] font-mono">
                Subscription registered.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  aria-label="Atelier Dispatch email"
                  required
                  className="px-3 py-2 bg-[#17191D] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                />
                <button
                  type="submit"
                  className="py-2 px-3 bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] uppercase tracking-wider rounded-lg transition-colors"
                >
                  Join Dispatch
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar & Legal Notices */}
      <div className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
            <span>© {new Date().getFullYear()} APEX MOTORS AG. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-white transition-colors underline decoration-dotted"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-white transition-colors underline decoration-dotted"
            >
              Concept Terms & Disclaimers
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 rounded-lg transition-colors font-mono text-xs uppercase"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Legal Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#17191D] border border-white/15 rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-left">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 text-neutral-400 hover:text-white"
              aria-label="Close legal modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold uppercase text-white tracking-tight mb-4">
              {activeModal === 'privacy' ? 'Client Privacy Protocol' : 'Concept Vehicles Disclosure & Terms'}
            </h3>

            <div className="space-y-4 text-xs text-neutral-300 leading-relaxed font-light">
              {activeModal === 'privacy' ? (
                <>
                  <p>
                    APEX MOTORS treats prospective client and patron communications under confidential data handling protocols. Data transmitted via inquiry forms is strictly processed for atelier concierge correspondence, test track evaluations, and bespoke build consultations.
                  </p>
                  <p>
                    We do not sell, rent, or lease prospective collector telemetry or contact records to commercial marketing brokers.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    All vehicles presented on this platform—including the APEX Vortex, APEX Stratos, and APEX Phantom—are original concept vehicle studies and digital prototypes created for demonstration of aerodynamic, materials, and powertrain architectures.
                  </p>
                  <p>
                    Technical figures (including horsepower, 0–100 km/h acceleration, downforce metrics, and top speeds) represent computational simulations and engineering targets rather than certified commercial vehicle claims.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
