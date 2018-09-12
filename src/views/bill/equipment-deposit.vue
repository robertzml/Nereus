<template>
    <div id="equipment-deposit">
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        设备押金
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
                    </div>

                    <br />
                    
                    <equipment-deposit-list :item-list="depositData"></equipment-deposit-list>
                </Card>
            </Col>
        </Row>
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
            depositData: []
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType

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

            bill.getEquipmentDeposit(this.sVendor, this.startTime, this.endTime).then(res => {
                if (res.status === 0) {
                    vm.depositData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取记录失败',
                        desc: res.message
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
