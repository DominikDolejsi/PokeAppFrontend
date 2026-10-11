<script setup lang="ts">
const { src, pageName, index } = defineProps<{
  src: string;
  pageName: string;
  index: number;
}>();
</script>

<template>
  <div class="container">
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
  max-width: 64px;
  border: 2px solid black;
  border-radius: 0.5rem;
}
</style>
