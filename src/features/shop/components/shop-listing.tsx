import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { columns } from './shop-tables/columns';
import { ShopTable } from './shop-tables';

type ShopListingPage = {};

export default async function ShopListingPage({}: ShopListingPage) {
  // Showcasing the use of search params cache in nested RSCs
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

  const data = await fakeProducts.getProducts(filters);

  const totalProducts = data.total_products;
  const products: Product[] = data.products;

  return (
    <ShopTable data={products} totalItems={totalProducts} columns={columns} />
  );
}
