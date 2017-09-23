import axios from 'axios'
import config from '../utility/config.js'

export default {
    name: 'product-list',

    list (callback) {
        axios.get(config.apihost + '/company/getAllCompanyDetail')
            .then(function (response) {
                console.log(response)
                callback(response.data)
            })
    }
}
