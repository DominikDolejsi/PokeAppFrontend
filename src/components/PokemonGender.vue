<script setup lang="ts">
import { computed, onMounted } from "vue";
import { Gender } from "../types";
import { GENDER_TO_STRING } from "../constants";
import { getGenderIconSrc, preloadGenderIcons } from "../utils";
import ExpandableIcon from "./ExpandableIcon.vue";

const { gender } = defineProps<{ gender: Gender }>();

const parsedGender = computed<string>(() => {
  return GENDER_TO_STRING[gender];
});

const altGender = computed<string>(
  () => `Icon indicating ${parsedGender.value} gender of pokemon`,
);

onMounted(() => {
  preloadGenderIcons(true);
});
</script>

<template>
  <ExpandableIcon
    :iconSrc="getGenderIconSrc(parsedGender, true)"
    :iconAlt="altGender"
    :iconText="parsedGender"
    :iconBackgroundColor="`var(--${parsedGender})`"
    :backgroundColor="`var(--${parsedGender}-tr)`"
    direction="left"
  />
</template>

<style lang="css" scoped></style>
