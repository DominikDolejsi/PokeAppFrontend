import { PokemonDB } from "./api/apiTypes.ts";
import { ARTWORK_URL } from "./constants.ts";

export const getArtworkUrl = (artwork: string) =>
  `${ARTWORK_URL}/${artwork}.png`;

export const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

export const preloadArtwork = (artwork: string) => {
  preloadImage(getArtworkUrl(artwork));
};

export const preloadImagesInRange = (
  currentIndex: number,
  preloadStep: number,
  pokemonData: PokemonDB[],
) => {
  const preloadCallback = (pokemon: PokemonDB) => {
    preloadArtwork(pokemon.artwork);
  };

  const indexStepSum = currentIndex + preloadStep;
  const upperLimit = indexStepSum > pokemonData.length
    ? pokemonData.length
    : indexStepSum;
  const upperReminder = indexStepSum % pokemonData.length;
  const indexStepSubtraction = currentIndex - preloadStep;
  const lowerLimit = indexStepSubtraction < 0 ? 0 : indexStepSubtraction;
  const lowerReminder = indexStepSubtraction + pokemonData.length;

  pokemonData.slice(lowerLimit, upperLimit).forEach(preloadCallback);
  pokemonData.slice(0, upperReminder).forEach(preloadCallback);
  pokemonData.slice(lowerReminder, pokemonData.length).forEach(preloadCallback);
};

export const circularIndex = (
  current: number,
  delta: number,
  length: number,
) => {
  return (current + delta + length) % length;
};

export const entryToPokemonIndex = (index: number): number => index + 1;
export const pokemonToEntryIndex = (
  index: string,
  max: number,
): number | null => {
  const number = Number(index);

  if (!Number.isInteger(number)) {
    return null;
  }

  if (number < 1 || number > max) {
    return null;
  }

  return number - 1;
};
