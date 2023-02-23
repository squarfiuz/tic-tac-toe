import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../views/index.vue")
    },
    {
      path: "/game",
      name: "game",
      children: [
        {
          path: "create",
          name: "game-create",
          component: () => import("../views/game/create.vue")
        },
        {
          path: "join",
          name: "game-join",
          component: () => import("../views/game/join.vue")
        },
        {
          path: "play",
          name: "game-play",
          component: () => import("../views/game/play.vue")
        }
      ]
    }
  ]
});

export default router;
