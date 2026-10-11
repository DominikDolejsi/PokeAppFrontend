import {
  createRouter,
  createWebHistory,
  RouteLocationNormalizedLoadedGeneric,
} from "vue-router";

import Import from "./views/Import.vue";
import Pokedex from "./views/Pokedex.vue";
import NotFound from "./views/NotFound.vue";
import PokedexSearch from "./views/PokedexSearch.vue";

declare module "vue-router" {
  interface RouteMeta {
    transition?: string;
  }
}

const routes = [
  { path: "/", redirect: "/pokedex" },
  { path: "/pokedex", redirect: "/pokedex/1" },
  {
    path: "/pokedex/:index",
    name: "pokedex",
    component: Pokedex,
    props: (route: RouteLocationNormalizedLoadedGeneric) => ({
      index: Number(route.params.index),
    }),
  },
  { path: "/import", component: Import },
  {
    path: "/pokedex/search",
    name: "pokedexSearch",
    component: PokedexSearch,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to, from) => {
  if (to.name === "pokedexSearch" && from.name === "pokedex") {
    to.meta.transition = "slide-down";
  }
  if (to.name === "pokedex" && from.name === "pokedexSearch") {
    to.meta.transition = "slide-up";
  }
});

export default router;
