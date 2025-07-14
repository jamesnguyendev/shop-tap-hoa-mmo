import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProductVariantState {
  pID: string | null;
  vID: string | null;
  pName: string | null;
  setIDs: (pID: string, vID: string, pName: string) => void;
  reset: () => void;
}

export const useProductVariantStore = create<ProductVariantState>()(
  persist(
    (set) => ({
      pID: null,
      vID: null,
      pName: null,
      setIDs: (pID, vID, pName) => set({ pID, vID, pName }),
      reset: () => set({ pID: null, vID: null, pName: null })
    }),
    {
      name: 'product-variant-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
