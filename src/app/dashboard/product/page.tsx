import Link from 'next/link';

const Page = () => {
  return (
    <Link
      href={'/'}
      className='flex h-full flex-col items-center justify-center px-5 underline'
    >
      Về trang chủ
    </Link>
  );
};

export default Page;
