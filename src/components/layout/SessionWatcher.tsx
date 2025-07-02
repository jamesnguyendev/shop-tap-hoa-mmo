'use client';

import { handleLogout } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

const SessionWatcher = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    const intervalId = setInterval(
      () => {
        if (session.provider === 'keycloak') {
          handleLogout(session);
        } else {
          signOut();
        }
      },
      2 * 60 * 60 * 1000
    );

    return () => clearInterval(intervalId);
  }, [session]);

  return null;
};

export default SessionWatcher;
