<template>
    <div>
         <Row>
            <Col span="12" push="4">
                <Form :model="saleRuleInfo" :label-width="220">
                    <FormItem label="付款方式" prop="pay_type">
                        {{ saleRuleInfo.pay_type | payType }}
                    </FormItem>

                    <div v-if="saleRuleInfo.pay_type === 1">
                        <FormItem label="别名">
                            {{ saleRuleInfo.another_name }}
                        </FormItem>

                        <FormItem label="安装费">
                            {{ saleRuleInfo.installation_charge }}
                        </FormItem>

                        <FormItem label="售价">
                            {{ saleRuleInfo.fix_month_rent }}
                        </FormItem>

                        <FormItem label="免费使用时间(天)">
                            {{ saleRuleInfo.set_free_time }}
                        </FormItem>

                        <FormItem label="创建时间">
                            {{ saleRuleInfo.create_date | displayDateTime }}
                        </FormItem>
                        <FormItem label="编辑时间">
                            {{ saleRuleInfo.modify_date | displayDateTime }}
                        </FormItem>
                    </div>
                    
                    <div v-if="saleRuleInfo.pay_type === 2">
                        <FormItem label="别名">
                            {{ saleRuleInfo.another_name }}
                        </FormItem>

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

                        <FormItem label="创建时间">
                            {{ saleRuleInfo.create_date | displayDateTime }}
                        </FormItem>
                        <FormItem label="编辑时间">
                            {{ saleRuleInfo.modify_date | displayDateTime }}
                        </FormItem>
                    </div>

                    <div v-if="saleRuleInfo.pay_type === 3">
                        <FormItem label="别名">
                            {{ saleRuleInfo.another_name }}
                        </FormItem>

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

                        <FormItem label="首充值(元)" v-if="saleRuleInfo.charge_type === 1 || saleRuleInfo.charge_type === 3">
                            {{ saleRuleInfo.prestoring_money }}
                        </FormItem>

                        <FormItem label="每期费用(元)" v-if="saleRuleInfo.charge_type === 1">
                            {{ saleRuleInfo.fix_month_rent }}
                        </FormItem>
                        <FormItem label="分享比例" v-else-if="saleRuleInfo.charge_type === 3">
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

                        <FormItem label="创建时间">
                            {{ saleRuleInfo.create_date | displayDateTime }}
                        </FormItem>
                        <FormItem label="编辑时间">
                            {{ saleRuleInfo.modify_date | displayDateTime }}
                        </FormItem>
                    </div>

                    <div v-if="saleRuleInfo.pay_type === 4">
                        <FormItem label="别名">
                            {{ saleRuleInfo.another_name }}
                        </FormItem>

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

                        <FormItem label="创建时间">
                            {{ saleRuleInfo.create_date | displayDateTime }}
                        </FormItem>
                        <FormItem label="编辑时间">
                            {{ saleRuleInfo.modify_date | displayDateTime }}
                        </FormItem>                         
                    </div>

                    <FormItem label="启用状态">
                        {{ saleRuleInfo.status | displayStatus }}
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </div>
</template>


<script>
export default {
    name: 'sale-rule-details',
    props: {
        saleRuleInfo: { required: true }
    },
    computed: {
        ruleEnabled: function () {
            return this.saleRuleInfo.status === 0
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
        },
        displayStatus: function (val) {
            if (val === 0) {
                return '启用'
            } else {
                return '禁用'
            }
        }
    }
}
</script>
