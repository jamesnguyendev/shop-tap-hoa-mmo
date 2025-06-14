'use client';

import { useResponsiveDrawer } from '@/hooks/use-response-drawer';
import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

interface Props {
  children: ReactNode;
  triggerLabel?: string;
}

export default function FormDrawerWrapper({
  children,
  triggerLabel = 'Thêm mới'
}: Props) {
  const { open, isDesktop, setOpen } = useResponsiveDrawer();

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'default'} className='dark:text-black'>
            <Plus />
            {triggerLabel}
          </Button>
        </DialogTrigger>
        <DialogContent className='h-11/12 overflow-y-scroll scroll-smooth py-2 pt-10 sm:max-w-[850px] [&::-webkit-scrollbar]:hidden'>
          <DialogTitle hidden />
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'default'} className='dark:text-black'>
          <Plus />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className='h-screen overflow-y-scroll sm:max-w-[750px]'>
        <DialogTitle hidden />
        {children}
      </DialogContent>
    </Dialog>
  );
}
