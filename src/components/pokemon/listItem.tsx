import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Route from '@/constant/route';
import { SafeNumber } from '@/app/types/common';
import { getImageSource } from '@/app/util';

interface IProps {
  no: SafeNumber;
  name: string;
}

const ListItem = ({ no, name }: IProps) => {
  return (
    <Link href={`${Route.POKEMON}/${no}`}>
      <div className="flex flex-col items-center justify-center text-center border rounded w-32 sm:w-80 h-48">
        <Image src={getImageSource(no)} alt={name} width={96} height={96} priority />
        <div>
          {no}. {name}
        </div>
      </div>
    </Link>
  );
};

export default ListItem;
