import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';

import { TabsContent } from '@/components/ui/tabs';
import Variants from '../../forms/Variants';

const VariantListTab = ({
  data,
  setStatus
}: {
  data: any;
  setStatus: (value: string) => void;
}) => {
  return (
    <TabsContent value={'sellTab'}>
      {data?.productVariants.length !== 0 ? (
        <div className='*:px-0 flex flex-col gap-4 mt-2'>
          <CardContent className='grid gap-6'>
            <Variants variants={data?.productVariants} />
          </CardContent>
          <CardFooter className='flex gap-3'>
            <Button variant={'outline'}>Xác nhận</Button>
            <Button variant={'default'} onClick={() => setStatus('infoTab')}>
              Thêm
            </Button>
          </CardFooter>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center gap-3'>
          <p>Không có sản phẩm </p>
          <Button variant={'outline'} onClick={() => setStatus('infoTab')}>
            Xác nhận
          </Button>
        </div>
      )}
    </TabsContent>
  );
};

export default VariantListTab;
