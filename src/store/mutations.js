import { menuRouter, appRouter } from '@/router/router'

export default {
    LOGIN: (state, userInfo) => {
        state.user = userInfo
    },

    LOGOUT: (state) => {
        state.user.login = false
        state.user.id = ''
        state.user.userName = ''
        state.user.roleId = ''
        state.user.roleType = ''
        state.user.companyId = ''
    },

    UpdateMenu: (state) => {
        let menuList = []
        let roleId = state.user.roleId
        menuRouter.forEach((item, index) => {
            if (roleId <= item.role) {
                item.children = []
                menuList.push(item)
            } 
        })

        appRouter.forEach((item, index) => {
            if (item.children !== undefined) {
                item.children.forEach((child) => {
                    if (child.parent !== undefined && roleId <= child.role) {
                        let find = menuList.find((m) => m.name === child.parent)
                        if (find !== undefined) {
                            find.children.push(child)
                        }
                    }
                })
            }
        })
        state.menuList = menuList
    },

    SetMenu: (state) => {
        let menuList = []
        let roleId = state.user.roleId
     
        let roleMenu = state.roleMenu.find(r => r.roleId === roleId)
        menuRouter.forEach((item, index) => {
            if (roleMenu.menus.indexOf(item.name) !== -1) {
                item.children = []
                menuList.push(item)
            }
        })
        
        appRouter.forEach((item, index) => {
            if (item.children !== undefined) {
                item.children.forEach((child) => {
                    let viewPrivilege = state.viewPrivilege.find(r => r.name === child.name)
                    if (viewPrivilege !== undefined) {
                        if (viewPrivilege.roles.indexOf(roleId) !== -1 && child.parent !== undefined) {
                            let find = menuList.find(m => m.name === child.parent)
                            if (find !== undefined) {
                                find.children.push(child)
                            }
                        }
                    }
                })
            }
        })

        state.menuList = menuList
    }
}
