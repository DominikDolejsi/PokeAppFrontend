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

export const TYPE_ICON_VERSION = {
  go: "go",
  dp: "dp",
  sv: "sv",
};

export const GO_TYPE_BACKGROUND_COLORS = {
  fire: "rgba(255, 157, 83, 0.6)",
  water: "rgba(76, 145, 214, 0.6)",
  grass: "rgba(100, 188, 92, 0.6)",
  poison: "rgba(173, 106, 201, 0.6)",
  normal: "rgba(145, 154, 163, 0.6)",
  rock: "rgba(200, 184, 140, 0.6)",
  ground: "rgba(200, 184, 140, 0.6)",
  flying: "rgba(144, 170, 222, 0.6)",
  psychic: "rgba(249, 114, 119, 0.6)",
  ghost: "rgba(81, 105, 174, 0.6)",
  fighting: "rgba(207, 62, 105, 0.6)",
  electric: "rgba(243, 211, 56, 0.6)",
  fairy: "rgba(237, 144, 231, 0.6)",
  steel: "rgba(90, 143, 163, 0.6)",
  dark: "rgba(90, 82, 102, 0.6)",
  dragon: "rgba(2, 109, 197, 0.6)",
  ice: "rgba(117, 207, 193, 0.6)",
  bug: "rgba(144, 193, 44, 0.6)",
} as const;
