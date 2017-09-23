import axios from 'axios'
import config from '../utility/config.js'

export default {
    name: 'product',

    list (callback) {
        axios.get(config.apihost + '/goods/getGoodsDetail')
            .then(function (response) {
                console.log(response)
                callback(response.data)
            })
    },

    listByCompany (companyId, callback) {
        axios.get(config.apihost + '/goods/getGoodsByCompany', {
            params: {
                companyId: companyId
            }
        }).then(function (response) {
            callback(response.data)
        })
    },

    details (id, callback) {
        axios.get(config.apihost + '/goods/ViewGoods', {
            params: {
                id: id
            }
        }).then(function (response) {
            console.log(response)
            callback(response.data)
        })
    }
}
