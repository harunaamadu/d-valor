import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CurrencyStore {
  currency: string;
  setCurrency: (currency: string) => void;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      currency: "USD",
      setCurrency: (currency) => {
        document.cookie = `look-currency-code=${currency}; path=/; max-age=31536000`;
        set({ currency });
      },
    }),
    { name: "look-currency" }
  )
);