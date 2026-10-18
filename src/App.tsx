/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CONCEPT_SUPERCAR_COLLECTION } from './data/supercars';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VehicleShowcase } from './components/VehicleShowcase';
import { PerformanceSection } from './components/PerformanceSection';
import { VehicleConfigurator } from './components/VehicleConfigurator';
import { TechnologyDashboard } from './components/TechnologyDashboard';
import { DesignPhilosophy } from './components/DesignPhilosophy';
import { GallerySection } from './components/GallerySection';
import { InquiryForm } from './components/InquiryForm';
import { Footer } from './components/Footer';
import { AudioControls } from './components/AudioControls';
import { Volume2, ChevronDown, ChevronUp } from 'lucide-react';

export default function App() {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('apex-vortex');
  const [prefilledSpec, setPrefilledSpec] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isAudioDockOpen, setIsAudioDockOpen] = useState<boolean>(false);

  const currentVehicle =
    CONCEPT_SUPERCAR_COLLECTION.find((v) => v.id === selectedVehicleId) ||
    CONCEPT_SUPERCAR_COLLECTION[0];

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCommission = (specSummary: string, estimatedPrice: number) => {
    setPrefilledSpec(`${specSummary} (Estimated Concept Valuation: $${estimatedPrice.toLocaleString()})`);
    scrollToSection('contact');
  };

  // Section observer to update active navbar state
  useEffect(() => {
    const sections = ['collection', 'performance', 'configurator', 'technology', 'gallery', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F7FA] font-sans antialiased overflow-x-hidden selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
      {/* Primary Navigation */}
      <Navbar
        onOpenInquiry={() => scrollToSection('contact')}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <HeroSection
        onExploreClick={() => scrollToSection('collection')}
        onEngineeringClick={() => scrollToSection('performance')}
      />

      {/* Vehicle Collection Showcase */}
      <VehicleShowcase
        vehicles={CONCEPT_SUPERCAR_COLLECTION}
        selectedVehicleId={selectedVehicleId}
        onSelectVehicle={setSelectedVehicleId}
        onConfigureVehicle={(id) => {
          setSelectedVehicleId(id);
          scrollToSection('configurator');
        }}
      />

      {/* Immersive Performance & Propulsion Section */}
      <PerformanceSection />

      {/* Interactive 3D Configurator */}
      <VehicleConfigurator
        vehicles={CONCEPT_SUPERCAR_COLLECTION}
        selectedVehicleId={selectedVehicleId}
        onSelectVehicle={setSelectedVehicleId}
        onCommissionSpec={handleCommission}
      />

      {/* Performance & Technology Telemetry Dashboard */}
      <TechnologyDashboard vehicles={CONCEPT_SUPERCAR_COLLECTION} />

      {/* Design Philosophy */}
      <DesignPhilosophy />

      {/* Automotive Photography Gallery with Lightbox */}
      <GallerySection />

      {/* Private Allocation & Inquiry Form */}
      <InquiryForm
        vehicles={CONCEPT_SUPERCAR_COLLECTION}
        prefilledVehicleId={selectedVehicleId}
        prefilledSpecSummary={prefilledSpec}
      />

      {/* Footer */}
      <Footer />

      {/* Floating Acoustics Control Drawer (Fixed at bottom right) */}
      <div className="fixed bottom-5 right-5 z-40">
        {isAudioDockOpen ? (
          <div className="flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <button
              onClick={() => setIsAudioDockOpen(false)}
              className="px-2.5 py-1 bg-[#17191D] border border-white/10 rounded-md text-[11px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 shadow-lg"
            >
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Minimize Acoustics</span>
            </button>
            <div className="shadow-2xl">
              <AudioControls currentSoundType={currentVehicle.soundType} />
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAudioDockOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#17191D]/90 backdrop-blur-md border border-white/15 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white hover:border-[#00E5FF]/50 shadow-2xl transition-all"
            title="Open Procedural Engine Acoustics Synthesizer"
          >
            <Volume2 className="w-4 h-4 text-[#00E5FF]" />
            <span className="hidden sm:inline">Acoustics Studio</span>
          </button>
        )}
      </div>
    </div>
  );
}
