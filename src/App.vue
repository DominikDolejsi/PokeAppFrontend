<script async setup lang="ts">
import Pokemon from "./components/Pokemon.vue";
</script>

<template>
  <Suspense>
    <Pokemon />

    <template #fallback>
    Loading...
    </template>
  </Suspense>
</template>

<style scoped>
</style>
