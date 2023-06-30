export type PokemonLocalNameList = {
  [key: number]: {
    [key: number]: {
      no: number;
      name: string;
      genus: string;
    };
  };
};

export type Pokemon = {
  NamedAPIResource: {
    name: string;
    url: string;
  };
};

export type PokemonDetailData = {
  no: number;
  regionNo: number;
  weight: number;
  height: number;
  sprites: {
    front: string;
    back: string;
  };
  stats?: Array<Array<string | number>>;
  names?: Record<number, string>;
  description?: Record<number, Record<string, string>>;
  evolution?: Record<
    'first' | 'second' | 'third',
    {
      no: number;
      imgSrc: string;
      name: string;
    }[]
  >;
};
