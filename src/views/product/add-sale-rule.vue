<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                新增销售规则
            </p>

            <Row>
                <Col span="12" push="4">
                    <Form ref="formValidate" :model="saleRuleInfo" :rules="ruleValidate" :label-width="220">
                        <FormItem label="付款方式" prop="pay_type">
                            <Select v-model="saleRuleInfo.pay_type">
                                <Option v-for="item in payType" :value="item.id" :key="item.id">{{ item.label }}</Option>
                            </Select>
                        </FormItem>

                        <div v-if="saleRuleInfo.pay_type === 1">
                            <FormItem label="别名">
                                <Input v-model="saleRuleInfo.another_name"></Input>
                            </FormItem>

                            <FormItem label="期望安装费">
                                <InputNumber :max="5000000" :min="0" :precision="0" v-model="saleRuleInfo.installation_charge" style="width: 200px;"></InputNumber>
                            </FormItem>

                            <FormItem label="售价">
                                <InputNumber :max="5000000" :min="0" :precision="0" v-model="saleRuleInfo.fix_month_rent" style="width: 200px;"></InputNumber>
                            </FormItem>

                            <FormItem label="免费使用时间(天)">
                                <InputNumber :max="1000" :min="0" :precision="0" v-model="saleRuleInfo.set_free_time" style="width: 200px;"></InputNumber>
                            </FormItem>
                        </div>
                       
                        <div v-if="saleRuleInfo.pay_type === 2">
                            <FormItem label="别名">
                                <Input v-model="saleRuleInfo.another_name"></Input>
                            </FormItem>

                            <FormItem label="初始金额">
                                <InputNumber :max="5000000" :min="0" :precision="0" v-model="saleRuleInfo.prepay_rent" style="width: 200px;"></InputNumber>
                            </FormItem>

                            <FormItem label="安装费">
                                <InputNumber :max="5000000" :min="0" :precision="0" v-model="saleRuleInfo.installation_charge" style="width: 200px;"></InputNumber>
                            </FormItem>
                           
                            <FormItem label="分期数(月)">
                                <InputNumber :max="24" :min="1" :precision="0" v-model="saleRuleInfo.divided_pay_pers" style="width: 200px;"></InputNumber>
                            </FormItem>

                            <FormItem label="每期费用(元)">
                                <Input v-model="saleRuleInfo.fix_month_rent"></Input>
                            </FormItem>

                            <FormItem label="免费使用时间(天)">
                                <InputNumber :max="1000" :min="0" :precision="0" v-model="saleRuleInfo.set_free_time" style="width: 200px;"></InputNumber>
                            </FormItem>
                        </div>

                        <div v-if="saleRuleInfo.pay_type === 3">
                            <FormItem label="别名">
                                <Input v-model="saleRuleInfo.another_name"></Input>
                            </FormItem>

                            <FormItem label="初始金额">
                                <InputNumber :max="5000000" :min="0" :precision="0" v-model="saleRuleInfo.prepay_rent" style="width: 200px;"></InputNumber>
                            </FormItem>

                            <FormItem label="安装费">
                                <InputNumber :max="5000000" :min="0" :precision="0" v-model="saleRuleInfo.installation_charge" style="width: 200px;"></InputNumber>
                            </FormItem>

                            <FormItem label="设备押金">
                                <InputNumber :max="5000000" :min="0" :precision="0" v-model="saleRuleInfo.device_deposit" style="width: 200px;"></InputNumber>
                            </FormItem>

                            <FormItem label="租金类型" prop="charge_type">
                                <Select v-model="saleRuleInfo.charge_type">
                                    <Option v-for="item in chargeType" :value="item.id" :key="item.id">{{ item.label }}</Option>
                                </Select>
                            </FormItem>

                            <FormItem label="每期费用(元)" v-if="saleRuleInfo.charge_type === 1">
                                <Input v-model="saleRuleInfo.fix_month_rent"></Input>
                            </FormItem>

                            <FormItem label="每期时间(月)" v-if="saleRuleInfo.charge_type === 4">
                                <Input v-model="saleRuleInfo.set_time_divided_pay_pers"></Input>用逗号分隔时间，如:12,11,10,9,8
                            </FormItem>

                            <FormItem label="每期费用(元)" v-if="saleRuleInfo.charge_type === 4">
                                <Input v-model="saleRuleInfo.fix_month_rent"></Input>用逗号分隔费用，如:500,400,300,200,100
                            </FormItem>

                            <FormItem label="节电比例" v-else-if="saleRuleInfo.charge_type === 3">
                                <InputNumber :max="1" :min="0" :precision="2" :step="0.01" v-model="saleRuleInfo.save_electricity_ratio" style="width: 200px;"></InputNumber>
                            </FormItem>

                            <FormItem label="免费使用时间(天)">
                                <InputNumber :max="1000" :min="0" :precision="0" v-model="saleRuleInfo.set_free_time" style="width: 200px;"></InputNumber>
                            </FormItem>
                        </div>

                        <div v-if="saleRuleInfo.pay_type === 4">
                            <FormItem label="别名">
                                <Input v-model="saleRuleInfo.another_name"></Input>
                            </FormItem>

                            <FormItem label="初始金额">
                                <InputNumber :max="5000000" :min="0" :precision="0" v-model="saleRuleInfo.prepay_rent" style="width: 200px;"></InputNumber>
                            </FormItem>

                            <FormItem label="安装费">
                                <InputNumber :max="5000000" :min="0" :precision="0" v-model="saleRuleInfo.installation_charge" style="width: 200px;"></InputNumber>
                            </FormItem>

                            <FormItem label="分期数">
                                <InputNumber :max="24" :min="1" :precision="0" v-model="saleRuleInfo.divided_pay_pers" style="width: 200px;"></InputNumber>
                            </FormItem>

                            <FormItem label="每期时间(月)">
                                <Input v-model="saleRuleInfo.set_time_divided_pay_pers"></Input>用逗号分隔时间，如:12,11,10,9,8  数量需与期数一致
                            </FormItem>

                            <FormItem label="每期费用(元)">
                                <Input v-model="saleRuleInfo.fix_month_rent"></Input>用逗号分隔费用，如:500,400,300,200,100  数量需与期数一致
                            </FormItem>

                            <FormItem label="免费使用时间(天)">
                                <InputNumber :max="1000" :min="0" :precision="0" v-model="saleRuleInfo.set_free_time" style="width: 200px;"></InputNumber>
                            </FormItem>
                        </div>

                        <FormItem>
                            <Button type="success" @click="handleSubmit('formValidate')">保存</Button>
                            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                            <Button type="primary" @click="toIndex" style="margin-left: 8px">返回</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </Card>
        
    </div>
