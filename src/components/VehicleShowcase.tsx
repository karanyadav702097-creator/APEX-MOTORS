import React, { useState } from 'react';
import { Vehicle } from '../types';
import { ArrowRight, SlidersHorizontal, Info, X, Zap, Gauge, Wind, Shield } from 'lucide-react';

interface VehicleShowcaseProps {
  vehicles: Vehicle[];
  selectedVehicleId: string;
  onSelectVehicle: (id: string) => void;
  onConfigureVehicle: (id: string) => void;
}

export const VehicleShowcase: React.FC<VehicleShowcaseProps> = ({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  onConfigureVehicle,
}) => {
  const currentVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];
  const [specsModalOpen, setSpecsModalOpen] = useState(false);

  return (
    <section id="collection" className="py-24 bg-[#08090B] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#00E5FF] mb-2">
              Concept Fleet · Phase III
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              VEHICLE COLLECTION
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md font-light leading-relaxed">
            Three distinct philosophies of extreme speed. Engineered without compromise using aerospace carbon monocoques and hybrid-electric powertrains.
          </p>
        </div>

        {/* Interactive Model Selector Tabs */}
        <div className="flex items-center gap-2 p-1 bg-[#17191D] border border-white/10 rounded-xl mb-8 overflow-x-auto">
          {vehicles.map((v) => {
            const isSelected = v.id === currentVehicle.id;
            return (
              <button
                key={v.id}
                onClick={() => onSelectVehicle(v.id)}
                className={`flex-1 min-w-[200px] py-3.5 px-4 rounded-lg text-left transition-all ${
                  isSelected
                    ? 'bg-[#08090B] text-white shadow-lg border border-white/15'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-0.5">
                  {v.category}
                </div>
                <div className="text-sm sm:text-base font-bold tracking-wide flex items-center justify-between">
                  <span>{v.name}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured Vehicle Showcase Card */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#17191D]">
          {/* Main Visual Frame */}
          <div className="relative h-[420px] sm:h-[520px] lg:h-[580px] w-full overflow-hidden">
            <img
              src={currentVehicle.image}
              alt={`${currentVehicle.name} ${currentVehicle.category}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform scale-100 hover:scale-102"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#17191D] via-[#17191D]/30 to-transparent pointer-events-none" />

            {/* Top Left Concept Badge (clean unboxed text per zero-pill rule) */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2 text-xs font-mono text-neutral-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
              <span className="text-[#00E5FF] font-semibold">{currentVehicle.category}</span>
              <span aria-hidden="true">·</span>
              <span>Concept Validation</span>
            </div>
          </div>

          {/* Details & Telemetry Panel */}
          <div className="p-6 sm:p-10 -mt-16 sm:-mt-24 relative z-10">
            <div className="bg-[#08090B]/90 backdrop-blur-xl border border-white/10 rounded-xl p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Model Name & Description */}
                <div className="lg:col-span-6">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] mb-1">
                    {currentVehicle.category}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
                    {currentVehicle.name}
                  </h3>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                    {currentVehicle.description}
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {currentVehicle.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300 font-mono">
                        <span className="w-1 h-1 bg-[#00E5FF] rounded-full" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onConfigureVehicle(currentVehicle.id)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#00E5FF] hover:bg-[#38bdf8] text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Configure Machine</span>
                    </button>

                    <button
                      onClick={() => setSpecsModalOpen(true)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-medium uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap"
                    >
                      <Info className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span>Full Technical Blueprint</span>
                    </button>
                  </div>
                </div>

                {/* Right: Technical Metrics Grid */}
                <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-1">
                      <Zap className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span className="font-mono text-[11px] uppercase">Peak Power</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums">
                      {currentVehicle.power}
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Dyno verified</div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-1">
                      <Gauge className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span className="font-mono text-[11px] uppercase">0–100 km/h</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums">
                      {currentVehicle.acceleration}
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Dry asphalt</div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-1">
                      <Wind className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span className="font-mono text-[11px] uppercase">Top Speed</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums">
                      {currentVehicle.topSpeed}
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Aero configuration</div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-[11px] font-mono text-neutral-400 uppercase mb-1">
                      {currentVehicle.range ? 'Estimated Range' : 'Downforce'}
                    </div>
                    <div className="text-lg font-bold text-white font-mono">
                      {currentVehicle.range || currentVehicle.specs.downforce}
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono mt-0.5">High-speed trim</div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-[11px] font-mono text-neutral-400 uppercase mb-1">Dry Weight</div>
                    <div className="text-lg font-bold text-white font-mono">
                      {currentVehicle.specs.dryWeight}
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Carbon monocoque</div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-[11px] font-mono text-neutral-400 uppercase mb-1">Concept Allocation</div>
                    <div className="text-lg font-bold text-[#00E5FF] font-mono">
                      ${(currentVehicle.basePrice / 1000000).toFixed(2)}M
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Estimated base</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Blueprint Modal */}
      {specsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#17191D] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSpecsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close specifications modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] mb-1">
              Engineering Specification Blueprint
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase mb-2">
              {currentVehicle.name} Technical Dossier
            </h3>
            <p className="text-xs text-neutral-400 font-mono mb-6">
              Simulated prototype data · Internal APEX Engineering Lab release
            </p>

            <div className="divide-y divide-white/10 font-mono text-xs">
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Powertrain / Displacement:</span>
                <span className="text-white font-semibold text-right">{currentVehicle.specs.displacement || currentVehicle.specs.engineType}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Combustion & Electric Architecture:</span>
                <span className="text-white font-semibold text-right">{currentVehicle.specs.engineType}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Torque Output:</span>
                <span className="text-white font-semibold text-right">{currentVehicle.specs.torque}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Transmission & Differential:</span>
                <span className="text-white font-semibold text-right">{currentVehicle.specs.transmission}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Drive Configuration:</span>
                <span className="text-white font-semibold text-right">{currentVehicle.specs.driveType}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Chassis & Monocoque:</span>
                <span className="text-white font-semibold text-right">{currentVehicle.specs.chassis}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Aerodynamic Peak Downforce:</span>
                <span className="text-[#00E5FF] font-semibold text-right">{currentVehicle.specs.downforce}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Braking Distance (100–0 km/h):</span>
                <span className="text-white font-semibold text-right">{currentVehicle.specs.brakingDistance}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Dry Kerb Weight:</span>
                <span className="text-white font-semibold text-right">{currentVehicle.specs.dryWeight}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="text-[11px] font-mono text-neutral-500">
                Data generated for concept evaluation only.
              </div>
              <button
                onClick={() => {
                  setSpecsModalOpen(false);
                  onConfigureVehicle(currentVehicle.id);
                }}
                className="px-5 py-2 bg-[#00E5FF] hover:bg-[#38bdf8] text-black font-bold uppercase tracking-wider text-xs rounded-lg transition-colors"
              >
                Launch Configurator
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
