import { OrderTable } from './order-tables';

import { columns } from './order-tables/columns';
import { getOrderService, OrderItem } from '@/services/order/order-service';

type OrderListingPage = {};

export default async function OrderListingPage({}: OrderListingPage) {
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

  const data = await getOrderService();

  if (!data) return;

  const totalOrder = data?.total;

  const dataOrder: OrderItem[] = data?.products;

  return (
    <OrderTable data={dataOrder} totalItems={totalOrder} columns={columns} />
  );
}
