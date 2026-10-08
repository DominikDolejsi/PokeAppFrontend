<script setup lang="ts">
const { generation } = defineProps<{ generation: number }>();
</script>

<template>
  <div class="container" :style="{ background: `var(--gen-${generation})` }">
    {{ "Gen " + generation }}
  </div>
</template>

<style lang="css" scoped>
.container {
  font-size: var(--fs-medium);
  border-radius: 1rem;
  border: 1px solid black;
  padding-inline: 0.5rem;
}
</style>
