<template>
    <div class="company-index">
        <Row v-if="roleType === 2">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        代理商列表
                    </p>
                    <a href="#" slot="extra" v-if="canEditCompany" @click.prevent="toCreateAgent">
                        <Icon type="plus-round"></Icon>
                        新增
                    </a>
                    <a href="#" slot="extra" @click.prevent="getAgents">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <company-list :itemList="agentData" :display-edit="canEditCompany" :agent-view="true"></company-list>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import company from '@/controllers/company.js'
import * as nereus from '@/utility/nereus.js'
import companyList from '../components/company/company-list.vue'

export default {
    name: 'company-agent-index',
    components: {
        companyList
    },
    data () {
        return {
            agentData: [],
            roleType: -1,
            canEditCompany: false
        }
    },
    beforeRouteEnter (to, from, next) {
        if (from.name === 'company-agent-edit' || from.name === 'company-agent-create') {
            next(vm => {
                vm.getAgents()
            })
        } else {
            next()
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType
            this.getAgents()

            let roleId = this.$store.state.user.roleId
            if (roleId === 5) {
                this.canEditCompany = true
            }
        },

        // 获取代理商
        getAgents () {
            let vm = this
            let companyId = this.$store.state.user.companyId

            company.listByParent(companyId).then(res => {
                vm.agentData = res.entities
            })
        },

        toCreateAgent () {
            this.$router.push({ name: 'company-agent-create', params: { type: 1 } })
        }
    },
    created: function () {
        this.init()
    }
}
</script>
