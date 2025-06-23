import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { CategoryTable } from './category-tables';

import {
  CategoryItem,
  getCategoryService
} from '@/services/category/category-service';
import { columns } from './category-tables/columns';

type CategoryListingPage = {};

export default async function CategoryListingPage({}: CategoryListingPage) {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const categories = searchParamsCache.get('category');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const data = await getCategoryService();

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
