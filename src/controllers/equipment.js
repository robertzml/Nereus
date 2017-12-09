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

    details (id) {
        return api._get({ url: '/t_equipment/findOne', params: { equipment_id: id } })
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
    }
}
