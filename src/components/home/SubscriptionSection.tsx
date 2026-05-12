"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sectionVariants } from "@/lib/animations";
import { Reveal, TextReveal, LineReveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { Button } from "../ui/button";

// ─── Zod schema ───────────────────────────────────────────────────────────────

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

// ─── Perks list ───────────────────────────────────────────────────────────────

const PERKS = [
  { label: "15% off your first order" },
  { label: "Early access to new arrivals" },
  { label: "Exclusive rituals & beauty tips" },
];

// ─── Decorative background shapes ─────────────────────────────────────────────

function DecorativeShapes() {
  return (
    <>
      {/* Large blurred orb — top right */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent/10 blur-[100px] pointer-events-none" />
      {/* Small orb — bottom left */}
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-accent/8 blur-[80px] pointer-events-none" />
      {/* Thin border frame */}
      <span className="absolute top-6 left-6 w-10 h-10 border-t border-l border-accent/25" />
      <span className="absolute top-6 right-6 w-10 h-10 border-t border-r border-accent/25" />
      <span className="absolute bottom-6 left-6 w-10 h-10 border-b border-l border-accent/25" />
      <span className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-accent/25" />
      {/* Rotating decorative ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-72 h-72 border border-accent/10 pointer-events-none"
        style={{ borderRadius: "38% 62% 55% 45% / 48% 52% 60% 40%" }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        className="absolute -left-28 top-1/2 -translate-y-1/2 w-56 h-56 border border-accent/8 pointer-events-none"
        style={{ borderRadius: "60% 40% 45% 55% / 52% 48% 62% 38%" }}
      />
    </>
  );
}

// ─── Email form ───────────────────────────────────────────────────────────────

type FormState = "idle" | "loading" | "success" | "error";

function SubscribeForm() {
  const [email, setEmail]   = useState("");
  const [error, setError]   = useState<string | null>(null);
  const [state, setState]   = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setState("loading");

    // Simulate API call — replace with your actual endpoint
    await new Promise((res) => setTimeout(res, 1400));

    // TODO: POST to /api/newsletter or your email provider (Mailchimp, Klaviyo, etc.)
    setState("success");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Input */}
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(null); }}
            placeholder="Your email address"
            disabled={state === "loading" || state === "success"}
            className={cn(
              "w-full bg-transparent border px-5 min-h-12",
              "text-sm  text-primary placeholder:text-primary/35",
              "outline-none transition-colors duration-300",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error
                ? "border-red-400/60 focus:border-red-400"
                : "border-primary/20 focus:border-accent hover:border-primary/40",
            )}
          />
          {/* Active indicator line */}
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-accent"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: email.length > 0 ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          variant={`outline`}
          disabled={state === "loading" || state === "success"}
          className={cn(
            "group relative overflow-hidden shrink-0",
            "px-7 min-h-12 text-xs tracking-[0.2em] text-neutral-100 uppercase ",
            "transition-all duration-400 disabled:opacity-70 disabled:cursor-not-allowed",
            state === "success"
              ? "bg-accent/20 text-accent border border-accent/40"
              : "bg-primary hover:bg-primary/5 hover:text-primary hover:border-primary/20",
          )}
        >
          {/* Hover shimmer */}
          {state !== "success" && (
            <span className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          )}

          <AnimatePresence mode="wait">
            {state === "loading" && (
              <motion.span
                key="loading"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="relative z-10 flex items-center gap-2"
              >
                <span className="w-3.5 h-3.5 border border-current border-t-transparent animate-spin" />
                Joining…
              </motion.span>
            )}
            {state === "success" && (
              <motion.span
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="relative z-10"
              >
                ✓ Subscribed
              </motion.span>
            )}
            {(state === "idle" || state === "error") && (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="relative z-10"
              >
                Subscribe
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 text-xs  text-red-400 tracking-wide"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Success message */}
      <AnimatePresence>
        {state === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-xs  text-accent tracking-[0.12em]"
          >
            Welcome to D&apos;valor. Your 15% discount is on its way.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Privacy note */}
      {state !== "success" && (
        <p className="mt-3 text-[10px]  text-primary/30 tracking-wide">
          No spam, ever. Unsubscribe at any time. Read our{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-primary/60 transition-colors">
            privacy policy
          </a>.
        </p>
      )}
    </form>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SubscriptionSection() {
  return (
    <Reveal variant="slide" direction="up" delay={0.1} threshold={0.05}>
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full py-12 md:py-16 overflow-hidden"
      >
        <div className="wrapper">
          <div className="relative bg-primary/5 px-6 sm:px-12 md:px-20 py-16 md:py-24 overflow-hidden">

            <DecorativeShapes />

            {/* ── Inner content — two columns on lg ── */}
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-20">

              {/* ── Left: copy ── */}
              <div className="flex flex-col gap-5 lg:max-w-sm xl:max-w-md shrink-0">

                {/* Eyebrow */}
                <Reveal variant="slide" direction="left" delay={0.05} duration={0.55}>
                  <div className="flex items-center gap-3">
                    <LineReveal className="w-6 h-px bg-accent" direction="left" delay={0.05} />
                    <span className="text-xs tracking-[0.25em] uppercase  text-primary/50">
                      Join the Ritual
                    </span>
                  </div>
                </Reveal>

                {/* Heading */}
                <TextReveal
                  as="h2"
                  text="Beauty secrets, delivered."
                  className="font-heading text-4xl md:text-5xl text-primary leading-[1.05]"
                  stagger={0.06}
                  delay={0.15}
                />

                {/* Subtext */}
                <Reveal variant="fade" delay={0.35}>
                  <p className="text-sm  text-primary/55 leading-relaxed">
                    Subscribe for exclusive rituals, insider drops, and a welcome gift crafted just for you.
                  </p>
                </Reveal>

                {/* Perks */}
                <Reveal variant="fade" delay={0.45}>
                  <ul className="flex flex-col gap-2.5 mt-1">
                    {PERKS.map((perk, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.45, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-3 text-xs  text-primary/65 tracking-wide"
                      >
                        <span className="w-1 h-1 bg-primary/50 rotate-45 shrink-0" />
                        {perk.label}
                      </motion.li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              {/* ── Divider — vertical on lg ── */}
              <div className="hidden lg:block w-px self-stretch bg-primary/10" />
              <div className="block lg:hidden w-full h-px bg-primary/10" />

              {/* ── Right: form ── */}
              <div className="flex flex-col gap-6 w-full">

                <Reveal variant="fade" delay={0.25}>
                  <p className="text-sm  text-primary/50 leading-relaxed lg:hidden">
                    Subscribe for exclusive rituals, insider drops, and a welcome gift crafted just for you.
                  </p>
                </Reveal>

                <Reveal variant="slide" direction="up" delay={0.3} duration={0.6}>
                  <SubscribeForm />
                </Reveal>

                {/* Social proof */}
                <Reveal variant="fade" delay={0.5}>
                  <div className="flex items-center gap-3">
                    {/* Avatars stack */}
                    <div className="flex -space-x-2">
                      {[
                        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&auto=format&fit=crop&facepad=2",
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&facepad=2",
                        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&facepad=2",
                      ].map((src, i) => (
                        <div
                          key={i}
                          className="relative w-7 h-7 border-2 border-[#f5ede3] overflow-hidden"
                          style={{ borderRadius: "50%" }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px]  text-primary/45 tracking-wide">
                      Join <span className="text-primary/70 font-medium">12,400+</span> beauty lovers
                    </p>
                  </div>
                </Reveal>

              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </Reveal>
  );
}