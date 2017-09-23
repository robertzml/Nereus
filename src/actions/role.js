import axios from 'axios'
import config from '../utility/config.js'

export default {
    name: 'role',

    list (callback) {
        axios.get(config.apihost + '/role/getRoleDetail')
            .then(function (response) {
                console.log(response)
                callback(response.data)
            })
    }
}
