<template>
    <div class="user-trade">
        <Card>
             <p slot="title">
                <Icon type="grid"></Icon>
                用户充值
            </p>

            <Form ref="formTrade" :model="tradeInfo" :label-width="80">
                <FormItem label="充值金额">
                    <InputNumber :max="5000000" :min="0" :precision="0" v-model="tradeInfo.tradeInMoney" style="width: 150px;"></InputNumber>
                </FormItem>
                
                <FormItem label="充值优惠券">
                    <InputNumber :max="5000000" :min="0" :precision="0" v-model="tradeInfo.tradeInCoupon" style="width: 150px;"></InputNumber>
                </FormItem>

                <FormItem>
                    <Poptip
                        confirm
                        title="是否确认充值?"
                        @on-ok="handleTrade('formTrade')">
                        <Button type="success">充值</Button>
                    </Poptip>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
import user from '@/controllers/user.js'

export default {
    name: 'user-trade',
    props: {
        phone: { type: String, required: true },
        agentCompanyId: { type: Number, required: true }
    },
    data () {
        return {
            tradeInfo: {
                tradeInMoney: 0,
                tradeInCoupon: 0
            }
        }
    },
    methods: {
        ok () {
            this.$Message.info('You click ok')
        },
        handleTrade (name) {
            console.log('handle')
          
            let act = {
                equipment_consumer_account_phone: this.phone,
                agent_company_id: this.agentCompanyId,
                trade_in_money: this.tradeInfo.tradeInMoney,
                trade_in_coupon: this.tradeInfo.tradeInCoupon
            }

            user.tradeIn(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '充值成功',
                        desc: res.message
                    })
                } else {
                    this.$Notice.error({
                        title: '充值失败',
                        desc: res.message
                    })
                }
            })
        }
    }
}
</script>

