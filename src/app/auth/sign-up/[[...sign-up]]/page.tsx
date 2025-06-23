import { Metadata } from 'next';
import SignUpViewPage from '@/features/auth/components/sign-up-view';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: ' Đăng ký | Xác thực',
  description: 'Biểu mẫu xác thực được xây dựng bằng các thành phần.'
};
export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) return redirect('/dashboard/overview');
  return <SignUpViewPage />;
}
