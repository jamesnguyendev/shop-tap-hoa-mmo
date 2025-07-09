'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ShopInfoTab from './item-tabs/shop-info-tab';
import ShopInfoVariantTab from './shop-variant-tabs';
import { Card } from '@/components/ui/card';

const ShopTabs = ({ data }: { data: any }) => {
  return (
    <div className='flex w-full flex-col gap-6 lg:px-5'>
      <Tabs
        defaultValue='info'
        className='overflow-hidden *:justify-start *:p-6 first:*:px-0'
      >
        <TabsList className='dark:*:data-[state=active]:border-b-input *:data-[state=active]:border-b-primary *:text-muted-foreground *:data-[state=active]:text-primary w-full rounded-sm border-y-4 border-transparent *:flex-0 *:cursor-pointer *:rounded-none *:border-b-4 *:border-b-transparent *:p-6 *:data-[state=active]:border-b-4 *:data-[state=active]:bg-transparent *:data-[state=active]:shadow-none dark:*:data-[state=active]:border-t-transparent dark:*:data-[state=active]:border-r-transparent dark:*:data-[state=active]:border-l-transparent'>
          <TabsTrigger value='info' className='rounded-s-sm!'>
            Thông tin cơ bản
          </TabsTrigger>
          <TabsTrigger value='sellTab'>Thông tin sản phẩm</TabsTrigger>
          <TabsTrigger value='v'>Vận chuyển</TabsTrigger>
          <TabsTrigger value='t'>Thông tin khác</TabsTrigger>
        </TabsList>
        <ShopInfoTab initialData={data} pageTitle='Thông tin cơ bản' />
        <ShopInfoVariantTab data={data} />
        <TabsContent value='v'>
          <Card className='px-5'>Vận chuyển</Card>
        </TabsContent>
        <TabsContent value='t'>
          <Card className='px-5'>Thông tin khác</Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopTabs;
