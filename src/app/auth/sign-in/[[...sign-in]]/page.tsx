import { Metadata } from 'next';
import SignInViewPage from '@/features/auth/components/sign-in-view';

export const metadata: Metadata = {
  title: 'Xác thực | Đăng nhập',
  description: 'Trang đăng nhập cho xác thực người dùng.'
};

export default async function Page() {
  return <SignInViewPage />;
}
