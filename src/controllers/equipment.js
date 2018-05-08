import * as api from '../utility/api'

export default {
    name: 'equipment',
    
    list () {
        return api._get({ url: '/t_equipment/findAll' })
            .then(res => {
                return res.data
            })
    },

    listView () {
        return api._get({ url: '/t_equipment/findAllInfo' })
            .then(res => {
                return res.data
            })
    },

    listByCompanyView (companyId) {
        return api._get({ url: '/t_equipment/findInfoByCompanyId', params: { company_id: companyId } })
            .then(res => {
                return res.data
            })
    },

    details (id) {
        return api._get({ url: '/t_equipment/findOne', params: { equipment_id: id } })
            .then(res => {
                return res.data
            })
    },

    detailsView (id) {
        return api._get({ url: '/t_equipment/findInfoById', params: { equipment_id: id } })
            .then(res => {
                return res.data
            })
    },

    create (model) {
        return api._post({
            url: '/t_equipment/add',
            data: model
        }).then(res => {
            return res.data
        })
    },

    update (model) {
        return api._post({ 
            url: '/t_equipment/update', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    // 获取待激活设备
    getInactivate (companyId) {
        if (companyId !== undefined) {
            return api._get({ url: '/t_equipment_owner_protocol/findByCompanyId', params: { company: companyId, auditing_state: 0 } })
                .then(res => {
                    return res.data
                })
        } else {
            return api._get({ url: '/t_equipment_owner_protocol/findAllOfActivate', params: { auditing_state: 0 } })
                .then(res => {
                    return res.data
                })
        }
    },

    // 获取待注销设备列表
    getLogout (agentCompanyId) {
        if (agentCompanyId !== undefined) {
            return api._get({ url: '/t_equipment_inactivate_apply/findInfoByCompanyId', params: { company_id: agentCompanyId } })
                .then(res => {
                    return res.data
                })
        } else {
            return api._get({ url: '/t_equipment_inactivate_apply/findAllInfo' })
                .then(res => {
                    return res.data
                })
        }
    },

    // 获取设备服务器设备列表
    getOnline () {
        return api._get({ url: '/device/t_equipment_key_status/findAll' })
            .then(res => {
                return res.data
            })
    },

    login () {
        return api._get({ url: '/t_equipment/activateEquipmentLogin' })
            .then(res => {
                return res.data
            })
    },

    // 设备激活
    activation (models) {
        return api._post({ 
            url: '/t_equipment/activateEquipmentOnly', 
            data: models
        }).then(res => {
            return res.data
        })
    },

    // 设备解锁
    lock (models) {
        return api._post({ 
            url: '/t_equipment/setDeblockingTimeAndDeblocking', 
            data: models
        }).then(res => {
            return res.data
        })
    },

    // 设备充值
    tradeIn (models) {
        return api._post({ 
            url: '/t_company_agent_equipment_finance_trade/addTochargeWalletByPlatform', 
            data: models
        }).then(res => {
            return res.data
        })
    },

    // 设备注销
    inactivate (models) {
        return api._post({
            url: '/t_equipment/inactivateEquipmentOnly',
            data: models
        }).then(res => {
            return res.data
        })
    },

    getKeyStatus (serialNumber) {
        return api._get({ url: '/device/t_equipment_key_status/findOneBySerialNumber', params: { serial_number: serialNumber } })
            .then(res => {
                return res.data
            })
    },

    getRealStatus (serialNumber) {
        return api._get({ url: '/device/t_equipment_key_status/getEquipmentStatusBySerialNumber', params: { serial_number: serialNumber, start_row_number: 1, row_number: 1 } })
            .then(res => {
                return res.data
            })
    },

    // 获取直饮机解锁状态
    getWaterCleanerLockStatus (serialNumber) {
        return api._get({ url: '/deviceOfWaterCleaner/t_equipment_key_status/findOneBySerialNumber', params: { serial_number: serialNumber } })
            .then(res => {
                return res.data
            })
    },

    // 获取直饮机状态
    getWaterCleanerStatus (serialNumber) {
        return api._get({ url: '/deviceOfWaterCleaner/t_equipment_key_status/getEquipmentStatusBySerialNumber', params: { serial_number: serialNumber, start_row_number: 1, row_number: 1 } })
            .then(res => {
                return res.data
            })
    }

}
