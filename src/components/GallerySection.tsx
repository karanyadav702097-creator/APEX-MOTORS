import React, { useState, useEffect, useCallback } from 'react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/supercars';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Exterior' | 'Interior' | 'Engineering' | 'Track'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = filter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  return (
    <section id="gallery" className="py-24 bg-[#08090B] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#00E5FF] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visual Archive · Atelier Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              AUTOMOTIVE GALLERY
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#17191D] border border-white/10 rounded-xl overflow-x-auto">
            {(['All', 'Exterior', 'Interior', 'Engineering', 'Track'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  filter === cat
                    ? 'bg-[#08090B] text-white border border-white/15 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#17191D] cursor-pointer aspect-[16/10] transform transition-all duration-300 hover:border-white/30 hover:-translate-y-1 shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top right expand badge */}
              <div className="absolute top-4 right-4 p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-[#00E5FF]" />
              </div>

              {/* Bottom metadata */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="text-[11px] font-mono text-[#00E5FF] uppercase tracking-wider mb-1">
                  {item.category}
                </div>
                <h4 className="text-base font-bold text-white uppercase tracking-tight mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-300 font-light line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-screen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 select-none">
          {/* Top Bar Controls */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
              <span className="text-[#00E5FF] font-bold">
                {filteredItems[lightboxIndex].category}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {lightboxIndex + 1} of {filteredItems.length}
              </span>
            </div>

            <button
              onClick={closeLightbox}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white transition-all z-20"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white transition-all z-20"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image Frame */}
          <div className="relative max-w-5xl max-h-[75vh] w-full flex flex-col items-center">
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
            />
            {/* Caption beneath */}
            <div className="mt-4 text-center max-w-xl">
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1">
                {filteredItems[lightboxIndex].caption}
              </p>
              <p className="text-[11px] font-mono text-neutral-400 mt-1">
                {filteredItems[lightboxIndex].details}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
