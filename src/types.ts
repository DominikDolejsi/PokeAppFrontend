import { POKEMON_TYPE, TYPE_ICON_STYLE } from "./constants.ts";

export type PokemonJSON = {
  name: string;
  index: number;
  category: string;
  form: null | string;
  gender: Gender;
  generation: number;
  type: PokemonType[];
  flavor_text: string[];
  next_evolution: null | string[];
  artwork: string;
  home_sprite: null | string;
  home_sprite_shiny: null | string;
  home_sprite_female: null | string;
  home_sprite_female_shiny: null | string;
};

export type PokemonType = keyof typeof POKEMON_TYPE;

export type TypeIconStyle = keyof typeof TYPE_ICON_STYLE;

export type Gender = 0 | 1 | 2 | 3;
