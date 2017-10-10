import * as api from '../utility/api'

export default {
    login ({commit}, payload) {
        return api._post({ url: '/login/loginMember', data: payload })
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
    },

    logout ({commit}) {
        commit('LOGOUT')
    }
}
