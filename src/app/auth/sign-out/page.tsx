'use client';

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { handleLogout } from '@/lib/utils'; // Đường dẫn này bạn đã có rồi

export default function SignOutPage() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    const handleAutoLogout = () => {
      if (session.provider === 'keycloak') {
        handleLogout(session);
      } else {
        signOut({ callbackUrl: '/auth/sign-in' });
      }

      localStorage.removeItem('loginTime');
    };

    handleAutoLogout();
  }, [session]);

  return <p className='px-5'>Đang đăng xuất...</p>;
}
