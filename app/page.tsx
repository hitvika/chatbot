'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const existingUser = localStorage.getItem('userProfile');
    if (existingUser) {
      router.push('/login');
    } else {
      router.push('/signUp');
    }
  }, [router]);
  return null;
}