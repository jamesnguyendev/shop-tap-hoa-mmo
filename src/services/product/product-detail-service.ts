import { getRequest } from '@/utils/apiClient';

type media = {
  id: string;
  url: string | '';
  type: string;
};
export type DetailItem = {
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

export type DetailResponse = {
  total: number;
  products: DetailItem[];
};

export const getProductDetailService = async (
  accessToken: string,
  id: string
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
