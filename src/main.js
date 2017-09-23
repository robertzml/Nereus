// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    console.log('login: ' + store.getters.isLogin)
    if (store.getters.isLogin) {
      next()
    } else {
      next({
        path: '/login'
      })
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
