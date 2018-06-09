<template>
    <div class="account-index">
        <Row v-if="roleType === 2 || roleType === 3" style="margin-bottom: 15px;">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        本公司用户
                    </p>
                    <a href="#" slot="extra" @click.prevent="toCreate" v-if="displayCreate">
                        <Icon type="plus-round"></Icon>
                        新增
                    </a>
                    <a href="#" slot="extra" @click.prevent="getMyAccounts">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <account-list :itemList="myAccount" :display-edit="canEditAccount" :show-pager="false" :list-type="1"></account-list>
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
    name: 'account-vendor-index',
    components: {
        accountList
    },
    data () {
        return {
            myAccount: [],
            roleType: -1,
            canEditAccount: false,
            displayCreate: false
        }
    },
    beforeRouteEnter (to, from, next) {
        if (from.name === 'account-vendor-edit' || from.name === 'account-vendor-create') {
            next(vm => {
                vm.getMyAccounts()
            })
        } else {
            next()
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType
         
            if (this.roleType === 2) {
                this.getMyAccounts()
            }

            let roleId = this.$store.state.user.roleId
            if (roleId === 5 || roleId === 6) {
                this.canEditAccount = true
                this.displayCreate = true
            }
        },

        // 获取本公司用户
        getMyAccounts () {
            let vm = this
            let companyId = this.$store.state.user.companyId

            account.companyView(companyId).then(res => {
                if (res.status === 0) {
                    let roleId = this.$store.state.user.roleId

                    if (roleId !== 5) {
                        vm.myAccount = res.entities.filter(r => r.role_id !== 5)
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

        toCreate () {
            this.$router.push({ name: 'account-vendor-create' })
        }
    },
    created: function () {
        console.log('In vendor account index create function')
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
