'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Else, If, Then } from 'react-if';
import { useRecoilValue } from 'recoil';
import { thousandsSeparator } from '@/app/util';
import ListItem from '@/components/pokemon/listItem';
import Search from '@/components/search';
import Spinner from '@/components/spinner';
import { PokemonService } from '@/queries';
import { localNamesAtom, regionAtom } from '@/recoil/region';

export default function Main() {
  const router = useRouter();
  const pathname = usePathname();
  const qs = useSearchParams();
  const searchNo = Number(qs.get('searchNo')) || 0;

  const localNameList = useRecoilValue(localNamesAtom);
  const regionNo = useRecoilValue(regionAtom);

  const { ref: spinnerRef, inView: spinnerInView } = useInView({ threshold: 1 });
  const pokemonListInfiniteQuery = PokemonService.useGetPokemonListInfinity({ limit: 14 });
  const pokemonSearchQuery = PokemonService.useGetPokemonSearch({ no: searchNo }, { enabled: searchNo > 0 });

  useEffect(() => {
    if (spinnerInView) {
      pokemonListInfiniteQuery.fetchNextPage();
    }
  }, [pokemonListInfiniteQuery, spinnerInView]);

  if (!localNameList) {
    return <Spinner />;
  }

  const totalCount = pokemonListInfiniteQuery.data?.pages?.[0].count || 0;
  const createListItemData = ({ url }: { url: string }) => {
    const no = Number(url.split('/').at(-2));
    return localNameList[regionNo][no];
  };
  const list = (pokemonListInfiniteQuery.data?.pages || []).flatMap((data) => data.results.map(createListItemData));

  const searchData = pokemonSearchQuery.data ? createListItemData(pokemonSearchQuery.data.results[0]) : null;

  const onSearch = async (no: number) => {
    router.push(`${pathname}?searchNo=${no}`);
  };

  return (
    <>
      <h1 className="font-bold text-4xl mb-10">포켓몬 도감</h1>
      <div className="w-2/3">
        <Search searchNo={searchNo} onSearch={onSearch} />
      </div>
      <div className="font-bold text-lg mb-4">총 {thousandsSeparator(totalCount)}종</div>
      <div className="grid grid-cols-2 gap-2">
        <If condition={!!searchData}>
          <Then>
            {/* react-if가 undefined까지 잡아주지 못하다보니 && 연산 추가 */}
            {searchData && <ListItem {...searchData} />}
          </Then>
          <Else>
            <If condition={pokemonSearchQuery.isFetching}>
              <Then>
                <Spinner />
              </Then>
              <Else>
                {list?.map((item) => item && <ListItem key={item?.no} {...item} />)}
                <div className="flex col-span-2 justify-center">
                  {pokemonListInfiniteQuery.hasNextPage && <Spinner className="my-5" spinnerRef={spinnerRef} />}
                </div>
              </Else>
            </If>
          </Else>
        </If>
      </div>
    </>
  );
}
