import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

import adminRoutes from "./routes/adminRoutes";
import publicRoutes from "./routes/publicRoutes";
import { inRoutes } from "./routerTool";
import { page404 } from "./routes/errRoutes";

// import DataWatch from "../views/DataWatch.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...publicRoutes,
    // ...adminRoutes,
  ],
});

router.addRoute(
  /* 404 */
  {
    path: "/:pm(.*)*",
    name: "404",
    component: () => import("@views/NotFound.vue"),
  }
);

router.beforeEach((to, from, next) => {
  // console.log("to", to);
  // console.log("from", from);

  /* 公共路由直接放行 */
  if (inRoutes(to, publicRoutes)) {
    // console.log("isPublicRoute");
    next();
    return;
  }

  /* 检查是否adminRoutes */
  let arRoute = store.getters.adminRequired(to);
  if (arRoute) {
    console.log("arRoute", arRoute);
    if (store.getters.isAdmin) {
      console.log("isAdmin");

      router.addRoute(arRoute)
      next()
    } else {
      console.log("is NOT Admin");
      next({ path: "/login" });
    }
    return;
  }

  /* 默认去首页 */
  console.log("404");
  next();

});

export default router;
