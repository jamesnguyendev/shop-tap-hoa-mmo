'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Text } from 'lucide-react';
import { CellAction } from './cell-action';
import { CategoryItem } from '@/services/category/category-service';

export const columns: ColumnDef<CategoryItem>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<CategoryItem, unknown> }) => (
      <DataTableColumnHeader column={column} title='Tên danh mục' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<CategoryItem['name']>()}</div>,
    meta: {
      label: 'Tên danh mục',
      placeholder: 'Tìm danh mục...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
    header: 'Thao tác'
  }
];
