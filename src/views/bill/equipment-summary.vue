<template>
    <div id="waterheater-bill">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                设备统计
            </p>
            <a href="#" slot="extra" @click.prevent="loadBill">
                <Icon type="ios-loop-strong"></Icon>
                刷新
            </a>

            <div class="filter-panel" style="margin-bottom:15px;">
                <span v-if="roleType !== 2">厂商：</span>
                <Select v-model="sVendor" style="width:300px" placeholder="选择厂商" v-if="roleType !== 2">
                    <Option v-for="item in vendorCompanyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>

                <DatePicker type="month" placement="bottom-end" placeholder="选择月份" style="width: 200px" v-model="month" :clearable="false"></DatePicker>               
               
                <Button type="primary" @click="loadBill">查询</Button>
            </div>

            <div class="filter-panel" style="margin-bottom:15px;">
                <h3>筛选</h3>
             
                <span>代理商</span>
                <Select v-model="sAgent" style="width:300px" placeholder="选择代理商" clearable>
                    <Option v-for="item in agentCompanyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>

            </div>

            <water-heater-bill-list :itemList="filterData"></water-heater-bill-list>

        </Card>
    </div>
</template>


<script>
/** 设备统计 */
import company from '@/controllers/company.js'
import bill from '@/controllers/bill.js'
import product from '@/controllers/product.js'
import waterHeaterBillList from '../components/bill/waterheater-bill-list.vue'

export default {
    name: 'waterheater-bill',
    components: {
        waterHeaterBillList
    },
    data () {
        return {
            roleType: 0,
            vendorCompanyList: [],
            agentCompanyList: [],
            sAgent: '',
            sVendor: 0,
            month: '',
            billData: [],
            filterKey: ''
        }
    },
    computed: {
        filterData () {
            let temp = this.billData

            if (this.sProduct) {
                temp = temp.filter(r => r.product_id === this.sProduct)
            }

            if (this.sAgent) {
                temp = temp.filter(r => r.agent_id === this.sAgent)
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

            this.month = new Date()

            if (this.roleType === 0 || this.roleType === 1) {
                this.getCompanys()
                this.getAllAgents()
            } else if (this.roleType === 2) {
                this.sVendor = this.$store.state.user.companyId
                this.getAgentCompany()
            }
        },

        getCompanys () {
            let vm = this

            company.list().then(res => {
                vm.vendorCompanyList = res.entities.filter(r => r.type === 2)
            })
        },

        getAllAgents () {
            let vm = this

            company.list().then(res => {
                vm.agentCompanyList = res.entities.filter(r => r.type !== 1)
            })
        },

        // 获取下属代理商
        getAgentCompany () {
            let vm = this
            let companyId = this.$store.state.user.companyId

            company.listAgentAndSelf(companyId).then(res => {
                vm.agentCompanyList = res.entities
            })
        },

        loadBill () {
            if (this.sVendor === 0) {
                this.$Message.warning({
                    content: '请选择厂商',
                    duration: 2
                })
                return
            }
           
            if (this.month === '') {
                 this.$Message.warning({
                    content: '请选择日期',
                    duration: 2
                })
                return
            }
            
            let vm = this
           
            bill.getEquipmentSummary(this.sVendor, this.month).then(res => {
                if (res.status === 0) {
                    vm.billData = res.entities
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
</style>
