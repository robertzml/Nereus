<template>
    <div class="consumer-wallet-list">
        <Table :data="tableData" :columns="columns" stripe border></Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" :page-size-opts="pageSizeOpt" show-sizer placement="top" 
                    @on-page-size-change="changePageSize"></Page>
            </div>
        </div>
        <Modal
            v-model="modal1"
            width="800"
            title="钱包信息详情">
            <consumer-bill-details  ref="bill1"></consumer-bill-details>
        </Modal>
    </div>
</template>

<script>
import * as nereus from '@/utility/nereus.js'
import consumerBillDetails from './consumer-bill-details.vue'

export default {
    name: 'consumer-wallet-list',
    props: {
        itemList: { type: Array, required: true },
        showPager: { type: Boolean, default: true }
    },
    components: {
        consumerBillDetails
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
                    title: '交易单号',
                    key: 'out_trade_no'
                },
                {
                    title: '交易设备序列号',
                    key: 'transferred_device'
                },
                {
                    title: '厂家名称',
                    key: 'company_name'
                },
                {
                    title: '记录日期',
                    key: 'create_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.create_date) }</span>
                        )
                    }
                },
                {
                    title: '支出金额',
                    key: 'transferred_out_amount'
                },
                {
                    title: '收入金额',
                    key: 'transferred_in_amount'
                },
                {
                    title: '钱包总金额',
                    key: 'wallet_amount'
                },
                {
                    title: '优惠券支出',
                    key: 'transferred_out_coupon'
                },
                {
                    title: '优惠券收入',
                    key: 'transferred_in_coupon'
                },
                {
                    title: '消费者钱包优惠券',
                    key: 'waller_coupon'
                },
                {
                    title: '交易类型',
                    key: 'payment',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.paymentType(params.row.payment) }</span>
                        )
                    }
                },
                {
                    title: '操作者姓名',
                    key: 'operate_account_name'
                },
                {
                    title: '交易描述',
                    key: 'transferred_description'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return (
                        <div>
                            <i-button type="primary" size="small" style="marginRight: 5px" onClick={ () => { this.showDetails(params.row) } }>查看</i-button>
                        </div>
                        )
                    }
                }
            ],
            pageSize: 10,
            currentPage: 1,
            pageSizeOpt: [5, 10, 20, 30],
            modal1: false
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
        },
        showDetails (item) {
            this.$refs.bill1.getBill(item.out_trade_no)
            this.modal1 = true
        }
    }
}
</script>
