import { authOptions } from '@/lib/auth/authOptions';
import { getRequest } from '@/utils/apiClient';
import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering
import { getServerSession } from 'next-auth';

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

export const getCategoryService = async (): Promise<CategoryResponse> => {
  const session = await getServerSession(authOptions);
  return await getRequest<CategoryResponse>(
    'https://apigw.suakhoa247.com.vn/api/v1/shop/categories',
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    }
  );
};