</template>

<script>
import product from '../../controllers/product.js'

export default {
    name: 'add-sale-rule',
    data () {
        return {
            productId: 0,
            companyCode: 0,
            saleRuleInfo: {
                product_id: 0,
                pay_type: '',
                another_name: '',
                divided_pay_pers: 1,
                charge_type: '',
                prepay_rent: 0,
                installation_charge: 0,
                device_deposit: 0,
                save_electricity_ratio: 0,
                fix_month_rent: 0,
                set_time_divided_pay_pers: '',
                set_free_time: 0
            },
            payType: [
                {
                    id: 1,
                    label: '一次性购买'
                }, {
                    id: 2,
                    label: '分期付款'
                }, {
                    id: 3,
                    label: '租金'
                }, {
                    id: 4,
                    label: '浮动分期'
                }
            ],
            chargeType: [
                {
                    id: 1,
                    label: '固定租金'
                }, {
                    id: 4,
                    label: '浮动租金'
                }
            ],
            ruleValidate: {
                pay_type: [
                    { required: true, message: '请选择付款方式', type: 'number', trigger: 'change' }
                ],
                charge_type: [
                    { required: true, message: '请选择租金类型', type: 'number', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        init () {
            this.saleRuleInfo.product_id = this.productId
            this.findProduct()
        },

        findProduct () {
            let vm = this

            product.getCompanyCode(this.productId).then(res => {
                if (res.status === 0) {
                    vm.companyCode = res.entity.code

                    if (vm.companyCode === '01') {
                        vm.chargeType.push({ id: 3, label: '节能分享' })
                    } else {
                        vm.chargeType = vm.chargeType.filter(r => r.id !== 3)
                    }
                } else {
                    this.$Notice.error({
                        title: '获取产品失败',
                        desc: res.message
                    })
                }
            })
        },

        handleSubmit (name) {
            let vm = this

            this.$refs[name].validate((valid) => {
                if (valid) {
                    product.addSaleRule(this.saleRuleInfo).then(res => {
                        vm.$Message.info(res.message)
                        this.$router.push({ name: 'product-details', params: { id: this.productId } })
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
            this.$router.push({ name: 'product-details', params: { id: this.productId } })
        }
    },
    mounted: function () {
        this.productId = this.$route.params.id
        this.init()
    }
}
</script>
