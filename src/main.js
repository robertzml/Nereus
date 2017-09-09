// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(BootstrapVue)

// Vuex配置
const store = new Vuex.Store({
  state: {
    domain: 'http://test.example.com',  // 保存后台请求的地址，修改时方便（比方说从测试服改成正式服域名）
    userInfo: {
      login: false,
      id: '',
      name: '',
      roleId: '',
      companyId: ''
    }
  },
  mutations: {
    login (state, newUserInfo) {
      state.userInfo = newUserInfo
    },

    logout (state) {
      state.userInfo.login = false
      state.userInfo.id = ''
      state.userInfo.name = ''
      state.userInfo.roleId = ''
      state.userInfo.companyId = ''
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
