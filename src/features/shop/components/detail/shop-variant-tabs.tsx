'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useShopStore } from '@/store/shop/useShopStore';
import { ShopData } from '@/types';
import Variants from '../forms/Variants';
import CreateVariant from '../forms/CreateVariant';

const ShopInfoVariantTab = () => {
  const { shop } = useShopStore();
  const data = (shop as ShopData) || [];
  return (
    <TabsContent value='sellTab'>
      <Card className='px-5'>
        {data?.productVariants?.length !== 0 ? (
          <div className='mt-2 flex flex-col gap-4 *:px-0'>
            <CardContent className='grid gap-6'>
              <Variants
                productID={data?.id}
                variants={data?.productVariants}
                productType={data.productType}
                productName={data.name}
              />
            </CardContent>
            <CardFooter className='flex justify-end gap-3 *:cursor-pointer'>
              <Button variant={'outline'}>Hủy</Button>
              <CreateVariant id={data.id} pageTitle='Thêm sản phẩm' />
            </CardFooter>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center gap-3'>
            <p>Không có sản phẩm </p>
            <CreateVariant id={data.id} pageTitle='Thêm sản phẩm' />
          </div>
        )}
      </Card>
    </TabsContent>
  );
};

export default ShopInfoVariantTab;
