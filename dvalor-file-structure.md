# D'valor — Project File Structure

> A luxury e-commerce experience built with Next.js 15, Tailwind v4, Sanity CMS, Prisma ORM, GSAP & Framer Motion.

---

## Stack Overview

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Icons | Hugeicons + React-Icons |
| State | Zustand |
| Validation | Zod |
| UI Components | Shadcn/UI (no dropdown) |
| Database ORM | Prisma |
| CMS | Sanity v3 |
| Animation | GSAP + Framer Motion |
| Navigation | Next Link + Next Image |

---

## Root Structure

```
dvalor/
├── app/                        # Next.js App Router
├── components/                 # Shared UI components
├── lib/                        # Utilities, configs, helpers
├── hooks/                      # Custom React hooks
├── store/                      # Zustand stores
├── schemas/                    # Zod validation schemas
├── prisma/                     # Prisma ORM
├── sanity/                     # Sanity CMS config & schemas
├── public/                     # Static assets
├── styles/                     # Global styles
├── types/                      # TypeScript type definitions
├── .env.local
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── sanity.config.ts
└── package.json
```

---

## App Router (`app/`)

```
app/
│
├── (home)/                              # Homepage — own layout (Navbar + Footer)
│   ├── layout.tsx                       # Wraps only the homepage
│   └── page.tsx                         # Homepage (Hero, Collections, etc.)
│
├── (shop)/                              # Storefront — shared layout (Navbar + Footer)
│   ├── layout.tsx                       # Navbar + Footer + auth guard (session check)
│   │                                    # Redirects unauthenticated users to /sign-in
│   │
│   ├── shop/
│   │   ├── page.tsx                     # All products (grid + filters)
│   │   └── [category]/
│   │       └── page.tsx                 # Category-filtered products
│   │
│   ├── product/
│   │   └── [slug]/
│   │       ├── page.tsx                 # Product detail page
│   │       └── loading.tsx              # Skeleton loader
│   │
│   ├── collections/
│   │   ├── page.tsx                     # All collections
│   │   └── [slug]/
│   │       └── page.tsx                 # Single collection page
│   │
│   ├── cart/
│   │   └── page.tsx                     # Cart page
│   │
│   ├── checkout/
│   │   ├── page.tsx                     # Checkout form
│   │   └── success/
│   │       └── page.tsx                 # Order confirmation
│   │
│   ├── wishlist/
│   │   └── page.tsx                     # Saved / wishlist items
│   │
│   ├── search/
│   │   └── page.tsx                     # Search results
│   │
│   ├── about/
│   │   └── page.tsx                     # Brand story
│   │
│   └── contact/
│       └── page.tsx                     # Contact form
│
├── (auth)/                              # Auth group (no global nav)
│   ├── layout.tsx
│   ├── sign-in/
│   │   └── page.tsx
│   ├── sign-up/
│   │   └── page.tsx
│   └── forgot-password/
│       └── page.tsx
│
├── (dashboard)/                         # Authenticated user dashboard
│   ├── layout.tsx                       # Sidebar layout
│   ├── account/
│   │   └── page.tsx                     # Profile settings
│   ├── orders/
│   │   ├── page.tsx                     # Order history list
│   │   └── [id]/
│   │       └── page.tsx                 # Single order detail
│   └── addresses/
│       └── page.tsx                     # Saved addresses
│
├── (admin)/                             # Admin panel (protected)
│   ├── layout.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── products/
│   │   ├── page.tsx
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── orders/
│   │   └── page.tsx
│   └── customers/
│       └── page.tsx
│
├── api/
│   ├── products/
│   │   └── route.ts
│   ├── orders/
│   │   └── route.ts
│   ├── cart/
│   │   └── route.ts
│   ├── checkout/
│   │   └── route.ts
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.ts
│   └── webhook/
│       └── route.ts                     # Payment webhook (Paystack / Stripe)
│
├── studio/                              # Sanity Studio (embedded)
│   └── [[...tool]]/
│       └── page.tsx
│
├── not-found.tsx
├── error.tsx
├── loading.tsx
└── layout.tsx                           # Root HTML shell
```

