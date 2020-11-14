<template>
    <div class="product-agent-list">
        <Table :data="tableData" :columns="columns" stripe border></Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" show-sizer placement="top" 
                    @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
            </div>
        </div>

        
        <Modal
            v-model="modal1"
            title="修改代理商销售规则分成"
            @on-ok="updateRule"
            :loading="loading">
            
            <Form ref="formModal" :model="ruleInfo" :label-width="120">
                <FormItem label="代理商名称">
                    <Input v-model="ruleInfo.agent_name" readonly></Input>
                </FormItem>

                <FormItem label="产品名称">
                    <Input v-model="ruleInfo.product_name" readonly></Input>
                </FormItem>

                <FormItem label="销售规则">
                    <Input v-model="ruleInfo.sale_rule_name" readonly></Input>
                </FormItem>

                <FormItem label="代理商分成比例">
                    <InputNumber :max="1" :min="0" :precision="3" v-model="ruleInfo.wealth_sharing" style="width: 250px;"></InputNumber>
                </FormItem>
            </Form>
        </Modal>

        <Modal
            v-model="modal2"
            title="产品销售规则"
            @on-ok="saveRule"
            :loading="loading">
            
            <Form ref="formModal" :model="ruleInfo" :label-width="120">
                <FormItem label="产品名称">
                    <Input v-model="new_rule_product_name" readonly style="width: 200px"></Input>
                </FormItem>

                <FormItem label="销售规则" prop="product_id">
                    <Select v-model="newRuleInfo.sale_rule_id" style="width: 200px" :transfer="true" :disabled="canEditRule">           
                        <Option v-for="item in saleRuleData" :value="item.id" :key="item.id" >
                            {{ item.another_name }}
                        </Option>
                    </Select>
                </FormItem>

                <FormItem label="代理商分成比例">
                    <InputNumber :max="1" :min="0" :precision="3" v-model="newRuleInfo.wealth_sharing" style="width: 200px;"></InputNumber>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import product from '@/controllers/product.js'
import productAgent from '@/controllers/product-agent.js'

export default {
    name: 'product-agent-list',
    props: {
        itemList: { type: Array, required: true },
        showPager: { type: Boolean, default: true }
    },
    data () {
        return {
            columns: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '产品代码',
                    key: 'product_code'
                },
                {
                    title: '产品名称',
                    key: 'product_name'
                },
                {
                    title: '生产厂商',
                    key: 'company_name'
                },
                {
                    title: '代理厂商',
                    key: 'agent_name'
                },
                {
                    title: '产品类型名称',
                    key: 'product_type_name'
                },
                {
                    title: '型号规格',
                    key: 'product_specification'
                },
                {
                    title: '销售规则',
                    key: 'product_sale_rule_name'
                },
                {
                    title: '分成比例',
                    key: 'agent_money_sharing_value'
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return (
                            <i-button type="warning" size="small" style="marginRight: 5px" onClick={ () => { this.showEdit(params.row) } }>编辑</i-button>
                        )
                    }
                }
            ],
            pageSize: 10,
            currentPage: 1,
            pageSizeOpt: [5, 10, 20, 30],
            tableData: this.itemList.slice(0, this.pageSize),
            modal1: false,
            loading: true,
            ruleInfo: {
                id: 0,
                agent_name: '',
                product_name: '',
                sale_rule_name: '',
                wealth_sharing: 0
            },
            modal2: false,
            saleRuleData: [],
            newRuleInfo: {
                agent_id: 0,
                sale_rule_id: 0,
                wealth_sharing: 0
            },
            disableEditRule: true,
            new_rule_product_name: ''
        }
    },
    computed: {
        itemsCount () {
            return this.itemList.length
        }
    },
    watch: {
        itemList: function (newList) {
            this.tableData = newList.slice(0, this.pageSize)
        }
    },
    methods: {
        changePage (page) {
            this.tableData = this.itemList.slice((page - 1) * this.pageSize, page * this.pageSize)
        },
        changePageSize (pageSize) {
            this.pageSize = pageSize
            this.tableData = this.itemList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        },
        showDetails (item) {
            this.$router.push({ name: 'product-agent-details', params: { id: item.id } })
        },
        showEdit (item) {
            if (item.agent_money_sharing_id !== null) {
                this.modal1 = true
                this.ruleInfo.id = item.agent_money_sharing_id                
                this.ruleInfo.agent_name = item.agent_name
                this.ruleInfo.product_name = item.product_name
                this.ruleInfo.sale_rule_name = item.product_sale_rule_name
                this.ruleInfo.wealth_sharing = item.agent_money_sharing_value
            } else if (item.product_sale_rule_id !== null) {
                this.getSaleRule(item.product_id)
                this.disableEditRule = true
                this.modal2 = true
                this.new_rule_product_name = item.product_name
                this.newRuleInfo.agent_id = item.agent_id
                this.newRuleInfo.sale_rule_id = item.product_sale_rule_id
                this.newRuleInfo.wealth_sharing = 0
            } else {
                this.getSaleRule(item.product_id)
                this.disableEditRule = false
                this.modal2 = true
                this.new_rule_product_name = item.product_name
                this.newRuleInfo.agent_id = item.agent_id
                this.newRuleInfo.sale_rule_id = 0
                this.newRuleInfo.wealth_sharing = 0
            }
        },

        getSaleRule (productId) {
            let vm = this

            product.getSaleRules(productId).then(res => {
                vm.saleRuleData = res.entities
            })
        },

        updateRule () {
            let vm = this
            let moneyShare = {
                id: this.ruleInfo.id,
                wealth_sharing: this.ruleInfo.wealth_sharing
            }

            productAgent.updateAgentMoneyShare(moneyShare).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '编辑成功',
                        desc: res.message
                    })
                    
                    setTimeout(() => {
                        this.$emit('refresh')
                        this.modal1 = false
                    }, 1000)
                } else {
                    this.$Notice.error({
                        title: '编辑销售规则失败',
                        desc: res.message
                    })

                    vm.loading = false
                    this.$nextTick(() => {
                        this.loading = true
                    })
                }
            })
        },

        saveRule () {
            if (this.newRuleInfo.sale_rule_id === 0) {
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

            let vm = this
            productAgent.addAgentMoneyShare(this.newRuleInfo).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '添加成功',
                        desc: res.message
                    })
                    
                    setTimeout(() => {
                        this.modal2 = false
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
        }
    }
}
</script>
