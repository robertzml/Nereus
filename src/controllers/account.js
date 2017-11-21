import * as api from '../utility/api'

export default {
    name: 'account',

    list () {
        return api._get({ url: '/t_account/findAll' })
            .then(res => {
                return res.data
            })
    },

    listView () {
        return api._get({ url: '/t_account/findAllInfo' })
            .then(res => {
                return res.data
            })
    }
}
