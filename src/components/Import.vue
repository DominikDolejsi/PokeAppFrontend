<script setup lang="ts">
import { ref } from "vue";
import { PokemonJSON } from "../types";

let PokemonInitData = ref<null | PokemonJSON[]>(null);
let PokemonEvoData = ref<null | PokemonJSON[]>(null);

const handleJsonInput = async (event: Event) => {
  console.log(event);

  if (!event.target) return;

  const inputElement: HTMLInputElement = event.target as HTMLInputElement;

  if (!inputElement.files || inputElement.files?.length < 1) return;

  const pokemonJSON = await inputElement.files[0].text();

  const PokemonData: PokemonJSON[] = JSON.parse(pokemonJSON);

  PokemonEvoData.value = JSON.parse(pokemonJSON);

  PokemonInitData.value = PokemonData.map((pokemon) => {
    pokemon.next_evolution = null;
    return pokemon;
  });

  console.log(PokemonInitData.value);
  console.log(PokemonEvoData.value);
};

const updateDatabase = async (event: Event) => {
  // Here I need to send the data ro BackendAPI
  // First create onmass initdata then go through Evodata
  // and when there is not null do comlex thing
  // for every entry try to find reference pokemon
  // based on index and form
  // if no find than try again without form
  // if no find error out
  // if found populate new array and after all update

  const getAllOptions: RequestInit = { method: "GET" };

  const getAllResponse = await fetch(
    "https://pokeappbackend-dev.up.railway.app/pokemon?limit=0",
    getAllOptions,
  );

  if (!getAllResponse.ok) {
    console.error(`Delete response not ok! status: ${getAllResponse.status}`);
    return;
  }

  const getAllData = await getAllResponse.json();

  console.log("getAllData", getAllData);

  const deleteIds = getAllData.map((pokemon: { _id: string }) => pokemon._id);
  console.log("deleteIds", deleteIds);

  if (deleteIds.length > 0) {
    const deleteOptions: RequestInit = {
      method: "DELETE",
      body: JSON.stringify({ pokemonIds: deleteIds }),
    };

    const deleteResponse = await fetch(
      "https://pokeappbackend-dev.up.railway.app/pokemon",
      deleteOptions,
    );

    if (!deleteResponse.ok) {
      console.error(`Delete response not ok! status: ${deleteResponse.status}`);
      return;
    }
  }

  const createOptions: RequestInit = {
    method: "POST",
    body: JSON.stringify(PokemonInitData.value),
  };

  const createResponse = await fetch(
    "https://pokeappbackend-dev.up.railway.app/pokemon",
    createOptions,
  );

  if (!createResponse.ok) {
    console.error(`Delete response not ok! status: ${createResponse.status}`);
    return;
  }

  const data = await createResponse.json();

  console.log(data);
};


const updateEvolutions = () => {
  // I go through all pokemonevodata
  // check if it has next evolution
  // then fetch based on the index and form (if existing)
  //



}


</script>

<template>
  <div>
    <input @change="handleJsonInput" type="file" accept=".json" />
    <button
      @click="updateDatabase"
      :disabled="!PokemonInitData && !PokemonEvoData"
    >
      Update Database
    </button>
    <button
      @click="updateEvolutions"
      :disabled="!PokemonInitData && !PokemonEvoData"
    >
      Update Evos
    </button>
  </div>
</template>

<style lang="css" scoped></style>
