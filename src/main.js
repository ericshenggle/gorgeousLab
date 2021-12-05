import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//注册element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import Axios from 'axios'

Vue.use(ElementUI);

Vue.config.productionTip = false

Axios.defaults.baseURL = 'http://localhost:8000/'
Axios.defaults.withCredentials = true
Vue.prototype.$axios = Axios
Vue.prototype.$store = store
router.beforeEach((to, from, next) => {

  //获取用户登录成功后储存的登录标志
  let getFlag1 = localStorage.getItem("Login");
  let getFlag2 = localStorage.getItem("Firm");
  console.log(getFlag1);
  console.log(getFlag2);
  //如果登录标志存在且为isLogin，即用户已登录
  if(getFlag1 === "true" && getFlag2 === "true"){
    store.commit("updateFirmState");
    //设置vuex登录状态为已登录
  } else if (getFlag1 === "true") {
    store.commit("updateUserState");
  } else {
    store.commit("updateState");
  }
  next()
});
router.afterEach(route => {
  window.scroll(0, 0);
});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
