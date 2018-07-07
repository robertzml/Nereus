import * as api from '../utility/api'

export default {
    name: 'statistic',

    // 获取热水器当前月统计
    getWaterHeaterCurrent (serialNumber) {
        return api._get({ url: '/t_water_heater_equipment_statistics/findPresentMonthWaterHeaterEquipmentStatistics', params: { serial_number: serialNumber } })
            .then(res => {
                return res.data
            })
    },

    // 获取热水器总统计
    getWaterHeaterTotal (serialNumber) {
        return api._get({ url: '/t_water_heater_equipment_statistics/findTotalWaterHeaterEquipmentStatistics', params: { serial_number: serialNumber } })
            .then(res => {
                return res.data
            })
    },

    // 获取热水器时间范围统计
    getWaterHeaterRange (serialNumber, start, end) {
        return api._get({ url: '/t_water_heater_equipment_statistics/findEquipmentStatisticsbySerialNumber', params: { serial_number: serialNumber, start_time: start, end_time: end } })
            .then(res => {
                return res.data
            })
    },

    // 获取直饮机当前月统计
    getWaterCleanerCurrent (serialNumber) {
        return api._get({ url: '/t_water_cleaner_equipment_statistics/findPresentMonthEquipmentStatistics', params: { serial_number: serialNumber } })
            .then(res => {
                return res.data
            })
    },

    // 获取直饮机总统计
    getWaterCleanerTotal (serialNumber) {
        return api._get({ url: '/t_water_heater_equipment_statistics/findTotalWaterHeaterEquipmentStatistics', params: { serial_number: serialNumber } })
            .then(res => {
                return res.data
            })
    },

    // 获取直饮机时间范围统计
    getWaterCleanerRange (serialNumber, start, end) {
        return api._get({ url: '/t_water_cleaner_equipment_statistics/findEquipmentStatisticsbySerialNumber', params: { serial_number: serialNumber, start_time: start, end_time: end } })
            .then(res => {
                return res.data
            })
    }
}
