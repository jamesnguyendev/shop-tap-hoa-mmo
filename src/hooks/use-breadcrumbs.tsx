'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type BreadcrumbItem = {
  title: string;
  link: string;
};

const routeMapping: Record<string, BreadcrumbItem[]> = {
  '/dashboard': [{ title: 'Dashboard', link: '/dashboard' }],
  '/dashboard/overview': [
    { title: 'Trang chủ', link: '/dashboard' },
    { title: 'Tổng quan', link: '/dashboard/overview' }
  ],
  '/dashboard/order': [
    { title: 'Trang chủ', link: '/dashboard' },
    { title: 'Đơn hàng', link: '/dashboard/order' }
  ],
  '/dashboard/product': [
    { title: 'Trang chủ', link: '/dashboard' },
    { title: 'Sản phẩm', link: '/dashboard/product' }
  ],
  '/dashboard/shop': [
    { title: 'Trang chủ', link: '/dashboard' },
    { title: 'Gian hàng', link: '/dashboard/shop' }
  ],
  '/dashboard/chat': [
    { title: 'Trang chủ', link: '/dashboard' },
    { title: 'Trò chuyện', link: '/dashboard/chat' }
  ],
  '/dashboard/review': [
    { title: 'Trang chủ', link: '/dashboard' },
    { title: 'Đánh giá', link: '/dashboard/review' }
  ],
  '/dashboard/upload': [
    { title: 'Trang chủ', link: '/dashboard' },
    { title: 'Shop', link: '/dashboard/shop' },
    { title: 'Tải tệp sản phẩm', link: '/dashboard/upload' }
  ]
};

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    const segments = pathname.split('/').filter(Boolean);

    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        link: path
      };
    });
  }, [pathname]);

  return breadcrumbs;
}
