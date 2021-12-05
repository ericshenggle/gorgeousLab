import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    isFirm: false,
    tempAddress: "",
    category: "",
  },
  mutations: {
    updateState(state) {
      state.isLogin = false;
      state.isFirm = false;
    },
    updateUserState(state) {
      state.isLogin = true;
      state.isFirm = false;
    },
    updateFirmState(state) {
      state.isLogin = true;
      state.isFirm = true;
    },
    changeCategory(state, str) {
      state.category = str;
    },
  },
  actions: {},
  modules: {},
});
