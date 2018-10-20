<template>
    <div id="company-revenue">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                工厂收益
            </p>
            <a href="#" slot="extra" @click.prevent="loadRevenue">
                <Icon type="ios-loop-strong"></Icon>
                刷新
            </a>

            <div class="filter-panel" style="margin-bottom:15px;">
                <span v-if="roleType !== 2">厂商：</span>
                <Select v-model="sVendor" style="width:300px" placeholder="选择厂商" v-if="roleType !== 2">
                    <Option v-for="item in vendorCompanyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>

                <DatePicker type="date" placement="bottom-end" placeholder="选择起始日期" style="width: 200px" v-model="startTime" :clearable="false"></DatePicker>

                <DatePicker type="date" placement="bottom-end" placeholder="选择结束日期" style="width: 200px" v-model="endTime" :clearable="false"></DatePicker>

                <Button type="primary" @click="loadRevenue">查询</Button>
            </div>
            <div class="filter-panel">
                <h3>筛选</h3>
                <span>产品名称</span>
                <Select v-model="sProduct" style="width:200px" placeholder="选择产品" clearable>
                    <Option v-for="item in productList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>

                <span>搜索</span>
                <Input v-model="filterKey" style="width: 200px"></Input>
            </div>

            <br />

            <company-income-list :item-list="filterData"></company-income-list>
        </Card>
           
    </div>
</template>

<script>
/** 厂商收益 */
import company from '@/controllers/company.js'
import bill from '@/controllers/bill.js'
import product from '@/controllers/product.js'
import companyIncomeList from '../components/bill/company-income-list.vue'

export default {
    name: 'company-revenue',
    components: {
        companyIncomeList
    },
    data () {
        return {
            roleType: 0,
            vendorCompanyList: [],
            sVendor: 0,
            startTime: '',
            endTime: '',
            revenueData: [],
            productList: [],
            sProduct: '',
            filterKey: ''
        }
    },
    computed: {
        filterData () {
            let temp = this.revenueData

            if (this.sProduct) {
                temp = temp.filter(r => r.product_id === this.sProduct)
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
            this.endTime = new Date()

            let year = this.endTime.getFullYear()
            let month = this.endTime.getMonth()

            this.startTime = new Date(year, month, 1)

            if (this.roleType === 0 || this.roleType === 1) {
                this.getCompanys()
            } else if (this.roleType === 2) {
                this.sVendor = this.$store.state.user.companyId
            }
        },

        getCompanys () {
            let vm = this

            company.list().then(res => {
                vm.vendorCompanyList = res.entities.filter(r => r.type === 2)
            })
        },

        loadProducts (companyId) {
            let vm = this

            product.listByCompanyView(companyId).then(res => {
                if (res.status === 0) {
                    vm.productList = res.entities
                }
            })
        },

        loadRevenue () {
            if (this.sVendor === 0) {
                this.$Message.warning({
                    content: '请选择厂商',
                    duration: 2
                })
                return
            }
           
            if (this.startTime === '' || this.endTime === '') {
                 this.$Message.warning({
                    content: '请选择日期',
                    duration: 2
                })
                return
            }
          
            let vm = this

            bill.getCompanyIncome(this.sVendor, this.startTime, this.endTime, 1).then(res => {
                if (res.status === 0) {
                    vm.revenueData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取记录失败',
                        desc: res.message,
                        duration: 5
                    })
                }
            })

            this.loadProducts(this.sVendor)
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>

<style scoped>
</style>
