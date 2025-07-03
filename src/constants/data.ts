import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Trang chủ',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Đơn hàng',
    url: '/dashboard/order',
    icon: 'receipt',
    shortcut: ['p', 'o'],
    isActive: false,
    items: []
  },
  {
    title: 'Sản phẩm',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  // {
  //   title: 'Danh mục',
  //   url: '/dashboard/category',
  //   icon: 'category',
  //   shortcut: ['p', 'c'],
  //   isActive: false,
  //   items: [] // No child items
  // },
  {
    title: 'Gian hàng',
    url: '/dashboard/shop',
    icon: 'store',
    shortcut: ['p', 's'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Chăm sóc khách hàng',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: false,
    items: [
      {
        title: 'Quản lý chat',
        shortcut: ['l', 'l'],
        url: '/dashboard/chat',
        icon: 'chat'
      },
      {
        title: 'Quản lý đánh giá',
        url: '/dashboard/review',
        icon: 'review',
        shortcut: ['r', 'v']
      }
    ]
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
