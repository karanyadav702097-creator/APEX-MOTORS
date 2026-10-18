import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface NavbarProps {
  onOpenInquiry: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collection', href: '#collection' },
    { label: 'Performance', href: '#performance' },
    { label: 'Configurator', href: '#configurator' },
    { label: 'Technology', href: '#technology' },
    { label: 'Gallery', href: '#gallery' },
  ];

  const handleAudioToggle = () => {
    if (audioActive) {
      soundEngine.stop();
      setAudioActive(false);
    } else {
      soundEngine.start();
      setAudioActive(true);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08090B]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark (single line, single element) */}
          <a
            href="#"
            className="text-lg sm:text-xl font-black tracking-widest text-white uppercase hover:text-[#00E5FF] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 bg-[#00E5FF] rotate-45 transform" />
            <span>APEX MOTORS</span>
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-neutral-300">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                    isActive
                      ? 'text-white border-[#00E5FF]'
                      : 'text-neutral-400 border-transparent hover:text-white hover:border-white/30'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + audio toggle & mobile trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick sound toggle */}
            <button
              onClick={handleAudioToggle}
              className={`p-2 rounded-lg transition-colors border ${
                audioActive
                  ? 'bg-[#00E5FF]/15 border-[#00E5FF]/40 text-[#00E5FF]'
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
              }`}
              title={audioActive ? 'Mute Supercar Acoustics' : 'Enable Supercar Acoustics (Web Audio)'}
            >
              {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenInquiry}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-black bg-[#00E5FF] hover:bg-[#38bdf8] transition-all rounded-lg whitespace-nowrap shadow-lg shadow-[#00E5FF]/20"
            >
              <span>Inquire Allocation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white border border-white/10 rounded-lg bg-white/5"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#08090B]/98 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8">
          <div className="flex flex-col gap-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#00E5FF]">
              Navigation
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold tracking-tight text-neutral-200 hover:text-[#00E5FF] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3 text-center text-xs font-bold uppercase tracking-widest text-black bg-[#00E5FF] rounded-lg"
            >
              Request Private Commission
            </button>
            <div className="text-center text-xs font-mono text-neutral-400">
              ENGINEERED BEYOND LIMITS · APEX MOTORS
            </div>
          </div>
        </div>
      )}
    </>
  );
};
