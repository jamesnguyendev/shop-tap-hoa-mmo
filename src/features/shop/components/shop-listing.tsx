import { columns } from './shop-tables/columns';
import { ShopTable } from './shop-tables';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { getShopService, ShopItem } from '@/services/shop/shop-service';

type ShopListingPage = {};

export default async function ShopListingPage({}: ShopListingPage) {
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

  const session = await getServerSession(authOptions);

  const data = await getShopService(session?.accessToken);

  const total = data.total;
  const dataProducts: ShopItem[] = data.products || [];

  return <ShopTable data={dataProducts} totalItems={total} columns={columns} />;
}
