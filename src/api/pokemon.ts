import { PokemonDB } from "./apiTypes.ts";
import { api } from "./client.ts";

export const getManyPokemon = (search: string = "") => {
  return api<PokemonDB[]>(`/pokemon?${search}`);
};
