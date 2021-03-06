import * as api from '../utility/api'

export default {
    login ({commit}, payload) {
        return api._post({ url: '/t_account/login', data: payload })
            .then(res => {
                let u = res.data
                if (u.status === 0) {
                    if (u.admin.role_id === 9 || u.admin.role_id === 10 || u.admin.role_id === 11) {
                        commit('LOGIN', {
                            login: false,
                            id: 0,
                            userName: '',
                            roleId: '',
                            roleType: '',
                            companyId: '' 
                        })
                        res.data.status = 4
                    } else {
                        commit('LOGIN', {
                            login: true,
                            id: u.admin.id,
                            userName: u.admin.user_name,
                            roleId: u.admin.role_id,
                            roleType: u.role_type,
                            companyId: u.admin.company_id 
                        })
                    }
                } else {
                    commit('LOGIN', {
                        login: false,
                        id: 0,
                        userName: '',
                        roleId: '',
                        roleType: '',
                        companyId: '' 
                    })
                }
                return res.data
            })
    },

    logout ({commit}) {
        commit('LOGOUT')
    }
}
