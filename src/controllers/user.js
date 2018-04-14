import * as api from '../utility/api'

export default {
    name: 'user',

    listByAgent (agentId) {
        return api._get({ url: '/t_equipment_owner_protocol/findConsumerInfoByConditions', params: { agent_id: agentId } })
            .then(res => {
                return res.data
            })
    }
}
