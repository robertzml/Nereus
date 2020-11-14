<template>
    <div class="product-agent-details">
        <Row style="margin-bottom: 15px;">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    销售规则
                </p>
               
                <a href="#" slot="extra" @click.prevent="getAgentMoneyShare">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>

                <p>
                    <span>代理商: {{ productAgentInfo.agent_company_name }}</span>
                    <span style="margin-left:20px;">代理产品: {{ productAgentInfo.product_name }}</span>
                    <span style="margin-left:20px;">产品代码: {{ productAgentInfo.product_code }}</span>
                </p>

                <br />

                <agent-money-share-list :item-list="moneyShareData" @refresh="getAgentMoneyShare"></agent-money-share-list>          

                <Button type="primary" @click="toIndex" style="margin-left: 8px">返回</Button>
                <Button type="success" @click="showAddRule" style="margin-left: 8px">增加销售规则</Button>
            </Card>
        </Row>

        <Modal
            v-model="modal1"
            title="产品销售规则"
            @on-ok="saveRule"
            :loading="loading">
            
            <Form ref="formModal" :model="ruleInfo" :label-width="120">
                <FormItem label="销售规则" prop="product_id">
                    <Select v-model="ruleInfo.sale_rule_id" style="width: 200px" :transfer="true">           
                        <Option v-for="item in saleRuleData" :value="item.id" :key="item.id" >
                            {{ item.another_name }}
                        </Option>
                    </Select>
                </FormItem>

                <FormItem label="代理商分成比例">
                    <InputNumber :max="1" :min="0" :precision="3" v-model="ruleInfo.wealth_sharing" style="width: 200px;"></InputNumber>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import product from '@/controllers/product.js'
import productAgent from '@/controllers/product-agent.js'
import agentMoneyShareList from '../components/saleRule/agent-money-share-list.vue'

export default {
    name: 'product-agent-details',
    components: {
        agentMoneyShareList
    },
    data () {
        return {
            id: 0,
            agentCompanyId: 0,
            productId: 0,
            productAgentInfo: {},
            moneyShareData: [],
            saleRuleData: [],
            ruleInfo: {
                agent_id: 0,
                sale_rule_id: 0,
                wealth_sharing: 0
            },
            modal1: false,
            loading: true
        }
    },
    methods: {
        init () {
            this.id = this.$route.params.id

            this.getProductAgentInfo()
        },

        getProductAgentInfo () {
            let vm = this
            productAgent.findInfo(this.id).then(res => {
                vm.productAgentInfo = res.entity
                vm.agentCompanyId = res.entity.agent_company_id
                vm.productId = res.entity.product_id

                vm.getAgentMoneyShare()
                vm.getSaleRule()
            })
        },

        getSaleRule () {
            let vm = this

            product.getSaleRules(this.productId).then(res => {
                vm.saleRuleData = res.entities
            })
        },

        getAgentMoneyShare () {
            let vm = this

            productAgent.findAgentMoneyShare(this.agentCompanyId, this.productId).then(res => {
                if (res.status === 0) {
                    vm.moneyShareData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取销售规则失败',
                        desc: res.message
                    })
                }
            })
        },

        saveRule () {
            if (this.ruleInfo.sale_rule_id === 0) {
                 this.$Message.warning({
                    content: '请选择销售规则',
                    duration: 2
                })
                this.loading = false
                this.$nextTick(() => {
                    this.loading = true
                })
                return
            }

            this.ruleInfo.agent_id = this.agentCompanyId

            let vm = this
            productAgent.addAgentMoneyShare(this.ruleInfo).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '添加成功',
                        desc: res.message
                    })
                    
                    setTimeout(() => {
                        vm.getAgentMoneyShare()
                        this.modal1 = false
                    }, 1000)
                } else {
                    this.$Notice.error({
                        title: '增加销售规则失败',
                        desc: res.message
                    })

                    vm.loading = false
                    this.$nextTick(() => {
                        this.loading = true
                    })
                }
            })
        },

        showAddRule () {
            this.modal1 = true
        },

        toIndex () {
            this.$router.push({ name: 'product-agent', params: { id: this.agentCompanyId } })
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>
