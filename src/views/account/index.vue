<template>
    <div class="account-index">
        <Row v-if="roleType === 0 || roleType === 1" style="margin-bottom: 15px;">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        用户列表
                    </p>
                    <a href="#" slot="extra" @click.prevent="showCreate">
                        <Icon type="plus-round"></Icon>
                        新增
                    </a>
                    <a href="#" slot="extra" @click.prevent="getAccounts">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <account-list :itemList="accountData"></account-list>
                </Card>
            </Col>
        </Row>
        <Row v-if="roleType === 2 || roleType === 3" style="margin-bottom: 15px;">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        本公司用户
                    </p>
                    <a href="#" slot="extra" @click.prevent="getMyAccounts">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <account-list :itemList="myAccount" :show-pager="false" :list-type="1"></account-list>
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
                    <a href="#" slot="extra" @click.prevent="showCreateAgent">
                        <Icon type="plus-round"></Icon>
                        新增
                    </a>
                    <a href="#" slot="extra" @click.prevent="getAgents">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <account-list :itemList="agentData" :list-type="2"></account-list>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import account from '../../controllers/account.js'
import * as nereus from '../../utility/nereus.js'
import accountList from '../components/account-list.vue'

export default {
    name: 'account-index',
    components: {
        accountList
    },
    data () {
        return {
            accountData: [],
            myAccount: [],
            agentData: [],
            roleType: -1
        }
    },
    beforeRouteEnter (to, from, next) {
        if (from.name === 'account-edit' || from.name === 'account-create') {
            next(vm => {
                vm.getAccounts()
                vm.getMyAccounts()
                if (vm.roleType === 2) {
                    vm.getAgents()
                }
            })
        } else {
            next()
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType
            if (this.roleType === 0 || this.roleType === 1) {
                this.getAccounts()
            } else if (this.roleType === 2) {
                this.getMyAccounts()
                this.getAgents()
            } else if (this.roleType === 3) {
                this.getMyAccounts()
            }
        },

        // 获取所有用户
        getAccounts () {
            let vm = this
            account.listView().then(res => {
                if (res.status === 0) {
                    vm.accountData = res.admins
                } else {
                    vm.$Message.error(res.message)
                }
            })
        },

        // 获取本公司用户
        getMyAccounts () {
            let vm = this
            let companyId = this.$store.state.user.companyId

            account.companyView(companyId).then(res => {
                if (res.status === 0) {
                    vm.myAccount = res.entities
                } else {
                    vm.$Message.error(res.message)
                }
            })
        },

        // 获取代理商用户
        getAgents () {
            let vm = this
            let companyId = this.$store.state.user.companyId

            account.agentsView(companyId).then(res => {
                if (res.status === 0) {
                    vm.agentData = res.entities
                } else {
                    vm.$Message.error(res.message)
                }
            })
        },
        
        showCreate () {
            this.$router.push({ name: 'account-create' })
        },

        // 增加代理商用户
        showCreateAgent () {
            this.$router.push({ name: 'account-create', params: { type: 2 } })
        }
    },
    created: function () {
        console.log('In account index create function')
        this.init()
    }
}
</script>
