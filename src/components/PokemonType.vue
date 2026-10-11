<script setup lang="ts">
import { computed, onMounted } from "vue";
import { PokemonType, TypeIconStyle } from "../types";
import { getTypeIconSrc, isPokemonType, preloadTypeIcons } from "../utils";

const { type, iconStyle = "go" } = defineProps<{
  type: string;
  iconStyle: TypeIconStyle;
}>();

const parsedPokemonType = computed<PokemonType | null>(() => {
  if (isPokemonType(type)) return type;
  return null;
});

const iconAlt = computed(() => `Icon of ${type} type pokemon`);

onMounted(() => {
  preloadTypeIcons(iconStyle);
});
</script>

<template>
  <div
    v-if="parsedPokemonType !== null"
    class="container"
    :style="{ backgroundColor: `var(--go-${parsedPokemonType})` }"
  >
    <img
      class="icon"
      :src="getTypeIconSrc(parsedPokemonType, iconStyle)"
      :alt="iconAlt"
    />
  </div>
</template>

<style lang="css" scoped>
.container {
  display: grid;
  gap: 0.5rem;
  width: 64px;
  height: 64px;
  border-radius: 64px;
  justify-content: start;
  align-content: center;
  user-select: none;
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
  width: 60px;
  margin: 2px;
}
</style>
