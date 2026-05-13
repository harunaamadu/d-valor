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
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => number;
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

      addItem: (newItem, quantity = 1) => {
        const requestedQuantity = Math.max(1, Math.floor(quantity));
        let addedQuantity = 0;
        let reachedMaxStock = false;

        set((state) => {
          const existing = state.items.find((i) => i.id === newItem.id);
          const currentQuantity = existing?.quantity ?? 0;
          const availableQuantity = Math.max(0, newItem.stock - currentQuantity);
          addedQuantity = Math.min(requestedQuantity, availableQuantity);

          if (addedQuantity === 0) {
            showToast.maxStockReached(newItem.name);
            return state;
          }

          reachedMaxStock = currentQuantity + addedQuantity >= newItem.stock;

          showToast.addedToCart(newItem.name, newItem.size, newItem.color);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === newItem.id
                  ? { ...i, quantity: i.quantity + addedQuantity }
                  : i,
              ),
              isOpen: true,
            };
          }

          return {
            items: [...state.items, { ...newItem, quantity: addedQuantity }],
            isOpen: true,
          };
        });

        if (reachedMaxStock) {
          showToast.maxStockReached(newItem.name);
        }

        return addedQuantity;
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
      name: "dvalor-cart",
      partialize: (state) => ({
        items: state.items,
        coupon: state.coupon,
        discount: state.discount,
      }),
    },
  ),
);
