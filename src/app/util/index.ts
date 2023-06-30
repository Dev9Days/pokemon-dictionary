import { SafeNumber } from '@/app/types/common';

export const thousandsSeparator = (num?: SafeNumber | null) => {
  if (!num) {
    return num;
  }
  return num.toLocaleString('en-US');
};

export const getImageSource = (no: SafeNumber) => {
  const _no = Number(no);
  if (_no < 0 || _no > 1010) {
    throw new Error('존재하지 않는 포켓몬입니다.');
  }
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${no}.png`;
};
