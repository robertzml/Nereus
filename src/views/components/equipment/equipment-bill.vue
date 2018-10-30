<template>
    <div class="equipment-bill">
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
    name: 'equipment-bill',
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
                    title: '消费者应扣费用',
                    key: 'money_to_consumer'
                },
                {
                    title: '代理商应获得费用',
                    key: 'money_to_agent'
                },
                {
                    title: '代理商应获得费用占总扣费用的比例',
                    key: 'money_to_agent_ratio'
                },
                {
                    title: '交费种类',
                    key: 'money_tpye',
                    render: (h, params) => {
                        return (
                            <span>{ this.moneyType(params.row.money_tpye) }</span>
                        )
                    }
                },
                {
                    title: '交易结果',
                    key: 'money_trade_result',
                    render: (h, params) => {
                        return (
                            <span>{ this.moneyTradeResult(params.row.money_trade_result) }</span>
                        )
                    }
                },
                {
                    title: '付款时间',
                    key: 'date_of_money_trade_result',
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.date_of_money_trade_result)
                        )
                    }
                },
                {
                    title: '累计数据截至日期',
                    key: 'statistics_log_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDate(params.row.statistics_log_date) }</span>
                        )
                    }
                },
                {
                    title: '分期期数',
                    key: 'statistics_number_of_periods'
                },
                {
                    title: '分期开始日期',
                    key: 'statistics_number_of_periods_start',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDate(params.row.statistics_number_of_periods_start) }</span>
                        )
                    }
                },
                {
                    title: '分期结束日期',
                    key: 'statistics_number_of_periods_end',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDate(params.row.statistics_number_of_periods_end) }</span>
                        )
                    }
                },
                {
                    title: '创建时间',
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

        moneyType: function (type) {
            switch (type) {
                case -2:
                    return '注销期间数据'
                case -1:
                    return '免费期'
                case 1:
                    return '一次性付款'
                case 2:
                    return '分期付款'
                case 4:
                    return '浮动分期'
                case 31:
                    return '固定租金'
                case 32:
                    return '混合租金'
                case 33:
                    return '节能分享'
                case 34:
                    return '浮动租金'
            }
        },

        moneyTradeResult: function (type) {
            switch (type) {
                case -2:
                    return '首次交易待处理'
                case -1:
                    return '不需要交易'
                case 0:
                    return '交易待处理'
                case 1:
                    return '交易成功'
                case 2:
                    return '交易失败'
            }
        }
    }
}
</script>
