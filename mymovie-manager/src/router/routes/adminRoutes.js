
const adminRoutes = [
  /* cinema */
  {
    path: '/film/nowPlaying',
    name: 'nowPlaying',
    meta: { loginRequired: true, adminRequired: true },
    component: () => import('../../views/film/nowPlaying.vue'),
    children: [
      {
        path: '/film/:id([a-z\\d]{24})',
        name: 'detail',
        component: () => import('../../views/film/detail.vue')
      },
      {
        path: '/film/add',
        name: 'addFiml',
        component: () => import('../../views/film/detail.vue')
      }
    ]
  },
];

export default adminRoutes;
