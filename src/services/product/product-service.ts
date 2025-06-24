import { authOptions } from '@/lib/auth/authOptions';
import { getRequest } from '@/utils/apiClient';
import { getServerSession } from 'next-auth';

type media = {
  id: string;
  url: string | '';
  type: string;
};
export type ProductItem = {
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
};

export type ProductResponse = {
  total: number;
  products: ProductItem[];
};

export const getProductService = async (): Promise<ProductResponse> => {
  const session = await getServerSession(authOptions);
  const products = await getRequest<ProductResponse>(
    'https://apigw.suakhoa247.com.vn/api/v1/shop/products',
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    }
  );

  return products;
};
