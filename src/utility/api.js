import axios from 'axios'
import config from './config.js'

const ax = axios.create({
    baseURL: config.apihost,
    timeout: 10000,
    withCredentials: true, // 允许跨域 cookie
    headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' }
    })

// get
export const _get = (req) => {
    return ax.get(req.url, { params: req.data })
}

export const _post = (req) => {
    console.log(JSON.stringify(req.data))
    // return ax({ method: 'post', url: req.url, data: req.data })
    return ax.post(req.url, { data: req.data })
}
