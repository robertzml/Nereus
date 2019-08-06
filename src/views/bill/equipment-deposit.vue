<template>
    <div id="equipment-deposit">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                押金统计
            </p>
            <a href="#" slot="extra" @click.prevent="loadDeposit">
                <Icon type="ios-loop-strong"></Icon>
                刷新
            </a>

            <div class="filter-panel">
                <span v-if="roleType !== 2">厂商：</span>
                <Select v-model="sVendor" style="width:300px" placeholder="选择厂商" v-if="roleType !== 2">
                    <Option v-for="item in vendorCompanyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>

                <DatePicker type="date" placement="bottom-end" placeholder="选择起始日期" style="width: 200px" v-model="startTime"></DatePicker>

                <DatePicker type="date" placement="bottom-end" placeholder="选择结束日期" style="width: 200px" v-model="endTime"></DatePicker>

                <Button type="primary" @click="loadDeposit">查询</Button>

                <span>0点开始 - 0点结束</span>
            </div>
            
            <br />

            <Tabs>
                <TabPane label="线上付款">
                    <div class="filter-panel">
                        <span>搜索</span>
                        <Input v-model="filterKey1" style="width: 200px"></Input>
                    </div>
                    <equipment-deposit-list :item-list="filterData1" v-bind:type="1"></equipment-deposit-list>
                </TabPane>

                <TabPane label="线下付款">
                    <div class="filter-panel">
                        <span>搜索</span>
                        <Input v-model="filterKey2" style="width: 200px"></Input>
                    </div>
                    <equipment-deposit-list :item-list="filterData2" v-bind:type="2"></equipment-deposit-list>
                </TabPane>

                <TabPane label="退还金额">
                    <div class="filter-panel">
                        <span>搜索</span>
                        <Input v-model="filterKey3" style="width: 200px"></Input>
                    </div>
                    <equipment-deposit-list :item-list="filterData3" v-bind:type="3"></equipment-deposit-list>
                </TabPane>
            </Tabs>
        </Card>
    </div>
</template>

<script>
import company from '@/controllers/company.js'
import bill from '@/controllers/bill.js'
import productType from '@/controllers/product-type.js'
import equipmentDepositList from '../components/bill/equipment-deposit-list.vue'

export default {
    name: 'equipment-deposit',
    components: {
        equipmentDepositList
    },
    data () {
        return {
            roleType: 0,
            vendorCompanyList: [],
            productTypeList: [],
            sVendor: 0,
            startTime: '',
            endTime: '',
            filterKey1: '',
            filterKey2: '',
            filterKey3: '',
            depositData1: [],
            depositData2: [],
            depositData3: []
        }
    },
    computed: {
        filterData1 () {
            let temp = this.depositData1

            let filterKey1 = this.filterKey1 && this.filterKey1.toLowerCase()
            if (filterKey1) {
                temp = temp.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey1) > -1
                    })
                })
            }
            return temp
        },

        filterData2 () {
            let temp = this.depositData2

            let filterKey2 = this.filterKey2 && this.filterKey2.toLowerCase()
            if (filterKey2) {
                temp = temp.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey2) > -1
                    })
                })
            }
            return temp
        },

        filterData3 () {
            let temp = this.depositData3

            let filterKey3 = this.filterKey3 && this.filterKey3.toLowerCase()
            if (filterKey3) {
                temp = temp.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey3) > -1
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

            // this.getProductType()
            if (this.roleType === 0 || this.roleType === 1) {
                this.getCompanys()
            } else if (this.roleType === 2) {
                this.sVendor = this.$store.state.user.companyId
            }
        },

        getProductType () {
            let vm = this

            productType.list().then(res => {
                vm.productTypeList = res.entities
            })
        },

        getCompanys () {
            let vm = this

            company.list().then(res => {
                vm.vendorCompanyList = res.entities.filter(r => r.type === 2)
            })
        },

        loadDeposit () {
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

            bill.getEquipmentDeposit(this.sVendor, this.startTime, this.endTime, 1).then(res => {
                if (res.status === 0) {
                    vm.depositData1 = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取记录失败',
                        desc: res.message,
                        duration: 5
                    })
                }
            })

            bill.getEquipmentDeposit(this.sVendor, this.startTime, this.endTime, 2).then(res => {
                if (res.status === 0) {
                    vm.depositData2 = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取记录失败',
                        desc: res.message,
                        duration: 5
                    })
                }
            })

            bill.getEquipmentDeposit(this.sVendor, this.startTime, this.endTime, 3).then(res => {
                if (res.status === 0) {
                    vm.depositData3 = res.entities
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
    created: function () {
        this.init()
    }
}
</script>

<style scoped>
.filter-panel {
    margin-bottom: 15px;
}
</style>
