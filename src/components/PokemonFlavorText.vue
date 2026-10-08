<script setup lang="ts">
const { text } = defineProps<{ text: string }>();
</script>

<template>
  <div class="container" v-if="text">
    {{ text }}
  </div>
</template>

<style lang="css" scoped>
.container {
  color: var(--lighter-grey);
  font-size: var(--fs-medium);
  background: var(--grey);
  border-radius: 0.5rem;
  padding: 0.5rem;
  border: 2px solid black;
}

.container::before {
  content: "•";
  margin-right: 0.5rem;
}
</style>
