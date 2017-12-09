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
                    path: '/role',
                    name: 'role',
                    component: resolve => { require(['@/views/role/index.vue'], resolve) }
                },
                {
                    path: '/account',
                    name: 'account',
                    component: resolve => { require(['@/views/account/index.vue'], resolve) }
                },
                {
                    name: 'account-create',
                    path: '/account/create',
                    component: resolve => { require(['@/views/account/create.vue'], resolve) }
                },
                {
                    name: 'account-details',
                    path: '/account/details/:id',
                    component: resolve => { require(['@/views/account/details.vue'], resolve) }
                },
                {
                    name: 'account-edit',
                    path: '/account/edit/:id',
                    component: resolve => { require(['@/views/account/edit.vue'], resolve) }
                },
                {
                    path: '/company',
                    name: 'company',
                    component: resolve => { require(['@/views/company/index.vue'], resolve) }
                },
                {
                    name: 'company-details',
                    path: '/company/details/:id',
                    component: resolve => { require(['@/views/company/details.vue'], resolve) }
                },
                {
                    name: 'company-create',
                    path: '/company/create',
                    component: resolve => { require(['@/views/company/create.vue'], resolve) }
                },
                {
                    name: 'company-edit',
                    path: '/company/edit/:id',
                    component: resolve => { require(['@/views/company/edit.vue'], resolve) }
                },
                {
                    path: '/product-type',
                    name: 'product-type',
                    component: resolve => { require(['@/views/product-type/index.vue'], resolve) }
                },
                {
                    path: '/product-type/create',
                    name: 'product-type-create',
                    component: resolve => { require(['@/views/product-type/create.vue'], resolve) }
                },
                {
                    path: '/product',
                    name: 'product',
                    component: resolve => { require(['@/views/product/index.vue'], resolve) }
                },
                {
                    name: 'product-create',
                    path: '/product/create',
                    component: resolve => { require(['@/views/product/create.vue'], resolve) }
                },
                {
                    name: 'product-edit',
                    path: '/product/edit/:id',
                    component: resolve => { require(['@/views/product/edit.vue'], resolve) }
                },
                {
                    name: 'product-agent',
                    path: '/product/agent',
                    component: resolve => { require(['@/views/product/agent.vue'], resolve) }
                },
                {
                    path: '/equipment',
                    name: 'equipment',
                    component: resolve => { require(['@/views/equipment/index.vue'], resolve) }
                },
                {
                    name: 'equipment-create',
                    path: '/equipment/create',
                    component: resolve => { require(['@/views/equipment/create.vue'], resolve) }
                },
                {
                    name: 'equipment-details',
                    path: '/equipment/details/:id',
                    component: resolve => { require(['@/views/equipment/details.vue'], resolve) }
                },
                {
                    name: 'equipment-edit',
                    path: '/equipment/edit/:id',
                    component: resolve => { require(['@/views/equipment/edit.vue'], resolve) }
                }
            ]
        }
    ]
})
