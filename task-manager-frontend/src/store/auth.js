import axios from 'axios';

export default {
  namespaced: true,
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    errorMessage: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setError(state, message) {
      state.errorMessage = message;
    },
    clearError(state) {
      state.errorMessage = null;
    },
  },
  actions: {
    async login({ commit }, { token, userId, username }) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      commit('setToken', token);
      commit('setUserId', userId);

      try {
        const { data } = await axios.get(`http://localhost:4001/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        commit('setUser', data);
      } catch (error) {
        commit('setError', 'Failed to fetch user data');
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      commit('setToken', null);
      commit('setUserId', null);
      commit('setUser', null);
      commit('clearError');
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user,
    errorMessage: state => state.errorMessage,
  },
};
