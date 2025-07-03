import PageContainer from '@/components/layout/page-container';
import ShopTabs from '@/features/shop/components/detail/shop-tabs';
import { authOptions } from '@/lib/auth/authOptions';
import { getShopDetailService } from '@/services/shop/shop-detail-service';
import { getServerSession } from 'next-auth';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const decodedId = decodeURIComponent(id);
  const session = await getServerSession(authOptions);

  const data = await getShopDetailService(session?.accessToken, decodedId);

  return (
    <PageContainer>
      {/* <SuggestInfo /> */}
      <ShopTabs data={data} />
    </PageContainer>
  );
}
