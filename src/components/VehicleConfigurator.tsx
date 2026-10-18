import React, { useState } from 'react';
import { Vehicle, ConfiguratorState } from '../types';
import {
  CONFIG_PAINTS,
  CONFIG_WHEELS,
  CONFIG_AERO_PACKAGES,
  CONFIG_CALIPERS,
  CONFIG_INTERIORS,
} from '../data/supercars';
import { CarCanvas } from './3d/CarCanvas';
import { RotateCcw, Check, Sparkles, Send, DollarSign, Layers } from 'lucide-react';

interface VehicleConfiguratorProps {
  vehicles: Vehicle[];
  selectedVehicleId: string;
  onSelectVehicle: (id: string) => void;
  onCommissionSpec: (specSummary: string, estimatedPrice: number) => void;
}

export const VehicleConfigurator: React.FC<VehicleConfiguratorProps> = ({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  onCommissionSpec,
}) => {
  const currentVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const defaultState: ConfiguratorState = {
    vehicleId: currentVehicle.id,
    paintColor: CONFIG_PAINTS[0].hex || '#0a0b0d',
    wheelStyle: CONFIG_WHEELS[0].id,
    interiorTrim: CONFIG_INTERIORS[0].id,
    aeroPackage: CONFIG_AERO_PACKAGES[0].id,
    caliperColor: CONFIG_CALIPERS[0].hex || '#00e5ff',
  };

  const [config, setConfig] = useState<ConfiguratorState>(defaultState);
  const [activeTab, setActiveTab] = useState<'paint' | 'wheels' | 'aero' | 'calipers' | 'interior'>('paint');

  // If vehicle changes from outside
  React.useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      vehicleId: currentVehicle.id,
    }));
  }, [currentVehicle.id]);

  // Compute total concept price
  const selectedPaint = CONFIG_PAINTS.find((p) => p.hex === config.paintColor) || CONFIG_PAINTS[0];
  const selectedWheel = CONFIG_WHEELS.find((w) => w.id === config.wheelStyle) || CONFIG_WHEELS[0];
  const selectedAero = CONFIG_AERO_PACKAGES.find((a) => a.id === config.aeroPackage) || CONFIG_AERO_PACKAGES[0];
  const selectedCaliper = CONFIG_CALIPERS.find((c) => c.hex === config.caliperColor) || CONFIG_CALIPERS[0];
  const selectedInterior = CONFIG_INTERIORS.find((i) => i.id === config.interiorTrim) || CONFIG_INTERIORS[0];

  const optionsTotal =
    (selectedPaint?.priceDelta || 0) +
    (selectedWheel?.priceDelta || 0) +
    (selectedAero?.priceDelta || 0) +
    (selectedCaliper?.priceDelta || 0) +
    (selectedInterior?.priceDelta || 0);

  const totalPrice = currentVehicle.basePrice + optionsTotal;

  const handleReset = () => {
    setConfig({
      vehicleId: currentVehicle.id,
      paintColor: CONFIG_PAINTS[0].hex || '#0a0b0d',
      wheelStyle: CONFIG_WHEELS[0].id,
      interiorTrim: CONFIG_INTERIORS[0].id,
      aeroPackage: CONFIG_AERO_PACKAGES[0].id,
      caliperColor: CONFIG_CALIPERS[0].hex || '#00e5ff',
    });
  };

  const handleCommissionClick = () => {
    const summary = `${currentVehicle.name} (${selectedPaint.name}, ${selectedWheel.name}, ${selectedAero.name}, Calipers: ${selectedCaliper.name}, Interior: ${selectedInterior.name})`;
    onCommissionSpec(summary, totalPrice);
  };

  return (
    <section id="configurator" className="py-24 bg-[#08090B] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#00E5FF] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time 3D Studio & Configurator</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              BESPOKE MACHINE CONFIGURATION
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors"
              title="Reset to factory baseline specifications"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Spec</span>
            </button>
          </div>
        </div>

        {/* Vehicle Selection Header Bar */}
        <div className="flex items-center gap-2 p-1 bg-[#17191D] border border-white/10 rounded-xl mb-6 overflow-x-auto">
          {vehicles.map((v) => (
            <button
              key={v.id}
              onClick={() => onSelectVehicle(v.id)}
              className={`flex-1 min-w-[180px] py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between ${
                v.id === currentVehicle.id
                  ? 'bg-[#08090B] text-white border border-white/15 shadow'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{v.name}</span>
              <span className="text-[10px] font-mono text-neutral-500 font-normal">{v.category}</span>
            </button>
          ))}
        </div>

        {/* 3D Viewer Container */}
        <div className="mb-8">
          <CarCanvas
            settings={{
              paintColor: config.paintColor,
              caliperColor: config.caliperColor,
              wheelStyle: config.wheelStyle,
              aeroPackage: config.aeroPackage,
            }}
            vehicleName={currentVehicle.name}
          />
        </div>

        {/* Customization Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Customizer Controls (7 cols) */}
          <div className="lg:col-span-7 bg-[#17191D] border border-white/10 rounded-2xl p-6 sm:p-8">
            {/* Customization Category Tabs */}
            <div className="flex items-center gap-2 p-1 bg-[#08090B] border border-white/10 rounded-xl mb-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('paint')}
                className={`flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'paint'
                    ? 'bg-[#17191D] text-white border border-white/10'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Exterior Paint
              </button>
              <button
                onClick={() => setActiveTab('wheels')}
                className={`flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'wheels'
                    ? 'bg-[#17191D] text-white border border-white/10'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Wheel Rims
              </button>
              <button
                onClick={() => setActiveTab('aero')}
                className={`flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'aero'
                    ? 'bg-[#17191D] text-white border border-white/10'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Aero Trim
              </button>
              <button
                onClick={() => setActiveTab('calipers')}
                className={`flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'calipers'
                    ? 'bg-[#17191D] text-white border border-white/10'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Brake Calipers
              </button>
              <button
                onClick={() => setActiveTab('interior')}
                className={`flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'interior'
                    ? 'bg-[#17191D] text-white border border-white/10'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Cockpit
              </button>
            </div>

            {/* Tab 1: Exterior Paint */}
            {activeTab === 'paint' && (
              <div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">
                  Select Multilayer Bespoke Finish
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CONFIG_PAINTS.map((paint) => {
                    const isSelected = config.paintColor === paint.hex;
                    return (
                      <button
                        key={paint.id}
                        onClick={() => setConfig({ ...config, paintColor: paint.hex! })}
                        className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3.5 ${
                          isSelected
                            ? 'bg-[#08090B] border-[#00E5FF] shadow-lg'
                            : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/10'
                        }`}
                      >
                        <span
                          className="w-8 h-8 rounded-full border border-white/30 shrink-0 shadow-inner"
                          style={{ backgroundColor: paint.hex }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-white tracking-wide truncate">
                            {paint.name}
                          </div>
                          <div className="text-[11px] text-neutral-400 font-mono">
                            {paint.priceDelta === 0 ? 'Standard Spec' : `+$${paint.priceDelta.toLocaleString()}`}
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#00E5FF] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Wheel Rims */}
            {activeTab === 'wheels' && (
              <div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">
                  Wheel Architecture & Central Lock System
                </div>
                <div className="flex flex-col gap-3">
                  {CONFIG_WHEELS.map((wheel) => {
                    const isSelected = config.wheelStyle === wheel.id;
                    return (
                      <button
                        key={wheel.id}
                        onClick={() => setConfig({ ...config, wheelStyle: wheel.id })}
                        className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#08090B] border-[#00E5FF] shadow-lg'
                            : 'bg-white/5 border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5">{wheel.name}</div>
                          <div className="text-xs text-neutral-400">{wheel.description}</div>
                        </div>
                        <div className="text-right pl-4">
                          <div className="text-xs font-mono text-[#00E5FF] font-semibold">
                            {wheel.priceDelta === 0 ? 'Included' : `+$${wheel.priceDelta.toLocaleString()}`}
                          </div>
                          {isSelected && (
                            <span className="text-[10px] font-mono text-neutral-400 uppercase">Selected</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: Aero Trim */}
            {activeTab === 'aero' && (
              <div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">
                  Downforce & Aerofoil Configurations
                </div>
                <div className="flex flex-col gap-3">
                  {CONFIG_AERO_PACKAGES.map((aero) => {
                    const isSelected = config.aeroPackage === aero.id;
                    return (
                      <button
                        key={aero.id}
                        onClick={() => setConfig({ ...config, aeroPackage: aero.id })}
                        className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#08090B] border-[#00E5FF] shadow-lg'
                            : 'bg-white/5 border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5">{aero.name}</div>
                          <div className="text-xs text-neutral-400">{aero.description}</div>
                        </div>
                        <div className="text-right pl-4">
                          <div className="text-xs font-mono text-[#00E5FF] font-semibold">
                            {aero.priceDelta === 0 ? 'Included' : `+$${aero.priceDelta.toLocaleString()}`}
                          </div>
                          {isSelected && (
                            <span className="text-[10px] font-mono text-neutral-400 uppercase">Active</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 4: Brake Calipers */}
            {activeTab === 'calipers' && (
              <div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">
                  Carbon-Ceramic Caliper Anodization
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CONFIG_CALIPERS.map((caliper) => {
                    const isSelected = config.caliperColor === caliper.hex;
                    return (
                      <button
                        key={caliper.id}
                        onClick={() => setConfig({ ...config, caliperColor: caliper.hex! })}
                        className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3.5 ${
                          isSelected
                            ? 'bg-[#08090B] border-[#00E5FF] shadow-lg'
                            : 'bg-white/5 border-white/10 hover:border-white/25'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-md border border-white/30 shrink-0"
                          style={{ backgroundColor: caliper.hex }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-white truncate">{caliper.name}</div>
                          <div className="text-[11px] text-neutral-400 font-mono">
                            {caliper.priceDelta === 0 ? 'Standard' : `+$${caliper.priceDelta.toLocaleString()}`}
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#00E5FF] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 5: Interior Cockpit */}
            {activeTab === 'interior' && (
              <div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">
                  Atelier Cabin Materials & Upholstery
                </div>
                <div className="flex flex-col gap-3">
                  {CONFIG_INTERIORS.map((interior) => {
                    const isSelected = config.interiorTrim === interior.id;
                    return (
                      <button
                        key={interior.id}
                        onClick={() => setConfig({ ...config, interiorTrim: interior.id })}
                        className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#08090B] border-[#00E5FF] shadow-lg'
                            : 'bg-white/5 border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5">{interior.name}</div>
                          <div className="text-xs text-neutral-400">{interior.description}</div>
                        </div>
                        <div className="text-right pl-4">
                          <div className="text-xs font-mono text-[#00E5FF] font-semibold">
                            {interior.priceDelta === 0 ? 'Included' : `+$${interior.priceDelta.toLocaleString()}`}
                          </div>
                          {isSelected && (
                            <span className="text-[10px] font-mono text-neutral-400 uppercase">Selected</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Live Spec Summary & Concept Price (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#17191D] border border-white/10 rounded-2xl p-6 sm:p-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Bespoke Order Dossier</span>
              </div>
              <h3 className="text-2xl font-black uppercase text-white tracking-tight mb-6">
                {currentVehicle.name}
              </h3>

              {/* Active Options Summary */}
              <div className="divide-y divide-white/10 text-xs font-mono mb-6">
                <div className="py-2.5 flex justify-between">
                  <span className="text-neutral-400">Baseline Vehicle:</span>
                  <span className="text-white">${currentVehicle.basePrice.toLocaleString()}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-neutral-400">Exterior Finish:</span>
                  <span className="text-white text-right">{selectedPaint.name}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-neutral-400">Wheel Choice:</span>
                  <span className="text-white text-right">{selectedWheel.name}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-neutral-400">Aerodynamics:</span>
                  <span className="text-white text-right">{selectedAero.name}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-neutral-400">Caliper Anodization:</span>
                  <span className="text-white text-right">{selectedCaliper.name}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-neutral-400">Cabin Spec:</span>
                  <span className="text-white text-right">{selectedInterior.name}</span>
                </div>
              </div>
            </div>

            {/* Pricing Card & Action */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Concept Valuation:
                </span>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="text-[11px] font-mono text-neutral-500 mb-6">
                Bespoke options: +${optionsTotal.toLocaleString()} · Estimated non-binding concept price
              </div>

              <button
                onClick={handleCommissionClick}
                className="w-full py-4 bg-[#00E5FF] hover:bg-[#38bdf8] text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-xl shadow-[#00E5FF]/20 flex items-center justify-center gap-2"
              >
                <span>Commission This Spec</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
