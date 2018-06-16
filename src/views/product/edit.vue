<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    编辑产品
                </p>

                <Row>
                    <Col span="16" push="4">
                        <Form ref="formValidate" :model="productInfo" :rules="ruleValidate" :label-width="80">
                            <FormItem label="产品代码">
                                <Input v-model="productInfo.product_code" readonly></Input>
                            </FormItem>
                            <FormItem label="产品名称" prop="name">
                                <Input v-model="productInfo.name"></Input>
                            </FormItem>
                            <FormItem label="产品类型" prop="type_id">
                                <Select v-model="productInfo.type_id" disabled>
                                    <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="所属公司" prop="company_id" v-if="roleType === 0 || roleType === 1">
                                <Select v-model="productInfo.company_id">
                                    <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="规格型号" prop="specification">
                                <Input v-model="productInfo.specification"></Input>
                            </FormItem>
                            <FormItem label="简介" prop="info">
                                <Input v-model="productInfo.info" type="textarea" :rows="4"></Input>
                            </FormItem>
                            <FormItem label="产品描述">
                                <Input v-model="productInfo.description" type="textarea" :rows="4"></Input>
                            </FormItem>
                            <FormItem label="售后信息">
                                <Input v-model="productInfo.after_sale" type="textarea" :rows="4"></Input>
                            </FormItem>

                            <FormItem>
                                <Button type="success" @click="handleSubmit('formValidate')">保存</Button>
                                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
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
import product from '@/controllers/product.js'
import productType from '@/controllers/product-type.js'
import company from '@/controllers/company.js'

export default {
    name: 'product-edit',
    data () {
        const validateCode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入代码'))
            } else {
                if (!/^[0-9]{3}$/.test(value)) {
                    callback(new Error('请输入三位数字'))
                }
            }
            callback()
        }
        return {
            productId: 0,
            productInfo: {
                product_code: '',
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
            typeList: [],
            companyList: [],
            ruleValidate: {
                product_code: [
                    { required: true, validator: validateCode, trigger: 'change' }
                ],
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ],
                type_id: [
                    { required: true, message: '请选择产品类型', type: 'number', trigger: 'change' }
                ],
                company_id: [
                    { required: true, message: '请选择所属公司', type: 'number', trigger: 'change' }
                ]
            },
            roleType: ''
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType

            this.getProduct(this.productId)
            this.getProductType()

            if (this.roleType === 0 || this.roleType === 1) {
                this.getCompanys()
            } else {
                let companyId = this.$store.state.user.companyId
                this.productInfo.company_id = companyId
            }
        },

        getProduct (id) {
            let vm = this
            product.details(id).then(res => {
                vm.productInfo = res.entity
            })
        },

        getProductType () {
            let vm = this
            productType.list().then(res => {
                vm.typeList = res.entities
            })
        },

        getCompanys () {
            let vm = this
            company.list().then(res => {
                vm.companyList = res.entities
            })
        },

        handleSubmit (name) {
            let vm = this

            this.$refs[name].validate((valid) => {
                if (valid) {
                     product.update(this.productInfo).then(res => {
                        vm.$Message.info(res.message)
                        vm.$router.push({ name: 'product-index' })
                    })
                } else {
                    this.$Message.error('输入数据有误')
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields()
        },

        toIndex () {
            this.$router.push({ name: 'product-index' })
        }
    },
    mounted: function () {
        this.productId = this.$route.params.id
        this.init()
    }
}
</script>
