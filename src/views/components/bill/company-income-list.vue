<template>
    <div class="company-income-list">
        <Table :data="tableData" :columns="columns" ref="table" stripe border>
            <div slot="footer" class="footer">
                <span style="margin-left:20px;">共 {{ itemsCount }} 条收益记录</span>
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
import * as nereus from '@/utility/nereus.js'

export default {
    name: 'company-income-list',
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
                    key: 'serial_number'
                },
                {
                    title: '设备主人',
                    key: 'consumer_name'
                },
                {
                    title: '设备主人电话',
                    key: 'consumer_phone'
                },
                {
                    title: '账单序列号',
                    key: 'actual_income_trade_no'
                },
                {
                    title: '期数',
                    key: 'statistics_number_of_periods'
                },
                {
                    title: '账期起始时间',
                    key: 'statistics_number_of_periods_start',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.statistics_number_of_periods_start) }</span>
                        )
                    }
                },
                {
                    title: '账期截止时间',
                    key: 'statistics_number_of_periods_end',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.statistics_number_of_periods_end) }</span>
                        )
                    }
                },
                {
                    title: '销售方式',
                    key: 'product_charge_money_type',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.moneyType(params.row.product_charge_money_type) }</span>
                        )
                    }
                },
                {
                    title: '销售方式别名',
                    key: 'product_sale_rule_name'
                },
                {
                    title: '支付人姓名',
                    key: 'actual_income_trade_account_name'
                },
                {
                    title: '支付人电话',
                    key: 'actual_income_trade_account_phone'
                },
                {
                    title: '应收款金额',
                    key: 'accrued_revenues'
                },
                {
                    title: '使用优惠券(元)',
                    key: 'actual_coupon'
                },
                {
                    title: '实际收款金额',
                    key: 'actual_income'
                },
                {
                    title: '代理商应收款金额',
                    key: 'agent_accrued_revenues'
                },
                {
                    title: '代理商实际分成金额',
                    key: 'agent_actual_income'
                },
                {
                    title: '死账(元)',
                    key: 'bad_debt'
                },
                {
                    title: '交易结果',
                    key: 'income_status'
                },               
                {
                    title: '缴费日期',
                    key: 'statistics_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.statistics_date) }</span>
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
        }
    }
}
</script>
