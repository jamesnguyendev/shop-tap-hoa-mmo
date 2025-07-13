import { Input } from '@/components/ui/input';
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
  productID,
  variants,
  productType
}: {
  productID?: string;
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
                <div className='flex flex-col items-center justify-center gap-1.5 text-sm *:cursor-pointer'>
                  {productType?.id === 'UHJvZHVjdFR5cGU6Mjc=' && (
                    <Link
                      href={`/dashboard/product/${productID}/${item.id}`}
                      className='hover:underline'
                    >
                      Upload
                    </Link>
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
