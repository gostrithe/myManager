import { createRouter, createWebHistory, useRoute } from 'vue-router';
import dataBoard from '../views/dataBoard.vue';
import store from "@store/index";
import adminRoutes from "./routes/adminRoutes";

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'dataBoard',
            meta: { loginRequired: true },
            component: dataBoard
        },
        {
            path: '/film/comings',
            name: 'comings',
            meta: { loginRequired: true },
            component: () => import('../views/film/comings.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login.vue')
        },
        {
            path: '/:pm(.*)*',
            name: 'notfound',
            meta: { loginRequired: true },
            component: () => import("@views/notfound.vue")
        }
    ]
});


router.beforeEach((to, from, next) => {
    if (!to.meta.loginRequired) {
        next();
    } else {
        if (store.state.user) {
            if (store.state.user.admin) {
                adminRoutes.forEach(route => {
                    !router.hasRoute(route.name) && router.addRoute(route) && localStorage.setItem('adminRoutesAdd', 'true');
                });   
            }
            next();
        } else {
            next('/login');
        }
    }
});

export default router;
