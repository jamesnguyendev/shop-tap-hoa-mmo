import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type ShopData = {
  id: string;
  name: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  slug: string;
  isAvailable: boolean;
  metadata: Array<{
    key: string;
    value: string;
  }>;
  productType: {
    id: string;
    name: string;
  };
  collections: any[];
  category: {
    id: string;
    name: string;
    slug: string;
    parent: any | null;
  };
  rating: number | null;
  pricing: {
    onSale: boolean;
    discount: any | null;
    priceRange: {
      start: {
        currency: string;
        gross: {
          amount: number;
          currency: string;
        };
        net: {
          amount: number;
          currency: string;
        };
      };
    };
  };
  productVariants: Array<{
    id: string;
    sku: string;
    name: string;
    channelListings: Array<{
      price: {
        amount: number;
      };
    }>;
    quantityAvailable: number;
    metadata: Array<{
      key?: string;
      value?: string;
    }>;
  }>;
};
