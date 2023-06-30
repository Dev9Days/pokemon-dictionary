'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import qs from 'query-string';
import http from '@/app/util/http';
import { RequestPokemon, ResponsePokemon } from './type';
import { QueryOptions } from './common';
import { QueryKeys } from '@/constant/queryKey';

export const PokemonService = {
  useGetPokemonListInfinity: ({ limit, offset }: RequestPokemon['pokemonList']) => {
    return useInfiniteQuery(
      [QueryKeys.POKEMON_LIST, { limit, offset }],
      ({ pageParam = 0 }) => http.get('pokemon', { limit, offset: pageParam }),
      {
        staleTime: Infinity,
        cacheTime: Infinity,
        getNextPageParam: (lastPage: ResponsePokemon['pokemonList']): number | undefined => {
          if (lastPage.next) {
            const { offset } = qs.parse(lastPage.next.split('?')[1], { parseNumbers: true });
            if (Number(offset) <= 1010) {
              return Number(offset);
            }
          }
          return undefined;
        },
      }
    );
  },
  useGetPokemonLocalNameList: (_option?: QueryOptions<string>) => {
    return useQuery<string, Error>(
      [QueryKeys.POKEMON_LOCAL_NAMES],
      () => http.get('https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_species_names.csv'),
      { ..._option, retry: false, refetchOnMount: false }
    );
  },
  useGetPokemonSearch: ({ no }: RequestPokemon['detail'], _option?: QueryOptions<ResponsePokemon['pokemonList']>) => {
    return useQuery<ResponsePokemon['pokemonList'], Error>(
      [QueryKeys.POKEMON_SEARCH, { limit: 1, offset: Number(no) - 1 }],
      () => http.get('pokemon', { limit: 1, offset: Number(no) - 1 }),
      _option
    );
  },
  useGetPokemonDetail: ({ no }: RequestPokemon['detail'], _option?: QueryOptions<ResponsePokemon['pokemonDetail']>) => {
    return useQuery<ResponsePokemon['pokemonDetail'], Error>(
      [QueryKeys.POKEMON_DETAIL, { no }],
      () => http.get(`pokemon/${no}`),
      _option
    );
  },
  useGetPokemonSpecies: (
    { no }: RequestPokemon['detail'],
    _option?: QueryOptions<ResponsePokemon['pokemonSpecies']>
  ) => {
    return useQuery<ResponsePokemon['pokemonSpecies'], Error>(
      [QueryKeys.POKEMON_SPECIES, { no }],
      () => http.get(`pokemon-species/${no}`),
      _option
    );
  },
  useGetPokemonEvolutionChain: (
    { no }: RequestPokemon['detail'],
    _option?: QueryOptions<ResponsePokemon['pokemonEvolutionChain']>
  ) => {
    return useQuery<ResponsePokemon['pokemonEvolutionChain'], Error>(
      [QueryKeys.POKEMON_EVOLUTION_CHAIN, { no }],
      () => http.get(`evolution-chain/${no}`),
      _option
    );
  },
};
