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

                    <div class="filter-panel">
                        <span>所属公司</span>
                        <Select v-model="sAgent" style="width:200px" placeholder="选择公司" clearable>
                            <Option v-for="item in agentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>

                        <span>搜索</span>
                        <Input v-model="filterKey" style="width: 200px"></Input>
                    </div>
                    <account-list :itemList="accountFilterData" :display-edit="true"></account-list>
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

                    <div class="filter-panel">
                        <span>所属公司</span>
                        <Select v-model="sAgent" style="width:200px" placeholder="选择代理商" clearable>
                            <Option v-for="item in agentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </div>
                    <account-list :itemList="agentFilterData" :list-type="2"></account-list>
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
    name: 'account-index',
    components: {
        accountList
    },
    data () {
        return {
            accountData: [],
            myAccount: [],
            agentData: [],
            roleType: -1,
            agentList: [],
            sAgent: '',
            filterKey: ''
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
    computed: {
        accountFilterData () {
            let temp = this.accountData
            
            if (this.sAgent) {
                temp = temp.filter(r => r.company_id === this.sAgent)
            }

            var filterKey = this.filterKey && this.filterKey.toLowerCase()
            if (filterKey) {
                temp = temp.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                    })
                })
            }

            return temp
        },
        agentFilterData () {
            let temp = this.agentData
            
            if (this.sAgent) {
                temp = temp.filter(r => r.company_id === this.sAgent)
            }

            var filterKey = this.filterKey && this.filterKey.toLowerCase()
            if (filterKey) {
                temp = temp.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                    })
                })
            }

            return temp
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType
            console.log('roleType is: ' + this.roleType)
            if (this.roleType === 0 || this.roleType === 1) {
                this.getAccounts()
            } else if (this.roleType === 2) {
                this.getMyAccounts()
                this.getAgents()
            } else if (this.roleType === 3) {
                this.getMyAccounts()
            }

            this.loadAgents()
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

        // 获取代理商
        loadAgents () {
            let vm = this

            let companyId = this.$store.state.user.companyId

            if (this.roleType === 0) {
                company.list().then(res => {
                    if (res.status === 0) {
                        vm.agentList = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取代理商信息失败',
                            desc: res.message
                        })
                    }
                })
            } else if (this.roleType === 1) {
                company.list().then(res => {
                    if (res.status === 0) {
                        vm.agentList = res.entities.filter(r => r.type !== 1)
                    } else {
                        this.$Notice.error({
                            title: '获取代理商信息失败',
                            desc: res.message
                        })
                    }
                })
            } else {
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

<style scoped>
.filter-panel {
    margin-bottom: 10px;
}

.filter-panel .ivu-select {
    margin-right: 15px;
}
</style>
