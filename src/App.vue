<script setup lang="ts"></script>

<template>
  <h1>Pokemon!!</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <p>{{ import.meta.env.VITE_BACKEND_API }}</p>
  <nav>
    <RouterLink to="/pokedex">Go to Pokedex</RouterLink>
    <RouterLink to="/import">Go to Import</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style lang="css" scoped></style>
