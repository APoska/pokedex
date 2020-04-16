export namespace PokemonModel {
  export interface PokemonResponse {
    count: number;
    next: string;
    previous: string;
    results: Pokemon[];
  }

  export interface Pokemon {
    name: string;
    image?: string;
    height?: number;
    weight?: number;
  }
}
