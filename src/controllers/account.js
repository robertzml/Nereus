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
    },

    details (id) {
        return api._get({ url: '/t_account/findOne', params: { account_id: id } })
            .then(res => {
                return res.data
            })
    },

    detailsView (id) {
        return api._get({ url: '/t_account/findInfoById', params: { account_id: id } })
            .then(res => {
                return res.data
            })
    },

    update (model) {
        return api._post({ 
            url: '/t_account/update', 
            data: model
        }).then(res => {
            return res.data
        })
    }
}
