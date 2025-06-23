import { Metadata } from 'next';
import SignInViewPage from '@/features/auth/components/sign-in-view';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Xác thực | Đăng nhập',
  description: 'Trang đăng nhập cho xác thực người dùng.'
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) return redirect('/dashboard/overview');
  return <SignInViewPage />;
}
