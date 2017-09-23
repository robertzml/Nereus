import axios from 'axios'
import config from '../utility/config.js'

export default {
    name: 'company',
    list (callback) {
        axios.get(config.apihost + '/company/getAllCompanyDetail')
            .then(function (response) {
                console.log(response)
                callback(response.data)
            })
    },
    details (id, callback) {
        axios.get(config.apihost + '/company/ViewCompany', {
            params: {
                id: id
            }
        }).then(function (response) {
            console.log(response)
            callback(response.data)
        })
    },
    create (model, callback) {
        axios.post(config.apihost + '/company/AddCompany', model)
            .then(function (response) {
                console.log(response)
                callback(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    },
    update (model, callback) {
        axios.post(config.apihost + '/company/EditCompany', {
            id: model.id,
            name: model.name,
            address: model.address,
            contacts: model.contacts,
            phone: model.phone
        }).then(function (response) {
            console.log(response)
            callback(response)
        }).catch(function (error) {
            console.log(error)
        })
    },
    delete (id, callback) {
        axios.get(config.apihost + '/company/DeleteCompany', {
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
