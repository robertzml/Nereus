<template>
    <div>
        <Form :model="billInfo" :label-width="100">
            <Row>
                <Col span="12">
                    <FormItem label="设备序列号">
                        {{ billInfo.serial_number }}
                    </FormItem>
                    <FormItem label="付款者账户">
                        {{ billInfo.user_name }}
                    </FormItem>
                    <FormItem label="付款者手机号">
                        {{ billInfo.phone }}
                    </FormItem>
                    <FormItem label="付款期数">
                        {{ billInfo.curr_period }}
                    </FormItem>
                    <FormItem label="本期开始时间">
                        {{ billInfo.curr_period_start_date | displayDateTime}}
                    </FormItem>
                    <FormItem label="本期结束时间">
                        {{ billInfo.curr_period_end_date | displayDateTime }}
                    </FormItem>
                    <FormItem label="付款说明">
                        {{ billInfo.remark }}
                    </FormItem>
                </Col>

                <Col span="12">
                    <FormItem label="应付金额">
                        {{ billInfo.payable_account }} 元
                    </FormItem>
                    <FormItem label="应付优惠券">
                        {{ billInfo.payable_coupon }} 元
                    </FormItem>
                    <FormItem label="实付金额">
                        {{ billInfo.bills_amount }} 元
                    </FormItem>
                    <FormItem label="实付优惠券">
                        {{ billInfo.bills_coupon }} 元
                    </FormItem>
                    <FormItem label="销售方式">
                        {{ billInfo.sale_mode | moneyType}}
                    </FormItem>
                    <FormItem label="付款类型">
                        {{ billInfo.bills_pay_type | paymentType }}
                    </FormItem>
                    <FormItem label="付款日期">
                        {{ billInfo.bills_date | displayDateTime}}
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>


<script>
import user from '@/controllers/user.js'

export default {
    name: 'consumer-bill-details',
    props: {
    },
    data () {
        return {
            tradeNumber: '',
            billInfo: {}
        }
    },
    methods: {
        getBill (number) {
            let vm = this
            this.tradeNumber = number

            user.findConsumerBillByOutTradeNo(number).then(res => {
                if (res.status === 0) {
                    vm.billInfo = res.entity
                } else {
                    vm.$Message.error(res.message)
                }
            })
        }
    },
    mounted: function () {
    }
}
</script>
