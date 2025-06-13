import { Metadata } from 'next';
import SignUpViewPage from '@/features/auth/components/sign-up-view';

export const metadata: Metadata = {
  title: ' Đăng ký | Xác thực',
  description: 'Biểu mẫu xác thực được xây dựng bằng các thành phần.'
};
export default async function Page() {
  return <SignUpViewPage />;
}
