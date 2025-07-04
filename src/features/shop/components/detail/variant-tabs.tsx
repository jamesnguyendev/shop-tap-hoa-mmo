'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VariantActionTab from './item-tabs/variant-action-tab';
import VariantListTab from './item-tabs/variant-list-tab';
import { useState } from 'react';

const VariantTabs = ({ data }: { data: any }) => {
  const [status, setStatus] = useState<string>('infoTab');

  return (
    <div className='flex w-full flex-col gap-6 px-5'>
      <Tabs value={status} defaultValue='infoTab' onValueChange={setStatus}>
        <TabsList className='rounded-sm *:rounded'>
          <TabsTrigger value='infoTab'>Thao tác</TabsTrigger>
          <TabsTrigger value='sellTab'>Danh sách sản phẩm</TabsTrigger>
        </TabsList>
        <VariantActionTab initialData={data} />
        <VariantListTab data={data} setStatus={setStatus} />
      </Tabs>
    </div>
  );
};

export default VariantTabs;
