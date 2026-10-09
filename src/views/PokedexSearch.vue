<script setup lang="ts"></script>

<template>
  <div class="container">
    <div>This is search screen</div>
    <RouterLink :to="{ name: 'pokedex', params: { index: 1 } }"
      >To pokedex</RouterLink
    >
  </div>
</template>

<style lang="css" scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  height: 400px;
  background: red;
}
</style>
