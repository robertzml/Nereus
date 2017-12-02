import axios from 'axios'
import config from './config.js'
import store from '../store'

const ax = axios.create({
    baseURL: config.apihost,
    timeout: 10000,
    withCredentials: true, // 允许跨域 cookie
    headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' }
    })

// get
export const _get = (req) => {
    return ax.get(req.url, { params: req.params })
}

// get with auth headers
export const _getAuth = (req) => {
    return ax.get(req.url, { params: req.params, headers: { 'User-Id': store.state.user.id, 'Role-Id': store.state.user.roleId, 'Company-Id': store.state.user.companyId } })
}

// post
export const _post = (req) => {
    return ax.post(req.url, req.data)
}
