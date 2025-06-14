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
import { Textarea } from '@/components/ui/textarea';
import { Shop } from '@/constants/mock-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Hình là bắt buộc.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Tệp tối đa là 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp tệp là cho phép.'
    ),
  name: z.string().min(2, {
    message: 'Tên sản phẩm phải có ít nhất 2 ký tự.'
  }),
  description: z.string().min(10, {
    message: 'Mô tả ít nhất 10 ký tự.'
  }),
  descriptionShort: z.string().min(10, {
    message: 'Mô tả ngắn ít nhất 10 ký tự.'
  }),
  business: z.string().min(1, {
    message: 'Nhập ít nhất 1 ký tự.'
  }),
  shop: z.string().min(1, {
    message: 'Nhập ít nhất 1 ký tự.'
  }),
  refund: z.string().min(1, {
    message: 'Nhập ít nhất 1 ký tự.'
  })
});

export default function ShopForm({
  initialData,
  pageTitle
}: {
  initialData?: Shop | null;
  pageTitle: string;
}) {
  const defaultValues = {
    name: initialData?.name || '',
    image: initialData?.photo_url || '',
    business: initialData?.business || '',
    shop: initialData?.shop || '',
    refund: initialData?.refund || '',
    description: initialData?.description || '',
    descriptionShort: initialData?.description || ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Form submission logic would be implemented here
    console.log(values);
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
                        // pass the onUpload function here for direct upload
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
                      <Input placeholder='Nhập tên sản phẩm' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='business'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại hình kinh doanh</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value[field.value.length - 1]}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Chọn loại hình kinh doanh' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Bsán'>Bán sản phẩm</SelectItem>
                        <SelectItem value='âdf'>Dịch vụ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='shop'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại gian hàng</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value[field.value.length - 1]}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Chọn...' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='beautsy'>Mail</SelectItem>
                        <SelectItem value='Phần'>Phần mềm</SelectItem>
                        <SelectItem value='khoản'>Phần khoản</SelectItem>
                        <SelectItem value='aa'>Phần</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='refund'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Đánh giá hoàn tiền(%) - {"'"}0{"'"}: tắt
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        placeholder='Nhập giá'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='space-y-4'>
              <label className='flex items-start space-x-2'>
                <input
                  type='checkbox'
                  className='text-primary focus:ring-primary mt-1 h-4 w-4 rounded border-gray-300'
                />
                <span className='text-sm text-gray-700'>
                  Bạn có muốn cho reseller bán hàng không?
                </span>
              </label>

              <label className='flex items-start space-x-2'>
                <input
                  type='checkbox'
                  className='text-primary focus:ring-primary mt-1 h-4 w-4 rounded border-gray-300'
                />
                <span className='text-sm text-gray-700'>
                  Sản phẩm không trùng lặp (Cam kết sản phẩm chỉ được bán ra 1
                  lần và duy nhất trên hệ thống)
                </span>
              </label>

              <label className='flex items-start space-x-2'>
                <input
                  type='checkbox'
                  className='text-primary focus:ring-primary mt-1 h-4 w-4 rounded border-gray-300'
                />
                <span className='text-sm text-gray-700'>
                  Sử dụng kho hàng riêng (Hàng sẽ không tải trực tiếp lên
                  TaphoamMMO mà sử dụng API lấy hàng từ kho của bạn)
                </span>
              </label>
            </div>

            <FormField
              control={form.control}
              name='descriptionShort'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả ngắn:</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Nhập mô tả ngắn'
                      {...field}
                    />
                  </FormControl>
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
                      placeholder='Nhập mô tả sản phẩm'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='dark:text-black'>
              Thêm
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
