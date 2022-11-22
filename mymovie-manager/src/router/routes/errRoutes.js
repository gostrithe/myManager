export const page404 = {
  path: "/:pm(.*)*",
  name: "404",
  component: () => import("@views/NotFound.vue"),
};