---

## Components (`components/`)

```
components/
│
├── layout/
│   ├── Navbar.tsx                       # Animated top nav
│   ├── NavbarMobile.tsx                 # Mobile drawer nav
│   ├── Footer.tsx                       # Footer with newsletter
│   ├── Sidebar.tsx                      # Dashboard / filter sidebar
│   └── Breadcrumb.tsx
│
├── ui/                                  # Shadcn + custom primitives
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Badge.tsx
│   ├── Skeleton.tsx
│   ├── Sheet.tsx                        # Shadcn Sheet (cart drawer)
│   ├── Dialog.tsx                       # Shadcn Dialog
│   ├── Accordion.tsx                    # Shadcn Accordion (FAQ / filters)
│   ├── Tabs.tsx                         # Shadcn Tabs
│   ├── Slider.tsx                       # Shadcn Slider (price range)
│   ├── Checkbox.tsx
│   ├── RadioGroup.tsx
│   ├── Separator.tsx
│   ├── Toast.tsx
│   ├── Avatar.tsx
│   └── ScrollArea.tsx
│
├── home/
│   ├── HeroSection.tsx                  # Full-screen GSAP hero
│   ├── FeaturedCollections.tsx          # Animated collection grid
│   ├── NewArrivals.tsx                  # Horizontal scroll carousel
│   ├── BrandStatement.tsx               # Parallax text reveal
│   ├── Testimonials.tsx                 # Framer Motion reviews
│   ├── CategoryShowcase.tsx             # Staggered category cards
│   └── NewsletterSection.tsx            # Email capture
│
├── product/
│   ├── ProductCard.tsx                  # Grid card with hover reveal
│   ├── ProductGrid.tsx                  # Masonry / grid layout
│   ├── ProductImageGallery.tsx          # Zoom + lightbox
│   ├── ProductInfo.tsx                  # Name, price, variants
│   ├── ProductVariantSelector.tsx       # Size / color pickers
│   ├── ProductQuantityInput.tsx
│   ├── ProductReviews.tsx
│   ├── RelatedProducts.tsx
│   └── QuickViewModal.tsx               # Quick-add dialog
│
├── shop/
│   ├── FilterPanel.tsx                  # Category, price, color filters
│   ├── SortSelect.tsx                   # Sort by price / newest
│   ├── ActiveFilters.tsx                # Filter pills / tags
│   └── PaginationControls.tsx
│
├── cart/
│   ├── CartDrawer.tsx                   # Slide-in cart sheet
│   ├── CartItem.tsx
│   ├── CartSummary.tsx
│   └── CartEmpty.tsx
│
├── checkout/
│   ├── CheckoutForm.tsx
│   ├── ShippingForm.tsx
│   ├── PaymentForm.tsx
│   ├── OrderSummary.tsx
│   └── OrderConfirmation.tsx
│
├── collections/
│   ├── CollectionCard.tsx
│   ├── CollectionHero.tsx
│   └── CollectionGrid.tsx
│
├── search/
│   ├── SearchBar.tsx                    # Animated expandable search
│   ├── SearchResults.tsx
│   └── SearchEmpty.tsx
│
├── auth/
│   ├── SignInForm.tsx
│   ├── SignUpForm.tsx
│   └── ForgotPasswordForm.tsx
│
├── dashboard/
│   ├── DashboardSidebar.tsx
│   ├── ProfileForm.tsx
│   ├── OrderCard.tsx
│   ├── OrderTimeline.tsx
│   └── AddressCard.tsx
│
├── common/
│   ├── Logo.tsx
│   ├── WishlistButton.tsx
│   ├── CurrencyDisplay.tsx
│   ├── RatingStars.tsx
│   ├── ImageWithFallback.tsx
│   ├── AnimatedCounter.tsx              # GSAP number counter
│   ├── MarqueeText.tsx                  # Infinite scroll ticker
│   ├── PageTransition.tsx               # Framer Motion page wrap
│   ├── ScrollProgress.tsx               # Reading / scroll progress bar
│   └── BackToTop.tsx
│
└── animations/
    ├── FadeIn.tsx                        # Framer Motion fade wrapper
    ├── SlideIn.tsx                       # Directional slide
    ├── StaggerChildren.tsx               # Staggered list reveal
    ├── TextReveal.tsx                    # Character / word reveal
    ├── ParallaxSection.tsx               # GSAP ScrollTrigger parallax
    └── MagneticButton.tsx                # Cursor-following magnet effect
```

