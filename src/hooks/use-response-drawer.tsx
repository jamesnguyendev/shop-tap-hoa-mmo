'use client';

import { useState } from 'react';
import { useMediaQuery } from './use-media-query';

export function useResponsiveDrawer() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return {
    open,
    setOpen,
    isDesktop
  };
}
