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
        name: 'company-menu',
        path: 'company',
        icon: 'ios-keypad',
        role: 10,
        title: '厂商管理'
    },
    {
        name: 'product-menu',
        path: 'product',
        icon: 'ios-analytics',
        role: 10,
        title: '产品管理'
    },
    {
        name: 'system-menu',
        path: 'system',
        role: 4,
        icon: 'settings',
        title: '系统管理'
    }
]

// 应用程序路由
export const appRouter = [
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
            { path: 'index', title: '角色管理', parent: 'system-menu', role: 1, name: 'role-index', component: resolve => { require(['@/views/role/index.vue'], resolve) } }
        ]
    },
    {
        path: '/company',
        name: 'company',
        title: '厂商管理',
        component: Home,
        children: [
            { path: 'index', title: '厂商管理', parent: 'company-menu', role: 8, name: 'company-index', component: resolve => { require(['@/views/company/index.vue'], resolve) } },
            { path: 'details/:id', title: '厂商信息', name: 'company-details', component: resolve => { require(['@/views/company/details.vue'], resolve) } },
            { path: 'create', title: '厂商添加', name: 'company-create', component: resolve => { require(['@/views/company/create.vue'], resolve) } },
            { path: 'edit/:id', title: '厂商编辑', name: 'company-edit', component: resolve => { require(['@/views/company/edit.vue'], resolve) } }
        ]
    },
    {
        path: '/account',
        name: 'account',
        title: '用户管理',
        component: Home,
        children: [
            { path: 'index', title: '用户管理', parent: 'company-menu', role: 8, name: 'account-index', component: resolve => { require(['@/views/account/index.vue'], resolve) } },
            { path: 'create', title: '用户添加', name: 'account-create', component: resolve => { require(['@/views/account/create.vue'], resolve) } },
            { path: 'details/:id', title: '用户信息', name: 'account-details', component: resolve => { require(['@/views/account/details.vue'], resolve) } },
            { path: 'info', title: '个人中心', name: 'account-info', component: resolve => { require(['@/views/account/info.vue'], resolve) } },
            { path: 'edit/:id', title: '用户编辑', name: 'account-edit', component: resolve => { require(['@/views/account/edit.vue'], resolve) } },
            { path: 'change-password', title: '修改密码', name: 'account-change-password', component: resolve => { require(['@/views/account/change-password.vue'], resolve) } }
        ]
    },
  
    {
        path: '/product-type',
        name: 'product-type',
        title: '产品分类',
        component: Home,
        children: [
            { path: 'index', title: '产品分类管理', parent: 'system-menu', role: 6, name: 'product-type-index', component: resolve => { require(['@/views/product-type/index.vue'], resolve) } },
            { path: 'create', title: '产品分类添加', name: 'product-type-create', component: resolve => { require(['@/views/product-type/create.vue'], resolve) } }
        ]
    },
    {
        path: '/product',
        name: 'product',
        title: '产品管理',
        component: Home,
        children: [
            { path: 'index', title: '产品管理', parent: 'product-menu', role: 11, name: 'product-index', component: resolve => { require(['@/views/product/index.vue'], resolve) } },
            { path: 'details/:id', title: '产品信息', name: 'product-details', component: resolve => { require(['@/views/product/details.vue'], resolve) } },
            { path: 'create', title: '', name: 'product-create', component: resolve => { require(['@/views/product/create.vue'], resolve) } },
            { path: 'edit/:id', title: '', name: 'product-edit', component: resolve => { require(['@/views/product/edit.vue'], resolve) } },
            { path: 'product-agent/:id', title: '', name: 'product-agent', component: resolve => { require(['@/views/product/product-agent.vue'], resolve) } },
            { path: 'product-add-sale-rule/:id', title: '', name: 'product-add-sale-rule', component: resolve => { require(['@/views/product/add-sale-rule.vue'], resolve) } }
        ]
    },
    {
        path: '/equipment',
        name: 'equipment',
        title: '设备管理',
        component: Home,
        children: [
            { path: 'index', title: '设备管理', parent: 'product-menu', role: 15, name: 'equipment-index', component: resolve => { require(['@/views/equipment/index.vue'], resolve) } },
            { path: 'inactivate', title: '待激活设备', parent: 'product-menu', role: 15, name: 'equipment-inactivate', component: resolve => { require(['@/views/equipment/inactivate.vue'], resolve) } },
            { path: 'logout', title: '待注销设备', parent: 'product-menu', role: 15, name: 'equipment-logout', component: resolve => { require(['@/views/equipment/logout.vue'], resolve) } },
            { path: 'online', title: '在线设备', parent: 'product-menu', role: 15, name: 'equipment-online', component: resolve => { require(['@/views/equipment/online.vue'], resolve) } },
            { path: 'details/:id', title: '', name: 'equipment-details', component: resolve => { require(['@/views/equipment/details.vue'], resolve) } },
            { path: 'create', title: '', name: 'equipment-create', component: resolve => { require(['@/views/equipment/create.vue'], resolve) } },
            { path: 'edit/:id', title: '', name: 'equipment-edit', component: resolve => { require(['@/views/equipment/edit.vue'], resolve) } }
        ]
    }
]

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    ...menuRouter,
    ...appRouter
]
