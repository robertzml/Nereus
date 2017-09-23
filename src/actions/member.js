import axios from 'axios'
import config from '../utility/config.js'

export default {
    name: 'role',

    list (callback) {
        axios.get(config.apihost + '/member/getMemberDetail')
            .then(function (response) {
                console.log(response)
                callback(response.data)
            })
    },

    details (id, callback) {
        axios.get(config.apihost + '/member/ViewMember', {
            params: {
                id: id
            }
        }).then(function (response) {
            console.log(response)
            callback(response.data)
        })
    },

    update (model, callback) {
        axios.post(config.apihost + '/member/EditMember', {
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
    }
}
