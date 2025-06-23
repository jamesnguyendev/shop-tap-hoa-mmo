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
import { postRequest } from '@/utils/apiClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const metadata: Metadata = {
  title: 'Xác thực | Đăng ký',
  description: 'Trang đăng ký cho quản trị viên.'
};

const passwordField = z
  .string({ required_error: 'Vui lòng nhập mật khẩu' })
  .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' });

const formSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  name: z.string().min(1, { message: 'Vui lòng nhập tên của bạn' }),
  password: passwordField,
  rePassword: passwordField
});

type UserFormValue = z.infer<typeof formSchema>;

export default function SignUpViewPage() {
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    email: 'aphi123@gmail.com',
    name: 'Aphi',
    password: 'aphi123',
    rePassword: 'aphi123'
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);

    const res = await postRequest(
      `${process.env.NEXT_PUBLIC_API_REGISTER_ACCOUNT}`,
      {
        email: data.email,
        name: data.name,
        password: data.password
      }
    );

    setLoading(false);

    if ((res as { status?: number })?.status === 201) {
      toast.success('Đăng ký thành công!');
      redirect('/auth/sign-in');
    } else {
      toast.error('Đăng ký không thành công');
    }
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-50 max-lg:px-5 dark:bg-[hsl(224,71%,4%)]'>
      <div className='dark:bg-accent w-full rounded-2xl bg-white px-4 py-3 shadow-xl md:w-[450px]'>
        <div className='flex flex-col items-center py-4'>
          <Image
            src={'/images/mmo.png'}
            alt='logo of site'
            width={60}
            height={30}
          />
          <p className='mt-6 mb-2 text-2xl font-semibold text-gray-800 dark:text-white'>
            Đăng ký tài khoản
          </p>
          <p className='text-sm text-gray-600 dark:text-white'>
            Đảm bảo thông tin cung cấp là chính xác !!!
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-2'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=' '>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      className='py-5'
                      placeholder='Nhập tên của bạn...'
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=' '>Tên</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      className='py-5'
                      placeholder='Nhập tên của bạn...'
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='my-6'>
                  <FormLabel className=' '>Mật Khẩu:</FormLabel>
                  <FormControl>
                    <Input
                      className='py-5'
                      type='password'
                      placeholder='Nhập mật khẩu của bạn...'
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='rePassword'
              render={({ field }) => (
                <FormItem className='my-6'>
                  <FormLabel className=' '>Nhập Lại Mật Khẩu:</FormLabel>
                  <FormControl>
                    <Input
                      className='py-5'
                      type='password'
                      placeholder='Nhập lại mật khẩu của bạn...'
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              className='mt-2 ml-auto w-full cursor-pointer py-5 disabled:cursor-not-allowed'
              type='submit'
            >
              {loading ? 'Đang xử lý...' : 'Đăng ký'}
            </Button>
          </form>
        </Form>
        <Link
          href={'/auth/sign-in'}
          className='mt-2 flex justify-center text-sm hover:underline'
        >
          Đã có tài khoản?
        </Link>
      </div>
    </div>
  );
}
