const publicRoutes = [
  {
    path: "/",
    name: "home",
    redirect: "/data",
  },

  {
    path: "/data",
    name: "data",
    component: () => import("@views/DataWatch.vue"),
  },

  {
    path: "/film/nowPlaying",
    name: "nowPlaying",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@views/film/NowPlayingList.vue"),
  },

  {
    path: "/film/comingSoon",
    name: "commingSoon",
    component: () => import("@views/film/ComingSoonList.vue"),
  },

  {
    path: "/film/:id([\\da-z]{24})",
    name: "filmDetail",
    component: () => import("@views/film/FilmDetail.vue"),
  },

  {
    path: "/film/0",
    name: "addfilm",
    component: () => import("@views/film/AddFilm.vue"),
  },

  {
    path: "/user",
    name: "user",
    component: () => import("@views/UserList.vue"),
  },

  /* cinema */
  // {
  //   path: "/cinema",
  //   name: "cinema",
  //   component: () => import("../views/CinemaList.vue"),
  // },

  /* city */
  // {
  //   path: "/city",
  //   name: "city",
  //   component: () => import("../views/CityList.vue"),
  // },

  /* demos */
  {
    path: "/demos",
    redirect: "/demos/element",
  },

  {
    path: "/demos",
    name: "demos",
    component: () => import("@demos/Index.vue"),
    children: [
      {
        path: "element",
        name: "element",
        component: () => import("@demos/ElementDemo.vue"),
      },
      {
        path: "vuex",
        name: "vuex",
        component: () => import("@demos/VuexDemo.vue"),
      },
      {
        path: "echarts",
        name: "echarts",
        component: () => import("@demos/EchartsDemo.vue"),
      },
    ],
  },

  /* login */
  {
    path: "/login",
    name: "login",
    meta: {
      title: "欢迎光临【卖座电影】管理后台",
      hideFrame: true,
    },
    component: () => import("@views/Login.vue"),
  },

  // /* 404 */
  // {
  //   path: "/:pm(.*)*",
  //   name: "404",
  //   component: () => import("@views/NotFound.vue"),
  // },

];

export default publicRoutes;
