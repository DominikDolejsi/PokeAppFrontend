<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { PokemonType, TypeIconStyle } from "../types";
import { getTypeIconSrc, isPokemonType, preloadTypeIcons } from "../utils";
import ExpandableIcon from "./ExpandableIcon.vue";

const { type, iconStyle = "go" } = defineProps<{
  type: string;
  iconStyle: TypeIconStyle;
}>();

const parsedPokemonType = computed<PokemonType | null>(() => {
  if (isPokemonType(type)) return type;
  return null;
});

const altType = computed(() => `Icon of ${type} type pokemon`);

onMounted(() => {
  preloadTypeIcons(iconStyle);
});
</script>

<template>
  <ExpandableIcon
    v-if="parsedPokemonType !== null"
    :iconSrc="getTypeIconSrc(parsedPokemonType, iconStyle)"
    :iconText="parsedPokemonType"
    :iconBackgroundColor="null"
    :backgroundColor="`var(--go-${parsedPokemonType})`"
    :iconAlt="altType"
    direction="right"
  />
</template>

<style lang="css" scoped></style>
