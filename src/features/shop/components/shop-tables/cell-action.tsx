'use client';

import { AlertModal } from '@/components/modal/alert-modal';

import { useState } from 'react';
import { ShopItem } from '@/services/shop/shop-service';
import Link from 'next/link';

interface CellActionProps {
  data: ShopItem;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = async () => {};

  return (
    <div className='flex flex-col gap-0.5 *:hover:underline'>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        title={`Bạn muốn xóa sản phẩm ${data.name}? `}
        description='Sản phẩm sẽ không thể khôi phục'
      />
      <Link
        href={`/dashboard/shop/${data.id}`}
        className='flex cursor-default gap-2.5'
      >
        Cập nhật
      </Link>
      <div
        onClick={() => setOpen(true)}
        className='flex cursor-default gap-2.5'
      >
        Xóa
      </div>
    </div>
  );
};
