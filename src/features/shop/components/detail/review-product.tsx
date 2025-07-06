import { Button } from '@/components/ui/button';
import { MessageCircle, PlusCircle, ShoppingBag } from 'lucide-react';

const ReviewProduct = () => {
  return (
    <div className='h-fit min-w-[17rem] rounded-lg border *:p-3'>
      <h5 className='font-semibold'>Xem trước</h5>
      <div className='flex flex-col gap-3'>
        <div className=''>Chi tiết sản phẩm</div>
        <div className='h-60 w-full rounded bg-gray-300'></div>
        <span>0 phân loại có sẵn</span>
        <div className='dark:bg-card flex size-10 items-center justify-center rounded bg-gray-300'>
          <ShoppingBag size={15} />
        </div>
        <div className=''>--.--</div>
        <div className='flex flex-col gap-2'>
          <div className='h-5 w-full rounded bg-gray-300'></div>
          <div className='h-5 w-full rounded bg-gray-300'></div>
          <div className='h-5 w-full rounded bg-gray-300'></div>
        </div>
        <div className='mt-4 flex items-center gap-2'>
          <div className='size-10 rounded-full bg-gray-300'></div>
          <span className='line-clamp-1 font-semibold md:text-lg'>James</span>
          <Button variant={'outline'} className='ml-auto'>
            Xem
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button variant={'outline'}>
            <MessageCircle />
          </Button>
          <Button variant={'outline'}>
            <PlusCircle />
          </Button>
          <Button variant={'default'}>Mua ngay</Button>
        </div>
        <span className='text-primary text-xs'>
          Hình ảnh có tính chất tham khảo không phải hình ảnh cuối cùng người
          dùng thấy
        </span>
      </div>
    </div>
  );
};

export default ReviewProduct;
