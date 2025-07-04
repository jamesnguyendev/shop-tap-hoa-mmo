import { Input } from '@/components/ui/input';

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

const Variants = ({ variants }: { variants?: VariantProps[] }) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div>
      <table className='w-full border border-gray-200'>
        <thead>
          <tr>
            <th className='border px-4 py-2 text-left'>Tên sản phẩm</th>
            <th className='border px-4 py-2 text-left'>Giá</th>
            <th className='border px-4 py-2 text-left'>Số lượng</th>
            {/* <th className='border px-4 py-2 text-left'>Thao tác</th> */}
          </tr>
        </thead>
        <tbody>
          {variants.map((item) => (
            <tr key={item.id}>
              <td className='border px-4 py-2'>
                <Input
                  type='text'
                  defaultValue={item.name}
                  className='w-full border-0 shadow-none outline-none focus-visible:ring-0'
                />
              </td>
              <td className='border px-4 py-2'>
                <Input
                  type='number'
                  defaultValue={item.channelListings[0]?.price.amount ?? 0}
                  className='w-full border-0 shadow-none outline-none focus-visible:ring-0'
                />
              </td>
              <td className='border px-4 py-2'>
                <Input
                  type='number'
                  defaultValue={item.quantityAvailable}
                  className='w-full border-0 shadow-none outline-none focus-visible:ring-0'
                />
              </td>
              {/* <td className='border px-4 py-2'>
                <div className='flex items-center gap-2'>
                  <span className='cursor-pointer text-blue-600'>Cập nhật</span>
                  <span className='cursor-pointer text-red-600'>Xóa</span>
                  <Pencil size={20} color='orange' />
                  <CircleX size={20} color='red' />
                </div>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Variants;
