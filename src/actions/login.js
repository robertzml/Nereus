import axios from 'axios'
import { apihost } from '../config.js'

export default {
    name: 'login',
    
    check (username, password, callback) {
        axios.post(apihost + '/login/loginMember', {
            userName: username,
            password: password
        })
        .then(function (response) {
            console.log(response)
            callback(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}
