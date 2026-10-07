import { POKEMON_TYPE, TYPE_ICON_VERSION } from "./constants.ts";

export type PokemonJSON = {
  name: string;
  index: number;
  category: string;
  form: null | string;
  gender: number;
  generation: number;
  type: string[];
  flavor_text: string[];
  next_evolution: null | string[];
  artwork: string;
  home_sprite: null | string;
  home_sprite_shiny: null | string;
  home_sprite_female: null | string;
  home_sprite_female_shiny: null | string;
};

export type PokemonType = keyof typeof POKEMON_TYPE;

export type TypeIconVersion = keyof typeof TYPE_ICON_VERSION;
