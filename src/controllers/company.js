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
            console.log('company add: ')
            console.log(res)
            return res.data
        })
    },

    update (model) {
        return api._post({ 
            url: '/t_company/update', 
            data: {
                id: model.id,
                name: model.name,
                code: model.code,
                type: model.type,
                address: model.address,
                contact: model.contact,
                phone: model.phone,
                aftersale_phone: model.aftersale_phone,
                remark: model.remark
            }})
            .then(res => {
                console.log('company update: ')
                console.log(res)
                return res.data
            })
    }
}
