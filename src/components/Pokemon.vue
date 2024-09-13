<script async setup lang="ts">
const name = "Bulbasaur"

const pokemon = await fetch("https://pokeappbackend-dev.railway.internal/pokemon")
console.log(pokemon)
const data = await pokemon.json()
console.log(data)
</script>

<template>
    <div class="pokemonBox">
      <p>
        {{ data.name }}
      </p>
    </div>
</template>

<style scoped>

.pokemonBox {
  font-size: 3rem;
}

</style>
