import React, { useState } from 'react';
import { Wind, Shield, Activity, Cpu, Thermometer, BatteryCharging, ChevronRight } from 'lucide-react';
import rearDiffuserImg from '../assets/images/apex_rear_diffuser_1792319381294.jpg';
import wheelDetailImg from '../assets/images/apex_wheel_brake_detail_1792319359921.jpg';

export const PerformanceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const engineeringPillars = [
    {
      index: '01',
      title: 'Active Venturi Aerodynamics',
      icon: Wind,
      headline: '850 KG DOWNFORCE WITHOUT INDUCED DRAG',
      summary:
        'Sculpted underfloor venturi channels accelerate ground-effect airflow, pulling the vehicle to the tarmac. Computer-actuated front diffusers and swan-neck aerofoils balance front-to-rear aerodynamic balance continuously through high-speed turns.',
      specs: [
        { label: 'Drag Coefficient', value: '0.28 Cd (Vmax)' },
        { label: 'Downforce Peak', value: '1,120 kg @ 250 km/h' },
        { label: 'Airfoil Adjustment', value: '18° Variable Pitch' },
      ],
      image: rearDiffuserImg,
      alt: 'APEX hypercar aerodynamic rear diffuser and active aero',
    },
    {
      index: '02',
      title: 'T1000 Carbon Monocoque',
      icon: Shield,
      headline: 'AERO-GRADE CELL RATED AT 62,000 NM/DEGREE',
      summary:
        'Constructed from autoclave-cured aerospace pre-preg carbon fiber composite. The monocoque passenger cell provides immense structural rigidity with a dry tub mass of under 88 kilograms, incorporating structural crash impact structures.',
      specs: [
        { label: 'Torsional Rigidity', value: '62,000 Nm/deg' },
        { label: 'Tub Dry Weight', value: '88 kg' },
        { label: 'Fibers Used', value: 'Torayca T1000 Carbon' },
      ],
      image: wheelDetailImg,
      alt: 'APEX carbon fiber suspension and brake assembly',
    },
    {
      index: '03',
      title: 'Silicon-Carbide Quad-Motor Drive',
      icon: BatteryCharging,
      headline: 'MILLISECOND VECTORING AT EACH CONTACT PATCH',
      summary:
        'Axial-flux electric motors deliver instant torque directly to each hub. Operating on an 800-volt high-density silicon-carbide inverter platform, power delivery responds within 2 milliseconds, virtually eliminating understeer and wheel slip.',
      specs: [
        { label: 'Voltage Architecture', value: '800V Ultra-High' },
        { label: 'Torque Response', value: '2.0 milliseconds' },
        { label: 'Inverter Efficiency', value: '98.7% Peak' },
      ],
      image: rearDiffuserImg,
      alt: 'APEX powertrain thermal vents and electric drive',
    },
    {
      index: '04',
      title: 'Cryogenic Thermal Management',
      icon: Thermometer,
      headline: 'STABILIZED PERFORMANCE AT TRACK-DAY TEMPS',
      summary:
        'Multi-stage cooling loops separate the high-output combustion cylinder heads from electric battery packs and inverters. NACA roof intakes feed dedicated heat exchangers designed to prevent thermal throttling even during repeated 20-lap track stints.',
      specs: [
        { label: 'Cooling Circuits', value: '3 Independent Loops' },
        { label: 'Operating Thermal Max', value: '1,050°C Brake / 65°C Battery' },
        { label: 'Radiator Surface', value: '+35% Effective Area' },
      ],
      image: wheelDetailImg,
      alt: 'APEX thermal management radiators and carbon cooling ducts',
    },
  ];

  const currentPillar = engineeringPillars[activeTab];

  return (
    <section id="performance" className="py-24 bg-[#08090B] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#00E5FF] mb-3">
            Propulsion & Dynamics Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight mb-4 text-balance">
            POWER IS ONLY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-[#00E5FF]">
              THE BEGINNING.
            </span>
          </h2>
          <p className="text-base text-neutral-300 font-light leading-relaxed">
            Raw horsepower without chassis control is wasted energy. APEX engineering synthesizes active aerodynamics, carbon composite materials science, and millisecond electric torque vectoring into one cohesive performance envelope.
          </p>
        </div>

        {/* Interactive Engineering Pillar Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {engineeringPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={pillar.index}
                onClick={() => setActiveTab(idx)}
                className={`p-5 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-[#17191D] border-[#00E5FF]/40 shadow-xl shadow-[#00E5FF]/5'
                    : 'bg-[#17191D]/50 border-white/10 hover:border-white/20 hover:bg-[#17191D]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#00E5FF] font-semibold">{pillar.index}</span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#00E5FF]' : 'text-neutral-500'}`} />
                </div>
                <div className="text-sm font-bold text-white uppercase tracking-wide">
                  {pillar.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Pillar Deep-Dive Display */}
        <div className="bg-[#17191D] border border-white/10 rounded-2xl overflow-hidden p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] mb-2 flex items-center gap-2">
                <span>Domain {currentPillar.index}</span>
                <span aria-hidden="true">·</span>
                <span>{currentPillar.title}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight mb-4">
                {currentPillar.headline}
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-8">
                {currentPillar.summary}
              </p>

              {/* Specs strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                {currentPillar.specs.map((spec, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-[11px] font-mono text-neutral-400 uppercase mb-1">
                      {spec.label}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white font-mono">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-white/10 aspect-[4/3] sm:aspect-[16/10] lg:aspect-square">
              <img
                src={currentPillar.image}
                alt={currentPillar.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-neutral-300 bg-black/60 backdrop-blur-md px-3 py-2 rounded border border-white/10 flex justify-between items-center">
                <span>Telemetry Node: {currentPillar.index}</span>
                <span className="text-[#00E5FF]">Concept Simulation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Concept Notice */}
        <div className="mt-8 text-center text-xs font-mono text-neutral-500">
          Engineering principles based on computational fluid dynamics (CFD) and virtual simulator benchmarks. Not certified production vehicle claims.
        </div>
      </div>
    </section>
  );
};
