'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import Button from '@/components/button';
import route from '@/constant/route';
import cn from 'classnames';

const DetailNavigation = () => {
  const params = useParams();
  const no = Number(params.no) || 0;
  const isRightNo = useMemo(() => no >= 1 && no <= 1010, [no]);

  if (!isRightNo) {
    notFound();
  }

  return (
    <div className="fixed flex justify-between w-full left-0 top-1/2 px-4">
      <Button className={cn('rotate-180', no === 1 && ['opacity-0', 'pointer-events-none'])}>
        <Link href={`${route.POKEMON}/${no - 1}`}>➜</Link>
      </Button>
      <Button className={cn(no === 1010 && ['opacity-0', 'pointer-events-none'])}>
        <Link href={`${route.POKEMON}/${no + 1}`}>➜</Link>
      </Button>
    </div>
  );
};

export default DetailNavigation;
