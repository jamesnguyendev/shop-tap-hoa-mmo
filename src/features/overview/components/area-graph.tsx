'use client';

import { IconTrendingUp } from '@tabler/icons-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

const chartData = [
  { month: 'T 1', desktop: 186, mobile: 80 },
  { month: 'T 2', desktop: 305, mobile: 200 },
  { month: 'T 3', desktop: 237, mobile: 120 },
  { month: 'T 4', desktop: 73, mobile: 190 },
  { month: 'T 5', desktop: 209, mobile: 130 },
  { month: 'T 6', desktop: 214, mobile: 140 }
];

const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  desktop: {
    label: 'Desktop',
    color: 'var(--primary)'
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--primary)'
  }
} satisfies ChartConfig;

export function AreaGraph() {
  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Biểu đồ diện tích - Xếp chồng</CardTitle>
        <CardDescription>
          Hiển thị tổng số lượt truy cập trong 6 tháng qua
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <defs>
              <linearGradient id='fillDesktop' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-desktop)'
                  stopOpacity={1.0}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-desktop)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillMobile' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-mobile)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-mobile)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dot' />}
            />
            <Area
              dataKey='mobile'
              type='natural'
              fill='url(#fillMobile)'
              stroke='var(--color-mobile)'
              stackId='a'
            />
            <Area
              dataKey='desktop'
              type='natural'
              fill='url(#fillDesktop)'
              stroke='var(--color-desktop)'
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 leading-none font-medium'>
              Có xu hướng tăng 5,2% trong tháng này{' '}
              <IconTrendingUp className='h-4 w-4' />
            </div>
            <div className='text-muted-foreground flex items-center gap-2 leading-none'>
              Tháng 1 - 6 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
