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
                        <span>代理商：</span>
                        <Select v-model="sAgent" style="width:300px" placeholder="选择代理商">
                            <Option v-for="item in agentCompanyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>

                        <span>选择产品类型: </span>
                        <Select v-model="sProductType" style="width:300px" placeholder="选择产品类型">
                            <Option v-for="item in productTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>

                        <DatePicker type="date" placement="bottom-end" placeholder="选择起始日期" style="width: 200px" v-model="startTime"></DatePicker>

                        <DatePicker type="date" placement="bottom-end" placeholder="选择结束日期" style="width: 200px" v-model="endTime"></DatePicker>

                        <Button type="primary" @click="loadDeduct">查询</Button>
                    </div>

                    <br />

                    <agent-deduct-list :item-list="deductData"></agent-deduct-list>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import company from '@/controllers/company.js'
import bill from '@/controllers/bill.js'
import productType from '@/controllers/product-type.js'
import agentDeductList from '../components/bill/agent-deduct-list.vue'

export default {
    name: 'agent-deduct-index',
    components: {
        agentDeductList
    },
    data () {
        return {
            roleType: 0,
            productTypeList: [],
            agentCompanyList: [],
            sAgent: 0,
            sProductType: 0,
            startTime: '',
            endTime: '',
            deductData: []
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType

            this.getProductType()
            if (this.roleType === 0 || this.roleType === 1) {
                this.getAllAgents()
            } else if (this.roleType === 2) {
                // this.getAgentCompany()
            }
        },

        getProductType () {
            let vm = this

            productType.list().then(res => {
                vm.productTypeList = res.entities
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
   
        loadDeduct () {
            if (this.sAgent === 0) {
                this.$Message.warning({
                    content: '请选择代理商',
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
            if (this.startTime === '' || this.endTime === '') {
                 this.$Message.warning({
                    content: '请选择日期',
                    duration: 2
                })
                return
            }
          
            let vm = this
            var model = {
                agent_id: this.sAgent,
                product_type_id: this.sProductType,
                start_time: this.startTime,
                end_time: this.endTime
            }

            bill.findDeductByAgentAndProductType(model).then(res => {
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
