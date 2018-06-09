<template>
    <div class="company-index">
        <Row v-if="roleType === 0 || roleType === 1" style="margin-bottom: 15px;">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        厂商列表
                    </p>
                    <a href="#" slot="extra" @click.prevent="showCreate">
                        <Icon type="plus-round"></Icon>
                        新增
                    </a>
                    <a href="#" slot="extra" @click.prevent="getCompanys">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>
                    
                    <company-list :itemList="companyData" :display-edit="true"></company-list>
                </Card>
            </Col>
        </Row>
        <Row v-if="roleType === 2 || roleType === 3" style="margin-bottom: 15px;">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        本公司
                    </p>
                    <a href="#" slot="extra" @click.prevent="getMyCompany">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <company-list :itemList="myCompany" :showPager="false" :display-edit="canEditMyCompany"></company-list>
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
    name: 'company-index',
    components: {
        companyList
    },
    data () {
        return {
            companyData: [],
            myCompany: [],
            agentData: [],
            roleType: -1,
            canEditMyCompany: false
        }
    },
    beforeRouteEnter (to, from, next) {
        if (from.name === 'company-edit' || from.name === 'company-create') {
            next(vm => {
                vm.getCompanys()
            })
        } else {
            next()
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType
            if (this.roleType === 0 || this.roleType === 1) {
                this.getCompanys()
            } else if (this.roleType === 2) {
                this.getMyCompany()
            } else if (this.roleType === 3) {
                this.getMyCompany()
            }

            let roleId = this.$store.state.user.roleId
            if (roleId === 5) {
                this.canEditMyCompany = true
            }
        },

        // 获取本公司
        getMyCompany () {
            let vm = this
            let companyId = this.$store.state.user.companyId

            company.details(companyId).then(res => {
                vm.myCompany.splice(0)
                vm.myCompany.push(res.entity)
            })
        },

        // 获取所有公司
        getCompanys () {
            let vm = this
            
            company.list().then(res => {
                if (res.status === 0) {
                    vm.companyData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取厂商信息失败',
                        desc: res.message
                    })
                }
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
        console.log('In company index create function')
        this.init()
    }
}
</script>
