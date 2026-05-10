"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { gsap } from "gsap";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  ShoppingBag01Icon,
} from "@hugeicons/core-free-icons";
import { NAV_LINKS, CATEGORIES, SOCIAL_LINKS } from "@/lib/constants";
import Logo from "../ui/custom/logo";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // GSAP entrance for nav items on open
  useEffect(() => {
    if (isOpen && linksRef.current) {
      const items = linksRef.current.querySelectorAll(".nav-item");
      gsap.fromTo(
        items,
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.15,
        },
      );
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggle = (i: number) =>
    setExpandedIndex((prev) => (prev === i ? null : i));

  const drawerVariants: Variants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      x: "-100%",
      transition: { duration: 0.32, ease: [0.4, 0, 1, 1] },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            ref={panelRef}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 left-0 z-50 w-full max-w-sm flex flex-col lg:hidden"
            style={{
              background: "rgba(253, 249, 243, 0.98)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-primary/15">
              <Logo size="sm" animated={false} />
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center bg-primary/6 hover:bg-primary/15 transition-colors text-primary/60 hover:text-primary"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={16} />
              </button>
            </div>

            {/* Scrollable area */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Main nav links */}
              <div ref={linksRef} className="px-4 py-4 space-y-0.5">
                {NAV_LINKS.map((link, i) => (
                  <div key={link.href} className="nav-item opacity-0">
                    {link.children?.length ? (
                      <>
                        <button
                          onClick={() => toggle(i)}
                          className="w-full flex items-center justify-between px-3 py-3 hover:bg-primary/8 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-primary">
                              {link.icon && (
                                <HugeiconsIcon icon={link.icon} size={17} />
                              )}
                            </span>
                            <span className="text-primary text-[15px] font-light tracking-wide">
                              {link.label}
                            </span>
                            {link.badge && (
                              <span className="bg-primary text-primary text-[9px] font-semibold px-1.5 py-0.5 tracking-wider">
                                {link.badge}
                              </span>
                            )}
                          </div>
                          <motion.span
                            animate={{ rotate: expandedIndex === i ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-primary/30"
                          >
                            <HugeiconsIcon icon={ArrowDown01Icon} size={15} />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {expandedIndex === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                                transition: {
                                  duration: 0.25,
                                  ease: [0.22, 1, 0.36, 1],
                                },
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                                transition: { duration: 0.18 },
                              }}
                              className="overflow-hidden"
                            >
                              <div className="pl-10 pr-3 pb-2 space-y-0.5">
                                {link.children!.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={onClose}
                                    className="flex items-center justify-between px-3 py-2.5 hover:bg-primary/8 group transition-colors"
                                  >
                                    <span className="text-sm text-primary/65 group-hover:text-primary font-light">
                                      {child.label}
                                    </span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                                      <HugeiconsIcon
                                        icon={ArrowRight01Icon}
                                        size={12}
                                      />
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-3 hover:bg-primary/8 transition-colors group"
                      >
                        <span className="text-primary">
                          {link.icon && (
                            <HugeiconsIcon icon={link.icon} size={17} />
                          )}
                        </span>
                        <span className="text-primary text-sm font-light tracking-wide">
                          {link.label}
                        </span>
                        {link.badge && (
                          <span className="bg-primary text-primary-foreground text-[8px] font-semibold px-1.5 py-0.5 tracking-wider">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="mx-5 my-2 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

              {/* Categories quick-links */}
              <div className="px-5 py-4">
                <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-medium">
                  Categories
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.slice(0, 6).map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onClick={onClose}
                      className={`flex items-center gap-2 px-3 py-2.5 bg-linear-to-br ${cat.color} hover:opacity-80 transition-opacity`}
                    >
                      <span className="text-forground">
                        <HugeiconsIcon icon={cat.icon} size={15} />
                      </span>
                      <span className="text-xs text-foreground/80 font-medium">
                        {cat.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom: CTA + socials */}
            <div className="px-5 py-4 border-t border-primary/15 space-y-3">
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-2 bg-primary text-primary-foreground hover:bg-primary-hover transition-colors group"
              >
                <HugeiconsIcon
                  icon={ShoppingBag01Icon}
                  size={15}
                  className="text-primary"
                />
                <span className="text-sm font-light tracking-widest">
                  Sign In
                </span>
              </Link>

              <div className="flex items-center justify-center gap-5 pt-1">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary/35 hover:text-primary transition-colors text-base"
                    aria-label={s.label}
                  >
                    <s.icon />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
