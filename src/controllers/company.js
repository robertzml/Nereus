import * as api from '../utility/api'

export default {
    name: 'company',

    list () {
        return api._get({ url: '/t_company/findAll' })
            .then(res => {
                return res.data
            })
    },

    details (id) {
        return api._get({ url: '/t_company/findOne', data: { company_id: id } })
            .then(res => {
                return res.data
            })
    },

    create (model) {
        return api._post({ 
            url: '/t_company/add', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    update (model) {
        return api._post({ 
            url: '/t_company/update', 
            data: model
        }).then(res => {
            return res.data
        })
    }
}