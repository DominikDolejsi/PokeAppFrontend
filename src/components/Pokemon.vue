<script async setup lang="ts">
const name = "Bulbasaur"

// const pokemon = await fetch("https://pokeappbackend-dev.up.railway.app:8000/pokemon")
console.log("ENV")
console.log(import.meta.env.BACKEND_API)
const pokemon = await fetch(`${import.meta.env.BACKEND_API}/pokemon`)
console.log(pokemon)
const data = await pokemon.json()
console.log(data)
</script>

<template>
    <div class="pokemonBox">
      <p>
        {{ data[0].name }}
      </p>
    </div>
</template>

<style scoped>

.pokemonBox {
  font-size: 3rem;
}

</style>
