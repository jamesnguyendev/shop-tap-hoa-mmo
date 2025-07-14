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
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { useShopStore } from '@/store/shop/useShopStore';

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

const CreateVariant = ({
  id,
  pageTitle
}: {
  id: string;
  pageTitle: string;
}) => {
  const { data: session } = useSession();
  const { reloadShop } = useShopStore();
  const SKU = `sku-${Math.random().toString(36).slice(2, 10)}`;

  const isMobile = useIsMobile();
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
      await createVariant(id, data, session?.accessToken);
      reloadShop();
      form.reset();
      toast.success('Tạo sản phẩm thành công');
    } catch (error) {
      console.log('req', error);
      toast.error('Tạo sản phẩm thất bại');
    }
  }

  return (
    <Drawer direction={`${isMobile ? 'bottom' : 'right'}`}>
      <DrawerTrigger asChild>
        <Button variant={'default'}>Thêm</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-lg'>
          <DrawerHeader>
            <DrawerTitle>{pageTitle}</DrawerTitle>
          </DrawerHeader>
          <div className='p-4 pb-0'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                <div className='mb-5 grid grid-cols-1 gap-3 md:grid-cols-2'>
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
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex flex-col gap-3 lg:flex-row'>
                  <Button
                    type='submit'
                    disabled={isSubmitLoading}
                    className='disabled:cursor-not-allowed disabled:opacity-70 dark:text-black'
                  >
                    {isSubmitLoading ? 'Đang xử lý...' : 'Xác nhận'}
                  </Button>
                  <DrawerClose asChild>
                    <Button variant='outline'>Hủy</Button>
                  </DrawerClose>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateVariant;
