'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(p0?: string) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(p0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsOpen(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsOpen(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return { isOpen };
}
