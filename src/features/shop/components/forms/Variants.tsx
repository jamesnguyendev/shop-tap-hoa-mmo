'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProductVariantStore } from '@/store/shop/useProductVariantStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Types

type ChannelListing = {
  price: {
    amount: number;
  };
};

type VariantProps = {
  id: string;
  name: string;
  quantityAvailable: number;
  channelListings: ChannelListing[];
};

type VariantsProps = {
  productID?: string;
  productName?: string;
  variants?: VariantProps[];
  productType: any;
};

const Variants = ({
  productID,
  variants,
  productType,
  productName
}: VariantsProps) => {
  const router = useRouter();

  const [variantPrices, setVariantPrices] = useState<Record<string, number>>(
    () =>
      Object.fromEntries(
        (variants ?? []).map((item) => [
          item.id,
          item.channelListings[0]?.price.amount ?? 0
        ])
      )
  );

  if (!variants || variants.length === 0) return null;

  const handleClick = (pID: string, vID: string, pName: string) => {
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
                  type='text'
                  className='w-full shadow-none outline-none focus-visible:ring-0'
                  value={
                    variantPrices[item.id]
                      ? variantPrices[item.id].toLocaleString('vi-VN')
                      : ''
                  }
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '');
                    const number = Number(raw);
                    if (number <= 100_000_000) {
                      setVariantPrices((prev) => ({
                        ...prev,
                        [item.id]: number
                      }));
                    }
                  }}
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
                      variant='link'
                      className='hover:underline'
                      onClick={() =>
                        handleClick(productID!, item.id, productName!)
                      }
                    >
                      Upload
                    </Button>
                  )}
                  <span className='hover:underline'>Xóa</span>
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
