<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { PokemonDB } from "../api/apiTypes";
import { getArtworkSrc } from "../utils";
import PokemonThumbnail from "./PokemonThumbnail.vue";
import { computed, defineProps } from "vue";

const { pokemonData, pokemonEntries, pageName } = defineProps<{
  pokemonData: PokemonDB[];
  pokemonEntries: PokemonDB[];
  pageName: string;
}>();

const router = useRouter();

const testEntries = computed<PokemonDB[]>(() => {
  // I cant hold all of them
  // Maybe render specific amount first that safe to show
  // than based on scrollbar smoothly push new
  // pokemon into array see how it renders ???
  // I think I will need to research iage optimization never the less

  return pokemonEntries.slice(0, -1);
});
</script>

<template>
  <div class="searchContainer">
    <div class="searchBar">
      <Button class="backButton" @click="router.go(-1)">Back</Button>
      <input class="searchInput" />
    </div>

    <div class="gridContainer">
      <div v-for="pokemon in testEntries">
        <PokemonThumbnail
          :pageName="pageName"
          :index="pokemon.index"
          :src="getArtworkSrc(pokemon.artwork)"
          :generation="pokemon.generation"
        />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.searchBar {
  position: sticky;
  top: 0;
  z-index: 2;
  display: grid;
  grid-template-rows: auto;
  gap: 1rem;
  background: var(--pokedex-red);
  padding-block: 0.5rem;
  padding-inline: 2.5vw;
}

.backButton {
  grid-column: 1 / 2;
  grid-row: 1 / 2;

  user-select: none;
  text-decoration: none;
  color: var(--black);
  text-align: center;

  background: var(--light-grey);
  width: 5rem;
  border: solid black 1px;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: var(--fs-medium);
}

.searchInput {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  max-height: 1lh;
  max-width: 70vw;
}

.gridContainer {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  padding-inline: 2.5vw;
  padding-top: 0.5rem;
  gap: 0.25rem;
}
</style>
