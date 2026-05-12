"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, LineReveal, TextReveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

import {
  Mail02Icon,
  Call02Icon,
  Location01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BRAND_DIRECTORY,
  FOOTER_LINKS,
  PAYMENT_METHODS,
  SOCIALS,
} from "@/data/footer.data";

// ─── Brand Directory ──────────────────────────────────────────────────────────

function BrandDirectory() {
  return (
    <div className="w-full border-b border-primary/10 py-10 md:py-12">
      <div className="wrapper">
        <Reveal variant="slide" direction="left" delay={0.05} duration={0.55}>
          <div className="flex items-center gap-3 mb-7">
            <LineReveal
              className="w-5 h-px bg-accent"
              direction="left"
              delay={0.05}
            />
            <span className="text-xs tracking-[0.28em]  uppercase text-primary font-semibold">
              Brand Directory
            </span>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4">
          {BRAND_DIRECTORY.map((group, gi) => (
            <Reveal key={group.label} variant="fade" delay={0.1 + gi * 0.07}>
              <div className="flex flex-wrap items-baseline gap-x-0 gap-y-2">
                {/* Category label */}
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-primary mr-3 shrink-0">
                  {group.label}:
                </span>

                {/* Items with pipe separators */}
                {group.items.map((item, ii) => (
                  <span key={item.href} className="inline-flex items-center">
                    <Link
                      href={item.href}
                      className="text-xs text-primary/60 hover:text-primary transition-colors duration-250 whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                    {ii < group.items.length - 1 && (
                      <span className="mx-2 text-primary/20 text-xs select-none">
                        |
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main footer body ─────────────────────────────────────────────────────────

function FooterBody() {
  return (
    <div className="w-full py-14 md:py-16 border-b border-primary/10">
      <div className="wrapper">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* ── Brand column — spans 2 cols on lg ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Reveal variant="slide" direction="up" delay={0.05}>
              {/* Logo */}
              <Link href="/" className="inline-block">
                <span className="font-heading text-3xl text-primary tracking-tight">
                  D&apos;valor
                </span>
              </Link>
            </Reveal>

            <Reveal variant="fade" delay={0.15}>
              <p className="text-xs text-primary/60 leading-relaxed max-w-xs">
                Luxury beauty rooted in African botanicals. Every product is a
                ritual — crafted to celebrate your skin, your story, and your
                glow.
              </p>
            </Reveal>

            {/* Socials */}
            <Reveal variant="fade" delay={0.2}>
              <div className="flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group flex items-center justify-center w-8 h-8 border border-primary/60 hover:border-accent text-primary/60 hover:text-primary transition-all duration-300"
                  >
                    <s.icon size={13} />
                  </Link>
                ))}
              </div>
            </Reveal>

            {/* Contact */}
            <Reveal variant="fade" delay={0.25}>
              <div className="flex flex-col gap-3">
                {[
                  {
                    icon: Location01Icon,
                    text: "Accra, Ghana",
                  },
                  {
                    icon: Call02Icon,
                    text: "+233 20 000 0000",
                    href: "tel:+233200000000",
                  },
                  {
                    icon: Mail02Icon,
                    text: "hello@dvalor.com",
                    href: "mailto:hello@dvalor.com",
                  },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-2.5">
                    <HugeiconsIcon
                      icon={item.icon}
                      size={14}
                      color="currentColor"
                      strokeWidth={1.5}
                      className="text-accent mt-0.5 shrink-0"
                    />
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-xs text-primary/60 hover:text-primary transition-colors duration-250"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-xs text-primary/60">
                        {item.text}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Nav columns ── */}
          {FOOTER_LINKS.map((col, ci) => (
            <div key={col.heading} className="flex flex-col gap-5">
              <Reveal variant="slide" direction="up" delay={0.1 + ci * 0.06}>
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs tracking-[0.22em] uppercase font-semibold text-primary">
                    {col.heading}
                  </h4>
                  <LineReveal
                    className="w-6 h-px text-primary"
                    direction="left"
                    delay={0.15 + ci * 0.06}
                    duration={0.5}
                  />
                </div>
              </Reveal>

              <ul className="flex flex-col gap-2.5">
                {col.links.map((link, li) => (
                  <Reveal
                    key={link.href}
                    variant="fade"
                    delay={0.18 + ci * 0.06 + li * 0.04}
                  >
                    <li>
                      <Link
                        href={link.href}
                        className="text-xs text-primary/55 hover:text-primary hover:translate-x-0.5 transition-all duration-250 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Bottom bar ───────────────────────────────────────────────────────────────

function FooterBottom() {
  return (
    <div className="w-full py-6">
      <div className="wrapper flex flex-col sm:flex-row items-center justify-between gap-5">
        {/* Copyright */}
        <Reveal variant="fade" delay={0.1}>
          <p className="text-[11px] text-primary/90 tracking-wide text-center sm:text-left">
            ©{new Date().getFullYear()} {" "} D&apos;valor. All rights reserved. | <a href="http://www.facebook.com/harunaamadu95" className="underline underline-offset-2">Haruna Dev</a>
          </p>
        </Reveal>

        {/* Payment badges */}
        <Reveal variant="fade" delay={0.2}>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {PAYMENT_METHODS.map((method) => (
              <div
                key={method.label}
                title={method.label}
                className="flex items-center justify-center"
                style={{ minWidth: "3rem" }}
              >
                {method.image ? (
                  <Image src={method.image} alt={`${method.abbr}`} width={60} height={40} className="object-cover" />
                ):(

                <span
                  className="flex items-center text-[9px] font-semibold tracking-[0.08em] uppercase px-2.5 h-7 border border-primary/10 bg-primary/5"
                  style={{ color: method.bg }}
                >
                  {method.abbr}
                </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Back to top */}
        <Reveal variant="fade" delay={0.15}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-primary/60 hover:text-primary transition-colors duration-300"
          >
            <span>Back to top</span>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block text-accent"
            >
              ↑
            </motion.span>
          </button>
        </Reveal>
      </div>
    </div>
  );
}

// ─── Root Footer ──────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-primary/10">
      <BrandDirectory />
      <FooterBody />
      <FooterBottom />
    </footer>
  );
}
