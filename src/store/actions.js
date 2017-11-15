import * as api from '../utility/api'

export default {
    login ({commit}, payload) {
        return api._post({ url: '/t_account/login', data: payload })
            .then(res => {
                console.log('action:')
                console.log(res)
                let u = res.data
                if (u.status === 0) {
                    console.log('login success')
                    commit('LOGIN', {
                        login: true,
                        id: u.admin.id,
                        userName: u.admin.user_name,
                        roleId: u.admin.role_id,
                        companyId: u.admin.company_id 
                    })
                } else {
                    console.log('login failed')
                    commit('LOGIN', {
                        login: false,
                        id: 0,
                        userName: '',
                        roleId: '',
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
