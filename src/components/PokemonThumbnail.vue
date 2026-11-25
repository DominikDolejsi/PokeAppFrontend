<script setup lang="ts">
const { src, pageName, index, generation } = defineProps<{
  src: string;
  pageName: string;
  index: number;
  generation: number;
}>();
</script>

<template>
  <div class="container">
    <div
      class="background"
      :style="{
        background: `linear-gradient(white, var(--gen-${generation}-tr))`,
      }"
    ></div>
    <RouterLink
      class="imageLink"
      :to="{ name: pageName, params: { index: index } }"
    >
      <img class="thumbnail" :src="src" alt="" />
    </RouterLink>
  </div>
</template>

<style lang="css" scoped>
.container {
  display: grid;
  width: 64px;
}

.imageLink {
  z-index: 1;
}

.background {
  position: absolute;
  width: 64px;
  height: 64px;
  filter: blur(6px);
}
</style>
