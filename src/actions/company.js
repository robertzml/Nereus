import axios from 'axios'
import { apihost } from '../config.js'

export default {
    name: 'company',
    list (callback) {
        axios.get(apihost + '/company/getAllCompanyDetail')
            .then(function (response) {
                console.log(response)
                callback(response.data)
            })
    },
    details (id, callback) {
        axios.get(apihost + '/company/ViewCompany', {
            params: {
                id: id
            }
        }).then(function (response) {
            console.log(response)
            callback(response.data)
        })
    },
    delete (id, callback) {
        axios.get(apihost + '/company/DeleteCompany', {
            params: {
                id: id
            }
        }).then(function (response) {
            callback(response.data)
        }).catch(function (error) {
            console.log(error)
        })
    }
}
