'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ShopInfoTab from './item-tabs/shop-info-tab';
import ShopInfoVariantTab from './item-tabs/shop-info-variant-tab';

const ShopTabs = ({ data }: { data: any }) => {
  return (
    <div className='flex w-full flex-col gap-6 lg:px-5'>
      <Tabs defaultValue='info'>
        <TabsList className='rounded-sm *:rounded'>
          <TabsTrigger value='info'>Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value='sellTab'>Thông tin sản phẩm</TabsTrigger>
        </TabsList>
        <ShopInfoTab initialData={data} pageTitle='Thông tin cơ bản' />
        <ShopInfoVariantTab data={data} />
      </Tabs>
    </div>
  );
};

export default ShopTabs;
