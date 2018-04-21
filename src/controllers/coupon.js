import * as api from '../utility/api'

export default {
    name: 'coupon',

    listByCompany (companyId) {
        return api._get({ url: '/t_product_sale_coupon_rule/findByMyCompanyId', params: { company_id: companyId } })
            .then(res => {
                return res.data
            })
    }
}