---

## Library / Utilities (`lib/`)

```
lib/
├── prisma.ts                            # Prisma client singleton
├── sanity.ts                            # Sanity client config
├── sanity-queries.ts                    # GROQ query functions
├── auth.ts                              # NextAuth config
├── utils.ts                             # cn(), formatPrice(), slugify()
├── constants.ts                         # Site-wide constants
├── animations.ts                        # Shared GSAP / Framer variants
└── api/
    ├── products.ts                      # Product fetch helpers
    ├── orders.ts
    ├── cart.ts
    └── checkout.ts
```

---

## Hooks (`hooks/`)

```
hooks/
├── useCart.ts                           # Cart state + actions
├── useWishlist.ts
├── useSearch.ts
├── useFilters.ts
├── useScrollDirection.ts                # Navbar hide/show
├── useMediaQuery.ts
├── useGSAP.ts                           # GSAP init helper
├── useInView.ts                         # Intersection observer
└── useDebounce.ts
```

---

## Zustand Stores (`store/`)

```
store/
├── cartStore.ts                         # Cart items, totals, drawer state
├── wishlistStore.ts                     # Saved products
├── filterStore.ts                       # Active shop filters
├── uiStore.ts                           # Global UI (nav open, overlay, etc.)
└── userStore.ts                         # Auth user state
```

---

## Zod Schemas (`schemas/`)

```
schemas/
├── product.schema.ts
├── order.schema.ts
├── checkout.schema.ts
├── auth.schema.ts
├── address.schema.ts
├── review.schema.ts
└── contact.schema.ts
```

---

## Prisma ORM (`prisma/`)

```
prisma/
├── schema.prisma                        # DB schema (models below)
├── seed.ts                              # Dev seed script
└── migrations/
    └── ...
```

### Prisma Models

```prisma
model User          { id, email, name, role, orders, addresses, reviews }
model Product       { id, slug, name, price, images, variants, category, reviews }
model ProductVariant{ id, productId, size, color, stock }
model Category      { id, name, slug, products }
model Collection    { id, name, slug, products }
model Order         { id, userId, items, status, total, shippingAddress }
model OrderItem     { id, orderId, productId, quantity, price }
model Address       { id, userId, line1, line2, city, country, isDefault }
model Review        { id, userId, productId, rating, body }
model Cart          { id, userId, items }
model CartItem      { id, cartId, productId, variantId, quantity }
```

---

## Sanity CMS (`sanity/`)

```
sanity/
├── lib/
│   ├── client.ts
│   └── image.ts                         # @sanity/image-url builder
├── schemas/
│   ├── index.ts                         # Schema registry
│   ├── product.ts
│   ├── collection.ts
│   ├── category.ts
│   ├── hero.ts
│   ├── editorial.ts                     # Rich-text editorial blocks
│   ├── announcement.ts
│   └── siteSettings.ts
└── queries/
    ├── products.ts                      # GROQ queries
    ├── collections.ts
    └── homepage.ts
```

---

## Styles (`styles/`)

```
styles/
├── globals.css                          # Tailwind directives + CSS vars
└── fonts.css                            # @font-face declarations
```

### Key CSS Custom Properties (in `globals.css`)

