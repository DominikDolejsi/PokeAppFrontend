<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { PokemonDB } from "../types";
import {
  getArtworkUrl,
  calculateNewLimit,
  preloadImagesInRange,
} from "../utils";

const PRELOAD_STEP = 25;
const PRELOAD_DISTANCE_TRIGGER = 10;

const loadedPokemon = ref<PokemonDB[]>([]);
const currentPokemonIndex = ref(0);
const pickedPokemon = computed<PokemonDB>(() => {
  return loadedPokemon.value[currentPokemonIndex.value];
});
const pickedPokemonArtwork = computed<string>(() => {
  return getArtworkUrl(pickedPokemon.value.artwork);
});
const pickedPokemonAltArtwork = computed<string>(() => {
  return `Official artwork of ${pickedPokemon.value.form ?? ""} ${pickedPokemon.value.name}`;
});

let maxLimit = currentPokemonIndex.value;
let minLimit = currentPokemonIndex.value;

onMounted(async () => {
  const response = await fetch(
    "https://pokeappbackend-dev.up.railway.app/pokemon?limit=0",
  );

  if (!response.ok) {
    console.error(
      `Did not get initial pokemon data. Status: ${response.status}`,
    );
  }

  loadedPokemon.value = await response.json();

  // This part is Preload Init
  const newMaxLimit = calculateNewLimit(
    maxLimit,
    PRELOAD_STEP,
    loadedPokemon.value.length,
    "forward",
  );
  const newMinLimit = calculateNewLimit(
    minLimit,
    PRELOAD_STEP,
    loadedPokemon.value.length,
    "backward",
  );

  preloadImagesInRange(loadedPokemon.value, maxLimit, newMaxLimit, "forward");
  preloadImagesInRange(loadedPokemon.value, minLimit, newMinLimit, "backward");

  maxLimit = newMaxLimit;
  minLimit = newMinLimit;
});

const choosePokemon = (amount: number) => {
  const newPokemonIndex = currentPokemonIndex.value + amount;

  currentPokemonIndex.value =
    newPokemonIndex < 0
      ? (loadedPokemon.value.length + amount) % loadedPokemon.value.length
      : newPokemonIndex % loadedPokemon.value.length;
};

// This watch is Preload step
watch(currentPokemonIndex, (newPokemonIndex) => {
  const distanceToMaxLimit =
    (maxLimit - newPokemonIndex + loadedPokemon.value.length) %
    loadedPokemon.value.length;
  const distanceToMinLimit =
    (newPokemonIndex - minLimit + loadedPokemon.value.length) %
    loadedPokemon.value.length;

  if (distanceToMaxLimit < PRELOAD_DISTANCE_TRIGGER) {
    console.log("Preloading forward");
    const newMaxLimit = calculateNewLimit(
      maxLimit,
      PRELOAD_STEP,
      loadedPokemon.value.length,
      "forward",
    );
    preloadImagesInRange(loadedPokemon.value, maxLimit, newMaxLimit, "forward");
    maxLimit = newMaxLimit;
  }
  if (distanceToMinLimit < PRELOAD_DISTANCE_TRIGGER) {
    console.log("Preloading backward");
    const newMinLimit = calculateNewLimit(
      minLimit,
      PRELOAD_STEP,
      loadedPokemon.value.length,
      "backward",
    );
    preloadImagesInRange(
      loadedPokemon.value,
      maxLimit,
      newMinLimit,
      "backward",
    );
    minLimit = newMinLimit;
  }
});
</script>

<template>
  <div v-if="loadedPokemon.length === 0">Loading...</div>
  <div v-else class="mainView">
    <div class="navigationBar">
      <input type="text" class="searchBar" />
      <div class="menu">...</div>
      <div class="navigation">
        <button class="prev" @click="choosePokemon(-1)">prev</button>
        <div>{{ currentPokemonIndex }}</div>
        <button class="next" @click="choosePokemon(1)">next</button>
      </div>
    </div>
    <div class="topBar">
      <div class="index">{{ "#" + pickedPokemon.index }}</div>
      <div class="nameBar">
        <p class="name">{{ pickedPokemon.name }}</p>
        <p class="category">{{ pickedPokemon.category + " pokemon" }}</p>
      </div>
    </div>
    <div class="forms">{{ pickedPokemon.form }}</div>
    <div class="generation">{{ "gen " + pickedPokemon.generation }}</div>
    <div class="imageArea">
      <img :src="pickedPokemonArtwork" :alt="pickedPokemonAltArtwork" />
    </div>
    <div class="imageBar">
      <div class="types">
        <div class="type1">{{ pickedPokemon.type[0] }}</div>
        <div class="type2">{{ pickedPokemon.type[1] }}</div>
      </div>
      <div class="gender">{{ pickedPokemon.gender }}</div>
    </div>

    <div class="bottomBar">
      <div class="flavourtext">
        {{ pickedPokemon.flavor_text[0] }}
      </div>
      <div class="flavourtext">
        {{ pickedPokemon.flavor_text[1] }}
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.mainView {
  display: grid;
  grid-template-columns: 1fr minmax(0, 475px) 1fr;
  grid-template-rows: auto auto auto auto auto auto;
  margin: 1rem;
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

.prev {
}

.next {
}

.topBar {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  max-width: 500px;
  justify-content: start;
}

.index {
  font-size: 4rem;
  align-self: center;
}

.nameBar {
  display: grid;
  justify-items: end;
}

.name {
  font-size: 3rem;
  font-weight: bold;
}

.category {
  font-size: 1.5rem;
  font-style: italic;
  margin-top: -1.75rem;
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
  font-size: 1.5rem;
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
