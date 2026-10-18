import React from 'react';
import { ArrowDown, Flame, ShieldAlert } from 'lucide-react';
import heroVortexImg from '../assets/images/hero_apex_vortex_1792319357109.jpg';

interface HeroSectionProps {
  onExploreClick: () => void;
  onEngineeringClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onEngineeringClick }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#08090B]">
      {/* Background Image Container with Cinematic Lighting and Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroVortexImg}
          alt="APEX Vortex concept hypercar in dark cinematic studio with dramatic rim lighting"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000 ease-out"
        />
        {/* Multi-layered cinematic gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/60 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#08090B]/30 to-[#08090B] pointer-events-none" />

        {/* Ambient atmospheric cyan glow */}
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#00E5FF]/10 blur-[140px] pointer-events-none rounded-full" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full my-auto pt-16">
        <div className="max-w-3xl">
          {/* Subtle brand kicker */}
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#00E5FF] mb-4">
            <span className="w-1.5 h-1.5 bg-[#00E5FF]" />
            <span>APEX MOTORS · SERIES PROTO-01</span>
          </div>

          {/* Huge Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.92] text-balance mb-6">
            BORN TO DEFY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00E5FF]">
              LIMITS.
            </span>
          </h1>

          {/* Supporting Statement */}
          <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed max-w-xl mb-8">
            Precision engineering. Uncompromising performance. 
            An avant-garde exploration into aerodynamic downforce and electrified hybrid dominance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 bg-[#00E5FF] hover:bg-[#38bdf8] text-black font-bold uppercase tracking-wider text-xs rounded-lg transition-all shadow-xl shadow-[#00E5FF]/20 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              Explore The Machine
            </button>
            <button
              onClick={onEngineeringClick}
              className="px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 font-medium uppercase tracking-wider text-xs rounded-lg transition-all backdrop-blur-sm whitespace-nowrap"
            >
              Discover Our Engineering
            </button>
          </div>
        </div>
      </div>

      {/* Hero Bottom Telemetry Strip & Concept Disclosure */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full mt-12">
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Metric KPIs */}
          <div className="grid grid-cols-3 gap-6 sm:gap-12">
            <div>
              <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-mono tabular-nums">
                350<span className="text-[#00E5FF] text-xl sm:text-2xl">+</span>
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mt-1">
                Top Speed (km/h)
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-mono tabular-nums">
                2.5<span className="text-[#00E5FF] text-xl sm:text-2xl">s</span>
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mt-1">
                0–100 km/h
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-mono tabular-nums">
                1,000<span className="text-[#00E5FF] text-xl sm:text-2xl">+</span>
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mt-1">
                Total Output (HP)
              </div>
            </div>
          </div>

          {/* Right side: Concept vehicle disclaimer & scroll cue */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-400 bg-white/5 px-2.5 py-1.5 rounded border border-white/10">
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Concept vehicle specifications · Simulated data</span>
            </div>

            <button
              onClick={onExploreClick}
              className="hidden lg:flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
            >
              <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
              <ArrowDown className="w-4 h-4 text-[#00E5FF] animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
