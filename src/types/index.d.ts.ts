// ─────────────────────────────────────────────────────────────
// D'valor — Type Barrel
// Import from "@/types" for any shared type across the app.
// ─────────────────────────────────────────────────────────────

// Product (includes FeaturedProduct, ProductTag, ProductImage re-exports)
export type {
  Product,
  ProductVariant,
  ProductCategory,
  ProductCollection,
  ProductFilters,
  PaginatedProducts,
  SortOption,
  // re-exported from featured-product.d.ts
  FeaturedProduct,
  ProductTag,
  ProductImage,
} from "./product";

// Order
export type {
  Order,
  OrderItem,
  OrderStatus,
  OrderEvent,
  PaymentStatus,
  PaymentMethod,
  CheckoutFormData,
  ShippingRate,
  Address,
} from "./order";

// User & Auth
export type {
  User,
  AuthUser,
  AuthSession,
  UserRole,
  SignInFormData,
  SignUpFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  UpdateProfileFormData,
  UpdatePasswordFormData,
} from "./user";

// Cart
export type {
  CartItem,
  CartTotals,
  CartState,
  CartActions,
  CartStore,
  AppliedCoupon,
} from "./cart";

// Sanity CMS
export type {
  SanityDocument,
  SanityReference,
  SanitySlug,
  SanityImage,
  SanityImageAsset,
  SanityBlock,
  SanityPortableText,
  SanityHero,
  SanityProduct,
  SanityCollection,
  SanityCategory,
  SanityAnnouncement,
  SanitySiteSettings,
} from "./sanity";

// API
export type {
  ApiSuccess,
  ApiError,
  ApiResponse,
  GetProductsRequest,
  GetProductsResponse,
  GetProductResponse,
  CartSyncRequest,
  CartSyncResponse,
  GetCartResponse,
  GetOrdersResponse,
  GetOrderResponse,
  InitiateCheckoutRequest,
  InitiateCheckoutResponse,
  CheckoutResponse,
  GetShippingRatesRequest,
  GetShippingRatesResponse,
  ValidateCouponRequest,
  ValidateCouponData,
  ValidateCouponResponse,
  GetMeResponse,
  UpdateProfileResponse,
  UpdateProfileRequest,
  UpdatePasswordRequest,
  PaystackWebhookEvent,
  StripeWebhookEvent,
} from "./api";