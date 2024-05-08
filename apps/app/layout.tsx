import type { Metadata } from 'next';
import '@/app/globals.css';

import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: '성수맛집',
  description: '성수의 맛집을 소개합니다.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='ko'>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Toaster />
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className='flex-1'>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
