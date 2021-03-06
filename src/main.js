// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router/index'
import {appRouter} from './router/router'
import 'babel-polyfill'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import moment from 'moment'
import * as nereus from './utility/nereus.js'

Vue.use(iView)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
      next()
  } else {
      console.log('main.js check login: ' + store.getters.isLogin)
      if (store.getters.isLogin) {
          next()
      } else {
          next({ path: '/login' })
      }
  }
})

Vue.filter('displayCompanyType', function (value) {
    if (!value) return ''
    return nereus.displayCompanyType(value)
})

Vue.filter('displayDateTime', function (value) {
    if (value === null || value === '') {
        return ''
    } else {
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
})

Vue.filter('entityStatus', function (value) {
    if (value === undefined || value === null) return ''
    return nereus.displayStatus(value)
})

Vue.filter('payType', function (value) {
    if (value === undefined || value === null) return ''
    return nereus.payType(value)
})

Vue.filter('chargeType', function (value) {
    if (value === undefined || value === null) return ''
    return nereus.chargeType(value)
})

Vue.filter('paymentType', function (value) {
    if (value === undefined || value === null) return ''
    return nereus.paymentType(value)
})

Vue.filter('moneyType', function (value) {
    if (value === undefined || value === null) return ''
    return nereus.moneyType(value)
})

Vue.filter('moneyTradeResult', function (value) {
    if (value === undefined || value === null) return ''
    return nereus.moneyTradeResult(value)
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
