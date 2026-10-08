<script setup lang="ts">
import { computed, onMounted } from "vue";
import { Gender } from "../types";
import { GENDER_TO_STRING } from "../constants";
import { getGenderIconSrc, preloadGenderIcons } from "../utils";

const { gender } = defineProps<{ gender: Gender }>();

const parsedGender = computed<string>(() => {
  console.log(GENDER_TO_STRING[gender], "Gender");
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
  <div
    class="container"
    :style="{ background: `var(--${parsedGender}-opaque)` }"
  >
    <img
      class="icon"
      :style="{ background: `var(--${parsedGender})` }"
      :src="getGenderIconSrc(parsedGender, true)"
      :alt="altGender"
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
  width: 49px;
  margin: 2px;
  border-radius: 54px;
}
</style>
