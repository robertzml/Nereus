import axios from 'axios'
import { apihost } from '../config.js'

export default {
    name: 'role',

    list (callback) {
        axios.get(apihost + '/role/getRoleDetail')
            .then(function (response) {
                console.log(response)
                callback(response.data)
            })
    }
}
