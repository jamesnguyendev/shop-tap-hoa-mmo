import PageContainer from '@/components/layout/page-container';
import ReviewProduct from '@/features/shop/components/detail/review-product';
import ShopTabs from '@/features/shop/components/detail/shop-tabs';
import SuggestInfo from '@/features/shop/components/detail/suggest-info';
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
      <div className='grid w-full grid-cols-1 gap-4 lg:flex lg:flex-auto lg:gap-0'>
        <div className='order-1 lg:-order-1'>
          <SuggestInfo />
        </div>
        <ShopTabs data={data} />
        <div className='order-2 lg:order-2'>
          <ReviewProduct />
        </div>
      </div>
    </PageContainer>
  );
}
