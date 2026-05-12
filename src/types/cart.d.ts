// ─────────────────────────────────────────────────────────────
// Cart Item
// ─────────────────────────────────────────────────────────────

export interface CartItem {
  /** Variant id (used as the cart line key) */
  id: string;

  /** Parent product id */
  productId: string;

  /** Product slug */
  slug: string;

  /** Product name */
  name: string;

  /** Unit price in GHS */
  price: number;

  /** Thumbnail image URL */
  image: string;

  /** Selected color label */
  color: string | null;

  /** Selected color hex */
  colorHex: string | null;

  /** Selected size label */
  size: string | null;

  /** Quantity in this line */
  quantity: number;

  /** Maximum purchasable (from inventory) */
  stock: number;
}

// ─────────────────────────────────────────────────────────────
// Cart Totals
// ─────────────────────────────────────────────────────────────

export interface CartTotals {
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  taxAmount: number;
  total: number;
}

// ─────────────────────────────────────────────────────────────
// Coupon
// ─────────────────────────────────────────────────────────────

export interface AppliedCoupon {
  code: string;
  /** Percentage discount 0–100 */
  discount: number;
  /** Optional flat-amount cap */
  maxDiscount?: number;
  expiresAt?: string;
}

// ─────────────────────────────────────────────────────────────
// Cart Store Shape
// (mirrors Zustand store — useful for selectors / tests)
// ─────────────────────────────────────────────────────────────

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  coupon: string | null;
  discount: number;
}

export interface CartActions {
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => Promise<void>;
  removeCoupon: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTotal: () => number;
}

export type CartStore = CartState & CartActions;