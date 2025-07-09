'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { createVariant } from '@/services/product/product-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const variantSchema = z.object({
  name: z.string().min(2, {
    message: 'Tên sản phẩm phải có ít nhất 2 ký tự.'
  }),
  price: z.number({ message: 'Giá không hợp lệ' }),
  quantity: z.number({ message: 'Số lượng không hợp lệ' })
});

type DataPros = {
  sku: string;
  name: string;
  price: number;
  quantity: number;
};

const VariantActionTab = ({ initialData }: { initialData: any }) => {
  const { data: session } = useSession();
  const SKU = `sku-${Math.random().toString(36).slice(2, 10)}`;

  const defaultValues: DataPros | null = {
    sku: '',
    name: '',
    price: 1000,
    quantity: 1
  };

  const form = useForm<z.infer<typeof variantSchema>>({
    resolver: zodResolver(variantSchema),
    values: defaultValues
  });

  const isSubmitLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof variantSchema>) {
    const data = {
      sku: SKU,
      name: values.name,
      price: values.price,
      quantity: values.quantity
    };

    try {
      await createVariant(initialData.id, data, session?.accessToken);
      form.reset();
      toast.success('Tạo sản phẩm thành công');
      window.location.reload();
    } catch (error) {
      console.log('req', error);
      toast.error('Tạo sản phẩm thất bại');
    }
  }

  return (
    <div className='mx-auto mt-3 w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập tên sản phẩm' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      step='1000'
                      placeholder='Nhập giá'
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      step='1'
                      placeholder='Nhập Số lượng'
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type='submit'
            disabled={isSubmitLoading}
            className='disabled:cursor-not-allowed disabled:opacity-70 dark:text-black'
          >
            {isSubmitLoading ? 'Đang xử lý...' : 'Xác nhận'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VariantActionTab;
