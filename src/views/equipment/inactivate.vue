<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    待激活设备列表
                </p>
                <a href="#" slot="extra" @click.prevent="getData">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>

                <inactivate-list :item-list="inactivateData" @refresh="getData"></inactivate-list>
            </Card>
        </Col>
    </Row>
</template>

<script>
import equipment from '@/controllers/equipment.js'
import * as nereus from '@/utility/nereus.js'
import inactivateList from '../components/equipment/inactivate-list.vue'

export default {
    name: 'equipment-inactivate',
    components: {
        inactivateList
    },
    data () {
        return {            
            inactivateData: []
        }
    },
    methods: {
        init () {
            this.getData()
        },

        getData () {
            let vm = this
            let roleType = this.$store.state.user.roleType

            if (roleType === 0 || roleType === 1) {
                equipment.getInactivate().then(res => {
                    if (res.status === 0) {
                        vm.inactivateData = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取设备信息失败',
                            desc: res.message
                        })
                    }
                })
            } else if (roleType === 2 || roleType === 3) {
                let companyId = this.$store.state.user.companyId

                equipment.getInactivate(companyId).then(res => {
                    if (res.status === 0) {
                        vm.inactivateData = res.entities
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
    mounted: function () {
        this.init()
    }
}
</script>
