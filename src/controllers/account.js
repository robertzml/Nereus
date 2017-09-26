import * as api from '../utility/api'

export default {
    name: 'account',

    list () {
        return api._get({ url: '/account/list' })
            .then(res => {
                return res.data
            })
    }
}
