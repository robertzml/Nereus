<template>
    <div>
        <Tabs>
            <TabPane label="产品信息">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        产品信息
                    </p>

                    <Row>
                        <Col span="16" push="4">
                            <Form :model="productInfo" :label-width="80">
                                <FormItem label="产品代码">
                                    {{ productInfo.product_code }}
                                </FormItem>
                                <FormItem label="产品名称">
                                    {{ productInfo.name }}
                                </FormItem>
                                <FormItem label="产品类型">
                                    {{ typeName }}
                                </FormItem>
                                <FormItem label="所属公司" prop="company_id">
                                    {{ companyName }}
                                </FormItem>
                                <FormItem label="规格型号">
                                    {{ productInfo.specification }}
                                </FormItem>
                                <FormItem label="简介">
                                    {{ productInfo.info }}
                                </FormItem>
                                <FormItem label="产品描述">
                                    {{ productInfo.description }}
                                </FormItem>
                                <FormItem label="售后信息">
                                    {{ productInfo.after_sale }}
                                </FormItem>

                                <FormItem>
                                    <Button type="primary" @click="toIndex" style="margin-left: 8px">返回</Button>
                                    
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </TabPane>

            <TabPane label="销售规则">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        销售规则
                    </p>
                    <a href="#" slot="extra" @click.prevent="getSaleRules">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <sale-rule-list :item-list="saleRuleData"></sale-rule-list>
                    <p>
                        <Button type="primary" @click="addRule" style="margin-left: 8px">添加销售规则</Button>
                    </p>
                </Card>
            </TabPane>

            <TabPane label="产品统计">
                <product-lock-summary :item-list="lockSummaryData"></product-lock-summary>
            </TabPane>
        </Tabs>
    </div>
</template>


<script>
import product from '../../controllers/product.js'
import * as nereus from '../../utility/nereus.js'
import company from '../../controllers/company.js'
import saleRuleList from '../components/sale-rule-list.vue'
import productLockSummary from '../components/product-lock-summary.vue'

export default {
    name: 'product-details',
    components: {
        saleRuleList,
        productLockSummary
    },
    data () {
        return {
            productId: 0,
            productInfo: {
                id: 0,
                name: '',
                type_id: 0,
                company_id: 0,
                specification: '',
                img: '',
                info: '',
                description: '',
                after_sale: ''
            },
            typeName: '',
            companyName: '',
            saleRuleData: [],
            lockSummaryData: []
        }
    },
    methods: {
        getProduct (id) {
            let vm = this
            product.details(id).then(res => {
                if (res.status === 0) {
                    vm.productInfo = res.entity
                } else {
                    this.$Notice.error({
                        title: '获取产品失败',
                        desc: res.message
                    })
                }
            }).then(() => {
                nereus.getProductTypeName(this.productInfo.type_id).then(res => {
                    vm.typeName = res
                })
            }).then(() => {
                nereus.getCompanyName(this.productInfo.company_id).then(res => {
                    vm.companyName = res
                })
            })
        },

        getSaleRules () {
            let vm = this
            product.getSaleRules(this.productId).then(res => {
                if (res.status === 0) {
                    vm.saleRuleData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取销售规则失败',
                        desc: res.message
                    })
                }
            })
        },

        getLockSummary () {
            let vm = this
            product.findQuantity(this.productId).then(res => {
                if (res.status === 0) {
                    vm.lockSummaryData = res.entities
                }
            })
        },

        toIndex () {
            this.$router.push({ name: 'product-index' })
        },

        addRule () {
            this.$router.push({ name: 'product-add-sale-rule', params: { id: this.productId } })
        }
    },
    mounted: function () {
        this.productId = this.$route.params.id
        this.getProduct(this.productId)
        this.getSaleRules()
        this.getLockSummary()
    }
}
</script>
