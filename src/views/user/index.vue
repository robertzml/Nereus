<template>
    <div>
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        用户列表
                    </p>
                    <a href="#" slot="extra" @click.prevent="loadUsers">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <div>
                        <span>代理商：</span>
                        <Select v-model="selectedAgent" style="width:300px" placeholder="选择代理商" clearable>
                            <Option v-for="item in agentCompany" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </div>

                    <br />
                    <user-list :itemList="filterData"></user-list>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import company from '@/controllers/company.js'
import user from '@/controllers/user.js'
import userList from '../components/user/user-list.vue'

export default {
    name: 'user-index',
    components: {
        userList
    },
    data () {
        return {
            roleType: 0,
            agentCompany: [],
            selectedAgent: '',
            userData: []
        }
    },
    computed: {
        filterData () {
            let temp = this.userData

            if (this.selectedAgent) {
                temp = temp.filter(r => r.agent_id === this.selectedAgent)
            }

            return temp
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType
            if (this.roleType === 0 || this.roleType === 1) {
                this.getAllAgents()
            } else if (this.roleType === 2) {
                this.getAgentCompany()
            }

            this.loadUsers()
        },

        // 获取所有代理商
        getAllAgents () {
            let vm = this
            
            company.list().then(res => {
                vm.agentCompany = res.entities.filter(r => r.type !== 1)
            })
        },

        // 获取下属代理商
        getAgentCompany () {
            let vm = this
            let companyId = this.$store.state.user.companyId

            company.listAgentAndSelf(companyId).then(res => {
                vm.agentCompany = res.entities
            })
        },

        loadUsers () {
            let vm = this

            user.list().then(res => {
                if (res.status === 0) {
                    vm.userData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取消费者信息失败',
                        desc: res.message
                    })
                }
            })
        }
    },
    created: function () {
        console.log('In user index create function')
        this.init()
    }
}
</script>
