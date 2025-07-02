import { CategoryTable } from './category-tables';

import {
  CategoryItem,
  getCategoryService
} from '@/services/category/category-service';
import { columns } from './category-tables/columns';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';

type CategoryListingPage = {};

export default async function CategoryListingPage({}: CategoryListingPage) {
  // const page = searchParamsCache.get('page');
  // const search = searchParamsCache.get('name');
  // const pageLimit = searchParamsCache.get('perPage');
  // const categories = searchParamsCache.get('category');

  // const filters = {
  //   page,
  //   limit: pageLimit,
  //   ...(search && { search }),
  //   ...(categories && { categories: categories })
  // };
  const session = await getServerSession(authOptions);

  const data = await getCategoryService(session?.accessToken);

  const totalCategories = data.total;
  const dataCategories: CategoryItem[] = data.categories;

  return (
    <CategoryTable
      data={dataCategories}
      totalItems={totalCategories}
      columns={columns}
    />
  );
}
