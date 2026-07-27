import { PokemonDB } from "./types.ts";

export const getArtworkUrl = (artwork: string) =>
  `https://raw.githubusercontent.com/DominikDolejsi/PokeAppImages/refs/heads/master/Artwork/${artwork}.png`;

export const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

export const calculateNewLimit = (
  limit: number,
  limitDistance: number,
  maximumSize: number,
  direction: "forward" | "backward",
): number => {
  if (direction === "forward") {
    return (limit + limitDistance) % maximumSize;
  } else if (direction === "backward") {
    return (limit - limitDistance + maximumSize) % maximumSize;
  }
  return limit;
};

export const preloadImagesInRange = (
  pokemonData: PokemonDB[],
  currentLimit: number,
  newLimit: number,
  direction: "forward" | "backward",
) => {
  const preloadCallback = (pokemon: PokemonDB) => {
    preloadImage(getArtworkUrl(pokemon.artwork));
  };

  if (direction === "forward") {
    if (newLimit < currentLimit) {
      pokemonData.slice(currentLimit).forEach(preloadCallback);
      pokemonData.slice(0, newLimit).forEach(preloadCallback);
    } else {
      pokemonData.slice(currentLimit, newLimit).forEach(preloadCallback);
    }
  } else if (direction === "backward") {
    if (newLimit > currentLimit) {
      pokemonData.slice(0, currentLimit).forEach(preloadCallback);
      pokemonData.slice(newLimit).forEach(preloadCallback);
    } else {
      pokemonData.slice(newLimit, currentLimit).forEach(preloadCallback);
    }
  }
};
