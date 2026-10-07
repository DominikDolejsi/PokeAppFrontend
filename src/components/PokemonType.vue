<script setup lang="ts">
import { computed } from "vue";
import {
  GO_TYPE_BACKGROUND_COLORS,
  POKEMON_TYPE,
  TYPE_ICONS_URL,
} from "../constants";
import { PokemonType, TypeIconVersion } from "../types";
import { isPokemonType } from "../utils";

const { type } = defineProps<{ type: string }>();

// I have to define what type of icon will go
// and then I have to decide typing of the icon
// Need own typing for pokemonType and iconVersion
const getIconName = (
  pokemonType: string,
  iconVersion: TypeIconVersion,
): string => {
  return `${TYPE_ICONS_URL}/${pokemonType}_${iconVersion}.png`;
};

const parsedPokemonType = computed<PokemonType | null>(() => {
  if (isPokemonType(type)) return type;
  return null;
});

const iconAlt = computed(() => `Icon of ${type} type pokemon`);
</script>

<template>
  <div
    v-if="parsedPokemonType !== null"
    class="container"
    :style="{ backgroundColor: GO_TYPE_BACKGROUND_COLORS[parsedPokemonType] }"
  >
    <img
      class="icon"
      :src="getIconName(parsedPokemonType, 'go')"
      :alt="iconAlt"
    />
  </div>
</template>

<style lang="css" scoped>
.container {
  display: grid;
  gap: 0.5rem;
  width: 54px;
  height: 54px;
  border-radius: 54px;
  justify-content: start;
  align-content: center;
  /*animation-name: expand;*/
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

@keyframes expand {
  0% {
    width: 54px;
    border-radius: 54px;
  }

  50% {
    width: 154px;
    border-radius: 54px;
  }

  100% {
    width: 54px;
    border-radius: 54px;
  }
}

.icon {
  width: 50px;
  margin: 2px;
}
</style>
