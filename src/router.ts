import { createRouter, createWebHistory } from "vue-router";

import ImportView from "./components/Import.vue";
import PokedexView from "./components/Pokedex.vue";

const routes = [
  { path: "/pokedex", component: PokedexView },
  { path: "/import", component: ImportView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
