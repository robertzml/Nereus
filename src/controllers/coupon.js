import * as api from '../utility/api'

export default {
    name: 'coupon',

    findOne (id) {
        return api._get({ url: '/t_product_sale_coupon_rule/findOne', params: { product_sale_coupon_rule_id: id } })
            .then(res => {
                return res.data
            })
    },

    listByCompany (companyId) {
        return api._get({ url: '/t_product_sale_coupon_rule/findByMyCompanyId', params: { company_id: companyId } })
            .then(res => {
                return res.data
            })
    },

    create (model) {
        return api._post({ 
            url: '/t_product_sale_coupon_rule/add', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    update (model) {
        return api._post({ 
            url: '/t_product_sale_coupon_rule/update', 
            data: model
        }).then(res => {
            return res.data
        })
    }
}
