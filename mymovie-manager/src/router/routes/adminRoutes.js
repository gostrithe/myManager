import CinemaList from "@views/CinemaList.vue";
import CityList from "@views/CityList.vue";

const adminRoutes = [
  /* cinema */
  {
    path: "/cinema",
    name: "cinema",
    meta: { adminRequired: true },
    component: () => import("@views/CinemaList.vue"),
    // component: CinemaList,
  },

  /* city */
  {
    path: "/city",
    name: "city",
    meta: { adminRequired: true },
    component: () => import("@views/CityList.vue"),
    // component: CityList,
  },
];

export default adminRoutes;
