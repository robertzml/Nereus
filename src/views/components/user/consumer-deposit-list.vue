<template>
    <div class="consumer-deposit-list">
        <Table :data="tableData" :columns="columns" stripe border></Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" :page-size-opts="pageSizeOpt" show-sizer placement="top" 
                    @on-page-size-change="changePageSize"></Page>
            </div>
        </div>
    </div>
</template>


<script>
import * as nereus from '@/utility/nereus.js'

export default {
    name: 'consumer-deposit-list',
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
                    title: '设备序列号',
                    key: 'serialnumber'
                },
                {
                    title: '钱包ID',
                    key: 'wallet_id'
                },
                {
                    title: '设备押金(元)',
                    key: 'device_deposit'
                },
                {
                    title: '设备预付款(元)',
                    key: 'device_prepay_bills'
                },

                {
                    title: '销售模式',
                    key: 'sale_mode'
                },
                {
                    title: '交易单号',
                    key: 'wx_out_trade_no'
                },
                {
                    title: '付费类型',
                    key: 'bills_pay_type'
                },
                {
                    title: '是否可用',
                    key: 'availabe',
                    render: (h, params) => {
                        return (
                            <span>{ this.showAvailabe(params.row.availabe) }</span>
                        )
                    }
                },
                {
                    title: '记录日期',
                    key: 'create_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.create_date) }</span>
                        )
                    }
                }
            ],
            pageSize: 10,
            currentPage: 1,
            pageSizeOpt: [5, 10, 20, 30]
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

        showPaymentType (type) {
            switch (type) {
                case 0:
                    return '微信支付'
                case 1:
                    return '阿里支付'
                case 2:
                    return '平台支付'
                case 3:
                    return '自动扣款'
                case 4:
                    return '用户扣款'
                default:
                    return ''
            }
        },

        showAvailabe (val) {
            switch (val) {
                case 0:
                    return '可用'
                case 1:
                    return '不可用'
            }
        }
    }
}
</script>
