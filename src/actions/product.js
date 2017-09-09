import axios from 'axios'
import { apihost } from '../config.js'

export default {
    name: 'product',

    list (callback) {
        axios.get(apihost + '/goods/getGoodsDetail')
            .then(function (response) {
                console.log(response)
                callback(response.data)
            })
    },

    listByCompany (companyId, callback) {
        axios.get(apihost + '/goods/getGoodsByCompany', {
            params: {
                companyId: companyId
            }
        }).then(function (response) {
            callback(response.data)
        })
    },

    details (id, callback) {
        axios.get(apihost + '/goods/ViewGoods', {
            params: {
                id: id
            }
        }).then(function (response) {
            console.log(response)
            callback(response.data)
        })
    }
}
