'use client';

import Button from '@/components/button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="font-bold text-5xl mb-10">포켓몬이 없습니다!</h2>
      <p>
        <Button onClick={() => router.back()}>뒤로가기</Button>
      </p>
    </div>
  );
}
