import * as api from '../utility/api'

export default {
    name: 'statistic',

    // 获取热水器当前月统计
    getWaterHeaterCurrentMonth (serialNumber) {
        return api._get({ url: '/t_water_heater_equipment_statistics/findPresentMonthWaterHeaterEquipmentStatistics', params: { serial_number: serialNumber } })
            .then(res => {
                return res.data
            })
    }
}
