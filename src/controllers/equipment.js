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

    // 获取试用设备
    getTrial (companyId) {
        if (companyId !== undefined) {
            return api._get({ url: '/t_equipment_set_free_time/findInfoByCompanyId', params: { company_id: companyId } })
                .then(res => {
                    return res.data
                })
        } else {
            return api._get({ url: '/t_equipment_set_free_time/findInfoByCompanyId' })
                .then(res => {
                    return res.data
                })
        }
    },

    // 获取待激活设备
    getInactivate (companyId) {
        if (companyId !== undefined) {
            return api._get({ url: '/t_equipment_owner_protocol/findByCompanyId', params: { company_id: companyId, auditing_state: 0 } })
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

    // 获取待激活设备详情
    getInactivateDetails (id, serailNumber) {
        return api._get({ url: '/t_equipment_owner_protocol/findDetailedInfoBySerialNumber', params: { serial_number: serailNumber, equipment_owner_protocol_id: id } })
            .then(res => {
                return res.data
            })
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

    // 获取待注销设备详情
    getLogoutDetails (serialNumber) {
        return api._get({ url: '/t_equipment_inactivate_apply/webfindInfoOfApplyInactivateBySerialNumber', params: { serial_number: serialNumber } })
            .then(res => {
                return res.data
            })
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

    // 中途结算
    settle (models) {
        return api._post({ 
            url: '/t_equipment/getStatisticsOfEquipmentOfThisMonth', 
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

    // 设备立即锁定 新接口
    lockEquipment (models) {
        return api._post({ 
            url: '/t_equipment/webSetLockDevice', 
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
    },

    // 获取库存设备
    getStores () {
        return api._get({ url: '/t_store/findStoreEquipmentInfoByConditions', params: { } })
            .then(res => {
                return res.data
            })
    },

    getStoresByCompany (companyId) {
        return api._get({ url: '/t_store/findStoreEquipmentInfoByConditions', params: { company_id: companyId } })
            .then(res => {
                return res.data
            })
    },

    // 设备转正
    agreeRealActivateApply (id, serialNumber) {
        return api._post({
                url: '/t_equipment/agreeRealActivateApply',
                data: {
                    id: id,
                    apply_state: 3,
                    serial_number: serialNumber
                }
            }).then(res => {
                return res.data
            })
    },

    // 设备转正驳回
    rejectRealActivateApply (id, serialNumber) {
        return api._post({
                url: '/t_equipment/agreeRealActivateApply',
                data: {
                    id: id,
                    apply_state: 4,
                    serial_number: serialNumber
                }
            }).then(res => {
                return res.data
            })
    },

    getBillList (serialNumber) {
        return api._get({ url: '/t_water_heater_equipment_statistics/findBySerialNumber', params: { serial_number: serialNumber } })
            .then(res => {
                return res.data
            })
    },

    // 直饮机账单记录
    getWaterCleanerBillList (serialNumber) {
        return api._get({ url: '/t_water_cleaner_equipment_statistics/findBySerialNumber', params: { serial_number: serialNumber } })
            .then(res => {
                return res.data
            })
    },

    // 更新设备用户信息
    updateOwner (model) {
        return api._post({ 
            url: '/t_equipment_owner_protocol/updateOwnerNameAndOwnerPhone', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    // 获取历史设备
    getHistory (serialNumber) {
        return api._get({ url: '/t_equipment_inactivate_log/webFindInfoByInfo', params: { serial_number: serialNumber } })
            .then(res => {
                return res.data
            })
    },

    // 获取热水器历史统计数据
    getHotWaterHistoryStatistic (serialNumber, startTime, endTime) {
        return api._get({ url: '/t_water_heater_equipment_statistics/findInactivateEquipmentStatisticsbySerialNumber', params: { serial_number: serialNumber, start_time: startTime, end_time: endTime } })
            .then(res => {
                return res.data
            })
    },

    // 获取直饮机历史统计数据
    getWaterCleanerHistoryStatistic (serialNumber, startTime, endTime) {
        return api._get({ url: '/t_water_cleaner_equipment_statistics/findInactivateEquipmentStatisticsbySerialNumber', params: { serial_number: serialNumber, start_time: startTime, end_time: endTime } })
            .then(res => {
                return res.data
            })
    },

    // 获取热水器实时数据
    getWaterHeaterRealByCompany (companyId) {
        return api._get({ url: '/device/t_equipment_commonController/getEquipmentStatusRealTimeByCompanyID', params: { company_id: companyId } })
            .then(res => {
                return res.data
            })
    },

    // 获取直饮机实时数据
    getWaterCleanerRealByCompany (companyId) {
        return api._get({ url: '/deviceOfWaterCleaner/t_equipment_commonController/getEquipmentStatusRealTimeByCompanyID', params: { company_id: companyId } })
            .then(res => {
                return res.data
            })
    },

    // 获取返厂设备数据
    getReturn (startTime, endTime) {
        return api._get({ url: '/platform_common/webfindReturnEquipment', params: { start_time: startTime, end_time: endTime } })
            .then(res => {
                return res.data
            })
    },

    // 维修过的设备出库数据
    getRepair (startTime, endTime) {
        return api._get({ url: '/platform_common/webfindAddAgentStoreReapiredEquipment', params: { start_time: startTime, end_time: endTime } })
            .then(res => {
                return res.data
            })
    }
}
