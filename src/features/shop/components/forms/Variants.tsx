'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProductVariantStore } from '@/store/shop/useProductVariantStore';
import { useRouter } from 'next/navigation';

type channelListings = {
  price: {
    amount: number;
  };
};

type VariantProps = {
  id: string;
  name: string;
  quantityAvailable: number;
  channelListings: channelListings[];
};

const Variants = ({
  productID,
  variants,
  productType,
  productName
}: {
  productID?: string;
  productName?: string;
  variants?: VariantProps[];
  productType: any;
}) => {
  const router = useRouter();
  if (!variants || variants.length === 0) return null;

  const handleClick = (pID: any, vID: any, pName: any) => {
    router.push('/dashboard/upload');
    useProductVariantStore.getState().setIDs(pID, vID, pName);
  };

  return (
    <div>
      <table className='w-full border border-gray-200'>
        <thead>
          <tr className='text-xs md:text-sm'>
            <th className='border px-4 py-2 text-left'>Tên sản phẩm</th>
            <th className='border px-4 py-2 text-left'>Giá</th>
            <th className='border px-4 py-2 text-left'>Số lượng</th>
            <th className='border px-4 py-2 text-left'>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((item) => (
            <tr key={item.id}>
              <td className='border px-4 py-2'>
                <Input
                  type='text'
                  defaultValue={item.name}
                  className='w-full shadow-none outline-none focus-visible:ring-0'
                />
              </td>
              <td className='border px-4 py-2'>
                <Input
                  type='number'
                  defaultValue={item.channelListings[0]?.price.amount ?? 0}
                  className='w-full shadow-none outline-none focus-visible:ring-0'
                />
              </td>
              <td className='border px-4 py-2'>
                <Input
                  type='number'
                  disabled
                  defaultValue={item.quantityAvailable}
                  className='w-full shadow-none outline-none focus-visible:ring-0'
                />
              </td>
              <td className='border px-4 py-2'>
                <div className='flex flex-col items-center justify-center gap-1.5 text-sm *:cursor-pointer'>
                  {productType?.id === 'UHJvZHVjdFR5cGU6Mjc=' && (
                    <Button
                      variant={'link'}
                      // href={`/dashboard/product/${productID}/${item.id}`}
                      className='hover:underline'
                      onClick={() =>
                        handleClick(productID, item.id, productName)
                      }
                    >
                      Upload
                    </Button>
                  )}
                  <span className='hover:underline'> Xóa</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Variants;
