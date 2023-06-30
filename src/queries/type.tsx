import { Pokemon } from '@/app/types/pokemon';
import { SafeNumber } from '@/app/types/common';

export type RequestPokemon = {
  pokemonList: {
    limit: SafeNumber;
    offset?: SafeNumber;
  };
  detail: {
    no: SafeNumber;
  };
};

export type ResponsePokemon = {
  pokemonList: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon['NamedAPIResource'][];
  };
  pokemonDetail: {
    id: number;
    weight: number;
    height: number;
    sprites: {
      front_default: string;
      back_default: string;
    };
    stats: {
      base_stat: number;
      stat: Pokemon['NamedAPIResource'];
    }[];
  };
  pokemonSpecies: {
    evolution_chain: {
      url: string;
    };
    flavor_text_entries: {
      flavor_text: string;
      language: Pokemon['NamedAPIResource'];
      version: Pokemon['NamedAPIResource'];
    }[];
    names: {
      language: Pokemon['NamedAPIResource'];
      name: string;
    }[];
  };
  pokemonEvolutionChain: {
    id: number;
    chain: {
      species: Pokemon['NamedAPIResource'];
      evolves_to: {
        species: Pokemon['NamedAPIResource'];
        evolves_to: ResponsePokemon['pokemonEvolutionChain']['chain'][];
      }[];
    };
  };
};
