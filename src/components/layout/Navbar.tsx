"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu01Icon,
  Search01Icon,
  ShoppingBag01Icon,
  FavouriteIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";

import Logo from "../ui/custom/logo";
import DesktopNav from "../shared/DesktopNav";
import MobileNav from "../shared/MobileNav";
import AnnouncementBar from "../shared/AnnouncementBar";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(2);
  const navRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // GSAP scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP hide-on-scroll-down, show-on-scroll-up
  useEffect(() => {
    if (!navRef.current) return;

    let lastY = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY > 80) {
            if (currentY > lastY) {
              // Scrolling down — hide
              gsap.to(navRef.current, {
                yPercent: -100,
                duration: 0.35,
                ease: "power2.inOut",
              });
            } else {
              // Scrolling up — show
              gsap.to(navRef.current, {
                yPercent: 0,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          } else {
            gsap.to(navRef.current, { yPercent: 0, duration: 0.3 });
          }
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus search on open
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-30 will-change-transform"
      >
        <AnnouncementBar />

        {/* Main nav */}
        <div>
          <div
            className={cn(
              "wrapper transition-all duration-300",
              scrolled
                ? "bg-background/75 shadow-[0_1px_0_rgba(201,169,110,0.2),0_4px_24px_-4px_rgba(26,18,8,0.08)] backdrop-blur-xl"
                : "bg-background/5 shadow-[0_1px_0_rgba(201,169,110,0)]",
            )}
          >
            <div className="flex items-center justify-between h-16 lg:h-17">
              {/* Left: Mobile hamburger + Logo */}
              <div className="flex items-center gap-3">
                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden w-9 h-9 flex items-center justify-center hover:bg-primary/12 transition-colors text-primary/70"
                  aria-label="Open menu"
                >
                  <HugeiconsIcon icon={Menu01Icon} size={20} />
                </button>

                <Logo />
              </div>

              {/* Center: Desktop nav */}
              <div className="hidden lg:flex items-center justify-center flex-1 px-8">
                <DesktopNav />
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-1">
                {/* Search */}
                <button
                  onClick={() => setSearchOpen((p) => !p)}
                  className="relative w-9 h-9 flex items-center justify-center hover:bg-primary/12 transition-colors text-primary/60 hover:text-primary"
                  aria-label="Search"
                >
                  <HugeiconsIcon icon={Search01Icon} size={18} />
                </button>

                {/* Wishlist — desktop */}
                <button className="hidden sm:flex w-9 h-9 items-center justify-center hover:bg-primary/12 transition-colors text-primary/60 hover:text-primary">
                  <HugeiconsIcon icon={FavouriteIcon} size={18} />
                </button>

                {/* Account — desktop */}
                <button className="hidden sm:flex w-9 h-9 items-center justify-center hover:bg-primary/12 transition-colors text-primary/60 hover:text-primary">
                  <HugeiconsIcon icon={UserIcon} size={18} />
                </button>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative flex items-center ring ring-transparent gap-2 ml-1 px-3 py-2 bg-primary/5 hover:ring-primary/25 transition-colors group"
                >
                  <HugeiconsIcon
                    icon={ShoppingBag01Icon}
                    size={16}
                    className="text-primary"
                  />
                  <span className="hidden sm:block text-xs text-primary/80 font-light tracking-wider">
                    Cart
                  </span>
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 flex items-center justify-center bg-primary/75 text-primary-foreground text-[10px] font-semibold px-1 leading-none">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Animated search bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: { duration: 0.2 },
                }}
                className="overflow-hidden border-t border-primary/15"
              >
                <div className="max-w-2xl mx-auto px-4 py-3">
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-primary/5 border border-primary/15 focus-within:border-primary/40 transition-colors">
                    <HugeiconsIcon
                      icon={Search01Icon}
                      size={15}
                      className="text-primary shrink-0"
                    />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search for serums, moisturizers, oils…"
                      className="flex-1 bg-transparent text-sm text-[#1a1208] placeholder:text-[#1a1208]/35 outline-none font-light tracking-wide"
                      onKeyDown={(e) =>
                        e.key === "Escape" && setSearchOpen(false)
                      }
                    />
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="text-xs text-[#1a1208]/35 hover:text-[#1a1208]/60 transition-colors font-light"
                    >
                      esc
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
