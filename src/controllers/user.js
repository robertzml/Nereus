import * as api from '../utility/api'

export default {
    name: 'user',

    details (companyCode, agentId, consumerId) {
        return api._get({ url: '/t_equipment_owner_protocol/findConsumerInfoByConsumerIdAndAgentIdAndCompanyCode', params: { company_code: companyCode, agent_id: agentId, consumer_id: consumerId } })
            .then(res => {
                return res.data
            })
    },

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
    },

    // 消费者钱包汇总
    findConsumerWalletSum (consumerId, companyCode) {
        return api._get({ url: '/t_company_agent_equipment_finance_trade/findConsumerWalletSumByConditions', params: { consumer_id: consumerId, company_code: companyCode } })
            .then(res => {
                return res.data
            })
    },

    // 获取用户手机号
    findConsumerPhone (consumerId) {
        return api._get({ url: '/t_company_agent_equipment_finance_trade/findConsumerPhoneByConsumerId', params: { consumer_id: consumerId } })
            .then(res => {
                return res.data
            })
    },

    // 用户充值
    tradeIn (model) {
        return api._post({ 
            url: '/t_company_agent_equipment_finance_trade/addTochargeWalletByPlatformAndPhone',
            data: model
        }).then(res => {
            return res.data
        })
    }
}
