<script setup lang="ts">
import PokemonSearch from "../components/PokemonSearch.vue";
import { usePokedex } from "../composables/usePokedex";

const { pokemonData, pokedexEntries, loading, error } = usePokedex();
</script>

<template>
  <div class="container">
    <div v-if="loading">Loading...</div>
    <PokemonSearch
      v-else
      :pokemonData="pokemonData"
      :pokemonEntries="pokedexEntries"
      pageName="pokedex"
    />
  </div>
</template>

<style lang="css" scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;
  background: white;
  z-index: 1;
}
</style>
