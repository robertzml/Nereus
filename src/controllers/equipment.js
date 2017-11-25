import * as api from '../utility/api'

export default {
    name: 'equipment',
    
    list () {
        return api._get({ url: '/t_equipment/findAll' })
            .then(res => {
                return res.data
            })
    },

    details (id) {
        return api._get({ url: '/t_equipment/findOne', data: { equipment_id: id } })
            .then(res => {
                return res.data
            })
    }
}
