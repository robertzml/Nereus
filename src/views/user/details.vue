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
                            <Button type="primary" @click="showDeductTrade">红冲</Button>
                        </div>
                        <consumer-wallet-list :itemList="walletData"></consumer-wallet-list>
                    </Col>
                </Row>
                <user-trade-mod ref="tradeMod" :phone="phone" :company-code="companyCode" @refresh="loadWallet"></user-trade-mod>
                <user-deduct-trade-mod ref="deductTradeMod" :phone="phone" :agent-company-id="agentCompanyId" :company-id="companyId" @refresh="loadWallet"></user-deduct-trade-mod>
            </TabPane>
            <TabPane label="用户押金">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        用户押金
                    </p>

                    <consumer-deposit-list :item-list="depositData"></consumer-deposit-list>
                </Card>
            </TabPane>
            <TabPane label="历史设备">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        历史设备
                    </p>

                    <history-list :item-list="historyData"></history-list>
                </Card>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import user from '@/controllers/user.js'
import equipment from '@/controllers/equipment.js'
import consumerWalletDetails from '../components/user/consumer-wallet-details.vue'
import consumerWalletList from '../components/user/consumer-wallet-list.vue'
import consumerWalletSummary from '../components/user/consumer-wallet-summary.vue'
import userTradeMod from '../components/user/user-trade-mod.vue'
import userDeductTradeMod from '../components/user/user-deduct-trade-mod.vue'
import consumerDepositList from '../components/user/consumer-deposit-list.vue'
import historyList from '../components/equipment/history-list.vue'

export default {
    name: 'user-details',
    components: {
        consumerWalletDetails,
        consumerWalletList,
        consumerWalletSummary,
        userTradeMod,
        userDeductTradeMod,
        consumerDepositList,
        historyList
    },
    data () {
        return {
            consumerId: '',
            companyCode: '',
            companyId: 0,
            agentCompanyId: 0,
            walletData: [],
            depositData: [],
            historyData: [],
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
            this.companyId = this.$store.state.user.companyId
            this.loadUserPhone()
            this.loadWalletDetals()
            this.loadWallet()
            this.loadWalletSummary()
            this.loadDepositData()
        },

        loadUserPhone () {
            let vm = this

            user.findConsumerPhone(this.consumerId).then(res => {
                if (res.status === 0) {
                    vm.phone = res.entity.phone

                    this.loadHistoryData()
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

        loadDepositData () {
            let vm = this

            user.getDeposit(this.consumerId).then(res => {
                if (res.status === 0) {
                    vm.depositData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取押金记录失败',
                        desc: res.message
                    })
                }
            })
        },

        loadHistoryData () {
            if (this.phone === '') {
                this.$Notice.error({
                    title: '无手机号',
                    desc: '无手机号'
                })
                return
            }

            let vm = this
            equipment.getHistory(this.phone).then(res => {
                if (res.status === 0) {
                    vm.historyData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取记录失败',
                        desc: res.message,
                        duration: 5
                    })
                }
            })
        },

        showTrade () {
            this.$refs.tradeMod.show()
        },

        showDeductTrade () {
            this.$refs.deductTradeMod.show()
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
