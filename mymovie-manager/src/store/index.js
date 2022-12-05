import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import adminRoutes from "../router/routes/adminRoutes";
import router from "../router";

const store = createStore({
  state: {
    token: '',
    user: null,
    list: [1]
  },

  getters: {

  },

  actions: {
    saveUserInfo({ commit }, { user, token }) {
      commit('setUser', user);
      commit('setToken', token);
    },
    quit(context) {
      context.commit('resetUser')
    }
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    resetUser(state) {
      state.token = '',
      state.user = null,
      localStorage.setItem('adminRoutesAdd', 'false')
      adminRoutes.forEach(route => {
        // router.removeRoute(route.name)
        // console.log(router.getRoutes())
        router.hasRoute(route.name) && router.removeRoute(route.name);
      });
      console.log(router.getRoutes())
    }
  },

  plugins: [
    createPersistedState()
  ]
});

export default store;