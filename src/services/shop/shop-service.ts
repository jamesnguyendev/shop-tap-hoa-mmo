import { getRequest, postRequest, putRequest } from '@/utils/apiClient';

type media = {
  id: string;
  url: string | '';
  type: string;
};
export type ShopItem = {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
  image: media;
  rating: number | '';
  isAvailable: boolean | null;
  price: number | '';
  description: string;
};

export type ProductResponse = {
  total: number;
  products: ShopItem[];
};

export type productTypeItem = {
  id: string;
  name: string;
};

export type ProductTypeResponse = {
  total: number;
  productTypes: productTypeItem[];
};

export const getShopService = async (
  accessToken?: string
): Promise<ProductResponse> => {
  const products = await getRequest<ProductResponse>(
    process.env.NEXT_PUBLIC_API_SHOP_PRODUCT || '',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  return products;
};

export const createShop = async (data: any, accessToken?: string) => {
  const products = await postRequest(
    process.env.NEXT_PUBLIC_API_SHOP_PRODUCT || '',
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
  return products;
};

export const createVariant = async (
  id: string,
  data: any,
  accessToken?: string
) => {
  const req = await postRequest(
    `${process.env.NEXT_PUBLIC_API_SHOP_PRODUCT}/${id}`,
    { variants: [data] },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
  return req;
};

export const getProductTypes = async (
  accessToken?: string
): Promise<ProductTypeResponse> => {
  const req = await getRequest<ProductTypeResponse>(
    process.env.NEXT_PUBLIC_API_PRODUCT_TYPE || '',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
  return req;
};

export const updateFileProduct = async (data?: any, accessToken?: string) => {
  const req = await postRequest(
    process.env.NEXT_PUBLIC_API_UPLOAD_PRODUCT || '',
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
  return req;
};

export const urlForUpdate = async (url?: string, accessToken?: string) => {
  const req = await putRequest(url || '', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return req;
};

export const getUploadedFiles = async (
  variantId?: string |null,
  accessToken?: string
) => {
  const req = await getRequest(
    `${process.env.NEXT_PUBLIC_API_UPLOAD_PRODUCT}?variant_id=${variantId}` ||
      '',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
  return req;
};
