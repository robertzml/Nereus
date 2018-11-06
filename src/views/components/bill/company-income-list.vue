<template>
    <div class="company-income-list">
        <Table :data="tableData" :columns="columns" ref="table" stripe border>
            <div slot="footer" class="footer">
                <span style="margin-left:20px;margin-right:20px;">共 {{ itemsCount }} 条收益记录</span>
                <span style="margin-right:20px;">应收款合计 {{ totalDue }} 元</span>
                <span style="margin-right:20px;">实收款合计 {{ totalReal }} 元</span>
            </div>
        </Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div>
                <Button type="primary" size="large" @click="exportData()"><Icon type="ios-download-outline"></Icon> 导出数据</Button>
            </div>
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" :page-size-opts="pageSizeOpt" show-sizer placement="top" 
                    @on-page-size-change="changePageSize"></Page>
            </div>
        </div>
    </div>
</template>

<script>
/** 工厂收益列表 */
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
                    align: 'center',
                    fixed: 'left'
                },
                {
                    title: '设备序列号',
                    key: 'serial_number',
                    width: 150
                },
                {
                    title: '产品名称',
                    key: 'product_name',
                    width: 150
                },
                {
                    title: '设备主人',
                    key: 'consumer_name',
                    width: 100
                },
                {
                    title: '设备主人电话',
                    key: 'consumer_phone',
                    width: 120
                },
                {
                    title: '账单序列号',
                    key: 'actual_income_trade_no',
                    width: 200
                },
                {
                    title: '期数',
                    key: 'statistics_number_of_periods',
                    width: 80
                },
                {
                    title: '账期起始时间',
                    key: 'statistics_number_of_periods_start',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.statistics_number_of_periods_start) }</span>
                        )
                    },
                    width: 100
                },
                {
                    title: '账期截止时间',
                    key: 'statistics_number_of_periods_end',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.statistics_number_of_periods_end) }</span>
                        )
                    },
                    width: 100
                },
                {
                    title: '销售方式',
                    key: 'product_charge_money_type',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.moneyType(params.row.product_charge_money_type) }</span>
                        )
                    },
                    width: 100
                },
                {
                    title: '销售方式别名',
                    key: 'product_sale_rule_name',
                    width: 100
                },
                {
                    title: '支付人姓名',
                    key: 'actual_income_trade_account_name',
                    width: 100
                },
                {
                    title: '支付人电话',
                    key: 'actual_income_trade_account_phone',
                    width: 120
                },
                {
                    title: '应收款金额',
                    key: 'accrued_revenues',
                    width: 100
                },
                {
                    title: '使用优惠券(元)',
                    key: 'actual_coupon',
                    width: 100
                },
                {
                    title: '实际收款金额',
                    key: 'actual_income',
                    width: 100
                },
                {
                    title: '代理商应收款金额',
                    key: 'agent_accrued_revenues',
                    width: 100
                },
                {
                    title: '代理商实际分成金额',
                    key: 'agent_actual_income',
                    width: 100
                },
                {
                    title: '死账(元)',
                    key: 'bad_debt',
                    width: 80
                },
                {
                    title: '交易结果',
                    key: 'income_status',
                    render: (h, params) => {
                        return (
                            this.incomeStatus(params.row.income_status)
                        )
                    },
                    width: 100
                },               
                {
                    title: '缴费日期',
                    key: 'statistics_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.statistics_date) }</span>
                        )
                    },
                    width: 120
                }
            ],
            pageSize: 10,
            currentPage: 1,
            pageSizeOpt: [5, 10, 20, 30]
        }
    },
    watch: {
        itemList: function (val) {
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
        },
        totalDue () {
            let total = 0
            this.itemList.forEach(element => {
                total += element.accrued_revenues
            })
            return total.toFixed(2)
        },
        totalReal () {
            let total = 0
            this.itemList.forEach(element => {
                total += element.actual_income
            })
            return total.toFixed(2)
        }
    },
    methods: {
        changePageSize (pageSize) {
            this.pageSize = pageSize
        },

        incomeStatus (val) {
            switch (val) {
                case 0:
                    return '交易成功'
                case 2:
                    return '死账'
                default:
                    return '未知'
            }
        },

        exportData () {
            let temp = JSON.parse(JSON.stringify(this.itemList))
            
            temp.forEach(element => {
                element.statistics_number_of_periods_start = nereus.displayDateTime(element.statistics_number_of_periods_start)
                element.statistics_number_of_periods_end = nereus.displayDateTime(element.statistics_number_of_periods_end)
                element.product_charge_money_type = nereus.moneyType(element.product_charge_money_type)
                element.statistics_date = nereus.displayDateTime(element.statistics_date)
            })

            this.$refs.table.exportCsv({
                filename: '导出数据',
                columns: this.columns,
                data: temp
            })
        }
    }
}
</script>
