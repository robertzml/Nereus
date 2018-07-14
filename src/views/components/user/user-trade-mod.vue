<template>
    <div class="user-trade-mod">
        <Modal v-model="showModal" :loading="loading" title="用户充值"  @on-visible-change="changeVisible" @on-ok="handleTrade('formTrade')">
            <Form ref="formTrade" :model="tradeInfo" :label-width="150">
                <FormItem label="消费者电话">
                    {{ phone }}
                </FormItem>

                <FormItem label="充值金额(元)">
                    <InputNumber :max="5000000" :min="0" :precision="0" v-model="tradeInfo.tradeInMoney" style="width: 250px;"></InputNumber>
                </FormItem>
                
                <FormItem label="充值优惠券(元)">
                    <InputNumber :max="5000000" :min="0" :precision="0" v-model="tradeInfo.tradeInCoupon" style="width: 250px;"></InputNumber>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import user from '@/controllers/user.js'

export default {
    name: 'user-trade-mod',
    props: {
        phone: { type: String, required: true },
        agentCompanyId: { type: Number, required: true }
    },
    data () {
        return {
            tradeInfo: {
                tradeInMoney: 0,
                tradeInCoupon: 0
            },
            showModal: false,
            loading: true
        }
    },
    methods: {
        init () {
            this.tradeInfo.tradeInMoney = 0
            this.tradeInfo.tradeInCoupon = 0
        },
        show () {
            this.showModal = true
        },
        changeVisible (val) {
            if (val) {
                this.init()
            }
        },
        modalCancel () {
            this.showModal = false
        },
        handleTrade (name) {
            let act = {
                equipment_consumer_account_phone: this.phone,
                agent_company_id: this.agentCompanyId,
                trade_in_money: this.tradeInfo.tradeInMoney,
                trade_in_coupon: this.tradeInfo.tradeInCoupon
            }

            if (this.tradeInfo.tradeInMoney === 0 && this.tradeInfo.tradeInCoupon === 0) {
                this.$Message.warning('请输入金额或优惠券')
                this.loading = false
                this.$nextTick(() => {
                    this.loading = true
                })
                return
            }

            user.tradeIn(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '充值成功',
                        desc: res.message
                    })

                    setTimeout(() => {
                        this.showModal = false
                    }, 1000)
                } else {
                    this.$Notice.error({
                        title: '充值失败',
                        desc: res.message
                    })
                    this.loading = false
                    this.$nextTick(() => {
                        this.loading = true
                    })
                }
            })
        }
    }
}
</script>

