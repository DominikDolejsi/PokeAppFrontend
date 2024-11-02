<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Pokemon } from "../types/Pokemon";
import Carousel from "../components/Carousel.vue";
const allPokemon = ref<Pokemon[]>([]);

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.BACKEND_API}/pokemon`);
    allPokemon.value = await response.json() as Pokemon[];
    console.log(response);
  } catch (error) {
    console.log(`Fetching pokemon failed ${error}`)
  }
});
</script>

<template>
  <h1>First Screen</h1>
  <Carousel :all-pokemon="allPokemon" />
</template>
