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
        handleLogout(session); // 👈 Gọi logout qua Keycloak
      } else {
        signOut({ callbackUrl: '/auth/sign-in' }); // 👈 Gọi logout NextAuth
      }

      localStorage.removeItem('loginTime'); // ✅ Xoá loginTime
    };

    handleAutoLogout();
  }, [session]);

  return <p>Đang đăng xuất...</p>;
}
