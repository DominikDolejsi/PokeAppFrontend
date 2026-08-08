<script setup lang="ts">
import { computed, watch } from "vue";
import { usePokedex } from "../composables/usePokedex";
import { useRoute, useRouter } from "vue-router";
import PokemonList from "../components/PokemonList.vue";

const { index } = defineProps<{ index: number }>();

const route = useRoute();
const router = useRouter();
const { pokemonData, pokedexEntries, loading, error } = usePokedex();

const selectedEntryIndex = computed<number>(() => index - 1);

watch(
  () => route.params?.index,
  (newIndex) => {
    const paramIndex = Number(newIndex);

    if (paramIndex < 1) {
      router.push({ name: "NotFound" });
      return;
    }
  },
  { immediate: true },
);

watch(pokedexEntries, (newPokedexEntries) => {
  if (!loading && selectedEntryIndex.value > newPokedexEntries.length) {
    router.push({ name: "NotFound" });
    return;
  }
});
</script>

<template>
  <div v-if="loading">Loading...</div>
  <PokemonList
    v-else
    :selectedEntryIndex="selectedEntryIndex"
    :pokemon-data="pokemonData"
    :pokemon-entries="pokedexEntries"
    page-name="pokedex"
  />
</template>

<style lang="css" scoped></style>
