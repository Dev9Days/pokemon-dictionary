'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { PokemonDetailData } from '@/app/types/pokemon';
import route from '@/constant/route';
import NextImage from '@/components/image';
import Radio from '@/components/radio';
import Search from '@/components/search';
import ContentCarousel from '@/components/swiper';
import DetailNavigation from './detailNavigation';
import EvolutionItem from './evolutionItem';

interface IProps {
  detailData: PokemonDetailData;
}

const DetailItem = ({ detailData }: IProps) => {
  const router = useRouter();

  const [selectedVersion, setSelectedVersion] = useState<string>('x');
  const [slideToIndex, setSlideToIndex] = useState<number>(0);

  useEffect(() => {
    if (detailData.description && detailData.description[detailData.regionNo]) {
      const firstVer = Object.entries(detailData.description[detailData.regionNo])[0][0];
      setSelectedVersion(firstVer);
    }
  }, [detailData]);

  const onSearch = async (no: number) => {
    router.push(`${route.POKEMON}/${no}`);
  };

  return (
    <>
      <div className="w-2/3">
        <Search searchNo={0} onSearch={onSearch} />
      </div>
      <div className="flex flex-col border rounded p-6 w-2/3" style={{ minWidth: 375, minHeight: 575 }}>
        <div className="flex">
          <div className="border rounded bg-white" style={{ width: 96 }}>
            <ContentCarousel
              pagination
              contents={
                detailData.sprites.front
                  ? [
                      {
                        slideKey: detailData.sprites.front,
                        element: (
                          <NextImage
                            src={detailData.sprites.front}
                            alt={detailData.sprites.front}
                            width={96}
                            height={96}
                            draggable={false}
                          />
                        ),
                      },
                      {
                        slideKey: detailData.sprites.back,
                        element: (
                          <NextImage
                            src={detailData.sprites.back}
                            alt={detailData.sprites.back}
                            width={96}
                            height={96}
                            draggable={false}
                          />
                        ),
                      },
                    ]
                  : undefined
              }
            />
          </div>
          <div className="ml-3">
            <div>No. {detailData.no}</div>
            <div>
              이름 : <h1 className="inline-block">{detailData.names?.[detailData.regionNo]}</h1>
            </div>
            <div>무게 : {detailData.weight / 10}kg</div>
            <div>신장 : {detailData.height / 10}m</div>
          </div>
        </div>
        {detailData.stats && (
          <>
            <hr className="my-6" />
            <div>
              <h2 className="text-lg mb-3">스탯</h2>
              <div className="grid grid-cols-3 gap-2">
                {detailData.stats.map(([text, value]) => (
                  <div key={text} className="flex flex-col">
                    <h3 className="font-bold">{text}</h3>
                    <div className="">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {detailData.description && (
          <>
            <hr className="my-6" />
            <div>
              <h2 className="text-lg mb-3">설명</h2>
              {detailData.description[detailData.regionNo] ? (
                <>
                  <div className="overflow-x-auto overflow-y-hidden max-w-full flex gap-2 whitespace-nowrap py-2">
                    {Object.entries(detailData.description[detailData.regionNo]).map(([version]) => (
                      <Radio
                        key={version}
                        id={version}
                        checked={version === selectedVersion}
                        name="description"
                        value={version}
                        onChange={(v: string) => setSelectedVersion(v)}
                      >
                        {version}
                      </Radio>
                    ))}
                  </div>
                  <div className="mt-3" style={{ minHeight: 80 }}>
                    {detailData.description[detailData.regionNo][selectedVersion]}
                  </div>
                </>
              ) : (
                '해당 언어의 설명이 없습니다.'
              )}
            </div>
          </>
        )}
        {detailData.evolution && detailData.evolution.second && (
          <>
            <hr className="my-6" />
            <div>
              <h2 className="text-lg mb-3">진화</h2>
              <div
                className={cn('grid justify-items-center items-center gap-2', {
                  'grid-cols-2': !detailData.evolution.third,
                  'grid-cols-3': detailData.evolution.third,
                })}
              >
                <div>기본형</div>
                {detailData.evolution.second && <div>1차</div>}
                {detailData.evolution.third && <div>2차</div>}
                <div className="flex w-full">
                  <EvolutionItem {...detailData.evolution.first[0]} />
                </div>
                {detailData.evolution.second && (
                  <div className="flex w-full">
                    <ContentCarousel
                      navigation
                      contents={detailData.evolution.second.map((evo) => ({
                        slideKey: evo.no.toString(),
                        element: <EvolutionItem {...evo} />,
                      }))}
                      slideToIndex={detailData.evolution.third && slideToIndex}
                      onSlideChange={detailData.evolution.third && setSlideToIndex}
                      loop={false}
                    />
                  </div>
                )}
                {detailData.evolution.third && (
                  <div className="flex w-full">
                    <ContentCarousel
                      navigation
                      contents={detailData.evolution.third.map((evo) => ({
                        slideKey: evo.no.toString(),
                        element: <EvolutionItem {...evo} />,
                      }))}
                      slideToIndex={slideToIndex}
                      onSlideChange={setSlideToIndex}
                      loop={false}
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <DetailNavigation />
      </div>
    </>
  );
};

export default DetailItem;
