import * as api from '../utility/api'

export default {
    name: 'user',

    details (companyCode, agentId, consumerId) {
        return api._get({ url: '/t_equipment_owner_protocol/findConsumerInfoByConsumerIdAndAgentIdAndCompanyCode', params: { company_code: companyCode, agent_id: agentId, consumer_id: consumerId } })
            .then(res => {
                return res.data
            })
    },

    list () {
        return api._get({ url: '/t_equipment_owner_protocol/findConsumerInfoByConditionsAndProductId' })
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
    },

    // 用户押金
    getDeposit (consumerId) {
        /*
        return api._get({ url: '/t_company_agent_equipment_finance_trade/findDeviceDepositByConsumerId', params: { consumer_id: consumerId } })
            .then(res => {
                return res.data
            })
        */
        return api._get({ url: '/t_agent_account_new_equipment/findDeviceDepositByConsumerId', params: { consumer_id: consumerId } })
            .then(res => {
                return res.data
            })   
    },

    // 用户红冲
    deductTrade (model) {
        return api._post({ 
            url: '/t_company_agent_equipment_finance_trade/deductTochargeWalletByPlatformAndPhone',
            data: model
        }).then(res => {
            return res.data
        })
    },

    // 消费者钱包信息详情
    findConsumerBillByOutTradeNo (tradeNumber) {
        return api._get({ url: '/t_company_agent_equipment_finance_trade/findConsumerBillByOutTradeNo', params: { out_trade_no: tradeNumber } })
            .then(res => {
                return res.data
            })
    },

    // 查看申请更换设备主人电话号码列表
    getApplyUpdatePhoneList (companyId) {
        return api._get({ url: '/t_equipment_owner_protocol/findTApplyUpdatePhone', params: { company_id: companyId } })
            .then(res => {
                return res.data
            }) 
    },

    // 修改用户电话
    updateOwnerPhone (model) {
        return api._post({ 
            url: '/t_equipment_owner_protocol/updateOwnerPhone',
            data: model
        }).then(res => {
            return res.data
        })
    },

    // 查看用户协议
    findUserAgreement (companyId, status) {
        return api._get({ url: '/t_equipment_owner_apply_protocol/findInfoByCompanyId', params: { company_id: companyId, status: status } })
            .then(res => {
                return res.data
            }) 
    },

    findUserAgreementInfo (id) {
        return api._get({ url: '/t_equipment_owner_apply_protocol/findContentById', params: { id: id } })
            .then(res => {
                return res.data
            }) 
    },

    // 确认设备安装
    equipmentIsInstall (model) {
        return api._post({ 
            url: '/t_equipment_owner_apply_protocol/equipmentIsInstall',
            data: model
        }).then(res => {
            return res.data
        })
    },

    // 审核设备
    equipmentAgreeApply (model) {
        return api._post({ 
            url: '/t_equipment_owner_apply_protocol/agreeApply',
            data: model
        }).then(res => {
            return res.data
        })
    }
}
