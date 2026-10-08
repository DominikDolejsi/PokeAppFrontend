import { PokemonDB } from "./api/apiTypes.ts";
import {
  ARTWORK_URL,
  GENDER_ICONS_URL,
  GENDER_TO_STRING,
  POKEMON_TYPE,
  TYPE_ICONS_URL,
} from "./constants.ts";
import { PokemonType, TypeIconStyle } from "./types.ts";

export const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

export const preloadArtwork = (fileName: string) => {
  preloadImage(getArtworkSrc(fileName));
};

export const preloadTypeIcons = (iconStyle: TypeIconStyle) => {
  for (const type in POKEMON_TYPE) {
    preloadImage(getTypeIconSrc(type, iconStyle));
  }
};

export const preloadGenderIcons = (white: boolean) => {
  for (const gender in GENDER_TO_STRING) {
    preloadImage(getGenderIconSrc(gender, white));
  }
};

export const getArtworkSrc = (fileName: string) => {
  return `${ARTWORK_URL}/${fileName}.png`;
};

export const getTypeIconSrc = (
  pokemonType: string,
  iconStyle: TypeIconStyle,
): string => {
  return `${TYPE_ICONS_URL}/${pokemonType}_${iconStyle}.png`;
};

export const getGenderIconSrc = (
  gender: string,
  white: boolean,
) => {
  return `${GENDER_ICONS_URL}/${gender}${white ? "_white" : ""}.png`;
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

export const getSortedFormNames = (
  pokemon: PokemonDB[],
): Array<string | null> => {
  const formNames: Array<string | null> = [null];

  pokemon.sort().forEach((pokemon) => {
    if (pokemon.form !== null) {
      formNames.push(pokemon.form);
    }
  });

  return formNames;
};

export const isPokemonType = (type: string): type is PokemonType => {
  return type in POKEMON_TYPE;
};
