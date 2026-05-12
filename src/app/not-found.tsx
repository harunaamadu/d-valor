import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg w-full">

        {/* Large decorative number */}
        <div className="relative mb-8 select-none">
          <span
            className="text-[12rem] font-light leading-none text-neutral-200"
            style={{ fontFamily: "Georgia, serif" }}
          >
            404
          </span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-12 h-px bg-neutral-900 mr-4 shrink-0" />
            <p className="text-xs tracking-[0.5em] uppercase text-neutral-400">
              Page not found
            </p>
          </div>
        </div>

        <h1
          className="text-4xl font-light text-neutral-900 leading-tight mb-4"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          This page doesn&apos;t{" "}
          <em className="not-italic text-neutral-400">exist.</em>
        </h1>

        <p className="text-sm text-neutral-500 leading-relaxed mb-10 max-w-sm">
          The page you&apos;re looking for may have moved, been removed, or the
          link might be incorrect.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 bg-neutral-900 text-white py-4 text-sm tracking-[0.35em] uppercase text-center hover:bg-primary transition-colors"
          >
            Return home
          </Link>
          <Link
            href="/products"
            className="flex-1 border border-neutral-300 text-neutral-600 py-4 text-sm tracking-[0.35em] uppercase text-center hover:border-neutral-900 hover:text-neutral-900 transition-all"
          >
            Shop all
          </Link>
        </div>

        <div className="mt-10 pt-8 border-t border-neutral-200 flex items-center gap-6">
          <Link
            href="/collections"
            className="text-sm tracking-[0.3em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            Collections
          </Link>
          <Link
            href="/products?filter=new"
            className="text-sm tracking-[0.3em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            New in
          </Link>
          <Link
            href="/contact"
            className="text-sm tracking-[0.3em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}