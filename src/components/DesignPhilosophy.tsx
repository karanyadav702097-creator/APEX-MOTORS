import React from 'react';
import cockpitImg from '../assets/images/apex_cockpit_interior_1792319360085.jpg';
import wheelImg from '../assets/images/apex_wheel_brake_detail_1792319359921.jpg';
import { Eye, Compass, Feather } from 'lucide-react';

export const DesignPhilosophy: React.FC = () => {
  return (
    <section className="py-24 bg-[#08090B] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#00E5FF] mb-3">
            Atelier Aesthetics & Aerodynamics
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight mb-6">
            EVERY CURVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-[#00E5FF]">
              HAS A PURPOSE.
            </span>
          </h2>
          <p className="text-base text-neutral-300 font-light leading-relaxed">
            Form is not an afterthought to function at APEX; it is the aerodynamic fluid sculpture through which air is commanded. Every surface, venturi contour, and negative space manages air pressure to generate high-speed downforce and cool vital hybrid subsystems.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Main Large Visual Card (7 cols) */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-white/10 group">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={cockpitImg}
                alt="APEX hypercar driver cockpit with forged carbon yoke and cyan ambient illumination"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] mb-1">
                Cockpit Architecture
              </div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white mb-2">
                Minimalist Sensory Integration
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-xl">
                Ergonomically tuned to eliminate cognitive overload. The forged carbon steering yoke integrates shift indicators and telemetry displays directly into the driver’s peripheral sightline.
              </p>
            </div>
          </div>

          {/* Secondary Editorial Block (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 sm:p-8 bg-[#17191D] border border-white/10 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00E5FF] mb-3">
                <Compass className="w-4 h-4" />
                <span>Aerodynamic Purity</span>
              </div>
              <h4 className="text-lg font-bold text-white uppercase mb-2">
                Subtractive Aero Sculpture
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-4">
                Rather than tacking on cumbersome wings, aerodynamic forces are generated through channels hollowed directly through the monocoque body, maintaining an uninterrupted silhouette.
              </p>
              <div className="text-xs font-mono text-neutral-400">
                Computational Fluid Dynamics Verified · 1,120 kg Downforce
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-[#17191D] border border-white/10 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00E5FF] mb-3">
                <Feather className="w-4 h-4" />
                <span>Material Honesty</span>
              </div>
              <h4 className="text-lg font-bold text-white uppercase mb-2">
                Autoclaved Forged Carbon & Titanium
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-4">
                No simulated textures or decorative plastics. Exposed structural weaves show the authentic direction of fiber reinforcement, bonded with titanium hardware at structural load points.
              </p>
              <div className="text-xs font-mono text-neutral-400">
                Zero Superfluous Ornamentation
              </div>
            </div>
          </div>
        </div>

        {/* Triple Detail Focus Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#17191D]/60 border border-white/10 rounded-xl">
            <div className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest mb-2">
              01 · Laser Headlight Blades
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              Ultra-slim matrix projector units recessed beneath aerodynamic air intakes, delivering over 650 meters of high-beam penetration with adaptive corner illumination.
            </p>
          </div>

          <div className="p-6 bg-[#17191D]/60 border border-white/10 rounded-xl">
            <div className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest mb-2">
              02 · Aerothermal Cooling Ducts
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              Side-pod channels route clean boundary-layer air through multi-stage heat exchangers before releasing high-temperature air into low-pressure vortex zones behind the wheels.
            </p>
          </div>

          <div className="p-6 bg-[#17191D]/60 border border-white/10 rounded-xl">
            <div className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest mb-2">
              03 · Structural Aero Mirrors
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              Aerofoil-profiled camera pylons minimize wake turbulence while streaming ultra-low-latency 4K digital video directly to dual high-definition OLED cockpit mirrors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
