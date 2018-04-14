<template>
    <div>
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        用户信息
                    </p>
                    <a href="#" slot="extra" @click.prevent="getEquipments">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <consumer-wallet-list :itemList="walletData"></consumer-wallet-list>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import user from '../../controllers/user.js'
import consumerWalletList from '../components/consumer-wallet-list.vue'

export default {
    name: 'user-details',
    components: {
        consumerWalletList
    },
    data () {
        return {
            comsumerId: '',
            companyCode: '',
            walletData: []
        }
    },
    methods: {
        init () {
            this.comsumerId = this.$route.params.id
            this.companyCode = this.$route.params.code
            this.loadWallet()
        },

        loadWallet () {
            let vm = this

            user.findConsumerWallet(this.comsumerId, this.companyCode).then(res => {
                vm.walletData = res.entities
            })
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>
