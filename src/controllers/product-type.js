import * as api from '../utility/api'

export default {
    name: 'product-type',
    
    list () {
        return api._get({ url: '/t_product_type/findAll' })
            .then(res => {
                return res.data
            })
    },

    details (id) {
        return api._get({ url: '/t_product_type/findOne', params: { type_id: id } })
            .then(res => {
                return res.data
            })
    },

    create (model) {
        return api._post({ 
            url: '/t_product_type/add', 
            data: model
        }).then(res => {
            return res.data
        })
    }
}
