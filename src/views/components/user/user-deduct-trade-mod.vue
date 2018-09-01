<template>
    <div class="user-deduct-trade-mod">
        <Modal v-model="showModal" :loading="loading" title="用户红冲"  @on-visible-change="changeVisible" @on-ok="handleTrade('formTrade')">
            <Form ref="formTrade" :model="tradeInfo" :label-width="150">
                <FormItem label="消费者电话">
                    {{ phone }}
                </FormItem>

                <FormItem label="充值金额(元)">
                    <InputNumber :min="-5000000" :max="0" :precision="0" v-model="tradeInfo.tradeInMoney" style="width: 250px;"></InputNumber>
                </FormItem>
                
                <FormItem label="充值优惠券(元)">
                    <InputNumber :min="-5000000" :max="0" :precision="0" v-model="tradeInfo.tradeInCoupon" style="width: 250px;"></InputNumber>
                </FormItem>

                <FormItem label="备注">
                    <Input v-model="tradeInfo.remark" style="width: 250px;"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import user from '@/controllers/user.js'

export default {
    name: 'user-deduct-trade-mod',
    props: {
        phone: { type: String, required: true },
        agentCompanyId: { type: Number, required: true }
    },
    data () {
        return {
            tradeInfo: {
                tradeInMoney: 0,
                tradeInCoupon: 0,
                remark: ''
            },
            showModal: false,
            loading: true
        }
    },
    methods: {
        init () {
            this.tradeInfo.tradeInMoney = 0
            this.tradeInfo.tradeInCoupon = 0
            this.tradeInfo.remark = ''
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
                trade_in_coupon: this.tradeInfo.tradeInCoupon,
                remark: this.tradeInfo.remark
            }

            if (this.tradeInfo.tradeInMoney === 0 && this.tradeInfo.tradeInCoupon === 0) {
                this.$Message.warning('请输入金额或优惠券')
                this.loading = false
                this.$nextTick(() => {
                    this.loading = true
                })
                return
            }

            let s = this.tradeInfo.remark
            if (s.replace(/(^s*)|(s*$)/g, '').length === 0) {
                this.$Message.warning('请输入备注')
                this.loading = false
                this.$nextTick(() => {
                    this.loading = true
                })
                return
            } 

            user.deductTrade(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '红冲成功',
                        desc: res.message
                    })

                    setTimeout(() => {
                        this.$emit('refresh')
                        this.showModal = false
                    }, 1000)
                } else {
                    this.$Notice.error({
                        title: '红冲失败',
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
