import type { Product } from "./product";

// ─────────────────────────────────────────────────────────────
// Address
// ─────────────────────────────────────────────────────────────

export interface Address {
  id?: string;
  userId?: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  region?: string;
  country: string;
  postalCode?: string;
  phone?: string;
  isDefault?: boolean;
}

// ─────────────────────────────────────────────────────────────
// Order Item
// ─────────────────────────────────────────────────────────────

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  name: string;
  imageUrl: string;
  slug: string;
  price: number;
  quantity: number;
  color?: string | null;
  colorHex?: string | null;
  size?: string | null;
  /** Snapshot of product at time of purchase */
  productSnapshot?: Partial<Product>;
}

// ─────────────────────────────────────────────────────────────
// Order Status
// ─────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refunded"
  | "returned";

export type PaymentStatus =
  | "unpaid"
  | "paid"
  | "failed"
  | "refunded"
  | "partially_refunded";

export type PaymentMethod =
  | "paystack"
  | "stripe"
  | "mobile_money"
  | "bank_transfer"
  | "cash_on_delivery";

// ─────────────────────────────────────────────────────────────
// Order Timeline Event
// ─────────────────────────────────────────────────────────────

export interface OrderEvent {
  id: string;
  status: OrderStatus;
  description: string;
  timestamp: string;
  location?: string;
}

// ─────────────────────────────────────────────────────────────
// Order
// ─────────────────────────────────────────────────────────────

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;

  // ─── Items ────────────────────────────────────────────────
  items: OrderItem[];

  // ─── Pricing ──────────────────────────────────────────────
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  currency: string;

  // ─── Coupon ───────────────────────────────────────────────
  couponCode?: string;
  couponDiscount?: number;

  // ─── Status ───────────────────────────────────────────────
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  paymentReference?: string;

  // ─── Addresses ────────────────────────────────────────────
  shippingAddress: Address;
  billingAddress?: Address;

  // ─── Tracking ─────────────────────────────────────────────
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  estimatedDelivery?: string;
  timeline?: OrderEvent[];

  // ─── Notes ────────────────────────────────────────────────
  customerNote?: string;
  internalNote?: string;

  // ─── Dates ────────────────────────────────────────────────
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
}

// ─────────────────────────────────────────────────────────────
// Checkout Form
// ─────────────────────────────────────────────────────────────

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  shippingAddress: Omit<Address, "id" | "userId" | "isDefault">;
  billingAddress?: Omit<Address, "id" | "userId" | "isDefault">;
  sameAsBilling: boolean;
  paymentMethod: PaymentMethod;
  customerNote?: string;
  saveAddress?: boolean;
}

// ─────────────────────────────────────────────────────────────
// Shipping Rate
// ─────────────────────────────────────────────────────────────

export interface ShippingRate {
  id: string;
  name: string;
  description?: string;
  price: number;
  estimatedDays: string;
  carrier?: string;
}