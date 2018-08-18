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
                        <Select v-model="sCompany" style="width:300px" placeholder="选择厂商" v-if="roleType === 0 || roleType === 1">
                            <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>                        

                        <span>选择产品类型: </span>
                        <Select v-model="sProductType" style="width:300px" placeholder="选择产品类型">
                            <Option v-for="item in productTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>

                        <Button type="primary" @click="loadUnpaid">查询</Button>
                    </div>

                    <br />
                    <unpaid-list :item-list="unpaidData"></unpaid-list>
                   
                </Card>
            </Col>
        </Row>
    </div>
</template>


<script>
import company from '@/controllers/company.js'
import bill from '@/controllers/bill.js'
import productType from '@/controllers/product-type.js'
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
            companyList: [],
            sCompany: 0,
            sProductType: 0,
            unpaidData: []
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType
            
            this.getProductType()
            if (this.roleType === 0 || this.roleType === 1) {
                this.getCompanys()
            } else if (this.roleType === 2) {
                this.sCompany = this.$store.state.user.companyId
            }
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

        loadUnpaid () {
            if (this.sCompany === 0) {
                this.$Message.warning({
                    content: '请选择厂商',
                    duration: 2
                })
                return
            }
            if (this.sProductType === 0) {
                this.$Message.warning({
                    content: '请选择产品类型',
                    duration: 2
                })
                return
            }

            let vm = this
            if (this.sProductType === 1) {
                bill.findWaterHeaterPaymentInfoByCompany(this.sCompany).then(res => {
                    if (res.status === 0) {
                        vm.unpaidData = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取记录失败',
                            desc: res.message
                        })
                    }
                })
            } else if (this.sProductType === 2) {
                bill.findWaterCleanerPaymentInfoByCompany(this.sCompany).then(res => {
                    if (res.status === 0) {
                        vm.unpaidData = res.entities
                    } else {
                        this.$Notice.error({
                            title: '获取记录失败',
                            desc: res.message
                        })
                    }
                })
            } else {
                this.$Notice.error({
                    title: '无该类型产品'
                })
            }
        }

    },
    created: function () {
        this.init()
    }
}
</script>
