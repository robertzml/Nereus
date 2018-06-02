<template>
    <div class="company-index">
        <Row v-if="roleType === 2">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        代理商列表
                    </p>
                    <a href="#" slot="extra" @click.prevent="showCreateAgent">
                        <Icon type="plus-round"></Icon>
                        新增
                    </a>
                    <a href="#" slot="extra" @click.prevent="getAgents">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <company-list :itemList="agentData"></company-list>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import company from '../../controllers/company.js'
import * as nereus from '../../utility/nereus.js'
import companyList from '../components/company-list.vue'

export default {
    name: 'company-agent-index',
    components: {
        companyList
    },
    data () {
        return {
            agentData: [],
            roleType: -1
        }
    },
    beforeRouteEnter (to, from, next) {
        if (from.name === 'company-edit' || from.name === 'company-create') {
            next(vm => {
                vm.getCompanys()
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
        },

        // 获取代理商
        getAgents () {
            let vm = this
            let companyId = this.$store.state.user.companyId

            company.listByParent(companyId).then(res => {
                vm.agentData = res.entities
            })
        },
      
        showCreate () {
            this.$router.push({ name: 'company-create' })
        },

        showCreateAgent () {
            this.$router.push({ name: 'company-create', params: { type: 1 } })
        }
    },
    created: function () {
        this.init()
    }
}
</script>
