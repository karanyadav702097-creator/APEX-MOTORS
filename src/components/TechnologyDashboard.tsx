import React, { useState } from 'react';
import { Vehicle } from '../types';
import { Activity, Gauge, Flame, Zap, Compass, BarChart3, ShieldCheck } from 'lucide-react';

interface TechnologyDashboardProps {
  vehicles: Vehicle[];
}

export const TechnologyDashboard: React.FC<TechnologyDashboardProps> = ({ vehicles }) => {
  const [activeModelId, setActiveModelId] = useState<string>(vehicles[0].id);
  const currentVehicle = vehicles.find((v) => v.id === activeModelId) || vehicles[0];

  // Simulated Dyno curve points: RPM -> { hpPct, torquePct }
  const dynoPoints = [
    { rpm: '2,000', hp: 32, torque: 85 },
    { rpm: '4,000', hp: 58, torque: 96 },
    { rpm: '6,000', hp: 82, torque: 100 },
    { rpm: '8,000', hp: 98, torque: 92 },
    { rpm: '9,500', hp: 100, torque: 84 },
  ];

  return (
    <section id="technology" className="py-24 bg-[#08090B] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#00E5FF] mb-2 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Telemetry & Dynamics Benchmark</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              PERFORMANCE TELEMETRY
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md font-light leading-relaxed">
            Real-time sensor arrays and dyno simulations validate aerodynamic balance and torque delivery across high-stress racing conditions.
          </p>
        </div>

        {/* Model Selector Bar */}
        <div className="flex items-center gap-2 p-1 bg-[#17191D] border border-white/10 rounded-xl mb-8 overflow-x-auto">
          {vehicles.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveModelId(v.id)}
              className={`flex-1 min-w-[200px] py-3 px-4 rounded-lg text-left transition-all ${
                v.id === currentVehicle.id
                  ? 'bg-[#08090B] text-white border border-white/15 shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-neutral-400">{v.category}</div>
              <div className="text-sm font-bold tracking-wide">{v.name}</div>
            </button>
          ))}
        </div>

        {/* Telemetry Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Main Dyno & Power Curve Chart (7 cols) */}
          <div className="lg:col-span-7 bg-[#17191D] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#00E5FF]">
                    Dyno Test Benchmark
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase">
                    Powertrain Torque & Output Curve
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-[#00E5FF]">
                    <span className="w-2.5 h-0.5 bg-[#00E5FF]" /> Horsepower
                  </span>
                  <span className="flex items-center gap-1.5 text-orange-400">
                    <span className="w-2.5 h-0.5 bg-orange-400" /> Torque
                  </span>
                </div>
              </div>

              {/* Graphic Dyno Visualizer */}
              <div className="h-56 w-full pt-4 relative flex items-end justify-between gap-3 border-b border-l border-white/10 px-2 pb-2">
                {/* Horizontal reference lines */}
                <div className="absolute inset-x-0 top-1/4 border-b border-white/5 pointer-events-none" />
                <div className="absolute inset-x-0 top-2/4 border-b border-white/5 pointer-events-none" />
                <div className="absolute inset-x-0 top-3/4 border-b border-white/5 pointer-events-none" />

                {dynoPoints.map((pt, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full gap-1 z-10">
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      {/* Horsepower bar */}
                      <div
                        className="w-1/3 bg-gradient-to-t from-[#00E5FF]/40 to-[#00E5FF] rounded-t-sm transition-all duration-700"
                        style={{ height: `${pt.hp}%` }}
                        title={`HP: ${pt.hp}% at ${pt.rpm} RPM`}
                      />
                      {/* Torque bar */}
                      <div
                        className="w-1/3 bg-gradient-to-t from-orange-500/40 to-orange-400 rounded-t-sm transition-all duration-700"
                        style={{ height: `${pt.torque}%` }}
                        title={`Torque: ${pt.torque}% at ${pt.rpm} RPM`}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 whitespace-nowrap mt-2">
                      {pt.rpm}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-neutral-400">
              <div>Peak Redline: 9,500 RPM</div>
              <div>Torque Delivery Window: 2,400–8,800 RPM</div>
              <div className="text-[#00E5FF]">SiC Inverter Vectoring</div>
            </div>
          </div>

          {/* Key Metric Telemetry (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-[#17191D] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-xs font-mono uppercase">Max Power</span>
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <div className="text-3xl font-black text-white font-mono tabular-nums">
                  {currentVehicle.power}
                </div>
                <div className="text-xs text-neutral-400 font-mono mt-1">Combustion + KERS</div>
              </div>
            </div>

            <div className="bg-[#17191D] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-xs font-mono uppercase">Combined Torque</span>
                <Gauge className="w-4 h-4 text-[#00E5FF]" />
              </div>
              <div>
                <div className="text-3xl font-black text-white font-mono tabular-nums">
                  {currentVehicle.specs.torque.split(' ')[0]}
                </div>
                <div className="text-xs text-neutral-400 font-mono mt-1">Newton Metres</div>
              </div>
            </div>

            <div className="bg-[#17191D] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-xs font-mono uppercase">0–100 Sprint</span>
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-black text-white font-mono tabular-nums">
                  {currentVehicle.acceleration}
                </div>
                <div className="text-xs text-neutral-400 font-mono mt-1">Zero Wheel Spin</div>
              </div>
            </div>

            <div className="bg-[#17191D] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-xs font-mono uppercase">Lateral Grip</span>
                <Compass className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <div className="text-3xl font-black text-white font-mono tabular-nums">
                  1.92<span className="text-lg font-normal text-neutral-400">G</span>
                </div>
                <div className="text-xs text-neutral-400 font-mono mt-1">Skidpad Lateral Max</div>
              </div>
            </div>
          </div>
        </div>

        {/* Fleet Comparative Spec Table */}
        <div className="bg-[#17191D] border border-white/10 rounded-2xl p-6 sm:p-8 overflow-x-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] mb-4">
            Fleet Telemetry Matrix
          </div>
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 text-neutral-400">
                <th className="py-3 pr-4 font-semibold">Model</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Power (HP)</th>
                <th className="py-3 px-4 font-semibold">0–100 km/h</th>
                <th className="py-3 px-4 font-semibold">Top Speed</th>
                <th className="py-3 px-4 font-semibold">Dry Weight</th>
                <th className="py-3 pl-4 font-semibold text-right">Concept Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {vehicles.map((v) => {
                const isSelected = v.id === currentVehicle.id;
                return (
                  <tr
                    key={v.id}
                    onClick={() => setActiveModelId(v.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-white/10 text-white font-semibold' : 'text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    <td className="py-3.5 pr-4 flex items-center gap-2">
                      {isSelected && <span className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full" />}
                      <span>{v.name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400">{v.category}</td>
                    <td className="py-3.5 px-4 tabular-nums text-[#00E5FF]">{v.power}</td>
                    <td className="py-3.5 px-4 tabular-nums">{v.acceleration}</td>
                    <td className="py-3.5 px-4 tabular-nums">{v.topSpeed}</td>
                    <td className="py-3.5 px-4 tabular-nums">{v.specs.dryWeight}</td>
                    <td className="py-3.5 pl-4 tabular-nums text-right">${(v.basePrice / 1000000).toFixed(2)}M</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono text-neutral-500 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>All metrics represent simulated computational engineering targets for concept evaluation.</span>
        </div>
      </div>
    </section>
  );
};
