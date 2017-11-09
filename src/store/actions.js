import * as api from '../utility/api'

export default {
    login ({commit}, payload) {
        return api._post({ url: '/t_account/login', data: payload })
            .then(res => {
                console.log(res)
                commit('LOGIN', {
                    login: true,
                    id: res.data,
                    name: '',
                    roleId: '',
                    complayId: ''
                })
                return res.data
            })
        
        /*
        return api._get({url: '/t_account/login', data: { user_name: payload.user_name, password: payload.password }})
            .then(res => {
                console.log(res)
                commit('LOGIN', {
                    login: true,
                    id: res.data,
                    name: '',
                    roleId: '',
                    complayId: ''
                })
                return res.data
            })
            */
    },

    logout ({commit}) {
        commit('LOGOUT')
    }
}
