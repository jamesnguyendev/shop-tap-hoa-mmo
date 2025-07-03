'use client';

import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Shop } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Text } from 'lucide-react';
import { CellAction } from './cell-action';
import Image from 'next/image';
import { ShopItem } from '@/services/shop/shop-service';

export const columns: ColumnDef<ShopItem>[] = [
  {
    accessorKey: 'image',
    header: 'Hình',
    cell: ({ row }) => {
      const product = row.original as ShopItem;
      const imageURL = product.image?.url || '';
      if (!imageURL) return null;
      return (
        <div className='relative aspect-square'>
          <Image
            src={imageURL}
            alt={product.name}
            fill
            className='rounded-lg'
          />
        </div>
      );
    },
    meta: {
      label: 'Hình'
    }
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<ShopItem, unknown> }) => (
      <DataTableColumnHeader column={column} title='Tên gian hàng' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Shop['name']>()}</div>,
    meta: {
      label: 'Tên gian hàng',
      placeholder: 'Tìm gian hàng...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'rating',
    header: 'Đánh giá',
    cell: ({ row }) => row.getValue('rating') || '_',
    meta: {
      label: 'Đánh giá'
    }
  },
  {
    accessorKey: 'price',
    header: 'Giá',
    cell: ({ row }) => `${row.getValue('price') || '_'}  ₫`,
    meta: {
      label: 'Giá'
    }
  },
  {
    accessorKey: 'category',
    header: 'Danh mục',
    cell: ({ row }) => {
      const category = row.getValue('category') as ShopItem['category'];
      return category?.name ?? '—';
    },
    meta: {
      label: 'Danh mục'
    }
  },
  {
    accessorKey: 'isAvailable',
    header: 'Tình trạng',
    cell: ({ row }) => (row.getValue('isAvailable') ? 'Còn hàng' : 'Hết hàng'),
    meta: {
      label: 'Tình trạng'
    }
  },
  {
    id: 'actions',
    header: 'Thao tác',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
