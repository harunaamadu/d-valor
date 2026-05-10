import { showToast } from "@/lib/toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string; // variantId
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string | null;
  colorHex: string | null;
  size: string | null;
  quantity: number;
  stock: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  coupon: string | null;
  discount: number; // percentage 0–100

  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => Promise<void>;
  removeCoupon: () => void;

  // Computed (as functions)
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      coupon: null,
      discount: 0,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === newItem.id);
          if (existing) {
            showToast.addedToCart(newItem.name, newItem.size, newItem.color);
            return {
              items: state.items.map((i) =>
                i.id === newItem.id
                  ? { ...i, quantity: Math.min(i.quantity + 1, i.stock) }
                  : i,
              ),
              isOpen: true,
            };
          }
          showToast.addedToCart(newItem.name, newItem.size, newItem.color);
          return {
            items: [...state.items, { ...newItem, quantity: 1 }],
            isOpen: true,
          };
        });
      },

      removeItem: (id) => {
        const item = get().items.find((i) => i.id === id);
        if (item) showToast.removedFromCart(item.name);
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.min(quantity, i.stock) } : i,
          ),
        }));
      },

      clearCart: () => {
        showToast.cartCleared();
        set({ items: [], coupon: null, discount: 0 });
      },

      applyCoupon: async (code: string, discount: number) => {
        const upper = code.trim().toUpperCase();
        set({ coupon: upper, discount });
      },

      removeCoupon: () => set({ coupon: null, discount: 0 }),

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        return (subtotal * get().discount) / 100;
      },
      getTotal: () => get().getSubtotal() - get().getDiscountAmount(),
    }),
    {
      name: "look-cart",
      partialize: (state) => ({
        items: state.items,
        coupon: state.coupon,
        discount: state.discount,
      }),
    },
  ),
);
