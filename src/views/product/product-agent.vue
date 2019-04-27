<template>
    <div class="product-agent">
        <Row style="margin-bottom: 15px;">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        已代理产品
                    </p>
                    <a href="#" slot="extra" @click.prevent="getProductAgents">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <p>代理商: {{ agentCompany.name }}</p>

                    <br />

                    <product-agent-list :item-list="productAgentData"></product-agent-list>

                    <br />
                    <Button type="primary" @click="toIndex" style="margin-left: 8px">返回</Button>
                    <Button type="success" @click="showAddProduct" style="margin-left: 8px">增加代理产品</Button>
                </Card>
            </Col>
        </Row>

        <Modal
            v-model="modal1"
            title="增加代理产品"
            @on-ok="addNewProduct"
            :loading="loading">
            
           <Form ref="formInline" :model="agentInfo" :label-width="120">
                <FormItem label="产品名称" prop="product_id">
                    <Select v-model="agentInfo.product_id" style="width: 200px" :transfer="true" @on-change="selectProduct">           
                        <Option v-for="item in productList" :value="item.id" :key="item.id" :label="item.name">
                            <span>{{ item.name }}</span>
                            <span style="float:right;color:#0cf">{{ item.product_code }}</span>
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="销售规则" prop="sale_rule_id">
                    <Select v-model="ruleInfo.sale_rule_id" style="width: 200px" :transfer="true">           
                        <Option v-for="item in saleRuleData" :value="item.id" :key="item.id" >
                            {{ item.another_name }}
                        </Option>
                    </Select>
                </FormItem>

                <FormItem label="代理商分成比例">
                    <InputNumber :max="1" :min="0" :precision="2" v-model="ruleInfo.wealth_sharing" style="width: 200px;"></InputNumber>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import company from '@/controllers/company.js'
import product from '@/controllers/product.js'
import productAgent from '@/controllers/product-agent.js'
import productAgentList from '../components/product/product-agent-list.vue'

export default {
    name: 'product-agent',
    components: {
        productAgentList
    },
    data () {
        return {
            agentCompany: {},
            vendorCompanyId: '',
            agentCompanyId: '',
            productData: [],
            productAgentData: [],
            productList: [],
            saleRuleData: [],
            agentInfo: {
                product_id: 0,
                vendor_company_id: 0,
                agent_company_id: 0
            },
            ruleInfo: {
                agent_id: 0,
                sale_rule_id: 0,
                wealth_sharing: 0
            },
            ruleAgentInfo: {
                product_id: [
                    { required: true, message: '请选择产品', type: 'number', trigger: 'change' }
                ]
            },
            modal1: false,
            loading: true
        }
    },
    methods: {
        init () {
            this.vendorCompanyId = this.$store.state.user.companyId
            this.getAgentCompany()
            // this.getAgentProducts()
            this.getProductAgents()
            this.getProducts(this.vendorCompanyId)
        },

        getAgentCompany () {
            let vm = this
            company.details(this.agentCompanyId).then(res => {
                vm.agentCompany = res.entity
            })
        },

        getAgentProducts () {
            let vm = this
            productAgent.findByAgentCompanyView(this.agentCompanyId).then(res => {
                vm.productData = res.entities
            })
        },

        getProductAgents () {
            let vm = this
            product.getProductAgentShare(this.agentCompanyId).then(res => {
                vm.productAgentData = res.entities
            })
        },

        getProducts (companyId) {
            let vm = this
            product.listByCompanyView(companyId).then(res => {
                vm.productList = res.entities
            })
        },

        selectProduct (val) {
            this.getSaleRule(val)
        },

        getSaleRule (productId) {
            let vm = this

            product.getSaleRules(productId).then(res => {
                vm.saleRuleData = res.entities

                vm.ruleInfo.sale_rule_id = 0
                vm.ruleInfo.wealth_sharing = 0
            })
        },

        addNewProduct () {
            if (this.agentInfo.product_id === 0) {
                 this.$Message.warning({
                    content: '请选择产品',
                    duration: 2
                })
                this.loading = false
                this.$nextTick(() => {
                    this.loading = true
                })
                return
            }

            this.agentInfo.vendor_company_id = this.vendorCompanyId
            this.agentInfo.agent_company_id = this.agentCompanyId

            let vm = this
            productAgent.create(this.agentInfo).then(res => {
                 if (res.status === 0 || res.status === 7) {
                    /*
                    this.$Notice.success({
                        title: '添加成功',
                        desc: res.message
                    })

                    setTimeout(() => {
                        vm.getProductAgents()
                        this.modal1 = false
                    }, 1000)
                    */

                    this.saveRule()
                } else {
                    this.$Notice.error({
                        title: '增加产品失败',
                        desc: res.message
                    })

                    vm.loading = false
                    this.$nextTick(() => {
                        this.loading = true
                    })
                }
            })
        },

        saveRule () {
            if (this.ruleInfo.sale_rule_id === 0) {
                 this.$Message.warning({
                    content: '请选择销售规则',
                    duration: 2
                })
                this.loading = false
                this.$nextTick(() => {
                    this.loading = true
                })
                return
            }

            this.ruleInfo.agent_id = this.agentCompanyId

            let vm = this
            productAgent.addAgentMoneyShare(this.ruleInfo).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '添加成功',
                        desc: res.message
                    })
                    
                    setTimeout(() => {
                        vm.getProductAgents()
                        this.modal1 = false
                    }, 1000)
                } else {
                    this.$Notice.error({
                        title: '增加销售规则失败',
                        desc: res.message
                    })

                    vm.loading = false
                    this.$nextTick(() => {
                        this.loading = true
                    })
                }
            })
        },

        toIndex () {
            this.$router.push({ name: 'product-index' })
        },

        showAddProduct () {
            this.modal1 = true
        }
    },
    mounted: function () {
        this.agentCompanyId = this.$route.params.id
        this.init()
    }
}
</script>
