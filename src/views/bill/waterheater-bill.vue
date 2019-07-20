<template>
    <div id="waterheater-bill">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                厂商账单
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

                <DatePicker type="date" placement="bottom-end" placeholder="选择起始日期" style="width: 200px" v-model="startTime" :clearable="false"></DatePicker>

                <DatePicker type="date" placement="bottom-end" placeholder="选择结束日期" style="width: 200px" v-model="endTime" :clearable="false"></DatePicker>
               
                <Button type="primary" @click="loadBill">查询</Button>
            </div>

            <water-heater-bill-list :itemList="billData"></water-heater-bill-list>

        </Card>
    </div>
</template>


<script>
/** 厂商账单 */
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
            sVendor: 0,
            startTime: '',
            endTime: '',
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

        loadBill () {
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
           
            bill.getWaterheaterBill(this.sVendor, this.startTime, this.endTime).then(res => {
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
