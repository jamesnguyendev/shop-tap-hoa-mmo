import PageContainer from '@/components/layout/page-container';
import FormDrawerWrapper from '@/components/modal/FormDrawerWrapper';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import ProductForm from '@/features/products/components/forms/product-form';
import ProductListingPage from '@/features/products/components/product-listing';
import { searchParamsCache } from '@/lib/searchparams';
import { DetailItem } from '@/services/product/product-detail-service';

import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'Tạp Hóa MMO: Sản phẩm'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

const data: DetailItem = {
  name: '',
  price: 0,
  category: { id: '', name: '' },
  image: {
    url: '',
    type: 'image',
    id: ''
  },
  isAvailable: false,
  rating: 0,
  id: '',
  description: ''
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Sản phẩm' description='Quản lý sản phẩm ' />
          <FormDrawerWrapper>
            <ProductForm initialData={data} pageTitle='Thêm mới sản phẩm' />
          </FormDrawerWrapper>
        </div>
        <Separator />
        <Suspense
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <ProductListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
