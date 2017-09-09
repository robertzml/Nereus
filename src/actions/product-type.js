import axios from 'axios'
import { apihost } from '../config.js'

export default {
    name: 'product-list',

    list (callback) {
        axios.get(apihost + '/company/getAllCompanyDetail')
            .then(function (response) {
                console.log(response)
                callback(response.data)
            })
    }
}
