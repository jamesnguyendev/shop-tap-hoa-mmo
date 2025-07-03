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
  icon?: ReactNode;
}

export default function FormDrawerWrapper({
  children,
  triggerLabel = 'Thêm mới',
  icon
}: Props) {
  const { open, isDesktop, setOpen } = useResponsiveDrawer();

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {icon ? (
            <div className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              {triggerLabel}
            </div>
          ) : (
            <Button variant={'default'} className='dark:text-black'>
              <Plus />
              {triggerLabel}
            </Button>
          )}
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
          {icon ?? <Plus />}
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
