<template>
    <div class="account-index">
        <Row v-if="roleType === 3">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        本公司用户
                    </p>
                    <a href="#" slot="extra" @click.prevent="toCreateAgent">
                        <Icon type="plus-round"></Icon>
                        新增
                    </a>
                    <a href="#" slot="extra" @click.prevent="getMyAccounts">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <account-list :itemList="myAccount" :display-edit="canEditAccount" :show-pager="false" :list-type="2"></account-list>
                </Card>
            </Col>
        </Row>
        <Row v-if="roleType === 2">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        代理商用户
                    </p>
                    <a href="#" slot="extra" @click.prevent="toCreateAgent">
                        <Icon type="plus-round"></Icon>
                        新增
                    </a>
                    <a href="#" slot="extra" @click.prevent="getAgentAccounts">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <div class="filter-panel">
                        <span>所属公司</span>
                        <Select v-model="sAgent" style="width:200px" placeholder="选择代理商" clearable>
                            <Option v-for="item in agentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <account-list :itemList="agentFilterData" :display-edit="true" :list-type="2"></account-list>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import account from '@/controllers/account.js'
import * as nereus from '@/utility/nereus.js'
import accountList from '../components/account/account-list.vue'
import company from '@/controllers/company.js'

export default {
    name: 'account-agent-index',
    components: {
        accountList
    },
    data () {
        return {
            myAccount: [],
            agentData: [],
            roleType: -1,
            agentList: [],
            sAgent: '',
            canEditAccount: false
        }
    },
    beforeRouteEnter (to, from, next) {
        if (from.name === 'account-agent-edit' || from.name === 'account-agent-create') {
            next(vm => {
                if (vm.roleType === 2) {
                    vm.getAgentAccounts()
                } else if (vm.roleType === 3) {
                    vm.getMyAccounts()
                }
            })
        } else {
            next()
        }
    },
    computed: {
        agentFilterData () {
            let temp = this.agentData
            
            if (this.sAgent) {
                temp = temp.filter(r => r.company_id === this.sAgent)
            }

            return temp
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType
        
            if (this.roleType === 2) {
                this.getAgentAccounts()
                this.loadAgents()
            } else if (this.roleType === 3) {
                this.getMyAccounts()

                let roleId = this.$store.state.user.roleId
                if (roleId === 8 || roleId === 9) {
                    this.canEditAccount = true
                    this.displayCreate = true
                }
            }
        },

        // 获取本公司用户
        getMyAccounts () {
            let vm = this
            let companyId = this.$store.state.user.companyId

            account.companyView(companyId).then(res => {
                if (res.status === 0) {
                    let roleId = this.$store.state.user.roleId

                    if (roleId !== 8) {
                        vm.myAccount = res.entities.filter(r => r.role_id !== 8)
                    } else {
                        vm.myAccount = res.entities
                    }
                } else {
                    this.$Notice.error({
                        title: '获取管理员信息失败',
                        desc: res.message
                    })
                }
            })
        },

        // 获取代理商用户
        getAgentAccounts () {
            let vm = this
            let companyId = this.$store.state.user.companyId

            account.agentsView(companyId).then(res => {
                if (res.status === 0) {
                    vm.agentData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取代理商管理员信息失败',
                        desc: res.message
                    })
                }
            })
        },

        // 获取代理商
        loadAgents () {
            let vm = this
            let companyId = this.$store.state.user.companyId

            if (this.roleType === 2) {
                company.listByParent(companyId).then(res => {
                    if (res.status === 0) {
                        vm.agentList = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取代理商信息失败',
                            desc: res.message
                        })
                    }
                })
            }
        },
        
        showCreate () {
            this.$router.push({ name: 'account-create' })
        },

        // 增加代理商用户
        toCreateAgent () {
            this.$router.push({ name: 'account-create', params: { type: 2 } })
        }
    },
    created: function () {
        console.log('In account index create function')
        this.init()
    }
}
</script>

<style scoped>
.filter-panel {
    margin-bottom: 10px;
}

.filter-panel .ivu-select {
    margin-right: 15px;
}
</style>
