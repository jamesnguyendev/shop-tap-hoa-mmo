export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<VercelCommerceCart, "lines"> & {
  lines: CartItem[];
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
  };
};

export type Collection = VercelCommerceCollection & {
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  nameType?: string;
  Typeid?: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Categories = {
  title: string;
  backgroundImage: string;
  alt: string;
};

export type Product = Omit<VercelCommerceProduct, "variants" | "images"> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type VercelCommerceCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type VercelCommerceCollection = {
  handle: string;
  title: string;
  backgroundImage?: string | undefined;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type VercelCommerceProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  category: string | undefined;
  channel: string | undefined;
  pricing: string | undefined;
  productType: string;
  typeCake: string;
  taste: string;
  egg: string;
  gram: string;
  expire: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type VercelCommerceCartOperation = {
  data: {
    cart: VercelCommerceCart;
  };
  variables: {
    cartId: string;
  };
};

export type VercelCommerceCreateCartOperation = {
  data: { cartCreate: { cart: VercelCommerceCart } };
};

export type VercelCommerceAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: VercelCommerceCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type VercelCommerceRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: VercelCommerceCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type VercelCommerceUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: VercelCommerceCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type VercelCommerceCollectionOperation = {
  data: {
    collection: VercelCommerceCollection;
  };
  variables: {
    handle: string;
  };
};

export type VercelCommerceCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<VercelCommerceProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type VercelCommerceCollectionsOperation = {
  data: {
    collections: Connection<VercelCommerceCollection>;
  };
};

export type VercelCommerceMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type VercelCommercePageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type VercelCommercePagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type VercelCommerceProductOperation = {
  data: { product: VercelCommerceProduct };
  variables: {
    handle: string;
  };
};

export type VercelCommerceProductRecommendationsOperation = {
  data: {
    productRecommendations: VercelCommerceProduct[];
  };
  variables: {
    productId: string;
  };
};

export type VercelCommerceProductsOperation = {
  data: {
    products: Connection<VercelCommerceProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type CardProducts = {
  category: {
    id: number | string;
    name: string;
  };
  image_url?: string;
  price_to: number;
  price_from: number;
  product_description?: string;
  product_id: string;
  product_name: string;
  product_suggest?: Record<string, unknown>;
  purchase_count?: number;
  rating?: number;
  shop?: {
    id: string;
    name: string;
  };
  slug?: string;
  tags?: string[];
};

export type ProductsResponse = {
  body: {
    [categoryId: string]: CardProducts[];
  };
};

export type LoginResponse = {
  access_token: string;
  sub?: string;
};

export type TokenPayload = {
  name?: string;
  email?: string;
};
