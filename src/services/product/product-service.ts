import { authOptions } from '@/lib/auth/authOptions';
import { getRequest, postRequest, putRequest } from '@/utils/apiClient';
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

export const getProductService = async (
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

export const createProduct = async (data: any, accessToken?: string) => {
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
  console.log(accessToken);

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

export const uploadImage = async (file: string | undefined, header: any) => {
  const req = await putRequest(
    process.env.NEXT_PUBLIC_API_UPLOAD_IMAGE || '',
    file,
    { headers: header }
  );
  return req;
};
