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
    }
}
