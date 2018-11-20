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
        name: 'user-menu',
        path: 'user',
        icon: 'person',
        title: '用户管理'
    },
    {
        name: 'bill-menu',
        path: 'bill',
        icon: 'social-usd',
        title: '账单管理'
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
            { path: 'index', title: '角色管理', parent: 'system-menu', role: 1, name: 'role-index', meta: { keepAlive: true }, component: resolve => { require(['@/views/role/index.vue'], resolve) } }
        ]
    },
    {
        path: '/company',
        name: 'company',
        title: '厂商管理',
        component: Home,
        children: [
            { path: 'index', title: '公司管理', parent: 'company-menu', role: 8, name: 'company-index', meta: { keepAlive: true }, component: resolve => { require(['@/views/company/index.vue'], resolve) } },
            { path: 'agent-index', title: '代理商管理', parent: 'company-menu', name: 'company-agent-index', meta: { keepAlive: true }, component: resolve => { require(['@/views/company/agent-index.vue'], resolve) } },
            { path: 'create', title: '厂商添加', name: 'company-create', component: resolve => { require(['@/views/company/create.vue'], resolve) } },
            { path: 'edit/:id', title: '厂商编辑', name: 'company-edit', component: resolve => { require(['@/views/company/edit.vue'], resolve) } },
            { path: 'agent-create', title: '代理商添加', name: 'company-agent-create', component: resolve => { require(['@/views/company/agent-create.vue'], resolve) } },
            { path: 'agent-edit/:id', title: '代理商编辑', name: 'company-agent-edit', component: resolve => { require(['@/views/company/agent-edit.vue'], resolve) } }
        ]
    },
    {
        path: '/account',
        name: 'account',
        title: '管理员管理',
        component: Home,
        children: [
            { path: 'index', title: '管理员管理', parent: 'company-menu', role: 8, name: 'account-index', meta: { keepAlive: true }, component: resolve => { require(['@/views/account/index.vue'], resolve) } },
            { path: 'create', title: '用户添加', name: 'account-create', component: resolve => { require(['@/views/account/create.vue'], resolve) } },
            { path: 'details/:id', title: '管理员信息', name: 'account-details', component: resolve => { require(['@/views/account/details.vue'], resolve) } },
            { path: 'info', title: '个人中心', name: 'account-info', meta: { keepAlive: true }, component: resolve => { require(['@/views/account/info.vue'], resolve) } },
            { path: 'edit/:id', title: '用户编辑', name: 'account-edit', component: resolve => { require(['@/views/account/edit.vue'], resolve) } },
            { path: 'change-password', title: '修改密码', name: 'account-change-password', component: resolve => { require(['@/views/account/change-password.vue'], resolve) } },
            { path: 'vendor-index', title: '厂商管理员', parent: 'company-menu', role: 8, name: 'account-vendor-index', meta: { keepAlive: true }, component: resolve => { require(['@/views/account/vendor-index.vue'], resolve) } },
            { path: 'vendor-create', title: '厂商管理员添加', name: 'account-vendor-create', component: resolve => { require(['@/views/account/vendor-create.vue'], resolve) } },
            { path: 'vendor-edit/:id', title: '厂商管理员编辑', name: 'account-vendor-edit', component: resolve => { require(['@/views/account/vendor-edit.vue'], resolve) } },
            { path: 'agent-index', title: '代理商管理员', parent: 'company-menu', role: 8, name: 'account-agent-index', meta: { keepAlive: true }, component: resolve => { require(['@/views/account/agent-index.vue'], resolve) } },
            { path: 'agent-create', title: '代理商管理员添加', name: 'account-agent-create', component: resolve => { require(['@/views/account/agent-create.vue'], resolve) } },
            { path: 'agent-edit/:id', title: '代理商管理员编辑', name: 'account-agent-edit', component: resolve => { require(['@/views/account/agent-edit.vue'], resolve) } }
        ]
    },
  
    {
        path: '/product-type',
        name: 'product-type',
        title: '产品分类',
        component: Home,
        children: [
            { path: 'index', title: '产品分类管理', parent: 'system-menu', role: 6, name: 'product-type-index', meta: { keepAlive: true }, component: resolve => { require(['@/views/product-type/index.vue'], resolve) } },
            { path: 'create', title: '产品分类添加', name: 'product-type-create', component: resolve => { require(['@/views/product-type/create.vue'], resolve) } }
        ]
    },
    {
        path: '/product',
        name: 'product',
        title: '产品管理',
        component: Home,
        children: [
            { path: 'index', title: '产品管理', parent: 'product-menu', role: 11, name: 'product-index', meta: { keepAlive: true }, component: resolve => { require(['@/views/product/index.vue'], resolve) } },
            { path: 'details/:id', title: '产品信息', name: 'product-details', component: resolve => { require(['@/views/product/details.vue'], resolve) } },
            { path: 'create', title: '', name: 'product-create', component: resolve => { require(['@/views/product/create.vue'], resolve) } },
            { path: 'edit/:id', title: '', name: 'product-edit', component: resolve => { require(['@/views/product/edit.vue'], resolve) } },
            { path: 'product-agent/:id', title: '', name: 'product-agent', component: resolve => { require(['@/views/product/product-agent.vue'], resolve) } },
            { path: 'product-agent-details/:id', title: '', name: 'product-agent-details', component: resolve => { require(['@/views/product/product-agent-details.vue'], resolve) } },
            { path: 'sale-rule/:id', title: '', name: 'sale-rule', component: resolve => { require(['@/views/product/sale-rule.vue'], resolve) } },
            { path: 'product-add-sale-rule/:id', title: '', name: 'product-add-sale-rule', component: resolve => { require(['@/views/product/add-sale-rule.vue'], resolve) } }
        ]
    },
    {
        path: '/equipment',
        name: 'equipment',
        title: '设备管理',
        component: Home,
        children: [
            { path: 'index', title: '正式设备', parent: 'product-menu', role: 15, name: 'equipment-index', meta: { keepAlive: true }, component: resolve => { require(['@/views/equipment/index.vue'], resolve) } },
            { path: 'trial', title: '试用设备', parent: 'product-menu', name: 'equipment-trial', meta: { keepAlive: true }, component: resolve => { require(['@/views/equipment/trial.vue'], resolve) } },
            { path: 'inactivate', title: '待激活设备', parent: 'product-menu', role: 7, name: 'equipment-inactivate', component: resolve => { require(['@/views/equipment/inactivate.vue'], resolve) } },
            { path: 'logout', title: '待注销设备', parent: 'product-menu', role: 7, name: 'equipment-logout', component: resolve => { require(['@/views/equipment/logout.vue'], resolve) } },
            { path: 'logout/:serialNumber', title: '待注销设备信息', name: 'equipment-logout-details', component: resolve => { require(['@/views/equipment/logout-details.vue'], resolve) } },
            { path: 'online', title: '在线设备', parent: 'product-menu', role: 1, name: 'equipment-online', component: resolve => { require(['@/views/equipment/online.vue'], resolve) } },
            { path: 'details/:id', title: '', name: 'equipment-details', component: resolve => { require(['@/views/equipment/details.vue'], resolve) } },
            { path: 'create', title: '', name: 'equipment-create', component: resolve => { require(['@/views/equipment/create.vue'], resolve) } },
            { path: 'edit/:id', title: '', name: 'equipment-edit', component: resolve => { require(['@/views/equipment/edit.vue'], resolve) } },
            { path: 'upload', title: '上传设备信息', parent: 'product-menu', role: 7, name: 'equipment-upload', component: resolve => { require(['@/views/equipment/upload.vue'], resolve) } },
            { path: 'store', title: '库存列表', parent: 'product-menu', role: 7, name: 'equipment-store', component: resolve => { require(['@/views/equipment/store.vue'], resolve) } },
            { path: 'agent-store', title: '代理商库存', parent: 'product-menu', name: 'equipment-agent-store', component: resolve => { require(['@/views/equipment/agent-store.vue'], resolve) } },
            { path: 'history', title: '历史设备', parent: 'product-menu', name: 'equipment-history', component: resolve => { require(['@/views/equipment/history.vue'], resolve) } }
        ]
    },
    {
        path: '/user',
        name: 'user',
        title: '用户管理',
        component: Home,
        children: [
            { path: 'index', title: '用户管理', parent: 'user-menu', role: 6, name: 'user-index', meta: { keepAlive: true }, component: resolve => { require(['@/views/user/index.vue'], resolve) } },
            { path: 'details/:id/:code/:aid', title: '用户信息', role: 6, name: 'user-details', component: resolve => { require(['@/views/user/details.vue'], resolve) } }
        ]
    },
    {
        path: '/coupon',
        name: 'coupon',
        title: '优惠券管理',
        component: Home,
        children: [
            { path: 'index', title: '优惠券管理', parent: 'user-menu', role: 6, name: 'coupon-index', meta: { keepAlive: true }, component: resolve => { require(['@/views/coupon/index.vue'], resolve) } },
            { path: 'create', title: '添加优惠券', name: 'coupon-create', component: resolve => { require(['@/views/coupon/create.vue'], resolve) } },
            { path: 'edit/:id', title: '编辑优惠券', name: 'coupon-edit', component: resolve => { require(['@/views/coupon/edit.vue'], resolve) } }
        ]
    },
    {
        path: '/bill',
        name: 'bill',
        title: '账单管理',
        component: Home,
        children: [
            { path: 'unpaid', title: '待付款设备', parent: 'bill-menu', name: 'bill-unpaid', meta: { keepAlive: true }, component: resolve => { require(['@/views/bill/unpaid.vue'], resolve) } },
            { path: 'equipment-deposit', title: '押金统计', parent: 'bill-menu', name: 'bill-equipment-deposit', meta: { keepAlive: true }, component: resolve => { require(['@/views/bill/equipment-deposit.vue'], resolve) } },
            { path: 'company-revenue', title: '工厂收益', parent: 'bill-menu', name: 'bill-company-revenue', meta: { keepAlive: true }, component: resolve => { require(['@/views/bill/company-revenue.vue'], resolve) } },
            { path: 'agent-deduct', title: '代理商收益', parent: 'bill-menu', role: 6, name: 'bill-agent-deduct-index', meta: { keepAlive: true }, component: resolve => { require(['@/views/bill/agent-deduct-index.vue'], resolve) } },
            { path: 'company-recharge', title: '充值统计', parent: 'bill-menu', name: 'bill-company-recharge', meta: { keepAlive: true }, component: resolve => { require(['@/views/bill/company-recharge.vue'], resolve) } }
        ]
    }
]

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    ...menuRouter,
    ...appRouter
]
