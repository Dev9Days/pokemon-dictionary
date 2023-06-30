'use client';

import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { PokemonLocalNameList } from '@/app/types/pokemon';
import { localNamesAtom } from '@/recoil/region';
import { PokemonService } from '@/queries';

const Global = ({ children }: React.PropsWithChildren) => {
  const [localNameList, setLocalNameList] = useRecoilState(localNamesAtom);
  const data = PokemonService.useGetPokemonLocalNameList().data;
  useEffect(() => {
    if (data && !localNameList) {
      const _localNameList: PokemonLocalNameList = data
        .split('\n')
        .slice(1, -1)
        .reduce((prev: PokemonLocalNameList, str: string) => {
          const [no, langId, name, genus] = str.split(',');
          const regionNo = Number(langId);
          prev[regionNo] = { ...prev[regionNo], [no]: { no: Number(no), name, genus } };
          return prev;
        }, {});
      setLocalNameList(_localNameList);
    }
  }, [localNameList, data, setLocalNameList]);

  return <main className="relative flex min-h-screen flex-col items-center py-24 sm:p-24">{children}</main>;
};

export default Global;
