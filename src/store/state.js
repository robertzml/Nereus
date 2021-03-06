/* state.js */

export default {
    user: {
        login: false,
        id: '',
        userName: '',
        roleId: '',
        roleType: '',
        companyId: ''
    },
    menuList: [],
    /* 角色ID代码对照 */
    roleCode: [
        { roleId: 1, code: 'root' }, 
        { roleId: 2, code: 'platform-admin' }, { roleId: 3, code: 'platform-man' }, { roleId: 4, code: 'platform-fin' }, 
        { roleId: 5, code: 'vendor-admin' }, { roleId: 6, code: 'vendor-man' }, { roleId: 7, code: 'vendor-fin' }, 
        { roleId: 8, code: 'agent-admin' }, { roleId: 9, code: 'agent-man' }, { roleId: 10, code: 'agent-lab' }, { roleId: 11, code: 'agent-ins' }
    ],
    /* 角色顶级菜单 */
    roleMenu: [
        { roleId: 1, menus: [ 'company-menu', 'product-menu', 'user-menu', 'bill-menu', 'system-menu' ] },
        { roleId: 2, menus: [ 'company-menu', 'product-menu', 'user-menu', 'bill-menu', 'system-menu' ] },
        { roleId: 3, menus: [ 'company-menu', 'product-menu', 'user-menu', 'bill-menu', 'system-menu' ] },
        { roleId: 4, menus: [ 'company-menu', 'product-menu', 'user-menu', 'bill-menu', 'system-menu' ] },
        { roleId: 5, menus: [ 'company-menu', 'product-menu', 'user-menu', 'bill-menu' ] },
        { roleId: 6, menus: [ 'company-menu', 'product-menu', 'user-menu', 'bill-menu' ] },
        { roleId: 7, menus: [ 'company-menu', 'product-menu' ] },
        { roleId: 8, menus: [ 'company-menu', 'product-menu', 'user-menu', 'bill-menu' ] },
        { roleId: 9, menus: [ 'company-menu', 'product-menu', 'user-menu' ] },
        { roleId: 10, menus: [ 'company-menu', 'product-menu' ] },
        { roleId: 11, menus: [ 'product-menu', 'user-menu' ] }
    ],
    /* 页面视图权限 */
    viewPrivilege: [
        { name: 'dashboard', roles: [1, 2, 3, 4] },
        { name: 'company-index', roles: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
        { name: 'company-agent-index', roles: [5, 6, 7] },
        { name: 'account-index', roles: [1, 2, 3, 4] },
        { name: 'account-vendor-index', roles: [5, 6, 7] },
        { name: 'account-agent-index', roles: [5, 6, 7, 8, 9] },
        { name: 'agreement-index', roles: [1, 2, 3, 4, 5] },
        { name: 'agreement-push', roles: [1, 2, 3, 4] },
        { name: 'district-index', roles: [1, 2, 3, 4, 5] },
        { name: 'product-index', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'product-type-index', roles: [1, 2, 3] },
        { name: 'role-index', roles: [1] },
        { name: 'equipment-index', roles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
        { name: 'equipment-trial', roles: [1, 2, 3, 4, 5, 6, 7, 8] },
        { name: 'equipment-inactivate', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'equipment-logout', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'equipment-logout-details', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'equipment-online', roles: [1] },
        { name: 'equipment-upload', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'equipment-store', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'equipment-agent-store', roles: [1] },
        { name: 'equipment-history', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'equipment-real', roles: [1, 2, 3, 4, 5] },
        { name: 'equipment-return', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'equipment-repair', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'user-index', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'user-agreement', roles: [1, 2, 3, 4, 5, 6, 8] },
        { name: 'user-agreement-details', roles: [1, 2, 3, 4, 5, 6, 8] },
        { name: 'user-apply', roles: [1, 2, 3, 4, 5] },
        { name: 'coupon-index', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'bill-unpaid', roles: [1, 2, 3, 4, 5, 6, 8] },
        { name: 'bill-equipment-deposit', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'bill-company-revenue', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'bill-agent-deduct-index', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'bill-company-recharge', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'bill-waterheater-bill', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'bill-equipment-summary', roles: [1, 2, 3, 4, 5, 6] },
        { name: 'bill-equipment-status', roles: [1, 2, 3, 4, 5, 6] }
    ]
}
