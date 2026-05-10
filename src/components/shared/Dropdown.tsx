"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import type { NavChildLink } from "@/lib/constants";

interface DropdownProps {
  children: NavChildLink[];
  isOpen: boolean;
}

const menuVariants: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.04,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.97,
    transition: { duration: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
};

export default function Dropdown({ children, isOpen }: DropdownProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ transformOrigin: "top center" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-px min-w-65"
    >
      <div className="h-px w-full bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      <div
        className="py-2 overflow-hidden bg-background"
        style={{
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 40px -8px rgba(26,18,8,0.15)",
        }}
      >
        {children.map((child) => (
          <motion.div key={child.href} variants={itemVariants}>
            <Link
              href={child.href}
              className="group flex items-center justify-between px-4 py-2.5 hover:bg-primary/8 transition-colors duration-150"
            >
              <span className="text-sm group-hover:text-primary font-light tracking-wide transition-colors">
                {child.label}
              </span>
              <span className="opacity-0 group-hover:opacity-100 text-primary transition-all duration-150 -translate-x-1 group-hover:translate-x-0">
                <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
