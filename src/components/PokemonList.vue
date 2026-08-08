<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { PokemonDB } from "../api/apiTypes";
import { circularIndex, getArtworkUrl, preloadImagesInRange } from "../utils";
import TopBar from "./TopBar.vue";

const PRELOAD_STEP = 5;

const { pokemonData, pokemonEntries, selectedEntryIndex, pageName } =
  defineProps<{
    pokemonData: PokemonDB[];
    pokemonEntries: PokemonDB[];
    selectedEntryIndex: number;
    pageName: string;
  }>();
const selectedPokemon = computed<PokemonDB>(() => {
  return pokemonEntries[selectedEntryIndex];
});
const selectedPokemonForms = computed<PokemonDB[]>(() => {
  return pokemonData.filter(
    (pokemon) => pokemon.index === selectedPokemon.value.index,
  );
});

const nextIndex = computed<number>(
  () => circularIndex(selectedEntryIndex, 1, pokemonEntries.length) + 1,
);
const prevIndex = computed<number>(
  () => circularIndex(selectedEntryIndex, -1, pokemonEntries.length) + 1,
);

const selectedPokemonArtwork = computed<string>(() => {
  return getArtworkUrl(selectedPokemon.value.artwork);
});
const selectedPokemonAltArtwork = computed<string>(() => {
  return `Official artwork of ${selectedPokemon.value.form} ${selectedPokemon.value.name}`;
});

onMounted(() => {
  preloadImagesInRange(selectedEntryIndex, PRELOAD_STEP, pokemonEntries);
});

watch(
  () => selectedEntryIndex,
  (newPokemonIndex) => {
    preloadImagesInRange(newPokemonIndex, PRELOAD_STEP, pokemonEntries);
  },
);
</script>

<template>
  <TopBar />
  <div class="mainView">
    <div class="topBar2">
      <div class="index">{{ "#" + selectedPokemon.index }}</div>
      <div class="nameBar">
        <p class="name">{{ selectedPokemon.name }}</p>
        <p class="category">{{ selectedPokemon.category + " pokemon" }}</p>
      </div>
    </div>
    <div class="forms">{{ selectedPokemon.form }}</div>
    <div class="generation">{{ "gen " + selectedPokemon.generation }}</div>
    <div class="imageArea">
      <img :src="selectedPokemonArtwork" :alt="selectedPokemonAltArtwork" />
    </div>
    <div class="imageBar">
      <div class="types">
        <div class="type1">{{ selectedPokemon.type[0] }}</div>
        <div class="type2">{{ selectedPokemon.type[1] }}</div>
      </div>
      <div class="gender">{{ selectedPokemon.gender }}</div>
    </div>

    <div class="bottomBar">
      <div class="flavourtext">
        {{ selectedPokemon.flavor_text[0] }}
      </div>
      <div class="flavourtext">
        {{ selectedPokemon.flavor_text[1] }}
      </div>
    </div>
  </div>
  <div class="actionbar">
    <button>Settings</button>
    <RouterLink :to="{ name: pageName, params: { index: prevIndex } }"
      >Prev</RouterLink
    >
    <button>Up</button>
    <RouterLink :to="{ name: pageName, params: { index: nextIndex } }"
      >Next</RouterLink
    >
    <button>Add</button>
  </div>
</template>

<style lang="css" scoped>
.actionbar {
  position: fixed;
  bottom: 1rem;
  background: var(--pokedex-red);
  width: calc(100% - 2rem);
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto auto auto auto auto;
  justify-content: space-evenly;
  padding: 0.75rem;
}

.mainView {
  display: grid;
  grid-template-columns: 1fr minmax(0, 475px) 1fr;
  grid-template-rows: auto auto auto auto auto auto auto;
  margin: 1rem;
  margin-top: 4rem;
}

.navigationBar {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  /*justify-content: end;*/
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.menu {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  justify-self: end;
}

.searchBar {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.navigation {
  display: grid;
  grid-template-columns: auto auto;
  grid-row: 2 / 3;
}

.topBar2 {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  max-width: 500px;
  justify-content: start;
}

.index {
  font-size: 2rem;
  align-self: center;
}

.nameBar {
  display: grid;
  justify-items: end;
}

.name {
  font-size: 2.5rem;
  font-weight: bold;
}

.category {
  font-size: 1.25rem;
  font-style: italic;
  margin-top: -1.0rem;
}

.forms {
  font-size: 1.5rem;
  grid-row: 3 / 4;
  grid-column: 2 / 3;
  justify-self: start;
  margin-top: -0.75rem;
}

.generation {
  margin-top: -0.75rem;
  font-size: 1rem;
  grid-row: 3 / 4;
  grid-column: 2 / 3;
  justify-self: end;
}

.imageArea {
  grid-row: 3 / 6;
  grid-column: 2 / 3;
}

.imageBar {
  grid-row: 5 / 6;
  grid-column: 2 / 3;
  display: grid;
  grid-template-columns: auto auto;
}

.types {
  font-size: 1.5rem;
}

.gender {
  justify-self: end;
  align-self: end;
  font-size: 1.5rem;
}

.bottomBar {
  grid-row: 6 / 7;
  grid-column: 2 / 3;
  max-width: 475px;
  margin-top: 0.75rem;
  display: grid;
  gap: 0.5rem;
}

.flavourtext {
  font-size: 1.25rem;
}
</style>
