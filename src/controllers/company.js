import * as api from '../utility/api'

export default {
    name: 'company',

    list () {
        return api._get({ url: '/company/getAllCompanyDetail' })
            .then(res => {
                console.log('company list: ')
                console.log(res)
                return res.data
            })
    },

    details (id) {
        return api._get({ url: '/company/ViewCompany', data: { id: id } })
            .then(res => {
                console.log('company details: ')
                console.log(res)
                return res.data
            })
    },

    create (model) {
        return api._post({ url: '/company/AddCompany', data: model })
            .then(res => {
                console.log('company create: ')
                console.log(res)
                return res.data
            })
    }
}
