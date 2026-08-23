<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { PokemonDB } from "../api/apiTypes";
import {
  circularIndex,
  getArtworkUrl,
  preloadImagesInRange,
  preloadArtwork,
} from "../utils";
import TopBar from "./TopBar.vue";

const PRELOAD_STEP = 5;

const { pokemonData, pokemonEntries, selectedEntryIndex, pageName } =
  defineProps<{
    pokemonData: PokemonDB[];
    pokemonEntries: PokemonDB[];
    selectedEntryIndex: number;
    pageName: string;
  }>();

const selectedPokemonIndex = computed<number>(() => {
  return pokemonEntries[selectedEntryIndex].index;
});
const selectedPokemonForms = computed<PokemonDB[]>(() => {
  return pokemonData.filter(
    (pokemon) => pokemon.index === selectedPokemonIndex.value,
  );
});
const selectedForm = ref<string | null>(null);
const selectedPokemon = computed<PokemonDB | undefined>(() => {
  return selectedPokemonForms.value.find(
    (pokemon) => pokemon.form === selectedForm.value,
  );
});

const nextIndex = computed<number>(
  () => circularIndex(selectedEntryIndex, 1, pokemonEntries.length) + 1,
);
const prevIndex = computed<number>(
  () => circularIndex(selectedEntryIndex, -1, pokemonEntries.length) + 1,
);

const selectedPokemonArtwork = computed<string>(() => {
  return getArtworkUrl(selectedPokemon.value?.artwork ?? "");
});
const selectedPokemonAltArtwork = computed<string>(() => {
  return `Official artwork of ${selectedPokemon.value?.form ?? ""} ${selectedPokemon.value?.name}`;
});

onMounted(() => {
  preloadImagesInRange(selectedEntryIndex, PRELOAD_STEP, pokemonEntries);
});

watch(
  () => selectedEntryIndex,
  (newPokemonIndex) => {
    preloadImagesInRange(newPokemonIndex, PRELOAD_STEP, pokemonEntries);
    selectedPokemonForms.value.forEach((pokemon) =>
      preloadArtwork(pokemon.artwork),
    );
    selectedForm.value = null;
  },
);
</script>

<template>
  <TopBar />
  <div class="mainView" v-if="selectedPokemon">
    <div class="nameArea">
      <div class="index">{{ "#" + selectedPokemon.index }}</div>
      <div class="nameBar">
        <p class="name poppins-medium">{{ selectedPokemon.name }}</p>
        <p class="category poppins-light-italic">
          {{ selectedPokemon.category + " pokemon" }}
        </p>
      </div>
      <div
        class="formContainer"
        :style="{
          visibility: selectedPokemonForms.length > 1 ? 'visible' : 'hidden',
        }"
      >
        <label for="form-select" class="visually-hidden">Select a form</label>
        <select
          name="forms"
          id="form-select"
          class="formSelect"
          v-model="selectedForm"
        >
          <option v-for="form in selectedPokemonForms" :value="form.form">
            {{ form.form ?? "default" }}
          </option>
        </select>
      </div>
    </div>
    <div class="highlight"></div>
    <div class="imageArea">
      <img :src="selectedPokemonArtwork" :alt="selectedPokemonAltArtwork" />
    </div>
    <div class="generation">{{ "gen " + selectedPokemon.generation }}</div>
    <div class="imageBar">
      <div class="types">
        <div class="type1">{{ selectedPokemon.type[0] }}</div>
        <div class="type2">{{ selectedPokemon.type[1] }}</div>
      </div>
      <div class="gender">{{ selectedPokemon.gender }}</div>
    </div>

    <div class="bottomBar">
      <div class="flavourText">
        {{ selectedPokemon.flavor_text[0] }}
      </div>
      <div class="flavourText">
        {{ selectedPokemon.flavor_text[1] }}
      </div>
    </div>
  </div>
  <div class="actionBar">
    <button disabled>Menu</button>
    <RouterLink :to="{ name: pageName, params: { index: prevIndex } }"
      >Prev</RouterLink
    >
    <RouterLink :to="{ name: pageName, params: { index: nextIndex } }"
      >Next</RouterLink
    >
    <button disabled>Add</button>
  </div>
</template>

<style lang="css" scoped>
.actionBar {
  position: fixed;
  bottom: 1rem;
  background: var(--pokedex-red);
  width: calc(100% - 2rem);
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto auto auto auto;
  justify-content: space-evenly;
  padding: 0.75rem;
  border-radius: 0.5rem;

  a {
    user-select: none;
    text-decoration: none;
    color: var(--black);
    text-align: center;

    background: var(--light-grey);
    width: min(20vw, 5rem);
    padding: 0.5rem;
    border: solid black 1px;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: var(--fs-medium);
  }

  a:active {
    background: var(--grey);
  }

  a:focuse {
    border: none;
  }

  button {
    width: min(20vw, 5rem);
  }

  button:disabled {
    background: var(--lighter-grey);
    border-radius: 0.5rem;
    border: solid black 1px;
  }
}

.mainView {
  display: grid;
  grid-template-columns: 1fr 1.5rem minmax(0, 475px) 1.5rem 1fr;
  grid-template-rows: auto auto auto auto auto auto auto 6rem;
  margin: 1rem;
  margin-top: 3.5rem;
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

.nameArea {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  grid-column: 2 / 5;
  grid-row: 2 / 3;
}

.index {
  font-size: var(--fs-xl);
  align-self: end;
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  line-height: 1;
}

.nameBar {
  display: grid;
  justify-items: end;
  grid-row: 2 / 3;
  grid-column: 2 / 3;
}

.name {
  font-size: var(--fs-xl);
  font-weight: bold;
}

.category {
  font-size: var(--fs-medium);
  font-style: italic;
  margin-top: -0.5rem;
}

.formContainer {
  display: grid;
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}

.formSelect {
  font-size: var(--fs-medium);
  justify-self: end;
  margin-bottom: -0.75rem;
  text-align: end;
  border: none;
  background: none;
}

.generation {
  font-size: var(--fs-medium);
  grid-row: 3 / 4;
  grid-column: 3 / 5;
  justify-self: end;
  user-select: none;
}

.highlight {
  grid-row: 3 / 6;
  grid-column: 3 / 4;
  width: 100%;
  background: var(--lighter-grey);
  height: 80px;
  align-self: end;
  filter: blur(20px);
  border-radius: 100%;
  z-index: -1;
}

.imageArea {
  display: grid;
  grid-row: 3 / 6;
  grid-column: 3 / 4;
}

.imageArea > img {
  grid-row: 3 / 6;
  grid-column: 2 / 3;
}

.imageBar {
  grid-row: 5 / 6;
  grid-column: 2 / 5;
  display: grid;
  grid-template-columns: auto auto;
}

.types {
  font-size: var(--fs-large);
}

.gender {
  justify-self: end;
  align-self: end;
  font-size: var(--fs-large);
  user-select: none;
}

.bottomBar {
  grid-row: 6 / 7;
  grid-column: 2 / 5;
  max-width: 475px;
  margin-top: 0.75rem;
  display: grid;
  gap: 0.5rem;
}

.flavourText {
  font-size: var(--fs-medium);
}
</style>
