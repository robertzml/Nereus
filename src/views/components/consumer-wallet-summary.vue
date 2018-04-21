<template>
    <div class="consumer-wallet-summary">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                消费者钱包汇总
            </p>

            <Form :model="walletSummaryInfo" :label-width="100">
                <FormItem label="钱包总支出">
                    {{ walletSummaryInfo.sum_transferred_out_amount }} 元
                </FormItem>

                <FormItem label="钱包总收入">
                    {{ walletSummaryInfo.sum_transferred_in_amount }} 元
                </FormItem>

                <FormItem label="优惠券总支出">
                    {{ walletSummaryInfo.sum_transferred_out_coupon }} 元
                </FormItem>

                <FormItem label="优惠券总收入">
                    {{ walletSummaryInfo.sum_transferred_in_coupon }} 元
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
export default {
    name: 'consumer-wallet-summary',
    props: {
        walletSummaryInfo: { required: true }
    },
    data () {
        return {

        }
    }
}
</script>
