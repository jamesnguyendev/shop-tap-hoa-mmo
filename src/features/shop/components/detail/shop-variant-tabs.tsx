'use client';

import { Card } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import VariantListTab from './item-tabs/variant-list-tab';

const ShopInfoVariantTab = ({ data }: { data: any }) => {
  return (
    <TabsContent value='sellTab'>
      <Card className='px-5'>
        <VariantListTab data={data} />
      </Card>
    </TabsContent>
  );
};

export default ShopInfoVariantTab;
