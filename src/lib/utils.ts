import { type ClassValue, clsx } from 'clsx';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytest')
      : (sizes[i] ?? 'Bytes')
  }`;
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const formattedNumber = (number: number | string | undefined) => {
  const currency = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
    .format(Number(number))
    .replace(/\./g, ',');
  if (isNaN(Number(number))) return '...';
  return currency;
};

export const stringToSlug = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const handleLogout = async (session: Session) => {
  await signOut({ redirect: false });

  const idToken = session?.idToken;

  const logoutUrl = new URL(
    `${process.env.NEXT_PUBLIC_ACCESS_TOKEN}/logout` || ''
  );
  if (idToken) {
    logoutUrl.searchParams.append('id_token_hint', idToken);
  }
  logoutUrl.searchParams.append(
    'post_logout_redirect_uri',
    `${process.env.NEXT_PUBLIC_URL}`
  );

  window.location.href = logoutUrl.toString();
};
