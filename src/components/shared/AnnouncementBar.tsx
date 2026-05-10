"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROMO_BANNERS } from "@/lib/constants";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % PROMO_BANNERS.length);
    }, 4000);
  };

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    start();
    return stop;
  }, []);

  const go = (dir: number) => {
    stop();
    setDirection(dir);
    setCurrent(
      (prev) => (prev + dir + PROMO_BANNERS.length) % PROMO_BANNERS.length,
    );
    start();
  };

  if (dismissed) return null;

  const banner = PROMO_BANNERS[current];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <div className="relative overflow-hidden wrapper text-neutral-50 bg-linear-to-r from-neutral-800 via-primary-hover to-neutral-800 ">
      {/* Subtle shimmer line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-y-0 w-1/3 opacity-10 bg-linear-to-r from-transparent via-primary to-transparent animate-shimmer" />
      </div>

      <div className="relative flex items-center justify-between px-4 py-2.5">
        {/* Prev */}
        <button
          onClick={() => go(-1)}
          className="text-white/50 hover:text-primary transition-colors duration-200 shrink-0 p-1"
          aria-label="Previous announcement"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
        </button>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex items-center justify-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.a
              key={current}
              href={banner.href}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2.5 group"
            >
              <span className="shrink-0">
                <HugeiconsIcon icon={banner.icon} size={14} />
              </span>
              <span className="text-white/90 text-xs tracking-[0.15em] uppercase font-light whitespace-nowrap">
                {banner.title}
              </span>
              <span className="text-white/40 text-xs hidden sm:inline">—</span>
              <span className="text-white/60 text-xs tracking-wide hidden sm:inline">
                {banner.subtitle}
              </span>
            </motion.a>
          </AnimatePresence>
        </div>

        {/* Right side: dots + close */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1">
            {PROMO_BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  stop();
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                  start();
                }}
                className={`transition-all duration-300 ${
                  i === current
                    ? "w-4 h-1 bg-primary"
                    : "w-1 h-1 bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="text-white/50 hover:text-primary transition-colors duration-200 p-1"
            aria-label="Next announcement"
          >
            <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="text-white/50 hover:text-white/70 transition-colors duration-200 p-1"
            aria-label="Dismiss"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
