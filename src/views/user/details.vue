<template>
    <div>
        <Row :gutter="16">
            <Col span="8">
                <consumer-wallet-summary :wallet-summary-info="walletSummary" style="margin-bottom: 15px;"></consumer-wallet-summary>                
                <user-trade :phone="phone" :agent-company-id="agentCompanyId"></user-trade>
            </Col>

            <Col span="16">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        消费者钱包记录
                    </p>
                    <a href="#" slot="extra" @click.prevent="loadWallet">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <consumer-wallet-list :itemList="walletData"></consumer-wallet-list>

                    <p>
                        <Button type="primary" @click="toIndex">返回</Button>
                    </p>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import user from '../../controllers/user.js'
import consumerWalletList from '../components/consumer-wallet-list.vue'
import consumerWalletSummary from '../components/consumer-wallet-summary.vue'
import userTrade from '../components/user-trade.vue'

export default {
    name: 'user-details',
    components: {
        consumerWalletList,
        consumerWalletSummary,
        userTrade
    },
    data () {
        return {
            consumerId: '',
            companyCode: '',
            agentCompanyId: 0,
            walletData: [],
            walletSummary: {},
            phone: ''
        }
    },
    methods: {
        init () {
            this.consumerId = this.$route.params.id
            this.companyCode = this.$route.params.code
            this.agentCompanyId = this.$route.params.aid
            this.loadUserPhone()
            this.loadWallet()
            this.loadWalletSummary()
        },

        loadUserPhone () {
            let vm = this

            user.findConsumerPhone(this.consumerId).then(res => {
                if (res.status === 0) {
                    vm.phone = res.entity.phone
                }
            })
        },

        loadWallet () {
            let vm = this

            user.findConsumerWallet(this.consumerId, this.companyCode).then(res => {
                vm.walletData = res.entities
            })
        },

        loadWalletSummary () {
            let vm = this

            user.findConsumerWalletSum(this.consumerId, this.companyCode).then(res => {
                if (res.status === 0 && res.entities.length > 0) {
                    vm.walletSummary = res.entities[0]
                }
            })
        },

        toIndex () {
            this.$router.push({ name: 'user-index' })
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>
