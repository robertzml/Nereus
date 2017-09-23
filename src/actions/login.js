import axios from 'axios'
import config from '../utility/config.js'

export default {
    name: 'login',
    
    check (username, password, callback) {
        axios.post(config.apihost + '/login/loginMember', {
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
