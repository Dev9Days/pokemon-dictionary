'use client';

import Button from '@/components/button';
import route from '@/constant/route';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="font-bold text-5xl mb-10">404 Not Found</h2>
      <h2 className="font-bold text-5xl mb-10">잘못된 페이지입니다.</h2>
      <p>
        <Button onClick={() => router.replace(route.HOME)}>메인으로</Button>
      </p>
    </div>
  );
}
