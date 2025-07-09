'use client';

import { Card } from '@/components/ui/card';

import { TabsContent } from '@/components/ui/tabs';

// import VariantActionTab from './item-tabs/variant-action-tab';
import VariantListTab from './item-tabs/variant-list-tab';

const ShopInfoVariantTab = ({ data }: { data: any }) => {
  return (
    <TabsContent value='sellTab'>
      <Card className='px-5'>
        {/* <VariantActionTab initialData={data} /> */}
        <VariantListTab data={data} />
      </Card>
    </TabsContent>
  );
};

export default ShopInfoVariantTab;
