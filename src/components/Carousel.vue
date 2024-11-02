<script setup lang="ts">
import {ref} from "vue"
import { Pokemon } from "../types/Pokemon";

const { allPokemon } = defineProps<{
  allPokemon: Pokemon[];
}>();

const currentIndex = ref(0)


const incrementIndex = () => {
    currentIndex.value = (currentIndex.value + 1) % allPokemon.length
    console.log(currentIndex.value)
}
const decrementIndex = () => {
    currentIndex.value = (currentIndex.value - 1 + allPokemon.length) % allPokemon.length
}
</script>

<template>
  <p>{{ allPokemon.length && allPokemon[currentIndex].name }}</p>
  <!-- <p>{{ allPokemon.length && allPokemon[currentIndex].origin }}</p> -->
  <div class="mainContainer">
    <button @click.prevent="decrementIndex">
      left arrow
    </button>
    <img
      :src="allPokemon.length ? allPokemon[currentIndex].artwork : ''"
      alt="This is image of current pokemon"
    />
    <button @click.prevent="incrementIndex">
      right arrow
    </button>
  </div>
</template>

<style scoped>
.mainContainer {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
</style>
