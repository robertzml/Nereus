import * as api from '../utility/api'

export default {
    name: 'product-agent',

    findByAgentCompanyView (agentCompanyId) {
        return api._get({ url: '/t_product_agent/findInfoByAgentCompanyId', params: { agent_company_id: agentCompanyId } })
            .then(res => {
                return res.data
            })
    },

    create (model) {
        return api._post({ 
            url: '/t_product_agent/add', 
            data: model
        }).then(res => {
            return res.data
        })
    }
}
