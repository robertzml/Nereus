<template>
    <div class="agent-money-share-list">
        <Table :data="tableData" :columns="columns" stripe border></Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" show-sizer placement="top" 
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

                <FormItem label="销售规则">
                    <Input v-model="ruleInfo.sale_rule_name" readonly></Input>
                </FormItem>

                <FormItem label="代理商分成比例">
                    <InputNumber :max="1" :min="0" :precision="2" v-model="ruleInfo.wealth_sharing" style="width: 250px;"></InputNumber>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import * as nereus from '@/utility/nereus.js'
import productAgent from '@/controllers/product-agent.js'

export default {
    name: 'agent-money-share-list',
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
                    title: '厂商名称',
                    key: 'company_name'
                },
                {
                    title: '代理商名称',
                    key: 'agent_name'
                },
                {
                    title: '产品名称',
                    key: 'product_name'
                },              
                {
                    title: '销售规则名称',
                    key: 'product_sale_rule_name'
                },
                {
                    title: '代理商分成比例',
                    key: 'agent_money_sharing_value'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return (
                            <div>
                                <i-button type="warning" size="small" onClick={ () => { this.showEdit(params.row) } }>编辑</i-button>
                            </div>
                        )
                    }
                }
            ],
            pageSize: 10,
            currentPage: 1,
            pageSizeOpt: [5, 10, 20, 30],
            modal1: false,
            loading: true,
            ruleInfo: {
                id: 0,
                agent_name: '',
                sale_rule_name: '',
                wealth_sharing: 0
            }
        }
    },
    watch: {
        itemList: function (newList) {
            this.currentPage = 1
        }
    },
    computed: {
        itemsCount () {
            return this.itemList.length
        },
        tableData () {
            let temp = this.itemList
            return temp.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        }
    },
    methods: {
        changePageSize (pageSize) {
            this.pageSize = pageSize
            this.tableData = this.itemList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        },

        showEdit (item) {
            this.modal1 = true
            this.ruleInfo.id = item.agent_money_sharing_id
            this.ruleInfo.agent_name = item.agent_name
            this.ruleInfo.sale_rule_name = item.product_sale_rule_name
            this.ruleInfo.wealth_sharing = item.agent_money_sharing_value
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
        }
    }
}
</script>
