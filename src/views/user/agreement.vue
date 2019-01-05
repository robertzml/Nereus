<template>
    <div class="user-agreement">
         <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                用户协议
            </p>
            <a href="#" slot="extra" @click.prevent="getAgreementList">
                <Icon type="ios-loop-strong"></Icon>
                刷新
            </a>

            <div class="filter-panel" style="margin-bottom:15px;">
                <span v-if="this.roleType === 0 || this.roleType === 1">厂商</span>
                <Select v-model="sCompany" style="width:300px" placeholder="厂商" v-if="this.roleType === 0 || this.roleType === 1">
                    <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>

                <span>状态</span>
                <Select v-model="sStatus" style="width:300px" placeholder="状态">
                    <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>

                <Button type="primary" @click="getAgreementList">查询</Button>
            </div>

            <div class="filter-panel">
                <h3>筛选</h3>
                <span>厂商是否同意</span>
                <Select v-model="sCompanyAgree" style="width:200px" placeholder="请选择" clearable>
                    <Option v-for="item in agreementStatusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>

                <span>代理商是否同意</span>
                <Select v-model="sAgentAgree" style="width:200px" placeholder="请选择" clearable>
                    <Option v-for="item in agreementStatusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>

                <span>设备是否安装成功</span>
                <Select v-model="sInstallAgree" style="width:200px" placeholder="请选择" clearable>
                    <Option v-for="item in agreementStatusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </div>
            
            <user-agreement-list :item-list="filterData"></user-agreement-list>
        </Card>
    </div>
</template>

<script>
import user from '@/controllers/user.js'
import company from '@/controllers/company.js'
import userAgreementList from '../components/user/user-agreement-list.vue'

export default {
    name: 'user-agreement',
    components: {
        userAgreementList
    },
    data () {
        return {
            roleType: 0,
            sCompany: 0,
            companyList: [],
            sStatus: 0,
            statusList: [
                { id: 0, name: '正常' },
                { id: 1, name: '删除' },
                { id: 3, name: '隐藏' }
            ],
            agreementData: [],
            agreementStatusList: [
                { id: 0, name: '待确认' },
                { id: 1, name: '同意' },
                { id: -1, name: '不同意' }
            ],
            filterKey: '',
            sCompanyAgree: '',
            sAgentAgree: '',
            sInstallAgree: ''
        }
    },
    computed: {
        filterData () {
            let temp = this.agreementData

            if (this.sCompanyAgree !== undefined && this.sCompanyAgree !== '') {
                temp = temp.filter(r => r.company_operatier_is_agree === this.sCompanyAgree)
            }

            if (this.sAgentAgree !== undefined && this.sAgentAgree !== '') {
                temp = temp.filter(r => r.agent_operatier_is_agree === this.sAgentAgree)
            }

            if (this.sInstallAgree !== undefined && this.sInstallAgree !== '') {
                temp = temp.filter(r => r.equipment_install_is_success === this.sInstallAgree)
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

            if (this.roleType === 0 || this.roleType === 1) {
                this.getCompanys()
            } else if (this.roleType === 2) {
                this.sCompany = this.$store.state.user.companyId
                this.getAgreementList()
            }
        },

        getCompanys () {
            let vm = this

            company.listByType(2).then(res => {
                vm.companyList = res.entities
            })
        },

        getAgreementList () {
            if (this.sCompany === 0) {
                this.$Message.warning({
                    content: '请选择公司',
                    duration: 2
                })
                return
            }

            let vm = this
            user.findUserAgreement(this.sCompany, this.sStatus).then(res => {
                if (res.status === 0) {
                    vm.agreementData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取记录失败',
                        desc: res.message,
                        duration: 5
                    })
                }
            })
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>

<style scoped>
.filter-panel {
    margin-bottom:15px;
}
</style>
