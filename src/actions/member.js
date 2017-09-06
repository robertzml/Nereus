import axios from 'axios'
import { apihost } from '../config.js'

export default {
    name: 'role',

    list (callback) {
        axios.get(apihost + '/member/getMemberDetail')
            .then(function (response) {
                console.log(response)
                callback(response.data)
            })
    },

    details (id, callback) {
        axios.get(apihost + '/member/ViewMember', {
            params: {
                id: id
            }
        }).then(function (response) {
            console.log(response)
            callback(response.data)
        })
    },

    update (model, callback) {
        axios.post(apihost + '/member/EditMember', {
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
}
