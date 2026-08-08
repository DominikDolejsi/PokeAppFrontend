import {
  createRouter,
  createWebHistory,
  RouteLocationNormalizedLoadedGeneric,
} from "vue-router";

import Import from "./views/Import.vue";
import Pokedex from "./views/Pokedex.vue";
import NotFound from "./views/NotFound.vue";

const routes = [
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
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
