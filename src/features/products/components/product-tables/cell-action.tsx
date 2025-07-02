'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import FormDrawerWrapper from '@/components/modal/FormDrawerWrapper';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ProductItem } from '@/services/product/product-service';
import { IconEdit, IconDotsVertical, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { getProductDetailService } from '@/services/product/product-detail-service';
import ProductForm from '../forms/product-form';
import CreateVariant from '../forms/CreateVariant';
import { PlusCircle } from 'lucide-react';

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
    const data = await getProductDetailService(session.accessToken, id);
    setProducts(data);
  };

  const onConfirm = async () => {};

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <IconDotsVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={handleDetail}
          >
            <FormDrawerWrapper icon={<IconEdit />} triggerLabel='Sửa'>
              <ProductForm initialData={products} pageTitle='Sửa sản phẩm' image />
            </FormDrawerWrapper>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDetail}
            onSelect={(e) => e.preventDefault()}
          >
            <FormDrawerWrapper
              icon={<PlusCircle />}
              triggerLabel='Tạo biến thể'
            >
              <CreateVariant id={products?.id} pageTitle='Tạo biến thể' />
            </FormDrawerWrapper>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <IconTrash className='mr-2 h-4 w-4' /> Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
