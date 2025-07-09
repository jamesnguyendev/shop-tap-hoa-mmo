import PageContainer from '@/components/layout/page-container';
import FormDrawerWrapper from '@/components/modal/FormDrawerWrapper';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import ShopForm from '@/features/shop/components/forms/shop-form';
import ShopListingPage from '@/features/shop/components/shop-listing';
import { searchParamsCache } from '@/lib/searchparams';

import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'Tạp Hóa MMO: Gian hàng'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Shop(props: pageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Gian hàng' description='Quản lý gian hàng ' />
          <FormDrawerWrapper>
            <ShopForm pageTitle='Thêm mới gian hàng' />
          </FormDrawerWrapper>
        </div>
        <Separator />
        <Suspense
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <ShopListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
