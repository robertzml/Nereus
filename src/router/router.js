import Home from '@/views/home.vue'

export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve) }
}

// 菜单页面路由
export const menuRouter = [
    {
        path: '/',
        name: 'home',
        title: '主页',
        component: resolve => { require(['@/views/home.vue'], resolve) }
    },
    {
        path: '/role',
        name: 'role',
        title: '角色管理',
        component: Home,
        children: [
            { path: 'index', title: '角色管理', name: 'role-index', component: resolve => { require(['@/views/role/index.vue'], resolve) } }
        ]
    },
    {
        path: '/account',
        name: 'account',
        title: '用户管理',
        component: Home,
        children: [
            { path: 'index', title: '用户管理', name: 'account-index', component: resolve => { require(['@/views/account/index.vue'], resolve) } },
            { path: 'create', title: '用户添加', name: 'account-create', component: resolve => { require(['@/views/account/create.vue'], resolve) } },
            { path: 'details/:id', title: '用户信息', name: 'account-details', component: resolve => { require(['@/views/account/details.vue'], resolve) } },
            { path: 'edit/:id', title: '用户编辑', name: 'account-edit', component: resolve => { require(['@/views/account/edit.vue'], resolve) } }
        ]
    },
    {
        path: '/product-type',
        name: 'product-type',
        title: '产品分类',
        component: Home,
        children: [
            { path: 'index', title: '用户管理', name: 'product-type-index', component: resolve => { require(['@/views/product-type/index.vue'], resolve) } },
            { path: 'create', title: '用户添加', name: 'product-type-create', component: resolve => { require(['@/views/product-type/create.vue'], resolve) } }
        ]
    },
    {
        path: '/product',
        name: 'product',
        title: '产品管理',
        component: Home,
        children: [
            { path: 'index', title: '', name: 'product-index', component: resolve => { require(['@/views/product/index.vue'], resolve) } },
            { path: 'create', title: '', name: 'product-create', component: resolve => { require(['@/views/product/create.vue'], resolve) } },
            { path: 'edit/:id', title: '', name: 'product-edit', component: resolve => { require(['@/views/product/edit.vue'], resolve) } },
            { path: 'agent', title: '', name: 'product-agent', component: resolve => { require(['@/views/product/agent.vue'], resolve) } }
        ]
    },
    {
        path: '/company',
        name: 'company',
        title: '厂商管理',
        component: Home,
        children: [
            { path: 'index', title: '', name: 'company-index', component: resolve => { require(['@/views/company/index.vue'], resolve) } },
            { path: 'details/:id', title: '', name: 'company-details', component: resolve => { require(['@/views/company/details.vue'], resolve) } },
            { path: 'create', title: '', name: 'company-create', component: resolve => { require(['@/views/company/create.vue'], resolve) } },
            { path: 'edit/:id', title: '', name: 'company-edit', component: resolve => { require(['@/views/company/edit.vue'], resolve) } }
        ]
    },
    {
        path: '/equipment',
        name: 'equipment',
        title: '设备管理',
        component: Home,
        children: [
            { path: 'index', title: '', name: 'equipment-index', component: resolve => { require(['@/views/equipment/index.vue'], resolve) } },
            { path: 'details/:id', title: '', name: 'equipment-details', component: resolve => { require(['@/views/equipment/details.vue'], resolve) } },
            { path: 'create', title: '', name: 'equipment-create', component: resolve => { require(['@/views/equipment/create.vue'], resolve) } },
            { path: 'edit/:id', title: '', name: 'equipment-edit', component: resolve => { require(['@/views/equipment/edit.vue'], resolve) } }
        ]
    }
]

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    ...menuRouter
]
