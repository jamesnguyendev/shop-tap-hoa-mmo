'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className='mt-5 grid w-full grid-cols-1 gap-4 px-5 lg:flex lg:flex-auto lg:gap-0'>
      <div className='order-1 h-fit min-w-[17rem] rounded-lg border border-gray-300 p-3 lg:-order-1'>
        <Skeleton className='mb-3 h-7 w-full bg-gray-300' />
        <Skeleton className='mb-3 h-7 w-full bg-gray-300' />
        <Skeleton className='mb-3 h-7 w-full bg-gray-300' />
        <Skeleton className='mb-3 h-7 w-full bg-gray-300' />
        <Skeleton className='mb-3 h-7 w-full bg-gray-300' />
        <Skeleton className='mb-3 h-7 w-full bg-gray-300' />
      </div>
      <div className='flex w-full flex-col gap-6 lg:px-5'>
        <Skeleton className='h-7 w-60 bg-gray-300' />
        <Card className='p-6'>
          <Skeleton className='h-7 w-60 bg-gray-300' />
          <Skeleton className='h-4 w-30 bg-gray-300' />
          <Skeleton className='h-40 w-full bg-gray-300' />
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Skeleton className='mb-3 h-4 w-30 bg-gray-300' />
              <Skeleton className='h-8 w-full bg-gray-300' />
            </div>
            <div>
              <Skeleton className='mb-3 h-4 w-30 bg-gray-300' />
              <Skeleton className='h-8 w-full bg-gray-300' />
            </div>
          </div>
          <Skeleton className='h-4 w-30 bg-gray-300' />
          <Skeleton className='h-20 w-full bg-gray-300' />
          <div className='flex gap-3'>
            <Skeleton className='h-8 w-12 bg-gray-300' />
            <Skeleton className='h-8 w-12 bg-gray-300' />
            <Skeleton className='h-8 w-12 bg-gray-300' />
          </div>
        </Card>
      </div>
      <Card className='order-2 h-fit min-w-[17rem] rounded-lg border p-3 lg:order-2'>
         <Skeleton className='h-4 w-30 bg-gray-300' />
        <Skeleton className='h-4 w-30 bg-gray-300' />
        <Skeleton className='h-60 w-full rounded bg-gray-300'></Skeleton>
        <Skeleton className='h-4 w-30 bg-gray-300' />
        <Skeleton className='size-10 bg-gray-300' />
        <Skeleton className='h-2 w-10 bg-gray-300' />
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-5 w-full rounded bg-gray-300'></Skeleton>
          <Skeleton className='h-5 w-full rounded bg-gray-300'></Skeleton>
          <Skeleton className='h-5 w-full rounded bg-gray-300'></Skeleton>
        </div>
        <Skeleton className='h-7 w-full rounded bg-gray-300'></Skeleton>
        <div className='flex gap-3'>
          <Skeleton className='h-8 w-12 bg-gray-300' />
          <Skeleton className='h-8 w-12 bg-gray-300' />
          <Skeleton className='h-8 w-12 bg-gray-300' />
        </div>
      </Card>
    </div>
  );
};

export default Loading;
