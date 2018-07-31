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
    }
}

