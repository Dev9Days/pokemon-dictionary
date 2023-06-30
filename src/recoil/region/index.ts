import { atom } from 'recoil';
import { RegionNumbers } from '@/constant/region';
import { PokemonLocalNameList } from '@/app/types/pokemon';

export const regionAtom = atom<number>({
  key: 'RegionAtom',
  default: RegionNumbers.KO,
});

export const localNamesAtom = atom<PokemonLocalNameList>({
  key: 'LocalNamesAtom',
  default: undefined,
});
