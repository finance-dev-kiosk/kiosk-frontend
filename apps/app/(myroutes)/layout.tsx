import type { Metadata } from 'next';
import '@/app/globals.css';

import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: '성수맛집',
  description: '성수의 맛집을 소개합니다.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className='relative'>
      <SiteHeader />
      <div className='relative flex min-h-screen justify-center items-center'>
        {children}
      </div>
    </div>
  );
}
