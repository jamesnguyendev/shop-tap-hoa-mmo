'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { OrderItem } from '@/services/order/order-service';

export const columns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: 'user',
    header: 'Khách hàng',
    cell: ({ row }) => {
      const user = row.getValue('user') as OrderItem['user'];
      return user?.firstName ? `${user.lastName} ${user.firstName}` : '—';
    },
    meta: {
      label: 'khách hàng'
    }
  },
  {
    accessorKey: 'created',
    header: 'Ngày mua',
    cell: ({ row }) => {
      const created = row.getValue('created');
      const value = typeof created === 'string' ? created : '';
      if (!value) return '_';

      const date = new Date(value);

      return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    },
    meta: {
      label: 'Ngày mua'
    }
  },
  {
    accessorKey: 'isPaid',
    header: 'Thanh thoán',
    cell: ({ row }) =>
      row.getValue('isPaid') ? 'Đã thanh toán' : 'Chưa thanh toán',
    meta: {
      label: 'Thanh thoán'
    }
  },
  {
    accessorKey: 'chargeStatus',
    header: 'Trạng thái thanh toán',
    cell: ({ row }) => row.getValue('chargeStatus') || '_',
    meta: {
      label: 'Trạng thái thanh toán'
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => row.getValue('status') || '_',
    meta: {
      label: 'Trạng thái'
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
    header: 'Thao tác'
  }
];
