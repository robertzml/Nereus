import * as api from '../utility/api'

export default {
    name: 'bill',

    // 查找代理商用户扣款账单
    findDeductByAgentAndProductType (model) {
        return api._post({ 
            url: '/t_company_agent_equipment_finance_trade/findWithholdingBillByProductTypeIdAndAgentIdWithTime', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    // 获取直饮机待付款信息
    findWaterCleanerPaymentInfoByCompany (companyId) {
        return api._get({ url: '/t_water_cleaner_equipment_statistics/findPaymentInfoByCompanyId', params: { company_id: companyId } })
            .then(res => {
                return res.data
            })
    },

    // 获取热水器待付款信息
    findWaterHeaterPaymentInfoByCompany (companyId) {
        return api._get({ url: '/t_water_heater_equipment_statistics/findPaymentInfoByCompanyId', params: { company_id: companyId } })
            .then(res => {
                return res.data
            })
    },

    // 获取设备待付款信息
    findPaymentInfo () {
        return api._get({ url: '/t_company_agent_equipment_finance_trade/findPaymentInfoByCompanyId' })
            .then(res => {
                return res.data
            })
    },

    findPaymentInfoByCompany (companyId) {
        return api._get({ url: '/t_company_agent_equipment_finance_trade/findPaymentInfoByCompanyId', params: { company_id: companyId } })
            .then(res => {
                return res.data
            })
    },

    findPaymentInfoByAgent (agentId) {
        return api._get({ url: '/t_company_agent_equipment_finance_trade/findPaymentInfoByCompanyId', params: { agent_id: agentId } })
            .then(res => {
                return res.data
            })
    },

    // 设备押金明细
    getEquipmentDeposit (companyId, startTime, endTime) {
        return api._get({ url: '/t_agent_account_new_equipment/findInfoOfEquipmentDeposit', params: { product_company_id: companyId, start_time: startTime, end_time: endTime } })
            .then(res => {
                return res.data
            })
    }
}

