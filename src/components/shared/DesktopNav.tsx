"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { NAV_LINKS } from "@/lib/constants";
import MegaMenu from "./MegaMenu";
import Dropdown from "./Dropdown";

export default function DesktopNav() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = (i: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenIndex(i);
  };

  const close = () => {
    timeoutRef.current = setTimeout(() => setOpenIndex(null), 100);
  };

  const cancelClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {NAV_LINKS.map((link, i) => {
        const isOpen = openIndex === i;
        const hasChildren = !!link.children?.length;
        // Use MegaMenu for "Shop" (first item with children), Dropdown for others
        const useMega = hasChildren && link.label === "Shop";

        return (
          <div
            key={link.href}
            className="relative"
            onMouseEnter={() => hasChildren && open(i)}
            onMouseLeave={close}
          >
            {hasChildren ? (
              <button
                className={`relative flex items-center gap-1.5 px-3 py-2 text-sm font-light tracking-wide transition-all duration-200 group ${
                  isOpen ? "text-primary" : "text-primary/70 hover:text-primary"
                }`}
                onFocus={() => open(i)}
              >
                {link.badge && (
                  <span className="absolute -top-1.5 -right-1 bg-primary text-primary-foreground text-[8px] font-semibold px-1.5 py-0.5 tracking-wider leading-none">
                    {link.badge}
                  </span>
                )}
                {link.label}
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-primary"
                >
                  <HugeiconsIcon icon={ArrowDown01Icon} size={13} />
                </motion.span>

                {/* Active underline */}
                <span
                  className={`absolute bottom-0.5 left-3 right-3 h-px bg-linear-to-r from-primary/0 via-primary to-primary/0 transition-opacity duration-200 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            ) : (
              <Link
                href={link.href}
                className="relative flex items-center gap-1.5 px-3 py-2 text-sm font-light tracking-wide text-primary/70 hover:text-primary transition-colors duration-200 group"
              >
                {link.badge && (
                  <span className="absolute -top-1.25 -right-1 bg-primary text-primary-foreground text-[8px] font-semibold px-1.5 py-0.5 tracking-wider leading-none animate-pulse">
                    {link.badge}
                  </span>
                )}
                {link.label}
                <span className="absolute bottom-0.5 left-3 right-3 h-px bg-linear-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            )}

            {/* Dropdown / MegaMenu */}
            {hasChildren && (
              <div onMouseEnter={cancelClose} onMouseLeave={close}>
                <AnimatePresence>
                  {isOpen &&
                    (useMega ? (
                      <MegaMenu children={link.children!} isOpen={isOpen} />
                    ) : (
                      <Dropdown children={link.children!} isOpen={isOpen} />
                    ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
