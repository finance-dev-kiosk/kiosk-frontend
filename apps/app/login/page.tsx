'use client';

import React, { FormEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export type JWT = {
  id: string;
  token: string;
};

export default function Login() {
  const [userId, setId] = useState('');
  const [password, setPassword] = useState('');
  const [userIdError, setUserIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      toast({
        title: '이미 로그인이 된 상태입니다.',
        description: '로그인 페이지로 이동할 수 없습니다.',
      });
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginFetch = async (e: FormEvent) => {
    e.preventDefault();

    const userIdError = !userId.trim();
    const passwordError = !password.trim();

    setUserIdError(userIdError);
    setPasswordError(passwordError);

    if (userIdError || passwordError) {
      toast({
        title: '로그인할 수 없습니다.',
        description: '유효성 검사에 실패한 항목이 있습니다.',
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/v1/api/user/login?userId=${userId}&password=${password}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      if (data.accessToken) {
        const jwt: JWT = {
          id: userId,
          token: data.accessToken,
        };

        localStorage.setItem('jwt', JSON.stringify(jwt));

        toast({
          title: '로그인이 성공하였습니다.',
          description: '로그인이 완료되었습니다.',
        });

        router.push('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: '로그인이 실패하였습니다.',
          description: error.message.match(/\((.*?)\)/)?.[1],
        });
      } else {
        toast({
          title: '로그인이 실패하였습니다.',
          description: '알 수 없는 오류가 발생했습니다.',
        });
      }
    }
  };

  return (
    <>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>로그인</CardTitle>
          <CardDescription>아이디와 비밀번호를 입력하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={loginFetch}>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='id'>아이디</Label>
                <Input
                  id='id'
                  type='id'
                  placeholder='아이디를 입력하세요...'
                  value={userId}
                  onChange={(e) => {
                    setId(e.target.value);
                    setUserIdError(false);
                  }}
                />
                <div style={{ minHeight: '1.5rem' }}>
                  {' '}
                  {userIdError && (
                    <div className='text-sm text-red-500'>{`아이디가 입력되지 않았습니다.`}</div>
                  )}
                </div>
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>비밀번호</Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  placeholder='비밀번호를 입력하세요...'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                />
                <div style={{ minHeight: '1.5rem' }}>
                  {' '}
                  {passwordError && (
                    <div className='text-sm text-red-500'>{`비밀번호가 입력되지 않았습니다.`}</div>
                  )}
                </div>
              </div>
              <Button type='submit' className='w-full'>
                {'로그인'}
              </Button>
            </div>
          </form>
          <div className='mt-4 text-center text-sm'>
            계정이 없으신가요?{' '}
            <Link href='/register' className='underline'>
              회원가입
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
