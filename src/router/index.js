import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Hello from '@/components/Hello'
import Account from '@/views/account/index'
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
      component: Account,
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
    }
  ]
})
