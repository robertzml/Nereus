import * as api from '../utility/api'
import store from '../store'
import { mapActions } from 'vuex'

export default {
    name: 'product',
    
    list () {
        return api._get({ url: '/t_product/findAll' })
            .then(res => {
                return res.data
            })
    },

    listByMyCompany () {
        return api._get({ url: '/t_product/findByMyCompany' })
            .then(res => {
                return res.data
            })
    },

    listView () {
        return api._getAuth({ 
            url: '/t_product/findAllInfo'
        }).then(res => {
            return res.data
        })
    },

    listByCompanyView (companyId) {
        return api._get({ url: '/t_product/findInfoByCompanyId', params: { company_id: companyId } })
            .then(res => {
                return res.data
            })
    },

    listByType (productTypeId) {
        return api._get({ url: '/t_product/findProductByCompanyIdAndProductTypeId', params: { product_type_id: productTypeId } })
            .then(res => {
                return res.data
            })
    },

    listByTypeAndCompany (productTypeId, companyId) {
        return api._get({ url: '/t_product/findProductByCompanyIdAndProductTypeId', params: { product_type_id: productTypeId, company_id: companyId } })
            .then(res => {
                return res.data
            })
    },

    getCompanyCode (productId) {
        return api._get({ url: '/t_product/findCompanyCodeByProductId', params: { product_id: productId } })
            .then(res => {
                return res.data
            })
    },

    details (id) {
        return api._get({ url: '/t_product/findOne', params: { product_id: id } })
            .then(res => {
                return res.data
            })
    },

    create (model) {
        return api._post({ 
            url: '/t_product/add', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    update (model) {
        return api._post({
            url: '/t_product/update',
            data: model
        }).then(res => {
            return res.data
        })
    },

    addSaleRule (model) {
        return api._post({
            url: '/t_product_sale_rule/add',
            data: model
        }).then(res => {
            return res.data
        })
    },

    getSaleRules (productId) {
        return api._get({ url: '/t_product_sale_rule/getProductSaleRuleByProductId', params: { product_id: productId } })
            .then(res => {
                return res.data
            })
    },

    findSaleRule (ruleId) {
        return api._get({ url: '/t_product_sale_rule/findOne', params: { product_sale_rule_id: ruleId } })
            .then(res => {
                return res.data
            })
    },

    findQuantity (productId) {
        return api._get({ url: '/t_equipment_owner_protocol/findQuantityByAgentIdAndIsUnlockForAgentApp', params: { product_id: productId } })
            .then(res => {
                return res.data
            })
    },

    updateSaleRuleStatus (model) {
        return api._post({
            url: '/t_product_sale_rule/forbidden',
            data: model
        }).then(res => {
            return res.data
        })
    },

    // 获取分成比例列表
    getShareList (saleRuleId) {
        return api._get({ url: '/t_product_agent_money_sharing/findByCondition', params: { product_sale_rule_id: saleRuleId } })
            .then(res => {
                return res.data
            })
    },

    // 添加分成比例
    addShare (model) {
        return api._post({
            url: '/t_product_agent_money_sharing/add',
            data: model
        }).then(res => {
            return res.data
        })
    }
}