```css
:root {
  /* Brand */
  --color-primary: #1a1108;          /* Deep espresso */
  --color-primary-foreground: #faf7f2;
  --color-accent: #c9a96e;           /* Warm gold */
  --color-accent-light: #e8d5b0;
  --color-surface: #faf7f2;          /* Ivory */
  --color-muted: #7a6e62;

  /* Typography */
  --font-heading: 'Cormorant Garamond', serif;
  --font-body: 'Jost', sans-serif;
  --font-mono: 'DM Mono', monospace;

  /* Layout */
  --wrapper-px: clamp(1rem, 5vw, 6rem);
  --max-width: 88rem;                /* max-w-7xl approx */
}
```

### Wrapper Utility Class

```css
.wrapper {
  max-width: var(--max-width);       /* ~max-w-7xl */
  margin-inline: auto;
  padding-inline: var(--wrapper-px);
}

/* Responsive padding overrides */
@media (max-width: 640px)  { .wrapper { padding-inline: 1rem; } }
@media (max-width: 768px)  { .wrapper { padding-inline: 1.5rem; } }
@media (max-width: 1024px) { .wrapper { padding-inline: 2.5rem; } }
```

---

## Types (`types/`)

```
types/
├── product.d.ts
├── order.d.ts
├── user.d.ts
├── cart.d.ts
├── sanity.d.ts
├── api.d.ts
└── index.d.ts                           # Re-exports
```

---

## Public Assets (`public/`)

```
public/
├── fonts/                               # Self-hosted font files
├── images/
│   ├── logo.svg
│   ├── logo-white.svg
│   └── placeholder-product.jpg
├── icons/
│   └── favicon.ico
└── og-image.jpg
```

---

## Config Files

```
next.config.ts              # Image domains (Sanity CDN), rewrites
tailwind.config.ts          # fontFamily (heading/body/mono), custom screens
tsconfig.json               # Path aliases: @/components, @/lib, @/store, etc.
sanity.config.ts            # Studio config + schema import
.env.example                # All required env vars documented
```

### `.env.example`

```env
# Database
DATABASE_URL=

# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Payment (Paystack or Stripe)
PAYMENT_SECRET_KEY=
NEXT_PUBLIC_PAYMENT_PUBLIC_KEY=

# App
NEXT_PUBLIC_SITE_URL=
```

---

## Key Design Decisions

1. **Route Groups** — Five isolated layout contexts, each with a clear responsibility:
   - `(home)` — Homepage only; its own Navbar + Footer layout, no auth guard.
   - `(shop)` — All storefront routes (shop, product, collections, cart, checkout, wishlist, search, about, contact). The `layout.tsx` mounts the Navbar + Footer **and** runs a server-side session check — unauthenticated users are redirected to `/sign-in`. This is the secured perimeter.
   - `(auth)` — Sign-in / sign-up / forgot-password; no nav chrome.
   - `(dashboard)` — Authenticated account pages; sidebar layout, session-protected.
   - `(admin)` — Back-office panel; role-guarded (`role === 'ADMIN'`), own sidebar layout.
2. **Sanity for content** — Hero banners, editorial copy, product descriptions, collections live in Sanity (CMS-driven).
3. **Prisma for transactional data** — Orders, users, addresses, cart, reviews live in Postgres via Prisma.
4. **Zustand for client state** — Cart drawer, wishlist, active filters, UI overlays — all ephemeral client-side state.
5. **Zod for all inputs** — Every form and API route validates through a Zod schema before touching the DB.
6. **Animation architecture** — GSAP handles scroll-triggered reveals, parallax, and hero sequences; Framer Motion handles route transitions, micro-interactions, and component-level enter/exit.
7. **`wrapper` class** — One class to rule all max-width + padding across every section.
8. **`font-heading`** — Maps to Cormorant Garamond (refined, luxury serif) for all display text.

---

*Reply "start" or name a section (e.g. "build the Navbar", "build the Hero", "build the ProductCard") and we'll begin coding.*