'use client';

import { handleLogout } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

const SessionWatcher = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    const handleAutoLogout = () => {
      if (session.provider === 'keycloak') {
        handleLogout(session);
      } else {
        signOut();
      }
      localStorage.removeItem('loginTime');
    };

    const loginTimeKey = 'loginTime';
    const TWO_HOURS = 2 * 60 * 60 * 1000;

    if (!localStorage.getItem(loginTimeKey)) {
      localStorage.setItem(loginTimeKey, Date.now().toString());
    }

    const loginTimestamp = parseInt(
      localStorage.getItem(loginTimeKey) || '0',
      10
    );
    const now = Date.now();
    const remainingTime = TWO_HOURS - (now - loginTimestamp);

    if (remainingTime <= 0) {
      handleAutoLogout();
      return;
    }

    const timeoutId = setTimeout(() => {
      handleAutoLogout();
    }, remainingTime);

    return () => clearTimeout(timeoutId);
  }, [session]);

  return null;
};

export default SessionWatcher;
