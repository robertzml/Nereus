<template>
    <div class="agent-deduct-list">
        <Table :data="tableData" :columns="columns" ref="table" stripe border>
        </Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div>
                <span style="margin-left:20px;">{{ additionalText }}</span>
                <br />

                <span style="margin-left:20px;margin-right:20px;">共 {{ itemsCount }} 条收益记录</span>
                <span style="margin-right:20px;">设备实际收款合计 {{ actualAmount }} 元</span>
                <!--<span style="margin-right:20px;">代理商实际分成合计 {{ realAmount }} 元</span>-->
                <span style="margin-right:20px;">优惠券合计 {{ totalCoupon }} 元</span>
                <span style="margin-right:20px;">死账合计 {{ badTotal }} 元</span>
                <br />
            </div>
            <div>
                <Button type="primary" size="large" @click="exportData(3)"><Icon type="ios-download-outline"></Icon> 导出数据</Button>
            </div>
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" :page-size-opts="pageSizeOpt" show-sizer placement="top" 
                    @on-page-size-change="changePageSize"></Page>
            </div>
        </div>
    </div>
</template>

<script>
/* 代理商收益表格 */
import * as nereus from '@/utility/nereus.js'

export default {
    name: 'agent-deduct-list',
    props: {
        itemList: { type: Array, required: true },
        showPager: { type: Boolean, default: true },
        additionalText: { type: String, default: '' }
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
                    key: 'serial_number',
                    width: 100
                },
                {
                    title: '产品类别',
                    key: 't_product_type_name',
                    width: 100
                },
                {
                    title: '产品名称',
                    key: 'product_name',
                    width: 100
                },
                {
                    title: '代理商公司名称',
                    key: 'agent_company_name',
                    width: 150
                },
                {
                    title: '设备主人姓名',
                    key: 'consumer_name',
                    width: 120
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
                    width: 60
                },
                {
                    title: '销售方式',
                    key: 'product_charge_money_type',
                    width: 100,
                    render: (h, params) => {
                        return (
                            <span>{ nereus.moneyType(params.row.product_charge_money_type) }</span>
                        )
                    }
                },
                {
                    title: '销售方式昵称',
                    key: 'product_sale_rule_name',
                    width: 100
                },
                {
                    title: '账期起始时间',
                    key: 'statistics_number_of_periods_start',
                    width: 100,
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.statistics_number_of_periods_start) }</span>
                        )
                    }
                },
                {
                    title: '账期截止时间',
                    key: 'statistics_number_of_periods_end',
                    width: 100,
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.statistics_number_of_periods_end) }</span>
                        )
                    }
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
                    title: '代理商实际分成金额',
                    key: 'agent_actual_income',
                    width: 100
                },
                {
                    title: '死账(元)',
                    key: 'bad_debt',
                    width: 100
                },
                {
                    title: '总分成比例',
                    key: 'total_agent_ratio',
                    width: 100
                },
                {
                    title: '交易结果',
                    key: 'income_status',
                    width: 100,
                    render: (h, params) => {
                        return (
                            <span>{ this.incomeStatus(params.row.income_status) }</span>
                        )
                    }
                },
                {
                    title: '支付人姓名',
                    key: 'actual_income_trade_account_name',
                    width: 120
                },
                {
                    title: '支付人电话',
                    key: 'actual_income_trade_account_phone',
                    width: 120
                },                
                {
                    title: '缴费日期',
                    key: 'statistics_date',
                    width: 100,
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
        realAmount () {
            let total = 0
            this.itemList.forEach(element => {
                total += element.agent_actual_income
            })
            return total.toFixed(2)
        },
        actualAmount () {
            let total = 0
            this.itemList.forEach(element => {
                total += element.actual_income
            })
            return total.toFixed(2)
        },
        totalCoupon () {
            let total = 0
            this.itemList.forEach(element => {
                total += element.actual_coupon
            })
            return total.toFixed(2)
        },
        badTotal () {
            let total = 0
            this.itemList.forEach(element => {
                total += element.bad_debt
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

        exportData (type) {
            if (type === 3) {
                let temp = JSON.parse(JSON.stringify(this.itemList))
               
                temp.forEach(element => {
                    element.product_charge_money_type = nereus.moneyType(element.product_charge_money_type)
                    element.income_status = this.incomeStatus(element.income_status)
                    element.statistics_number_of_periods_start = nereus.displayDateTime(element.statistics_number_of_periods_start)
                    element.statistics_number_of_periods_end = nereus.displayDateTime(element.statistics_number_of_periods_end)
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
}
</script>
