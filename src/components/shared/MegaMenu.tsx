"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { SparklesIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import type { NavChildLink } from "@/lib/constants";
import { CATEGORIES } from "@/lib/constants";

interface MegaMenuProps {
  children: NavChildLink[];
  isOpen: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: -8, scaleY: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scaleY: 0.97,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.22 } },
};

export default function MegaMenu({ children, isOpen }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ transformOrigin: "top center" }}
      className="absolute top-full left-1/2 -translate-x-50 w-190 max-w-[95vw] mt-px"
    >
      {/* Top border accent */}
      <div className="h-0.5 w-full bg-linear-to-r from-transparent via-primary/60 to-transparent" />

      <div
        className="shadow-2xl overflow-hidden bg-background"
        style={{
          backdropFilter: "blur(24px)",
          boxShadow:
            "0 32px 64px -12px rgba(26,18,8,0.18), 0 8px 24px -4px rgba(26,18,8,0.08)",
        }}
      >
        <div className="grid grid-cols-[1fr_1.6fr] gap-0">
          {/* Left: Nav links */}
          <div className="p-6 border-r border-primary/10">
            <p className="text-xs tracking-widest uppercase text-primary mb-4 font-medium">
              Browse
            </p>
            <ul className="space-y-1">
              {children.map((child) => (
                <motion.li key={child.href} variants={itemVariants}>
                  <Link
                    href={child.href}
                    className="group flex items-center justify-between px-3 py-2.5 hover:bg-primary/8 transition-all duration-200"
                  >
                    <span className="text-sm text-primary/80 group-hover:text-primary transition-colors font-light tracking-wide">
                      {child.label}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-0 group-hover:translate-x-1 text-primary">
                      <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right: Featured categories */}
          <div className="p-6 h-full">
            <p className="text-xs tracking-widest uppercase text-primary mb-4 font-medium">
              Categories
            </p>
            <div className="sticky top-0 grid grid-cols-2 gap-2">
              {CATEGORIES.slice(0, 4).map((cat, i) => (
                <motion.div key={cat.href} variants={itemVariants} custom={i}>
                  <Link
                    href={cat.href}
                    className={`group flex items-start gap-3 p-3 bg-linear-to-br ${cat.color} hover:shadow-md transition-all duration-250`}
                  >
                    <span className="mt-0.5 text-neutral-700 dark:text-neutral-200">
                      <HugeiconsIcon icon={cat.icon} size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground/80 tracking-wide leading-tight">
                        {cat.label}
                      </p>
                      <p className="text-[10px] text-foreground/60 mt-0.5 leading-snug font-light">
                        {cat.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer CTA */}
            <motion.div variants={itemVariants} className="mt-20">
              <Link
                href="/collections"
                className="flex items-center justify-between px-4 py-3 text-primary-foreground hover:text-primary bg-primary hover:bg-primary-hover/5 transition-colors duration-250 group"
              >
                <span className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={SparklesIcon}
                    size={14}
                  />
                  <span className="text-xs tracking-wider font-light">
                    View all collections
                  </span>
                </span>
                <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
                  <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
