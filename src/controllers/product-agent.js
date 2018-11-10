import * as api from '../utility/api'

export default {
    name: 'product-agent',

    findByAgentCompanyView (agentCompanyId) {
        return api._get({ url: '/t_product_agent/findInfoByAgentCompanyId', params: { agent_company_id: agentCompanyId } })
            .then(res => {
                return res.data
            })
    },

    // 获取产品代理信息
    findInfo (productAgentId) {
        return api._get({ url: '/t_product_agent/findInfoByProductAgentId', params: { t_product_agent_id: productAgentId } })
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
    },

    // 添加代理商分成
    addAgentMoneyShare (model) {
        return api._post({ 
            url: '/t_product_agent_money_sharing/add', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    // 编辑代理商分成
    updateAgentMoneyShare (model) {
        return api._post({ 
            url: '/t_product_agent_money_sharing/update', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    // 获取代理商分成
    findAgentMoneyShare (agentId, productId) {
        return api._get({ url: '/t_product_agent_money_sharing/findByCondition', params: { agent_id: agentId, product_id: productId } })
            .then(res => {
                return res.data
            })
    }
}
