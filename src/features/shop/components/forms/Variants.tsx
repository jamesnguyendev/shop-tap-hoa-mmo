import { CircleX, Pencil } from 'lucide-react';

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
  if (variants?.length === 0) return;
  return (
    <div className=''>
      <table className='w-full border border-gray-200'>
        <thead>
          <tr>
            <th className='border px-4 py-2 text-left'>Tên biến thể</th>
            <th className='border px-4 py-2 text-left'>Giá</th>
            <th className='border px-4 py-2 text-left'>Số lượng</th>
            <th className='border px-4 py-2 text-left'>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {variants?.map((item) => (
            <tr key={item.id}>
              <td className='border px-4 py-2'>{item.name}</td>
              <td className='border px-4 py-2'>
                {item.channelListings[0].price.amount || 0}
              </td>
              <td className='border px-4 py-2'>{item.quantityAvailable}</td>
              <td className='border px-4 py-2'>
                <div className='flex gap-4'>
                  <Pencil size={20} color='orange' />
                  <CircleX size={20} color='red' />
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
