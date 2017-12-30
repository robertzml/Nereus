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
    getInactivate () {
        return api._get({ url: '/t_device_owner_protocol/findAllOfActivate', params: { auditing_state: 0 } })
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

    getStatus (serialNumber) {
        return api._get({ url: '/device/t_equipment_key_status/findOneBySerialNumber', params: { serial_number: serialNumber } })
            .then(res => {
                return res.data
            })
    }
}
