<template>
    <div class="product-agent">
        <Row style="margin-bottom: 15px;">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        已代理产品
                    </p>
                    <a href="#" slot="extra" @click.prevent="getAgentProducts">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <p>代理商: {{ agentCompany.name }}</p>

                    <br />

                    <product-agent-list :item-list="productData"></product-agent-list>

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
                    <Select v-model="agentInfo.product_id" style="width: 200px" :transfer="true">           
                        <Option v-for="item in productList" :value="item.id" :key="item.id" :label="item.name">
                            <span>{{ item.name }}</span>
                            <span style="float:right;color:#0cf">{{ item.product_code }}</span>
                        </Option>
                    </Select>
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
            productList: [],
            agentInfo: {
                product_id: 0,
                vendor_company_id: 0,
                agent_company_id: 0
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
            this.getAgentProducts()
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

        getProducts (companyId) {
            let vm = this
            product.listByCompanyView(companyId).then(res => {
                vm.productList = res.entities
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
                 if (res.status === 0) {
                    this.$Notice.success({
                        title: '添加成功',
                        desc: res.message
                    })
                    
                    setTimeout(() => {
                        vm.getAgentProducts()
                        this.modal1 = false
                    }, 1000)
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
