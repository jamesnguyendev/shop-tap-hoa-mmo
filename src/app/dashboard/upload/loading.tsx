'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';

const Loading = () => {
  return (
    <div className='px-5'>
      <Card className='p-4'>
        <Skeleton className='h-8 w-40 bg-gray-300' />
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <div className='col-span-2 rounded-lg'>
            <div className='flex flex-col gap-3'>
              <Skeleton className='h-6 w-28 bg-gray-300' />
              <Skeleton className='h-48 w-full bg-gray-300' />
            </div>
          </div>
          <div className='col-span-1 rounded-lg'>
            <div className='flex flex-col gap-3'>
              <Skeleton className='h-6 w-28 bg-gray-300' />
              <Skeleton className='h-48 w-full bg-gray-300' />
            </div>
          </div>
        </div>
        <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
      </Card>
    </div>
  );
};

export default Loading;
