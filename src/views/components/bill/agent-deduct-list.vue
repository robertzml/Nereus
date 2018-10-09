<template>
    <div class="agent-deduct-list">
        <Table :data="tableData" :columns="columns" ref="table" stripe border></Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
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
                    title: '消费者姓名',
                    key: 'owner_name'
                },
                {
                    title: '消费者电话',
                    key: 'owner_phone'
                },
                {
                    title: '应扣款金额(包含优惠券)',
                    key: 'money_to_consumer'
                },
                {
                    title: '实际扣款金额(不包含使用的优惠券)',
                    key: 'money_to_consumer_result'
                },
                {
                    title: '代理商分成比例',
                    key: 'money_to_agent_ratio'
                },
                {
                    title: '代理商应获得的金额',
                    key: 'money_to_agent'
                },
                {
                    title: '扣款结果',
                    key: 'money_trade_result',
                    render: (h, params) => {
                        return (
                            <span>{ this.tradeResult(params.row.money_trade_result) }</span>
                        )
                    }
                },
                {
                    title: '扣款时间',
                    key: 'date_of_money_trade_result',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.date_of_money_trade_result) }</span>
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

        tradeResult (val) {
            if (val === 1) {
                return '扣款成功'
            } else {
                return '扣款失败'
            }
        },

        exportData (type) {
            if (type === 3) {
                let temp = JSON.parse(JSON.stringify(this.itemList))
               
                temp.forEach(element => {
                    element.money_trade_result = this.tradeResult(element.money_trade_result)
                    element.date_of_money_trade_result = nereus.displayDateTime(element.date_of_money_trade_result)
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
