'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useSession } from 'next-auth/react';
import { stringToSlug } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  CategoryItem,
  getCategoryService
} from '@/services/category/category-service';
import { createProduct } from '@/services/product/product-service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ShopSchema } from '@/schemas/shop/shop-schema';
import { getProductTypes, productTypeItem } from '@/services/shop/shop-service';

export default function ShopForm({ pageTitle }: { pageTitle: string }) {
  const { data: session } = useSession();

  const [productType, setProductType] = useState<productTypeItem[]>([]);
  const [category, setCategory] = useState<CategoryItem[]>([]);
  const [selectedProductTypeId, setSelectedProductTypeId] =
    useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (!session?.accessToken) return;

    const fetchProductTypes = async () => {
      try {
        const data = await getProductTypes(session?.accessToken);
        setProductType(data?.productTypes);
      } catch (error) {
        console.error('Lỗi nạp loại sản phẩm :', error);
      }
    };
    fetchProductTypes();
  }, [session?.accessToken]);

  useEffect(() => {
    if (!session?.accessToken || !selectedProductTypeId) return;

    const fetchCategories = async () => {
      try {
        const category = await getCategoryService(
          session?.accessToken,
          selectedProductTypeId
        );
        setCategory(category?.categories);
      } catch (error) {
        console.error('Lỗi nạp danh mục :', error);
      }
    };
    fetchCategories();
  }, [session?.accessToken, selectedProductTypeId]);

  const defaultValues = {
    name: '',
    productType: '',
    category: '',
    image: undefined
  };

  type ShopFormValues = z.infer<typeof ShopSchema>;

  const form = useForm<ShopFormValues>({
    resolver: zodResolver(ShopSchema),
    values: defaultValues
  });

  const isSubmitLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof ShopSchema>) {
    const payLoad = {
      name: values.name,
      slug: stringToSlug(values.name),
      category: values.category,
      productType: values.productType,
      metadata: [
        {
          key: 'Product Name',
          value: values.name
        }
      ]
    };

    try {
      const res = await createProduct(payLoad, session?.accessToken);
      toast.success('Thêm thành công');
      router.push(
        `/dashboard/shop/${(res as { product: { id: string } }).product.id}`
      );
      form.reset();
    } catch (error) {
      console.error('  Error:', JSON.stringify(error, null, 2));
      toast.error('Thêm thất bại');
    }
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên gian hàng</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tên gian hàng' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='productType'
                render={({ field }) => (
                  <FormItem className='*:min-w-full'>
                    <FormLabel>Loại sản phẩm</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedProductTypeId(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn sản phẩm' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productType.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem className='*:min-w-full'>
                    <FormLabel>Danh mục</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger disabled={!selectedProductTypeId}>
                          <SelectValue
                            placeholder={`${!selectedProductTypeId ? 'Chưa chọn loại sản phẩm' : 'Chọn danh mục'} `}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {category.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Nhập mô tả gian hàng'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex gap-3'>
              <Button
                type='submit'
                disabled={isSubmitLoading}
                className='hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 dark:text-black'
              >
                {isSubmitLoading ? 'Đang xử lý...' : 'Xác nhận'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
