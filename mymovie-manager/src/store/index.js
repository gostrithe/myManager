import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import demoModule from "./modules/demoModule";
import { login } from "@api/userApi";

import adminRoutes from "@router/routes/adminRoutes";
import { inRoutes } from "../router/routerTool";

// 创建一个新的 store 实例
const store = createStore({
  /* 状态（一手数据） */
  state() {
    return {
      count: 0,
      userInfo: null,
    };
  },

  /* 二手数据：从一手数据换算而来 */
  getters: {
    token(state, getters, rootState, rootGetters) {
      return state.userInfo?.token;
    },

    isAdmin(state, getters) {
      return state.userInfo.user.admin;
    },

    adminRoutes(state, getters) {
      return adminRoutes;
    },

    adminRequired(state, getters) {
      return (to) => inRoutes(to, adminRoutes);
    },
  },

  /* 操作器 */
  actions: {
    add(context, n) {
      context.commit("increment", n);
    },

    async login({ commit }, { username, password }) {
      const { msg, user, token } = await login({
        username,
        password,
      });
      // console.log(msg, user, token);

      commit("setUserInfo", { msg, user, token });
      return { msg, user, token };
    },
  },

  /* 修改器 */
  mutations: {
    setCount(state, n) {
      state.count += n;
    },

    setUserInfo(state, info) {
      state.userInfo = info;
    },
  },

  /* 子模块 */
  modules: {
    demoModule: demoModule,
  },

  /* 插件 */
  plugins: [
    // 配置持久化插件（把数据存在localStorage）
    createPersistedState(),
  ],
});

export default store;
