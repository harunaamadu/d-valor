import type { Product, PaginatedProducts, ProductFilters } from "./product";
import type { Order, CheckoutFormData, ShippingRate } from "./order";
import type { User, UpdateProfileFormData, UpdatePasswordFormData } from "./user";
import type { CartItem } from "./cart";

// ─────────────────────────────────────────────────────────────
// Generic API Envelope
// ─────────────────────────────────────────────────────────────

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  code?: string;
  /** Field-level validation errors (Zod) */
  fieldErrors?: Record<string, string[]>;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ─────────────────────────────────────────────────────────────
// Products API  —  GET /api/products
// ─────────────────────────────────────────────────────────────

export type GetProductsRequest = ProductFilters;
export type GetProductsResponse = ApiResponse<PaginatedProducts>;

export type GetProductResponse = ApiResponse<Product>;

// ─────────────────────────────────────────────────────────────
// Cart API  —  /api/cart
// ─────────────────────────────────────────────────────────────

export interface CartSyncRequest {
  items: CartItem[];
}

export interface CartSyncResponse {
  items: CartItem[];
  /** Updated prices / availability for items that changed */
  changes?: Array<{
    id: string;
    field: "price" | "stock" | "inStock";
    oldValue: number | boolean;
    newValue: number | boolean;
  }>;
}

export type GetCartResponse = ApiResponse<CartSyncResponse>;

// ─────────────────────────────────────────────────────────────
// Orders API  —  /api/orders
// ─────────────────────────────────────────────────────────────

export type GetOrdersResponse = ApiResponse<Order[]>;
export type GetOrderResponse = ApiResponse<Order>;

// ─────────────────────────────────────────────────────────────
// Checkout API  —  /api/checkout
// ─────────────────────────────────────────────────────────────

export interface InitiateCheckoutRequest {
  formData: CheckoutFormData;
  cartItems: CartItem[];
  couponCode?: string;
}

export interface InitiateCheckoutResponse {
  orderId: string;
  orderNumber: string;
  paymentUrl?: string;          // Paystack / Stripe redirect
  paymentReference?: string;
  total: number;
}

export type CheckoutResponse = ApiResponse<InitiateCheckoutResponse>;

// ─────────────────────────────────────────────────────────────
// Shipping API
// ─────────────────────────────────────────────────────────────

export interface GetShippingRatesRequest {
  countryCode: string;
  region?: string;
  cartTotal: number;
}

export type GetShippingRatesResponse = ApiResponse<ShippingRate[]>;

// ─────────────────────────────────────────────────────────────
// Coupon API  —  POST /api/coupon/validate
// ─────────────────────────────────────────────────────────────

export interface ValidateCouponRequest {
  code: string;
  cartTotal: number;
}

export interface ValidateCouponData {
  code: string;
  discount: number;
  maxDiscount?: number;
  expiresAt?: string;
}

export type ValidateCouponResponse = ApiResponse<ValidateCouponData>;

// ─────────────────────────────────────────────────────────────
// User / Auth API  —  /api/auth
// ─────────────────────────────────────────────────────────────

export type GetMeResponse = ApiResponse<User>;
export type UpdateProfileResponse = ApiResponse<User>;

export interface UpdateProfileRequest extends UpdateProfileFormData {}
export interface UpdatePasswordRequest extends UpdatePasswordFormData {}

// ─────────────────────────────────────────────────────────────
// Webhook  —  /api/webhook
// ─────────────────────────────────────────────────────────────

export interface PaystackWebhookEvent {
  event: string;
  data: {
    id: number;
    reference: string;
    status: "success" | "failed" | "abandoned";
    amount: number;
    currency: string;
    customer: {
      email: string;
      name?: string;
    };
    metadata?: Record<string, unknown>;
  };
}

export interface StripeWebhookEvent {
  id: string;
  type: string;
  data: {
    object: Record<string, unknown>;
  };
}