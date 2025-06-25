'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { handleLogout } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function UserNav() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClickLogout = () => {
    if (session?.provider === 'keycloak') {
      handleLogout(session);
    } else {
      signOut();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='bg-primary text-card relative h-8 w-8 rounded-full'
        >
          {session?.user?.name?.charAt(0).toUpperCase() || ''}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align='end'
        sideOffset={10}
        forceMount
      >
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>
              {session?.user?.name || 'Chưa xác định'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
            Hồ sơ
          </DropdownMenuItem>
          <DropdownMenuItem>Thanh toán</DropdownMenuItem>
          <DropdownMenuItem>Cài đặt</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleClickLogout}>
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
