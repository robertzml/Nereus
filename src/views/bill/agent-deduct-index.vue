<template>
    <div id="agent-deduct-index">
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        代理商收益
                    </p>
                    <a href="#" slot="extra" @click.prevent="loadDeduct">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <div class="filter-panel">
                        <span v-if="roleType === 0 || roleType === 1">厂商：</span>
                        <Select v-model="sCompany" style="width:300px" placeholder="选择厂商" v-if="roleType === 0 || roleType === 1">
                            <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>

                        <DatePicker type="date" placement="bottom-end" placeholder="选择起始日期" style="width: 200px" v-model="startTime" :clearable="false"></DatePicker>

                        <DatePicker type="date" placement="bottom-end" placeholder="选择结束日期" style="width: 200px" v-model="endTime" :clearable="false"></DatePicker>

                        <Button type="primary" @click="loadDeduct">查询</Button>
                    </div>

                    <div class="filter-panel">
                        <h3>筛选</h3>

                        <span>选择产品类型: </span>
                        <Select v-model="sProductType" style="width:200px" @on-change="selectProductType" placeholder="选择产品类型" clearable>
                            <Option v-for="item in productTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>

                        <span>产品名称: </span>
                        <Select v-model="sProduct" style="width:300px" placeholder="选择产品" clearable>
                            <Option v-for="item in productList" :value="item.id" :key="item.id">{{ item.name }} <span style="float:right;color:#fcc">{{ item.product_code }}</span></Option>
                        </Select>

                        <span>代理商</span>
                        <Select v-model="sAgent" style="width:300px" placeholder="选择代理商" clearable>
                            <Option v-for="item in agentCompanyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>

                        <span>搜索</span>
                        <Input v-model="filterKey" style="width: 200px"></Input>
                    </div>

                    <br />

                    <agent-deduct-list :item-list="filterData" :additionalText="filterText"></agent-deduct-list>
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
import agentDeductList from '../components/bill/agent-deduct-list.vue'

export default {
    name: 'agent-deduct-index',
    components: {
        agentDeductList
    },
    data () {
        return {
            roleType: 0,
            companyList: [],
            productTypeList: [],
            productList: [],
            agentCompanyList: [],
            sCompany: 0,
            sAgent: 0,
            sProductType: 0,
            sProduct: 0,
            startTime: '',
            endTime: '',
            filterKey: '',
            deductData: []
        }
    },
    computed: {
        filterData () {
            let temp = this.deductData

            if (this.sProductType) {
                temp = temp.filter(r => r.product_type_id === this.sProductType)
            }
            if (this.sProduct) {
                temp = temp.filter(r => r.product_id === this.sProduct)
            }

            if (this.sAgent) {
                temp = temp.filter(r => r.agent_company_id === this.sAgent)
            }

            let filterKey = this.filterKey && this.filterKey.toLowerCase()
            if (filterKey) {
                temp = temp.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                    })
                })
            }
            return temp
        },
        filterText () {
            let text = ''

            if (this.sProductType) {
                let type = this.productTypeList.find(r => r.id === this.sProductType)
                text += '产品类型: ' + type.name
            }
            if (this.sProduct) {
                let product = this.productList.find(r => r.id === this.sProduct)
                text += '      产品名称: ' + product.name
            }
            if (this.sAgent) {
                let agent = this.agentCompanyList.find(r => r.id === this.sAgent)
                text += '      代理商： ' + agent.name
            }

            if (this.filterKey) {
                text += '      搜索条件： ' + this.filterKey
            }

            return text
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType
            this.endTime = new Date()

            let year = this.endTime.getFullYear()
            let month = this.endTime.getMonth()

            this.startTime = new Date(year, month, 1)

            this.getProductType()
            if (this.roleType === 0 || this.roleType === 1) {
                this.getCompanys()
                this.getAllAgents()
            } else if (this.roleType === 2) {
                this.sCompany = this.$store.state.user.companyId
                this.getAgentCompany()
            } else if (this.roleType === 3) {
                // this.sAgent = this.$store.state.user.companyId
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
                vm.companyList = res.entities
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
   
        loadDeduct () {
            if (this.sCompany === 0) {
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
            var model = {
                product_company_id: this.sCompany,
                start_time: this.startTime,
                end_time: this.endTime
            }

            bill.findAgentIncome(model).then(res => {
                if (res.status === 0) {
                    vm.deductData = res.entities
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
