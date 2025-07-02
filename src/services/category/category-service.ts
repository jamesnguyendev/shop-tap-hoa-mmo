import { getRequest } from '@/utils/apiClient';

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export type CategoryItem = {
  id: string;
  name: string;
};

export type CategoryResponse = {
  total: number;
  categories: CategoryItem[];
};

export const getCategoryService = async (
  accessToken?: string
): Promise<CategoryResponse> => {
  return await getRequest<CategoryResponse>(
    'https://apigw.suakhoa247.com.vn/api/v1/shop/categories',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
};
