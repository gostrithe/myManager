import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";

import "element-plus/dist/index.css";
import "./assets/main.scss";
import authorization from "@directives/authorization";


// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import adminRoutes from "./router/routes/adminRoutes";

if (localStorage.getItem('adminRoutesAdd') == 'true') {
    // console.log(7);
    adminRoutes.forEach(route => {
        !router.hasRoute(route.name) && router.addRoute(route);
    });
    console.log(router.getRoutes());
}

const app = createApp(App);

app.use(router);

app.use(store);
app.use(ElementPlus);

app.directive(authorization.name, authorization);


// 注册所有图标
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
//   }

app.mount("#app");
