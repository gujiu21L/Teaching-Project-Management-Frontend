import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      user: null,
      token: localStorage.getItem('token') || ''
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
      commit('setToken', user.token);
    },
    logout({ commit }) {
      commit('logout');
    }
  }
});

export default store;
