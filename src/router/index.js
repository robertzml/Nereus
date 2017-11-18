import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: resolve => { require(['@/views/login.vue'], resolve) }
        },

        {
            path: '/',
            name: 'home',
            component: resolve => { require(['@/views/home.vue'], resolve) },
            children: [
                {
                    path: '/account',
                    name: 'account',
                    component: resolve => { require(['@/views/account/index.vue'], resolve) }
                },
                {
                    path: '/company',
                    name: 'company',
                    component: resolve => { require(['@/views/company/index.vue'], resolve) }
                },
                {
                    name: 'company_details',
                    path: '/company/details/:id',
                    component: resolve => { require(['@/views/company/details.vue'], resolve) }
                },
                {
                    name: 'company_edit',
                    path: '/company/edit/:id',
                    component: resolve => { require(['@/views/company/edit.vue'], resolve) }
                }
            ]
        }
    ]
})
