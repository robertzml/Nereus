import * as api from '../utility/api'

export default {
    name: 'company',

    list () {
        return api._get({ url: '/t_company/findAll' })
            .then(res => {
                return res.data
            })
    },

    listByType (type) {
        return api._get({ url: '/t_company/findByType', params: { type: type } })
            .then(res => {
                return res.data
            })
    },

    listByParent (parentId) {
        return api._get({ url: '/t_company/findByParentId', params: { parent_id: parentId } })
            .then(res => {
                return res.data
            })
    },

    // 获取厂商和其下代理商
    listAgentAndSelf (companyId) {
        return api._get({ url: '/t_company/findAgentAndMyCompanyById', params: { company_id: companyId } })
            .then(res => {
                return res.data
            })
    },

    details (id) {
        return api._get({ url: '/t_company/findOne', params: { company_id: id } })
            .then(res => {
                return res.data
            })
    },

    create (model) {
        return api._post({ 
            url: '/t_company/add', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    update (model) {
        return api._post({ 
            url: '/t_company/update', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    // 获取平台协议模版
    findAllAgreement () {
        return api._get({ url: '/t_apply_protocol_template_from_platform/findAll' })
            .then(res => {
                return res.data
            })
    },

    // 获取协议
    findAgreementById (id) {
        return api._get({ url: '/t_apply_protocol_template_from_platform/findOne', params: { id: id } })
            .then(res => {
                return res.data
            })
    },

    // 增加协议
    addAgreement (model) {
        return api._post({ 
            url: '/t_apply_protocol_template_from_platform/add', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    // 编辑协议
    editAgreement (model) {
        return api._post({ 
            url: '/t_apply_protocol_template_from_platform/update', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    // 获取厂商协议
    findCompanyAgreement () {
        return api._get({ url: '/t_apply_protocol_template_from_company/findAll' })
            .then(res => {
                return res.data
            })
    },

    findCompanyAgreementById (id) {
        return api._get({ url: '/t_apply_protocol_template_from_company/findOne', params: { id: id } })
            .then(res => {
                return res.data
            })
    },

    // 增加厂商协议
    addCompanyAgreement (model) {
        return api._post({ 
            url: '/t_apply_protocol_template_from_company/add', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    // 编辑厂商协议
    editCompanyAgreement (model) {
        return api._post({ 
            url: '/t_apply_protocol_template_from_company/update', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    // 获取公司下代理公司代理区域
    getDistrictList (companyId) {
        return api._get({ url: '/t_agent_district_setting/findAgentDistrict', params: { company_id: companyId } })
            .then(res => {
                return res.data
            })
    },

    findProvince () {
        return api._get({ url: '/t_agent_district_setting/findProvince' })
            .then(res => {
                return res.data
            })
    },

    findCity (provinceId) {
        return api._get({ url: '/t_agent_district_setting/findCity', params: { province_id: provinceId } })
            .then(res => {
                return res.data
            })
    },

    findDistrict (cityId) {
        return api._get({ url: '/t_agent_district_setting/findDistrict', params: { city_id: cityId } })
            .then(res => {
                return res.data
            })
    },

    // 添加代理商代理区域
    addAgentDistrict (model) {
        return api._post({ 
            url: '/t_agent_district_setting/add', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    cancelAgentDistrict (model) {
        return api._post({ 
            url: '/t_agent_district_setting/cancel', 
            data: model
        }).then(res => {
            return res.data
        })
    }
}
