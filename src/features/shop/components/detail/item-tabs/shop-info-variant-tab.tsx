import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { TabsContent } from '@/components/ui/tabs';
import Variants from '../../forms/Variants';
import FormDrawerWrapper from '@/components/modal/FormDrawerWrapper';
import CreateVariant from '../../forms/CreateVariant';

const ShopInfoVariantTab = ({ data }: { data: any }) => {
  return (
    <TabsContent value='sellTab'>
      <Card>
        {data?.productVariants.length !== 0 ? (
          <>
            <CardHeader>
              <CardTitle>Thông tin biến thể</CardTitle>
            </CardHeader>
            <CardContent className='grid gap-6'>
              <Variants variants={data?.productVariants} />
            </CardContent>
            <CardFooter className='flex gap-3'>
              <Button variant={'outline'}>Xác nhận</Button>
              <FormDrawerWrapper triggerLabel='Thêm'>
                <CreateVariant id={data?.id} pageTitle='Tạo biến thể' />
              </FormDrawerWrapper>
            </CardFooter>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center gap-3'>
            <p>Không có biến thể </p>
            <FormDrawerWrapper triggerLabel='Thêm'>
              <CreateVariant id={data?.id} pageTitle='Tạo biến thể' />
            </FormDrawerWrapper>{' '}
          </div>
        )}
      </Card>
    </TabsContent>
  );
};

export default ShopInfoVariantTab;
