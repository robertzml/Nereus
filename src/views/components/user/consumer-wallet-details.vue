<template>
    <div class="consumer-wallet-details">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                消费者信息
            </p>

            <Form :model="walletDetailsInfo" :label-width="100">
                <Row>
                    <Col span="12">
                        <FormItem label="用户姓名">
                            {{ walletDetailsInfo.protocol_apply_consumer_name }}
                        </FormItem>

                        <FormItem label="APP用户名">
                            {{ walletDetailsInfo.app_consumer_name }}
                        </FormItem>                

                        <FormItem label="用户电话">
                            {{ walletDetailsInfo.owner_phone }}
                        </FormItem>

                        <FormItem label="钱包总金额">
                            {{ walletDetailsInfo.wallet_amount }} 元
                        </FormItem>

                        <FormItem label="钱包优惠券">
                            {{ walletDetailsInfo.waller_coupon }} 元
                        </FormItem>
                    </Col>

                    <Col span="12">
                        <FormItem label="账户记录日期">
                            {{ walletDetailsInfo.last_transaction_date }}
                        </FormItem>

                         <FormItem label="用户地址">
                            {{ walletDetailsInfo.address }}
                        </FormItem>

                        <FormItem label="详细地址">
                            {{ walletDetailsInfo.address_detail }}
                        </FormItem>

                        <FormItem label="公司代码">
                            {{ walletDetailsInfo.company_code }}
                        </FormItem>

                        <FormItem label="代理公司名称">
                            {{ walletDetailsInfo.agent_company_name }}
                        </FormItem>
                    </Col>
                </Row>
               

               
            </Form>
        </Card>
    </div>
</template>

<script>
export default {
    name: 'consumer-wallet-details',
    props: {
        walletDetailsInfo: { required: true }
    },
    data () {
        return {

        }
    }
}
</script>
