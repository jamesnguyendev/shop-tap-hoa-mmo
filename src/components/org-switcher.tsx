'use client';

import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';

export function OrgSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='flex aspect-square size-8 items-center justify-center'>
                <Image
                  src={'/images/mmo.png'}
                  height={30}
                  width={20}
                  className='size-6'
                  alt='Icon site'
                />
              </div>
              <div className='flex flex-col gap-0.5 leading-none'>
                <Link
                  href={'/dashboard/overview'}
                  className='text-lg font-semibold'
                >
                  Tạp Hóa MMO
                </Link>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
