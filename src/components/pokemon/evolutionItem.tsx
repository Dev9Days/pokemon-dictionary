import React from 'react';
import NextImage from '@/components/image';
import Link from 'next/link';
import route from '@/constant/route';

interface IProps {
  no: number;
  imgSrc: string;
  name: string;
}

const EvolutionItem = ({ no, imgSrc, name }: IProps) => {
  return (
    <Link href={`${route.POKEMON}/${no}`} className="w-full">
      <div className="relative flex flex-col items-center justify-center text-center border rounded w-full py-3 bg-white">
        <div className="absolute top-0 text-gray-500 w-full">
          {no}. {name}
        </div>
        <div className="w-auto h-auto">
          <NextImage src={imgSrc} alt={name} width={96} height={96} draggable={false} />
        </div>
      </div>
    </Link>
  );
};

export default EvolutionItem;
