<template>
    <div class="consumer-deposit-list">
        <Table :data="tableData" :columns="columns" stripe border>
            <div slot="footer">
                <span style="margin-left: 10px;">设备押金合计: {{ totalDeposit }} 元</span>
                <span style="margin-left: 10px;">设备预付款合计: {{ totalPrepay }} 元</span>
            </div>
        </Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" :page-size-opts="pageSizeOpt" show-sizer placement="top" 
                    @on-page-size-change="changePageSize"></Page>
            </div>
        </div>
    </div>
</template>


<script>
/* 用户押金表格 */
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
                    key: 'sale_mode',
                    render: (h, params) => {
                        return (
                            <span>{ this.showSaleMode(params.row.sale_mode) }</span>
                        )
                    }
                },
                {
                    title: '交易单号',
                    key: 'wx_out_trade_no'
                },
                {
                    title: '付费类型',
                    key: 'bills_pay_type',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.paymentType(params.row.bills_pay_type) }</span>
                        )
                    }
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
        },
        totalDeposit () {
            let total = 0
            this.itemList.forEach(element => {
                total += element.device_deposit
            })
            return total.toFixed(2)
        },
        totalPrepay () {
            let total = 0
            this.itemList.forEach(element => {
                total += element.device_prepay_bills
            })
            return total.toFixed(2)
        }
    },
    methods: {
        changePageSize (pageSize) {
            this.pageSize = pageSize
        },

        showSaleMode (val) {
            switch (val) {
                case 1:
                    return '一次性付款'
                case 2:
                    return '分期付款'
                case 31:
                    return '固定租金'
                case 32:
                    return '混合租金'
                case 33:
                    return '节能分享'
                case 34:
                    return '浮动租金'
                case 4:
                    return '浮动分期'
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
