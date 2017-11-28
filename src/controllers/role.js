import * as api from '../utility/api'

export default {
    name: 'role',

    list () {
        return api._get({ url: '/t_role/findAll' })
            .then(res => {
                return res.data
            })
    }
}
