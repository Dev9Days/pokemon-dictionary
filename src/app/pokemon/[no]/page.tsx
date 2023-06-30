'use client';

import { notFound, useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { PokemonStats } from '@/constant/pokemonDetail';
import { RegionNumbers } from '@/constant/region';
import DetailItem from '@/components/pokemon/detailItem';
import { PokemonService } from '@/queries';
import { ResponsePokemon } from '@/queries/type';
import { localNamesAtom, regionAtom } from '@/recoil/region';
import { getImageSource } from '@/app/util';
import { PokemonDetailData } from '@/app/types/pokemon';

const PokemonDetail = () => {
  const params = useParams();
  const no = Number(params.no) || 0;
  const isRightNo = useMemo(() => no >= 1 && no <= 1010, [no]);

  if (!isRightNo) {
    notFound();
  }

  const pokemonDetailData = PokemonService.useGetPokemonDetail({ no }, { enabled: isRightNo });
  const pokemonSpeciesData = PokemonService.useGetPokemonSpecies({ no }, { enabled: isRightNo });
  const pokemonEvolutionData = PokemonService.useGetPokemonEvolutionChain(
    { no: Number(pokemonSpeciesData.data?.evolution_chain.url.split('/').at(-2)) },
    { enabled: isRightNo && pokemonSpeciesData.isSuccess }
  );

  const detail = pokemonDetailData.data;
  const species = pokemonSpeciesData.data;
  const evolution = pokemonEvolutionData.data;

  const localNameList = useRecoilValue(localNamesAtom);
  const regionNo = useRecoilValue(regionAtom);

  let result: Record<string, Array<{}>> = {};
  const getEvolution = (data: ResponsePokemon['pokemonEvolutionChain']['chain'], now = 'first') => {
    const _no = Number(data.species.url.split('/').at(-2) || '0');
    if (!result[now]) {
      result[now] = [];
    }
    result[now].push({
      no: _no,
      imgSrc: getImageSource(_no),
      name: localNameList?.[regionNo][_no].name,
    });
    for (const e of data.evolves_to) {
      result = { ...result, ...getEvolution(e, now === 'first' ? 'second' : 'third') };
    }
    return result;
  };

  const detailData: PokemonDetailData = {
    no,
    regionNo,
    weight: detail?.weight || 0,
    height: detail?.height || 0,
    sprites: { front: detail?.sprites.front_default || '', back: detail?.sprites.back_default || '' },
    stats: detail?.stats.map(({ stat, base_stat }) => [PokemonStats[stat.name], base_stat]),
    names: species?.names.reduce(
      (prev, curr) => ({ ...prev, [RegionNumbers[curr.language.name.toUpperCase()]]: curr.name }),
      {}
    ),
    description: species?.flavor_text_entries.reduce((prev, curr) => {
      const regionNum = RegionNumbers[curr.language.name.toUpperCase()];
      prev[regionNum] = { ...prev[regionNum], [curr.version.name]: curr.flavor_text };
      return prev;
    }, {} as Record<number, { [version: string]: string }>),
    evolution: evolution ? (getEvolution(evolution.chain) as PokemonDetailData['evolution']) : undefined,
  };

  return (
    <>
      <DetailItem detailData={detailData} />
    </>
  );
};

export default PokemonDetail;
