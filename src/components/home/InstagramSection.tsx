"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/animations";
import { Reveal, ImageReveal, TextReveal, LineReveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";
import { FaInstagram } from "react-icons/fa";

// ─── Types ────────────────────────────────────────────────────────────────────

interface InstagramPost {
  id: string;
  imageUrl: string;
  alt: string;
  likes: number;
  href: string;
  /** Span 2 columns/rows for the featured tile */
  featured?: boolean;
}

// ─── Fake data ────────────────────────────────────────────────────────────────

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig_01",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop",
    alt: "Luxury skincare flatlay",
    likes: 1240,
    href: "https://instagram.com/dvalor",
    featured: true,
  },
  {
    id: "ig_02",
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop",
    alt: "Serum bottle close-up",
    likes: 847,
    href: "https://instagram.com/dvalor",
  },
  {
    id: "ig_03",
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4e6232bf7987?w=600&auto=format&fit=crop",
    alt: "Makeup brushes on marble",
    likes: 963,
    href: "https://instagram.com/dvalor",
  },
  {
    id: "ig_04",
    imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&auto=format&fit=crop",
    alt: "Model glowing skin",
    likes: 2103,
    href: "https://instagram.com/dvalor",
  },
  {
    id: "ig_05",
    imageUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=600&auto=format&fit=crop",
    alt: "Rose facial oil drops",
    likes: 712,
    href: "https://instagram.com/dvalor",
  },
  {
    id: "ig_06",
    imageUrl: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&auto=format&fit=crop",
    alt: "Minimal beauty routine",
    likes: 1580,
    href: "https://instagram.com/dvalor",
  },
];

// ─── Single tile ──────────────────────────────────────────────────────────────

function InstagramTile({
  post,
  index,
}: {
  post: InstagramPost;
  index: number;
}) {
  return (
    <ImageReveal
      direction="up"
      duration={0.8}
      delay={index * 0.07}
      threshold={0.08}
      className={cn(
        "relative group cursor-pointer",
        post.featured
          ? "col-span-2 row-span-2 aspect-square"
          : "col-span-1 row-span-1 aspect-square",
        "w-full h-full",
      )}
    >
      <Link href={post.href} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
        {/* Image */}
        <Image
          src={post.imageUrl}
          alt={post.alt}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          sizes={
            post.featured
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 50vw, 25vw"
          }
        />

        {/* Base dark veil */}
        <div className="absolute inset-0 bg-primary/20 transition-opacity duration-500 group-hover:opacity-0" />

        {/* Hover overlay */}
        <div className="absolute inset-0 text-neutral-100 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-3">
          {/* Instagram icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-surface"
          >
            <FaInstagram size={post.featured ? 36 : 24} />
          </motion.div>

          {/* Likes */}
          <span className="text-surface font-mono text-xs tracking-[0.18em] uppercase">
            ♥ {post.likes.toLocaleString()}
          </span>

          {/* View post */}
          <span className="text-surface/70  text-[10px] tracking-[0.2em] uppercase">
            View Post
          </span>
        </div>

        {/* Corner bracket — always visible */}
        <span className="absolute top-3 left-3 z-10 w-4 h-4 border-t border-l border-surface/40 group-hover:border-accent transition-colors duration-500" />
        <span className="absolute bottom-3 right-3 z-10 w-4 h-4 border-b border-r border-surface/40 group-hover:border-accent transition-colors duration-500" />
      </Link>
    </ImageReveal>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function InstagramSection() {
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

          {/* ── Header ── */}
          <div className="flex flex-col items-center text-center gap-4 mb-10 md:mb-14">

            <Reveal variant="scale" delay={0.05} duration={0.5}>
              <div className="flex items-center justify-center w-12 h-12 border border-accent/40 text-accent">
                <FaInstagram size={20} />
              </div>
            </Reveal>

            <div className="flex items-center gap-3">
              <LineReveal className="w-8 h-px bg-accent" direction="right" delay={0.1} />
              <Reveal variant="fade" delay={0.15}>
                <span className="text-xs tracking-[0.25em] uppercase  text-primary/50">
                  Follow Along
                </span>
              </Reveal>
              <LineReveal className="w-8 h-px bg-accent" direction="left" delay={0.1} />
            </div>

            <TextReveal
              as="h2"
              text="@dvalor.beauty"
              className="font-heading text-4xl md:text-5xl text-primary leading-none"
              stagger={0.06}
              delay={0.2}
            />

            <Reveal variant="fade" delay={0.35} className="max-w-sm">
              <p className="text-sm  text-primary/50 leading-relaxed">
                Our world of beauty, rituals, and radiance — one post at a time.
              </p>
            </Reveal>
          </div>

          {/* ── Grid ── */}
          {/* Layout: featured tile (2×2) + 4 small tiles on the right */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-auto">
            {INSTAGRAM_POSTS.map((post, i) => (
              <InstagramTile key={post.id} post={post} index={i} />
            ))}
          </div>

          {/* ── CTA ── */}
          <Reveal variant="fade" delay={0.4} className="flex justify-center mt-10">
            <Link
              href="https://instagram.com/dvalor"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-primary/20 hover:border-primary-hover px-8 py-4 text-xs tracking-[0.2em] uppercase  text-primary hover:text-primary-hover transition-all duration-400 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <FaInstagram size={14} className="relative z-10" />
              <span className="relative z-10">Follow on Instagram</span>
            </Link>
          </Reveal>

        </div>
      </motion.section>
    </Reveal>
  );
}
