<script async setup lang="ts">
import { computed, ref } from "vue";

const pokemon = await fetch(`${import.meta.env.BACKEND_API}/pokemon`);
const data = await pokemon.json();

const currentIndex = ref(0);

const strings = ref([
  "First string",
  "Second string",
  "Third string",
  "Fourth string",
]);

const currentPokemon = computed(() => {
  return strings.value[currentIndex.value];
});

const changeIndex = (value: number) => {
  currentIndex.value = (currentIndex.value + value) % strings.value.length;
};
</script>

<template>
  <div class="pokemonBox">
    <button @click="changeIndex(1)"><</button>
    <p>
      {{ currentPokemon }}
    </p>
    <button @click="changeIndex(-1)"><</button>
  </div>
</template>

<style scoped>
.pokemonBox {
  font-size: 3rem;
}
</style>
