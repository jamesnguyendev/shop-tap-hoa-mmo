'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { stringToSlug } from '@/lib/utils';
import {
  CategoryItem,
  getCategoryService
} from '@/services/category/category-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ShopSchema } from '@/schemas/shop/shop-schema';
import FormDrawerWrapper from '@/components/modal/FormDrawerWrapper';
import ShopForm from '../../forms/shop-form';
import { getProductTypes, productTypeItem } from '@/services/shop/shop-service';

const ShopInfoTab = ({
  initialData,
  pageTitle
}: {
  initialData: any;
  pageTitle: string;
}) => {
  const { data: session } = useSession();
  const [category, setCategory] = useState<CategoryItem[]>([]);
  const [productType, setProductType] = useState<productTypeItem[]>([]);
  const [selectedProductTypeId, setSelectedProductTypeId] =
    useState<string>('');

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
    const productType = selectedProductTypeId
      ? selectedProductTypeId
      : initialData?.productType?.id;

    if (!session?.accessToken || !productType) return;

    const fetchCategories = async () => {
      try {
        const category = await getCategoryService(
          session?.accessToken,
          productType
        );
        setCategory(category?.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [
    session?.accessToken,
    initialData?.productType?.id,
    selectedProductTypeId
  ]);

  const defaultValues = {
    name: initialData?.name || '',
    category: initialData?.category?.id || '',
    productType: initialData?.productType?.id || '',
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
      // const header = {
      //   PRODUCT_ID: initialData?.id,
      //   SHOP_ID: '123',
      //   VARIANT_ID: '123'
      // };
      // await uploadImage(initialData?.image?.url, header);

      toast.success('Cập nhật thành công');
      // window.location.reload();
      // form.reset();
    } catch (error) {
      console.log('req', error, payLoad);
    }
  }

  return (
    <TabsContent value='info' className='w-full'>
      <Card className='mx-auto min-w-full'>
        <CardHeader>
          <CardTitle className='flex justify-between text-left text-2xl font-bold'>
            {pageTitle}{' '}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <div className='space-y-6'>
                    <FormItem className='w-full'>
                      <FormLabel>Hình ảnh</FormLabel>
                      <FormControl>
                        <FileUploader
                          value={field.value}
                          onValueChange={field.onChange}
                          maxFiles={4}
                          maxSize={4 * 1024 * 1024}
                          // disabled={loading}
                          // progresses={progresses}
                          // onUpload={uploadFiles}
                          // disabled={isUploading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />

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
              </div>
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem className='*:min-w-1/2'>
                    <FormLabel>Danh mục</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn danh mục' />
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
                <Button variant={'outline'}>Hủy</Button>
                <Button
                  variant={'outline'}
                  type='submit'
                  disabled={isSubmitLoading}
                  className='disabled:cursor-not-allowed disabled:opacity-70'
                >
                  {isSubmitLoading ? 'Đang xử lý...' : 'Xác nhận'}
                </Button>
                <FormDrawerWrapper>
                  <ShopForm pageTitle='Thêm mới' />
                </FormDrawerWrapper>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default ShopInfoTab;
