import { Card } from '@/components/ui/card';

import { TabsContent } from '@/components/ui/tabs';

import VariantTabs from '../variant-tabs';

const ShopInfoVariantTab = ({ data }: { data: any }) => {
  return (
    <TabsContent value='sellTab'>
      <Card>
        <VariantTabs data={data} />
      </Card>
    </TabsContent>
  );
};

export default ShopInfoVariantTab;
