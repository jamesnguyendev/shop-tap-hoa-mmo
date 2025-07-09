import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';

import Variants from '../../forms/Variants';

const VariantListTab = ({ data }: { data: any }) => {
  return (
    <div>
      {data?.productVariants.length !== 0 ? (
        <div className='mt-2 flex flex-col gap-4 *:px-0'>
          <CardContent className='grid gap-6'>
            <Variants variants={data?.productVariants} />
          </CardContent>
          <CardFooter className='flex gap-3'>
            <Button variant={'outline'}>Xác nhận</Button>
            <Button variant={'default'}>Thêm</Button>
          </CardFooter>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center gap-3'>
          <p>Không có sản phẩm </p>
          <Button variant={'outline'}>Xác nhận</Button>
        </div>
      )}
    </div>
  );
};

export default VariantListTab;
