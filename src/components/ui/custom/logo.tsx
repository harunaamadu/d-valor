"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const sizes = {
  sm: { text: "text-lg", sub: "text-[9px]", dot: "w-1.5 h-1.5" },
  md: { text: "text-2xl", sub: "text-[10px]", dot: "w-2 h-2" },
  lg: { text: "text-3xl", sub: "text-xs", dot: "w-2.5 h-2.5" },
};

export default function Logo({
  variant = "dark",
  size = "md",
  animated = true,
}: LogoProps) {
  const s = sizes[size];
  const isLight = variant === "light";

  const Wrapper = animated ? motion.div : "div";
  const wrapperProps = animated
    ? {
        initial: { opacity: 0, x: -12 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  return (
    <Link href="/" className="shrink-0">
      <Wrapper
        {...(wrapperProps as any)}
        className="flex items-center gap-2 select-none"
      >
        {/* Wordmark */}
        <Image src={`/images/logo.png`} width={88} height={44} alt="logo image" className="object-cover" />
      </Wrapper>
    </Link>
  );
}