import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: '성수맛집::로그인',
  description: '성수맛집에 로그인을 합니다.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className='relative flex min-h-screen justify-center items-center'>
      <div className='flex-1'>{children}</div>
    </div>
  );
}
