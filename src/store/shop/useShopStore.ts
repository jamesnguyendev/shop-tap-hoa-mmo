import { create } from 'zustand';
import { getSession } from 'next-auth/react';
import { getShopDetailService } from '@/services/shop/shop-detail-service';
import { ShopData } from '@/types';

interface ShopStore {
  shop: ShopData | null | unknown;
  setShop: (data: ShopData) => void;
  reloadShop: () => Promise<void>;
}

export const useShopStore = create<ShopStore>((set, get) => ({
  shop: null,

  setShop: (data) => set({ shop: data }),

  reloadShop: async () => {
    const currentShop = get().shop;
    if (!(currentShop as { id: string })?.id) return;

    const session = await getSession();
    const newData = await getShopDetailService(
      session?.accessToken,
      (currentShop as { id: string })?.id
    );

    set({ shop: newData });
  }
}));
