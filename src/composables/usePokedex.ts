import { onMounted, ref } from "vue";
import { PokemonDB } from "../api/apiTypes.ts";
import { getManyPokemon } from "../api/pokemon.ts";

export const usePokedex = () => {
  const pokemonData = ref<PokemonDB[]>([]);
  const pokedexEntries = ref<PokemonDB[]>([]);
  const loading = ref(true);
  const error = ref<Error>();

  onMounted(async () => {
    try {
      pokemonData.value = await getManyPokemon("limit=0");
      pokedexEntries.value = pokemonData.value.filter((pokemon) =>
        pokemon.form === null
      );
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  });

  return {
    pokemonData,
    pokedexEntries,
    loading,
    error,
  };
};
