"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  ZoomInAreaIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GalleryImage {
  src: string;
  alt: string;
}

interface ProductImageGalleryProps {
  images: GalleryImage[];
  productName: string;
  tag?: string;
  className?: string;
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-100 bg-primary/90 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-xs text-primary-foreground/50 tracking-[0.2em] ">
        {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/50 transition-colors duration-200"
        aria-label="Close lightbox"
      >
        <HugeiconsIcon icon={Cancel01Icon} size={16} color="currentColor" strokeWidth={1.5} />
      </button>

      {/* Image */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl max-h-[80vh] aspect-3/4 mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index].src}
          alt={images[index].alt}
          fill
          className="object-contain"
          sizes="80vw"
          priority
        />
      </motion.div>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/50 transition-colors duration-200"
            aria-label="Previous image"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} color="currentColor" strokeWidth={1.5} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/50 transition-colors duration-200"
            aria-label="Next image"
          >
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} color="currentColor" strokeWidth={1.5} />
          </button>
        </>
      )}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductImageGallery({
  images,
  productName,
  tag,
  className,
}: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [zoomPos, setZoomPos] = React.useState({ x: 50, y: 50 });
  const imgRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current || !isZoomed) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  if (!images.length) return null;

  return (
    <>
      <div className={cn("flex gap-4", className)}>
        {/* ── Thumbnails (vertical strip) ── */}
        {images.length > 1 && (
          <div className="hidden md:flex flex-col gap-2 w-16 shrink-0">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "relative w-16 aspect-3/4 overflow-hidden border transition-all duration-300",
                  i === activeIndex
                    ? "border-primary/60"
                    : "border-primary/10 hover:border-primary/30 opacity-60 hover:opacity-100"
                )}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}

        {/* ── Main image ── */}
        <div className="flex-1 flex flex-col gap-3">
          <div
            ref={imgRef}
            className={cn(
              "relative w-full aspect-3/4 overflow-hidden bg-primary/4",
              isZoomed ? "cursor-crosshair" : "cursor-zoom-in"
            )}
            onClick={() => {
              if (!isZoomed) setLightboxOpen(true);
            }}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[activeIndex].src}
                  alt={images[activeIndex].alt}
                  fill
                  className="object-cover transition-transform duration-200"
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                          transform: "scale(1.8)",
                        }
                      : {}
                  }
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority={activeIndex === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Tag */}
            {tag && (
              <span className="absolute top-4 left-4 z-10 text-[9px] tracking-[0.2em] uppercase  bg-primary text-primary-foreground px-2.5 py-1">
                {tag}
              </span>
            )}

            {/* Zoom hint */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 text-[9px] tracking-[0.18em] uppercase  text-primary-foreground/70 bg-primary/60 backdrop-blur-sm px-2.5 py-1.5 opacity-0 group-hover:opacity-100 pointer-events-none">
              <HugeiconsIcon icon={ZoomInAreaIcon} size={11} color="currentColor" strokeWidth={1.5} />
              Zoom
            </div>

            {/* Corner bracket decorations */}
            <span className="absolute top-2 left-2 w-5 h-5 border-t border-l border-primary/20 pointer-events-none" />
            <span className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-primary/20 pointer-events-none" />

            {/* Navigation arrows (mobile) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-primary/15"
                  aria-label="Previous image"
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={14} color="currentColor" strokeWidth={1.5} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-primary/15"
                  aria-label="Next image"
                >
                  <HugeiconsIcon icon={ArrowRight01Icon} size={14} color="currentColor" strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>

          {/* ── Dot navigation (mobile) ── */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2 md:hidden">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "transition-all duration-300",
                    i === activeIndex
                      ? "w-5 h-px bg-primary"
                      : "w-1.5 h-1.5 rounded-full bg-primary/25 hover:bg-primary/50"
                  )}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={images}
            index={activeIndex}
            onClose={() => setLightboxOpen(false)}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  );
}