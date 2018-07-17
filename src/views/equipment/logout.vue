<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    待注销设备列表
                </p>
                <a href="#" slot="extra" @click.prevent="getEquipments">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>
                
                <logout-list :item-list="logoutData" @refresh="getEquipments"></logout-list>
            </Card>
        </Col>
    </Row>
</template>

<script>
import equipment from '@/controllers/equipment.js'
import logoutList from '../components/equipment/logout-list.vue'
import * as nereus from '@/utility/nereus.js'

export default {
    name: 'equipment-logout',
    components: {
        logoutList
    },
    data () {
        return {
            logoutData: []
        }
    },
    methods: {
        init () {
            this.getEquipments()
        },

        getEquipments () {
            let vm = this
            let roleType = this.$store.state.user.roleType

            if (roleType === 0 || roleType === 1) {
                equipment.getLogout().then(res => {
                    if (res.status === 0) {
                        vm.logoutData = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取设备信息失败',
                            desc: res.message
                        })
                    }
                })
            } else {
                let companyId = this.$store.state.user.companyId
                equipment.getLogout(companyId).then(res => {
                    if (res.status === 0) {
                        vm.logoutData = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取设备信息失败',
                            desc: res.message
                        })
                    }
                })
            }
        }
    },
    created: function () {
        this.init()
    }
}
</script>
