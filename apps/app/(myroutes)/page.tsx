import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageActions,
} from '@/components/page-header';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>성수맛집</PageHeaderHeading>
        <PageHeaderDescription>
          성수동에 위치한 맛집들을 소개합니다.
        </PageHeaderDescription>
        <PageActions>
          <Link href='/login' className={cn(buttonVariants())}>
            로그인
          </Link>
          <Link href='/search' className={cn(buttonVariants())}>
            검색하기
          </Link>
        </PageActions>
      </PageHeader>
    </>
  );
}
