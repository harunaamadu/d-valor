"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/animations";
import {
  Reveal,
  ImageReveal,
  StaggerReveal,
} from "@/components/animations/reveal";
import { SectionTitle } from "@/components/ui/custom/section-title";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { BlogPost, FAKE_POSTS } from "@/data/fake-blog-post";

// ─── Fake data ────────────────────────────────────────────────────────────────
// Replace with Sanity GROQ fetch when ready:
//   *[_type == "post"] | order(publishedAt desc)[0...4]{
//     "id": _id, "slug": slug.current, title, excerpt,
//     "category": category->title, readTime,
//     publishedAt, "imageUrl": mainImage.asset->url, featured
//   }

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function BlogCardSkeleton({ featured }: { featured?: boolean }) {
  return (
    <div className={cn("flex flex-col gap-3", featured && "md:col-span-2")}>
      <Skeleton
        className={cn(
          "w-full",
          featured ? "aspect-video md:aspect-16/10" : "aspect-video",
        )}
      />
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex items-center gap-3 mt-1">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

// ─── Featured (hero) Card ─────────────────────────────────────────────────────

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Reveal
      variant="slide"
      direction="left"
      duration={0.75}
      delay={0.1}
      threshold={0.08}
      className="md:col-span-2 group"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="flex flex-col gap-0 hover:ring ring-ring p-6"
      >
        {/* Image */}
        <ImageReveal
          direction="up"
          duration={0.9}
          delay={0.15}
          threshold={0.08}
          className="relative w-full aspect-video md:aspect-video overflow-hidden"
        >
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-primary/10 to-transparent" />
          <span className="absolute top-4 left-4 z-10 text-[10px] tracking-[0.2em] uppercase  bg-surface/90 text-primary px-3 py-1.5 backdrop-blur-sm">
            {post.category}
          </span>
          <span className="absolute top-4 right-4 z-10 text-[10px] tracking-[0.2em] uppercase  bg-accent text-surface px-3 py-1.5">
            Featured
          </span>
        </ImageReveal>

        {/* Meta */}
        <div className="flex flex-col gap-3 pt-5 border-b border-primary/10 pb-5">
          <div className="flex items-center gap-3 text-[10px] tracking-[0.18em] uppercase  text-primary/40">
            <span>{post.publishedAt}</span>
            <span className="w-1 h-1 bg-accent" />
            <span>{post.readTime}</span>
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-primary leading-tight group-hover:text-primary-hover transition-colors duration-300 max-w-xl">
            {post.title}
          </h3>

          <p className="text-sm  text-primary/55 leading-relaxed max-w-lg line-clamp-2">
            {post.excerpt}
          </p>

          {/* Read more */}
          <div className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase  text-accent mt-1">
            <span>Read Article</span>
            <span className="w-4 h-px bg-accent group-hover:w-8 transition-all duration-400" />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

// ─── Secondary Card ───────────────────────────────────────────────────────────

function SecondaryCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-0 border-b border-primary/10 p-4 pb-5 last:border-b-0 last:pb-0 hover:ring ring-ring"
    >
      {/* Image */}
      <ImageReveal
        direction="up"
        duration={0.75}
        delay={0.1 + index * 0.08}
        threshold={0.08}
        className="relative w-full aspect-video overflow-hidden mb-4"
      >
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary/40 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 z-10 text-[10px] tracking-[0.2em] uppercase  bg-surface/85 text-primary px-2.5 py-1 backdrop-blur-sm">
          {post.category}
        </span>
      </ImageReveal>

      {/* Meta */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5 text-[10px] tracking-[0.18em] uppercase  text-primary/40">
          <span>{post.publishedAt}</span>
          <span className="w-1 h-1 bg-accent/60" />
          <span>{post.readTime}</span>
        </div>

        <h3 className="font-heading text-lg sm:text-xl text-primary leading-snug group-hover:text-primary-hover transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-xs  text-primary/50 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        {/* Arrow CTA */}
        <div className="flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase  text-accent mt-1">
          <span>Read More</span>
          <span className="w-3 h-px bg-accent group-hover:w-6 transition-all duration-400" />
        </div>
      </div>
    </Link>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

function BlogGrid({ posts }: { posts?: BlogPost[] }) {
  if (!posts) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
        <BlogCardSkeleton featured />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </div>
    );
  }

  const featured = posts.find((p) => p.featured);
  const secondary = posts.filter((p) => !p.featured);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-0">
      {/* Featured card — spans 2 columns */}
      {featured && <FeaturedCard post={featured} />}

      {/* Secondary cards — stacked in the 3rd column */}
      <StaggerReveal
        className="flex flex-col gap-6 md:gap-8"
        stagger={0.1}
        delay={0.2}
        variant="slide"
        direction="up"
        threshold={0.05}
      >
        {secondary.map((post, i) => (
          <SecondaryCard key={post.id} post={post} index={i} />
        ))}
      </StaggerReveal>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface BlogSectionProps {
  posts?: BlogPost[];
}

const BlogSection = ({ posts = FAKE_POSTS }: BlogSectionProps) => {
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
          {/* Section header */}
          <SectionTitle
            eyebrow="Blog"
            heading="Beauty Tips & More"
            hint="View all"
            hintHref="/blog"
          />

          {/* Blog grid */}
          <BlogGrid posts={posts} />
        </div>
      </motion.section>
    </Reveal>
  );
};

export default BlogSection;
