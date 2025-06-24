// import { Product } from '@/constants/data';
// import { fakeProducts } from '@/constants/mock-api';
// import { searchParamsCache } from '@/lib/searchparams';
import { ProductTable } from './product-tables';
import { columns } from './product-tables/columns';
import {
  getProductService,
  ProductItem
} from '@/services/product/product-service';

type ProductListingPage = {};

export default async function ProductListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
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

  const data = await getProductService();

  const total = data.total;
  const dataProducts: ProductItem[] = data.products;

  return (
    <ProductTable data={dataProducts} totalItems={total} columns={columns} />
  );
}
