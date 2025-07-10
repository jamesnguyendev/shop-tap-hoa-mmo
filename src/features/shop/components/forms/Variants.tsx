import { Input } from '@/components/ui/input';
import { Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';

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
  variants,
  productType
}: {
  variants?: VariantProps[];
  productType: any;
}) => {
  if (!variants || variants.length === 0) return null;

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
                  defaultValue={item.quantityAvailable}
                  className='w-full shadow-none outline-none focus-visible:ring-0'
                />
              </td>
              <td className='border px-4 py-2'>
                <div className='flex items-center justify-center gap-4 *:cursor-pointer'>
                  {productType?.id === 'UHJvZHVjdFR5cGU6Mjc=' && (
                    <Link href={`/dashboard/product/${item.id}`}>
                      <Eye size={20} color='black' />
                    </Link>
                  )}
                  <Trash2 size={20} color='red' />
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
