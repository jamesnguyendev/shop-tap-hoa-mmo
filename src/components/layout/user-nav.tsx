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
import { useRouter } from 'next/navigation';

export function UserNav() {
  const router = useRouter();

  // if (user) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='bg-primary text-card relative h-8 w-8 rounded-full'
        >
          {/* <UserAvatarProfile user={user} /> */}p
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
              {/* {user.fullName} */}
              Teo nguyen
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
        <DropdownMenuItem>
          {/* <SignOutButton redirectUrl='/auth/sign-in' /> */}
          {/* Sign Out Button display here */}Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  // }
}
