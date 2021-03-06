import * as api from '../utility/api'

export default {
    name: 'account',

    list () {
        return api._get({ url: '/t_account/findAll' })
            .then(res => {
                return res.data
            })
    },

    listView () {
        return api._get({ url: '/t_account/findAllInfo' })
            .then(res => {
                return res.data
            })
    },

    details (id) {
        return api._get({ url: '/t_account/findOne', params: { account_id: id } })
            .then(res => {
                return res.data
            })
    },

    detailsView (id) {
        return api._get({ url: '/t_account/findInfoById', params: { account_id: id } })
            .then(res => {
                return res.data
            })
    },

    /* 获取指定公司所有用户视图 */
    companyView (companyId) {
        return api._get({ url: '/t_account/findInfoByCompanyId', params: { company_id: companyId } })
            .then(res => {
                return res.data
            })
    },

    /* 获取指定公司下代理商所有用户视图 */
    agentsView (companyId) {
        return api._get({ url: '/t_account/findAgentInfoByCompanyId', params: { company_id: companyId } })
            .then(res => {
                return res.data
            })
    },

    create (model) {
        return api._post({ 
            url: '/t_account/add', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    update (model) {
        return api._post({ 
            url: '/t_account/update', 
            data: model
        }).then(res => {
            return res.data
        })
    },

    changePassword (model) {
        return api._post({
            url: '/t_account/updatePassowrd',
            data: model
        }).then(res => {
            return res.data
        })
    }
}
