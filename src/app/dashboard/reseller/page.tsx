import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';

import { SearchParams } from 'nuqs/server';

export const metadata = {
  title: 'Tạp Hóa MMO: Quản lý đại lý'
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
          <Heading
            title='Reseller'
            description='Quản lý Reseller'
          />
        </div>
        <Separator />
      </div>
    </PageContainer>
  );
}
