import PageContainer from '@/components/layout/page-container';
import FormDrawerWrapper from '@/components/modal/FormDrawerWrapper';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import CategoryListingPage from '@/features/category/components/category-listing';
import ShopForm from '@/features/shop/components/shop-form';
import { searchParamsCache } from '@/lib/searchparams';

import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'Tạp Hóa MMO: Danh mục sản phẩm'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Danh mục' description='Quản lý danh mục' />
          <FormDrawerWrapper>
            <ShopForm initialData={null} pageTitle='Thêm mới danh mục' />
          </FormDrawerWrapper>
        </div>
        <Separator />
        <Suspense
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <CategoryListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
