'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import FormDrawerWrapper from '@/components/modal/FormDrawerWrapper';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import CreateVariant from '../forms/CreateVariant';
import { PlusCircle } from 'lucide-react';
import { ShopItem } from '@/services/shop/shop-service';
import { getShopDetailService } from '@/services/shop/shop-detail-service';
import Link from 'next/link';

interface CellActionProps {
  data: ShopItem;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<any>();
  const id = data.id;
  const { data: session } = useSession();

  const handleDetail = async () => {
    if (!session?.accessToken) return;
    const data = await getShopDetailService(session.accessToken, id);
    setProducts(data);
  };

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
      <div onClick={handleDetail}>
        <FormDrawerWrapper icon={<PlusCircle />} triggerLabel='Tạo biến thể'>
          <CreateVariant id={products?.id} pageTitle='Tạo biến thể' />
        </FormDrawerWrapper>
      </div>
      <div
        onClick={() => setOpen(true)}
        className='flex cursor-default gap-2.5'
      >
        {' '}
        Xóa
      </div>
    </div>
  );
};
