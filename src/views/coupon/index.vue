<template>
    <div>
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        优惠券列表
                    </p>
                    <a href="#" slot="extra" @click.prevent="loadCoupon">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <div>
                        <span>代理商：</span>
                        <Select v-model="selectedAgent" style="width:300px" placeholder="选择代理商" @on-change="selectAgent">
                            <Option v-for="item in agentCompany" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </div>

                    <br />
                    <coupon-list :item-list="couponData"></coupon-list>

                    <br />
                    <Button type="success" @click="addCoupon">添加优惠券</Button>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import company from '@/controllers/company.js'
import coupon from '@/controllers/coupon.js'
import couponList from '../components/coupon/coupon-list.vue'

export default {
    name: 'coupon-index',
    components: {
        couponList
    },
    data () {
        return {
            roleType: 0,
            agentCompany: [],
            selectedAgent: 0,
            couponData: []
        }
    },
    beforeRouteEnter (to, from, next) {
        if (from.name === 'coupon-edit' || from.name === 'coupon-create') {
            next(vm => {
                vm.loadCoupon()
            })
        } else {
            next()
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType
            if (this.roleType === 0 || this.roleType === 1) {
                this.getAllAgents()
            } else if (this.roleType === 2) {
                this.getAgentCompany()
            }
        },

        getAllAgents () {
            let vm = this

            company.list().then(res => {
                vm.agentCompany = res.entities.filter(r => r.type !== 1)
            })
        },

        // 获取下属代理商
        getAgentCompany () {
            let vm = this
            let companyId = this.$store.state.user.companyId

            company.listAgentAndSelf(companyId).then(res => {
                vm.agentCompany = res.entities
            })
        },

        selectAgent (val) {
            this.loadCoupon()
        },

        loadCoupon () {
            if (this.selectedAgent !== 0) {
                let vm = this

                coupon.listByCompany(this.selectedAgent).then(res => {
                    if (res.status === 0) {
                        vm.couponData = res.entities
                    }
                })
            }
        },

        addCoupon () {
            this.$router.push({ name: 'coupon-create' })
        }
    },
    created: function () {
        this.init()
    }
}
</script>
