export type PokemonDB = {
  _id: string;
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
  createdAt: Date;
  updatedAt: Date;
};
