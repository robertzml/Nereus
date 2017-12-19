<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    产品信息
                </p>

                <Row>
                    <Col span="16" push="4">
                        <Form :model="productInfo" :label-width="80">
                            <FormItem label="产品名称">
                                <Input v-model="productInfo.name" readonly></Input>
                            </FormItem>
                            <FormItem label="产品类型">
                                <Input v-model="typeName" readonly></Input>
                            </FormItem>
                            <FormItem label="所属公司" prop="company_id">
                                <Input v-model="companyName" readonly></Input>
                            </FormItem>
                            <FormItem label="规格型号">
                                <Input v-model="productInfo.specification" readonly></Input>
                            </FormItem>
                            <FormItem label="简介">
                                <Input v-model="productInfo.info" type="textarea" :rows="4" readonly></Input>
                            </FormItem>
                            <FormItem label="产品描述">
                                <Input v-model="productInfo.description" type="textarea" :rows="4" readonly></Input>
                            </FormItem>
                            <FormItem label="售后信息">
                                <Input v-model="productInfo.after_sale" type="textarea" :rows="4" readonly></Input>
                            </FormItem>

                            <FormItem>
                                <Button type="primary" @click="toIndex" style="margin-left: 8px">返回</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </Col>
    </Row>
</template>


<script>
import product from '../../controllers/product.js'
import * as nereus from '../../utility/nereus.js'
import company from '../../controllers/company.js'

export default {
    name: 'product-details',
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
            companyName: ''
        }
    },
    methods: {
        getProduct (id) {
            let vm = this
            product.details(id).then(res => {
                vm.productInfo = res.entity
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

        toIndex () {
            this.$router.push({ name: 'product-index' })
        }
    },
    activated: function () {
        this.productId = this.$route.params.id
        this.getProduct(this.productId)
    }
}
</script>
