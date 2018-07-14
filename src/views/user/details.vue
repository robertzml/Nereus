<template>
    <div>
        <Tabs>
            <TabPane label="消费者信息">
                <Row :gutter="16">
                    <Col span="12">
                        <consumer-wallet-details :wallet-details-info="walletDetails"></consumer-wallet-details>
                        <br />
                        <p>
                            <Button type="primary" @click="toIndex">返回</Button>
                        </p>
                    </Col>
                    <Col span="12">
                        <consumer-wallet-summary :wallet-summary-info="walletSummary"></consumer-wallet-summary>
                    </Col>
                </Row>
            </TabPane>
            <TabPane label="消费者钱包记录">
                <Row>
                    <Col span="24">
                        <div class="filter-panel">
                            <Button type="primary" @click="loadWallet">刷新</Button>
                            <Button type="primary" @click="showTrade">充值</Button>
                        </div>
                        <consumer-wallet-list :itemList="walletData"></consumer-wallet-list>
                    </Col>
                </Row>
                <user-trade-mod ref="tradeMod" :phone="phone" :agent-company-id="agentCompanyId" @refresh="loadWallet"></user-trade-mod>
            </TabPane>

            <TabPane label="钱包充值">
                <Row :gutter="16">
                    <Col span="24">
                        <user-trade :phone="phone" :agent-company-id="agentCompanyId"></user-trade>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
       
    </div>
</template>

<script>
import user from '@/controllers/user.js'
import consumerWalletDetails from '../components/user/consumer-wallet-details.vue'
import consumerWalletList from '../components/user/consumer-wallet-list.vue'
import consumerWalletSummary from '../components/user/consumer-wallet-summary.vue'
import userTrade from '../components/user/user-trade.vue'
import userTradeMod from '../components/user/user-trade-mod.vue'

export default {
    name: 'user-details',
    components: {
        consumerWalletDetails,
        consumerWalletList,
        consumerWalletSummary,
        userTrade,
        userTradeMod
    },
    data () {
        return {
            consumerId: '',
            companyCode: '',
            agentCompanyId: 0,
            walletData: [],
            walletSummary: {},
            walletDetails: {},
            phone: '',
            tradeModal: false
        }
    },
    methods: {
        init () {
            this.consumerId = this.$route.params.id
            this.companyCode = this.$route.params.code
            this.agentCompanyId = this.$route.params.aid
            this.loadUserPhone()
            this.loadWalletDetals()
            this.loadWallet()
            this.loadWalletSummary()
        },

        loadUserPhone () {
            let vm = this

            user.findConsumerPhone(this.consumerId).then(res => {
                if (res.status === 0) {
                    vm.phone = res.entity.phone
                } else {
                    this.$Notice.error({
                        title: '获取用户电话失败',
                        desc: res.message
                    })
                }
            })
        },

        loadWalletDetals () {
            let vm = this

            user.details(this.companyCode, this.agentCompanyId, this.consumerId).then(res => {
                if (res.status === 0) {
                    vm.walletDetails = res.entity
                } else {
                    this.$Notice.error({
                        title: '获取用户信息失败',
                        desc: res.message
                    })
                }
            })
        },

        loadWallet () {
            let vm = this

            user.findConsumerWallet(this.consumerId, this.companyCode).then(res => {
                if (res.status === 0) {
                    vm.walletData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取钱包记录失败',
                        desc: res.message
                    })
                }
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

        showTrade () {
            this.$refs.tradeMod.show()
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

<style scoped>
div.filter-panel {
    padding: 5px;
    margin-bottom: 5px;
}
</style>
