import { authOptions } from '@/lib/auth/authOptions';
import { getRequest } from '@/utils/apiClient';
import { getServerSession } from 'next-auth';

export type User = {
  id: string;
  firstName: string | ' ';
  lastName: string | ' ';
};
export type OrderItem = {
  id: string;
  createdAt: string | '';
  updatedAt: string | '';
  status: string | '';
  user: User;
  isPaid: boolean | '';
  chargeStatus: string | '';
};

export type OrderResponse = {
  total: number;
  products: OrderItem[];
};

export const getOrderService = async (): Promise<OrderResponse> => {
  const session = await getServerSession(authOptions);
  const orders = await getRequest<OrderResponse>(
    'https://apigw.suakhoa247.com.vn/api/v1/shop/orders',
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    }
  );

  return orders;
};
