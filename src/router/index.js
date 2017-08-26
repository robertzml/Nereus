import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Hello from '@/components/Hello'
import AccountList from '@/views/account/list'
import AccountCreate from '@/views/account/create'
import AccountDetails from '@/views/account/details'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/hello',
      name: 'hello',
      component: Hello
    }, {
      path: '/account',
      name: 'account',
      component: function (resolve) {
        return require(['@/views/account/index.vue'], resolve)
      },
      children: [
        {
          path: 'list',
          component: AccountList
        }, {
          path: 'create',
          component: AccountCreate
        }, {
          path: 'details/:id', component: AccountDetails          
        }
      ]
    }, {
      path: '/company',
      name: 'company',
      component: require('@/views/company/index.vue'),
      children: [
        {
          path: 'list',
          component: function (resolve) {
            return require(['@/views/company/list.vue'], resolve)
          }
        }, {
          path: 'create',
          component: require('@/views/company/create.vue')
        }, {
          name: 'company_details',
          path: 'details/:id',
          component: require('@/views/company/details.vue')
        }
      ]
    }
  ]
})
