"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#fafaf8] flex items-center justify-center px-6">
      <div className="max-w-lg w-full">

        {/* Large decorative number */}
        <div className="relative mb-8 select-none">
          <span
            className="text-[12rem] font-light leading-none text-stone-100"
            style={{ fontFamily: "Georgia, serif" }}
          >
            !
          </span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-12 h-px bg-stone-900 mr-4 shrink-0" />
            <p className="text-sm tracking-[0.5em] uppercase text-stone-400">
              Something went wrong
            </p>
          </div>
        </div>

        <h1
          className="text-4xl font-light text-stone-900 leading-tight mb-4"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          An unexpected{" "}
          <em className="not-italic text-stone-400">error occurred.</em>
        </h1>

        <p className="text-sm text-stone-500 leading-relaxed mb-10 max-w-sm">
          We&apos;re sorry — something went wrong on our end. Our team has been
          notified. Please try again or return home.
        </p>

        {/* Error digest for support */}
        {error.digest && (
          <p className="text-sm tracking-widest uppercase text-stone-300 mb-8 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="flex-1 bg-stone-900 text-white py-4 text-sm tracking-[0.35em] uppercase hover:bg-stone-700 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="flex-1 border border-stone-300 text-stone-600 py-4 text-sm tracking-[0.35em] uppercase text-center hover:border-stone-900 hover:text-stone-900 transition-all"
          >
            Return home
          </Link>
        </div>

        <div className="mt-10 pt-8 border-t border-stone-200 flex items-center gap-6">
          <Link
            href="/contact"
            className="text-sm tracking-[0.3em] uppercase text-stone-400 hover:text-stone-900 transition-colors"
          >
            Contact support
          </Link>
          <Link
            href="/faq"
            className="text-sm tracking-[0.3em] uppercase text-stone-400 hover:text-stone-900 transition-colors"
          >
            View FAQ
          </Link>
        </div>
      </div>
    </main>
  );
}