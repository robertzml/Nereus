<template>
    <div id="bill-unpaid">
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        设备待付款信息
                    </p>
                    <a href="#" slot="extra" @click.prevent="loadUnpaid">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <div class="filter-panel">
                        <span v-if="roleType === 0 || roleType === 1">厂商：</span>
                        <Select v-model="sCompany" style="width:300px" placeholder="选择厂商" v-if="roleType === 0 || roleType === 1" clearable>
                            <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>                        

                        <span>选择产品类型: </span>
                        <Select v-model="sProductType" style="width:300px" placeholder="选择产品类型" @on-change="selectProductType" clearable>
                            <Option v-for="item in productTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>

                        <span>产品名称</span>
                        <Select v-model="sProduct" style="width:200px" placeholder="选择产品" clearable>
                            <Option v-for="item in productList" :value="item.id" :key="item.id">{{ item.name }} <span style="float:right;color:#fcc">{{ item.product_code }}</span></Option>
                        </Select>
                    </div>

                    <br />
                    <unpaid-list :item-list="filterData"></unpaid-list>
                   
                </Card>
            </Col>
        </Row>
    </div>
</template>


<script>
import company from '@/controllers/company.js'
import bill from '@/controllers/bill.js'
import productType from '@/controllers/product-type.js'
import product from '@/controllers/product.js'
import unpaidList from '../components/bill/unpaid-list.vue'

export default {
    name: 'bill-unpaid',
    components: {
        unpaidList
    },
    data () {
        return {
            roleType: 0,
            productTypeList: [],
            productList: [],
            companyList: [],
            sCompany: 0,
            sProductType: 0,
            sProduct: 0,
            unpaidData: []
        }
    },
    computed: {
        filterData () {
            let temp = this.unpaidData

            if (this.sCompany && this.sCompany !== 0) {
                temp = temp.filter(r => r.company_id === this.sCompany)
            }

            if (this.sProductType && this.sProductType !== 0) {
                temp = temp.filter(r => r.type_id === this.sProductType)
            }

            if (this.sProduct && this.sProduct !== 9) {
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
                       
            if (this.roleType === 0 || this.roleType === 1) {
                this.loadUnpaid()

                this.getCompanys()
            } else if (this.roleType === 2 || this.roleType === 3) {
                this.loadUnpaid()
            }

             this.getProductType()
        },

        getCompanys () {
            let vm = this

            company.listByType(2).then(res => {
                vm.companyList = res.entities
            })
        },

        getProductType () {
            let vm = this

            productType.list().then(res => {
                vm.productTypeList = res.entities
            })
        },

        selectProductType (val) {
            this.sProduct = 0
            if (val === undefined) {
                this.productList = []
                return
            }

            let companyId = this.$store.state.user.companyId
            let vm = this
            if (this.roleType === 0 || this.roleType === 1) {
                product.listByType(val).then(res => {
                    vm.productList = res.entities
                })
            } else {
                product.listByTypeAndCompany(val, companyId).then(res => {
                    vm.productList = res.entities
                })
            }
        },

        loadUnpaid () {
            let vm = this

            if (this.roleType === 0 || this.roleType === 1) {
                bill.findPaymentInfo().then(res => {
                    if (res.status === 0) {
                        vm.unpaidData = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取记录失败',
                            desc: res.message
                        })
                    }
                })
            } else if (this.roleType === 2) {
                let companyId = this.$store.state.user.companyId

                bill.findPaymentInfoByCompany(companyId).then(res => {
                    if (res.status === 0) {
                        vm.unpaidData = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取记录失败',
                            desc: res.message
                        })
                    }
                })
            } else if (this.roleType === 3) {
                let companyId = this.$store.state.user.companyId

                bill.findPaymentInfoByAgent(companyId).then(res => {
                    if (res.status === 0) {
                        vm.unpaidData = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取记录失败',
                            desc: res.message
                        })
                    }
                })
            }
        }
    },
    created: function () {
        this.init()
    }
}
</script>
