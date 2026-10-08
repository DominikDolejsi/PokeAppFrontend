const ASSETS_URL = import.meta.env.VITE_ASSETS_URL;

export const ARTWORK_URL = `${ASSETS_URL}/artwork`;
export const TYPE_ICONS_URL = `${ASSETS_URL}/type_icons`;
export const GENDER_ICONS_URL = `${ASSETS_URL}/gender_icons`;

export const POKEMON_TYPE = {
  fire: "fire",
  water: "water",
  grass: "grass",
  poison: "poison",
  normal: "normal",
  rock: "rock",
  ground: "ground",
  flying: "flying",
  psychic: "psychic",
  ghost: "ghost",
  fighting: "fighting",
  electric: "electric",
  fairy: "fairy",
  steel: "steel",
  dark: "dark",
  dragon: "dragon",
  ice: "ice",
  bug: "bug",
} as const;

export const TYPE_ICON_STYLE = {
  go: "go",
  dp: "dp",
  sv: "sv",
} as const;

export const GENDER_TO_STRING = {
  0: "unknown",
  1: "male",
  2: "female",
  3: "gendered",
} as const;
