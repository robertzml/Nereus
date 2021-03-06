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

    // 获取代理商收益
    findAgentIncome (model) {
        return api._post({ 
            url: '/t_agent_account_month_income_detail/findInfoOfIncomeDetail', 
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
    getEquipmentDeposit (companyId, startTime, endTime, typeId) {
        return api._get({ url: '/t_agent_account_new_equipment/findInfoOfEquipmentDeposit', params: { product_company_id: companyId, start_time: startTime, end_time: endTime, type_id: typeId } })
            .then(res => {
                return res.data
            })
    },

    // 厂商收益
    getCompanyIncome (model) {
        return api._post({ 
            url: '/t_agent_account_month_income_detail/findInfoOfIncomeDetail', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    // 厂商充值统计
    getCompanyRecharge (companyId, startTime, endTime, status) {
        return api._get({ url: '/t_company_agent_equipment_finance_trade/findRechargeStatisticsByCompanyId', params: { company_id: companyId, start_time: startTime, end_time: endTime, recharge_status: status } })
            .then(res => {
                return res.data
            })
    },

    // 厂商账单
    getWaterheaterBill (companyId, month) {
        return api._get({ url: '/t_water_heater_equipment_statistics/findWaterHeaterBill', params: { company_id: companyId, statistics_year_month: month } })
            .then(res => {
                return res.data
            })
    },

    // 设备统计
    getEquipmentSummary (companyId, month) {
        return api._get({ url: '/t_water_heater_equipment_statistics/findWaterHeater', params: { company_id: companyId, statistics_year_month: month } })
            .then(res => {
                return res.data
            })
    },

    getEquipmentStatus (type, productTypeIds) {
        if (type === 1) {
            return api._get({ url: '/t_equipment_owner_protocol/webGetDeadLineTimeEquipmentStatusRealTimeByProductType', params: { product_type_ids: productTypeIds } })
                .then(res => {
                    return res.data
                })
        } else if (type === 2) {
            return api._get({ url: '/t_equipment_owner_protocol/webGetOnlineEquipmentStatusRealTimeByProductType', params: { product_type_ids: productTypeIds } })
                .then(res => {
                    return res.data
                })
        } else if (type === 3) {
            return api._get({ url: '/t_equipment_owner_protocol/webGetMaintainEquipmentStatusRealTimeByProductType', params: { product_type_ids: productTypeIds } })
                .then(res => {
                    return res.data
                })
        } else if (type === 4) {
            return api._get({ url: '/t_equipment_owner_protocol/webGetAlarmEquipmentStatusRealTimeByProductType', params: { product_type_ids: productTypeIds } })
                .then(res => {
                    return res.data
                })
        }
    },

    findInactivateBill (id) {
        return api._get({ url: '/t_agent_account_new_equipment/findInactivateBillInfoById', params: { t_equipment_inactivate_bill_id: id } })
            .then(res => {
                return res.data
            })
    }
}

