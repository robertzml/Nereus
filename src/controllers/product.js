import * as api from '../utility/api'
import store from '../store'
import { mapActions } from 'vuex'

export default {
    name: 'product-type',
    
    list () {
        return api._get({ url: '/t_product/findAll' })
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
    }
}
