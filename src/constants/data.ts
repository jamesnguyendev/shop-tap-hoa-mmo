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
    title: 'Sản phẩm',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Danh mục',
    url: '/dashboard/category',
    icon: 'category',
    shortcut: ['p', 'c'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Tài khoản',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: false,
    items: [
      {
        title: 'Hồ sơ',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'Đăng nhập',
        shortcut: ['l', 'l'],
        url: '/auth/sign-in',
        icon: 'login'
      },
      {
        title: 'Đăng ký',
        shortcut: ['l', 'o'],
        url: '/auth/sign-up',
        icon: 'logup'
      }
    ]
  },
  {
    title: 'Gian hàng',
    url: '/dashboard/shop',
    icon: 'store',
    shortcut: ['p', 's'],
    isActive: false,
    items: [] // No child items
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
    title: 'Đặt trước',
    url: '/dashboard/reorder',
    icon: 'reserve',
    shortcut: ['p', 'r'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Khiếu nại',
    url: '/dashboard/complaint',
    icon: 'flag',
    shortcut: ['p', 'f'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Reseller',
    url: '/dashboard/reseller',
    icon: 'reseller',
    shortcut: ['r', 'r'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Đánh giá',
    url: '/dashboard/review',
    icon: 'review',
    shortcut: ['r', 'v'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Mã giảm giá',
    url: '/dashboard/discount',
    icon: 'discount',
    shortcut: ['d', 't'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Gian hàng Top 1',
    url: '/dashboard/rank',
    icon: 'rank',
    shortcut: ['r', 'k'],
    isActive: false,
    items: [] // No child items
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
