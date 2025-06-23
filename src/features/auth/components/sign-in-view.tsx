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
import { zodResolver } from '@hookform/resolvers/zod';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Xác thực | Đăng nhập',
  description: 'Trang đăng nhập cho quản trị viên.'
};

const formSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z
    .string({
      required_error: 'Vui lòng nhập mật khẩu'
    })
    .min(6, {
      message: 'Mật khẩu phải có ít nhất 6 ký tự'
    })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function SignInViewPage() {
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    email: 'phi@gmail.com',
    password: 'phi123'
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);

    const req = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });

    setLoading(false);

    if (req?.ok) {
      toast.success('Đăng nhập thành công!');
      redirect('/');
    } else {
      toast.error('Đăng nhập không thành công');
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
            Đăng nhập vào tài khoản
          </p>
          <p className='text-sm text-gray-600 dark:text-white'>
            Chào mừng trở lại! Nhập thông tin bên dưới
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
                      placeholder='Nhập Email của bạn...'
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
            <div className='mt-3 flex justify-between'>
              <div className='flex items-center space-x-2'>
                <Input
                  id='terms'
                  type='checkbox'
                  name='remember'
                  className='h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600'
                />
                <label
                  htmlFor='terms'
                  className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white'
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <Link
                href={'/forget-password'}
                className='text-sm dark:text-white'
              >
                Quên mật khẩu?
              </Link>
            </div>
            <Button
              disabled={loading}
              className='mt-2 ml-auto w-full cursor-pointer py-5 disabled:cursor-not-allowed'
              type='submit'
            >
              {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </Button>
          </form>
        </Form>
        <Link
          href={'/auth/sign-up'}
          className='mt-2 flex justify-center text-sm hover:underline'
        >
          Chưa có tài khoản ?
        </Link>
      </div>
    </div>
  );
}
