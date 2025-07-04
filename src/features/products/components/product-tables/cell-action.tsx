'use client';

import FormDrawerWrapper from '@/components/modal/FormDrawerWrapper';

import { ProductItem } from '@/services/product/product-service';
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ProductForm from '../forms/product-form';

import { AlertModal } from '@/components/modal/alert-modal';
import { getShopDetailService } from '@/services/shop/shop-detail-service';

interface CellActionProps {
  data: ProductItem;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<any>();
  const id = data.id;
  const { data: session } = useSession();

  const handleDetail = async () => {
    if (!session?.accessToken) return;
    const data = await getShopDetailService(session.accessToken, id); // fake data of shop
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
      <div onClick={handleDetail}>
        <FormDrawerWrapper icon={<IconEdit />} triggerLabel='Cập nhật'>
          <ProductForm
            initialData={products}
            pageTitle='Cập nhật sản phẩm'
            image
          />
        </FormDrawerWrapper>
      </div>
      <div
        onClick={() => setOpen(true)}
        className='flex cursor-default gap-2.5'
      >
        Xóa
      </div>
    </div>
  );
};
