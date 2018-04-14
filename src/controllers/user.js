import * as api from '../utility/api'

export default {
    name: 'user',

    listByAgent (agentId) {
        return api._get({ url: '/t_equipment_owner_protocol/findConsumerInfoByConditionsAndProductId', params: { agent_id: agentId } })
            .then(res => {
                return res.data
            })
    },

    findConsumerWallet (consumerId, companyCode) {
        return api._get({ url: '/t_company_agent_equipment_finance_trade/findConsumerWalletByConsumerId', params: { consumer_id: consumerId, company_code: companyCode } })
            .then(res => {
                return res.data
            })
    }
}
