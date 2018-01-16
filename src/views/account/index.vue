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
    </div>
    
</template>

<script>
import account from '../../controllers/account.js'
import * as nereus from '../../utility/nereus.js'
import accountList from '../components/account-list.vue'
import _ from 'lodash'

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
        
        showCreate () {
            this.$router.push({ name: 'account-create' })
        }
    },
    created: function () {
        console.log('In account index create function')
        this.init()
    }
}
</script>
