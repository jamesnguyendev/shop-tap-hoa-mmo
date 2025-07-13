'use client';

import { FileUploader } from '@/components/file-uploader';
import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
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
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import {
  getUploadedFiles,
  updateFileProduct,
  urlForUpdate
} from '@/services/shop/shop-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['text/csv'];

export const SchemaImage = z.object({
  image: z
    .any()
    .refine((files) => files?.length === 1, 'File là bắt buộc.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, 'Tệp tối đa là 50MB.')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.csv là định dạng cho phép.'
    )
});

type DataPros = {
  image: string;
};

const UploadFileProduct = ({
  productID,
  variantID
}: {
  productID: string;
  variantID: string;
}) => {
  const { data: session } = useSession();
  const [dataFile, setDataFile] = useState<any>();
  const [uploadFiles, setUploadFiles] = useState<any>();
  const [flag, setFlag] = useState(false);

  const defaultValues: DataPros | null = {
    image: ''
  };

  const form = useForm<z.infer<typeof SchemaImage>>({
    resolver: zodResolver(SchemaImage),
    values: defaultValues
  });

  const isSubmitLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof SchemaImage>) {
    const data = {
      product_id: productID,
      file_name: values.image[0].name,
      variant_id: variantID
    };
    try {
      const res = await updateFileProduct(data, session?.accessToken);
      if (!res) {
        toast.error('Lỗi trong khi tải tệp của bạn');
        return;
      }

      await urlForUpdate(
        (res as { urlForUpload: string }).urlForUpload,
        session?.accessToken
      );

      toast.success('Thành công tải tệp của bạn');
      setDataFile(undefined);
      setFlag(true);
      form.reset();
    } catch (error) {
      console.error(error, 'Error in updateFileProduct');
    }
  }

  useEffect(() => {
    if (!session?.accessToken) return;

    const fetchFiles = async () => {
      const dataFiles = await getUploadedFiles(variantID, session?.accessToken);
      setUploadFiles((dataFiles as { data: [] }).data);
    };
    fetchFiles();
  }, [variantID, session?.accessToken, flag]);

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
                              onValueChange={(val) => {
                                field.onChange(val);
                                setDataFile(val);
                              }}
                              maxFiles={1}
                              maxSize={1 * 1024 * 1024}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                  {dataFile?.length === 0 ||
                    (dataFile && (
                      <Button
                        variant='default'
                        type='submit'
                        disabled={isSubmitLoading}
                        className='disabled:cursor-not-allowed disabled:opacity-70'
                      >
                        {isSubmitLoading ? 'Đang xử lý...' : 'Xác nhận'}
                      </Button>
                    ))}
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
            {uploadFiles ? (
              <div className='max-lg:overflow-x-scroll'>
                <table className='mt-10 w-full table-auto overflow-x-scroll border border-gray-200'>
                  <thead>
                    <tr>
                      <th className='border px-4 py-2 text-left'>
                        Tên mặt hàng
                      </th>
                      <th className='border px-4 py-2 text-left'>Tên file</th>
                      <th className='border px-4 py-2 text-left'>Ngày up</th>
                      <th className='border px-4 py-2 text-left'>Kết quả</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadFiles?.map((item: any) => (
                      <tr key={item.id}>
                        <td className='border px-4 py-2'> {item.productId}</td>
                        <td className='border px-4 py-2 text-blue-600 hover:cursor-pointer hover:underline'>
                          {item.fileName}
                        </td>
                        <td className='border px-4 py-2'>
                          {new Date(item.createdAt).toLocaleString('vi-VN')}
                        </td>
                        <td className='border px-4 py-2'>
                          <Badge className='bg-green-600'>{item.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default UploadFileProduct;
