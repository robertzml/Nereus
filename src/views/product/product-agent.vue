<template>
    <div>
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
                    <product-agent-list :item-list="productData"></product-agent-list>

                    <br /><hr /><br />
                    <Button type="primary" @click="toIndex" style="margin-left: 8px">返回</Button>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col span="24">
                <Card style="margin-bottom: 50px;">
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        增加代理产品
                    </p>
                    <Form ref="formInline" :model="agentInfo" :rules="ruleAgentInfo" inline>
                        <FormItem prop="product_id">
                            <Select v-model="agentInfo.product_id" style="width: 200px" :transfer="true">           
                                <Option v-for="item in productList" :value="item.id" :key="item.id" :label="item.name">
                                    <span>{{ item.name }}</span>
                                    <span style="float:right;color:#0cf">{{ item.product_code }}</span>
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('formInline')">增加</Button>
                        </FormItem>
                    </Form>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
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
            vendorCompanyId: '',
            agentCompanyId: '',
            productData: [],
            productList: [],
            agentInfo: {
                product_id: '',
                vendor_company_id: '',
                agent_company_id: ''
            },
            ruleAgentInfo: {
                product_id: [
                    { required: true, message: '请选择产品', type: 'number', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        init () {
            this.vendorCompanyId = this.$store.state.user.companyId
            this.getAgentProducts()
            this.getProducts(this.vendorCompanyId)
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

        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let vm = this
                    this.agentInfo.vendor_company_id = this.vendorCompanyId
                    this.agentInfo.agent_company_id = this.agentCompanyId

                    productAgent.create(this.agentInfo).then(res => {
                        vm.$Message.info(res.message)
                        vm.getAgentProducts()
                    })
                }
            })
        },

        toIndex () {
            this.$router.push({ name: 'product-index' })
        }
    },
    mounted: function () {
        this.agentCompanyId = this.$route.params.id
        this.init()
    }
}
</script>
