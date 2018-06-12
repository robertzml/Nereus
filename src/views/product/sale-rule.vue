<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                查看销售规则
            </p>

            <Row>
                <Col span="12" push="4">
                    <Form :model="saleRuleInfo" :label-width="220">
                        <FormItem label="付款方式" prop="pay_type">
                            {{ saleRuleInfo.pay_type | payType }}
                        </FormItem>

                        <div v-if="saleRuleInfo.pay_type === 1">
                            <FormItem label="期望安装费">
                                {{ saleRuleInfo.installation_charge }}
                            </FormItem>

                            <FormItem label="售价">
                                {{ saleRuleInfo.fix_month_rent }}
                            </FormItem>

                            <FormItem label="免费使用时间(天)">
                                {{ saleRuleInfo.set_free_time }}
                            </FormItem>
                        </div>
                       
                        <div v-if="saleRuleInfo.pay_type === 2">
                            <FormItem label="初始金额">
                                {{ saleRuleInfo.prepay_rent }}
                            </FormItem>

                            <FormItem label="安装费">
                                {{ saleRuleInfo.installation_charge }}
                            </FormItem>
                           
                            <FormItem label="分期数(月)">
                                {{ saleRuleInfo.divided_pay_pers }}
                            </FormItem>

                            <FormItem label="每期费用(元)">
                                 {{ saleRuleInfo.fix_month_rent }}
                            </FormItem>

                            <FormItem label="免费使用时间(天)">
                                {{ saleRuleInfo.set_free_time }}
                            </FormItem>
                        </div>

                        <div v-if="saleRuleInfo.pay_type === 3">
                            <FormItem label="初始金额">
                                {{ saleRuleInfo.prepay_rent }}
                            </FormItem>

                            <FormItem label="安装费">
                                {{ saleRuleInfo.installation_charge }}
                            </FormItem>

                            <FormItem label="设备押金">
                                {{ saleRuleInfo.device_deposit }}
                            </FormItem>

                            <FormItem label="租金类型" prop="charge_type">
                                {{ saleRuleInfo.charge_type | chargeType }}
                            </FormItem>

                            <FormItem label="每期费用(元)" v-if="saleRuleInfo.charge_type === 1">
                                {{ saleRuleInfo.fix_month_rent }}
                            </FormItem>
                            <FormItem label="节电比例" v-else-if="saleRuleInfo.charge_type === 3">
                                {{ saleRuleInfo.save_electricity_ratio }}
                            </FormItem>

                            <FormItem label="每期时间(月)" v-if="saleRuleInfo.charge_type === 4">
                                {{ saleRuleInfo.set_time_divided_pay_pers }}
                            </FormItem>

                            <FormItem label="每期费用(元)" v-if="saleRuleInfo.charge_type === 4">
                                {{ saleRuleInfo.fix_month_rent }}
                            </FormItem>

                            <FormItem label="免费使用时间(天)">
                                {{ saleRuleInfo.set_free_time }}
                            </FormItem>
                        </div>

                        <div v-if="saleRuleInfo.pay_type === 4">
                            <FormItem label="初始金额">
                               {{ saleRuleInfo.prepay_rent }}
                            </FormItem>

                            <FormItem label="安装费">
                                {{ saleRuleInfo.installation_charge }}
                            </FormItem>

                            <FormItem label="分期数">
                                {{ saleRuleInfo.divided_pay_pers }}
                            </FormItem>

                            <FormItem label="每期时间(月)">
                                {{ saleRuleInfo.set_time_divided_pay_pers }}
                            </FormItem>

                            <FormItem label="每期费用(元)">
                                {{ saleRuleInfo.fix_month_rent }}
                            </FormItem>

                            <FormItem label="免费使用时间(天)">
                                {{ saleRuleInfo.set_free_time }}
                            </FormItem>                            
                        </div>

                        <FormItem label="启用状态">
                            <i-switch v-model="ruleEnabled" size="large">
                                <span slot="open">启用</span>
                                <span slot="close">禁用</span>
                            </i-switch>
                        </FormItem>

                        <FormItem>
                            <Button type="success" @click="updateEnable">保存</Button>
                            <Button type="primary" @click="toIndex" style="margin-left: 8px">返回</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </Card>
        
    </div>
</template>

<script>
import product from '@/controllers/product.js'

export default {
    name: 'sale-rule',
    data () {
        return {
            ruleId: 0,
            productId: 0,
            companyCode: 0,
            saleRuleInfo: {
                id: 0,
                product_id: 0,
                pay_type: '',
                divided_pay_pers: 1,
                charge_type: '',
                prepay_rent: 0,
                installation_charge: 0,
                device_deposit: 0,
                save_electricity_ratio: 0,
                fix_month_rent: '',
                set_time_divided_pay_pers: ''
            },
            ruleEnabled: false
        }
    },
    filters: {
        payType: function (val) {
            switch (val) {
                case 1:
                    return '一次性购买'
                case 2:
                    return '分期付款'
                case 3:
                    return '租金'
                case 4:
                    return '浮动分期'
                default:
                    return '未定义'
            }
        },
        chargeType: function (val) {
            switch (val) {
                case 1:
                    return '固定租金'
                case 2:
                    return '混合租金'
                case 3:
                    return '节能分享'
                case 4:
                    return '浮动租金'
                default:
                    return '未定义'
            }
        }
    },
    methods: {
        init () {
            this.ruleId = this.$route.params.id
            this.findSaleRule()
        },

        findSaleRule () {
            let vm = this

            product.findSaleRule(this.ruleId).then(res => {
                if (res.status === 0) {
                    vm.saleRuleInfo = res.entity
                    vm.productId = vm.saleRuleInfo.product_id

                    vm.ruleEnabled = vm.saleRuleInfo.status === 0
                } else {
                    this.$Notice.error({
                        title: '获取销售规则失败',
                        desc: res.message
                    })
                }
            })
        },

        updateEnable () {
            let vm = this
            let act = {
                id: this.ruleId,
                status: 0
            }
            if (this.ruleEnabled) {
                act.status = 0
            } else {
                act.status = 2
            }

            product.updateSaleRuleStatus(act).then(res => {
                if (res.status === 0) {
                    vm.$Message.info(res.message)
                    vm.$router.push({ name: 'product-details', params: { id: vm.productId } })
                } else {
                    this.$Notice.error({
                        title: '更改状态失败',
                        desc: res.message
                    })
                }
            })
        },

        toIndex () {
            this.$router.push({ name: 'product-details', params: { id: this.productId } })
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>
