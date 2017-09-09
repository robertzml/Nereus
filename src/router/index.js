import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import AccountCreate from '@/views/account/create'
import AccountDetails from '@/views/account/details'

Vue.use(Router)

export default new Router({
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                    
                {
                    path: '/hello',
                    name: 'hello',
                    component: function (resolve) {
                        return require(['@/components/hello.vue'], resolve)
                    }
                },
                
                {
                    path: '/role',
                    name: 'role',
                    component: function (resolve) {
                        return require(['@/views/role/index.vue'], resolve)
                    },
                    children: [
                        {
                            path: 'list',
                            component: function (resolve) {
                                return require(['@/views/role/list.vue'], resolve)
                            }
                        }
                    ]
                },
        
                {
                    path: '/member',
                    name: 'member',
                    component: function (resolve) {
                        return require(['@/views/member/index.vue'], resolve)
                    },
                    children: [
                        {
                            path: 'list',
                            component: function (resolve) {
                                return require(['@/views/member/list.vue'], resolve)
                            }
                        }
                    ]
                },

                {
                    path: '/company',
                    name: 'company',
                    component: function (resolve) {
                        return require(['@/views/company/index.vue'], resolve)
                    },
                    children: [
                        {
                            path: 'list',
                            component: function (resolve) {
                                return require(['@/views/company/list.vue'], resolve)
                            }
                        }, {
                            path: 'create',
                            component: function (resolve) {
                                return require(['@/views/company/create.vue'], resolve)
                            }
                        }, {
                            name: 'company_details',
                            path: 'details/:id',
                            component: function (resolve) {
                                return require(['@/views/company/details.vue'], resolve)
                            }
                        }, {
                            name: 'company_edit',
                            path: 'edit/:id',
                            component: function (resolve) {
                                return require(['@/views/company/edit.vue'], resolve)
                            }
                        }
                    ]
                }, 

                {
                    path: '/product',
                    name: 'product',
                    component: function (resolve) {
                        return require(['@/views/product/index.vue'], resolve)
                    },
                    children: [
                        {
                            path: 'list',
                            component: function (resolve) {
                                return require(['@/views/product/list.vue'], resolve)
                            }
                        }
                    ]
                },
                
                {
                    path: '/account',
                    name: 'account',
                    component: function (resolve) {
                        return require(['@/views/account/index.vue'], resolve)
                    },
                    children: [
                        {
                            path: 'list',
                            component: function (resolve) {
                                return require(['@/views/account/list.vue'], resolve)
                            }
                        }, {
                            path: 'create',
                            component: AccountCreate
                        }, {
                            path: 'details/:id', component: AccountDetails          
                        }
                    ]
                }
            ]
        },

        {
            path: '/login',
            name: 'login',
            component: function (resolve) {
                return require(['@/views/login.vue'], resolve)
            }
        }
      
    ]
})
