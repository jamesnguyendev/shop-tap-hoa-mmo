'use client';

import { FileUploader } from '@/components/file-uploader';
import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export const SchemaImage = z.object({
  image: z
    .any()
    .refine((files) => files?.length === 1, 'Hình là bắt buộc.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, 'Tệp tối đa là 50MB.')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png và .webp là định dạng cho phép.'
    )
});

type DataPros = {
  image: string;
};

const UploadFileProduct = () => {
  const defaultValues: DataPros | null = {
    image: ''
  };

  const form = useForm<z.infer<typeof SchemaImage>>({
    resolver: zodResolver(SchemaImage),
    values: defaultValues
  });

  //   const isSubmitLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof SchemaImage>) {
    console.log('Console in /dashboard/product/[id]', values);
  }

  return (
    <PageContainer>
      <div className='w-full'>
        <Card className='mx-auto'>
          <CardHeader>
            <CardTitle className='flex justify-between text-left text-2xl font-bold'>
              Thông tin chi tiết sản phẩn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='col-span-2 space-y-8'
                >
                  <FormField
                    control={form.control}
                    name='image'
                    render={({ field }) => (
                      <div className='space-y-6'>
                        <FormItem className='w-full'>
                          <FormLabel>File sản phẩm</FormLabel>
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
                </form>
                <div className='col-span-1 mt-5'>
                  <Card className='h-full gap-1.5 px-2.5'>
                    <span className='line-clamp-2 text-red-500'>
                      Chú ý: File tải lên mỗi dòng là 1 sản phẩm. Cấu trúc dòng:
                    </span>
                    <ul className='list-disc ps-5'>
                      <li>
                        <div className='line-clamp-1'>
                          Email: username@gmail.com | password | ...
                        </div>
                      </li>
                      <li>
                        <div className='line-clamp-1'>Phần mềm: xx...</div>
                      </li>
                      <li>
                        <div className='line-clamp-1'>
                          Tài khoản: username | password...
                        </div>
                      </li>
                      <li>
                        <div className='line-clamp-1'>Loại khác: xx...</div>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
            </Form>
            <table className='mt-10 w-full border border-gray-200'>
              <thead>
                <tr>
                  <th className='border px-4 py-2 text-left'>Tên sản phẩm</th>
                  <th className='border px-4 py-2 text-left'>Tên file</th>
                  <th className='border px-4 py-2 text-left'>Ngày up</th>
                  <th className='border px-4 py-2 text-left'>Kết quả</th>
                </tr>
              </thead>
              <tbody>
                {/* {variants.map((item) => ( */}
                <tr>
                  <td className='border px-4 py-2'>
                    clone 50 - 500bb {'>'} 8 tháng
                  </td>
                  <td className='border px-4 py-2 text-blue-600 hover:cursor-pointer hover:underline'>
                    text.txt.log
                  </td>
                  <td className='border px-4 py-2'>22/02/2023 22:30</td>
                  <td className='border px-4 py-2'>
                    <Badge className='bg-green-600'>Thành công</Badge>
                  </td>
                </tr>
                {/* ))} */}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default UploadFileProduct;
