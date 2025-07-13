import { getRequest, putRequest } from '@/utils/apiClient';
import { ShopItem } from './shop-service';

export type DetailResponse = {
  total: number;
  products: ShopItem[];
};

export const getShopDetailService = async (
  accessToken?: string,
  id?: string
) => {
  const detail = await getRequest(
    `https://apigw.suakhoa247.com.vn/api/v1/shop/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  return detail;
};

export const updateShopDetailService = async (
  accessToken?: string,
  id?: string,
  data?: any
) => {
  const req = await putRequest(
    `https://apigw.suakhoa247.com.vn/api/v1/shop/products/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  return req;
};
