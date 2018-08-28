<template>
    <div class="unpaid-list">
        <Table :data="tableData" :columns="columns" stripe border>
            <div slot="footer" class="footer">
                <span>待付款合计：{{ totalMoney }} 元</span>
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
    name: 'unpaid-list',
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
                    title: '生产厂家',
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
                    title: '消费者需付款金额',
                    key: 'money_to_consumer'
                },
                {
                    title: '设备停机时间',
                    key: 'device_deadline_date',
                    render: (h, params) => (
                        <span>{ nereus.displayDate(params.row.device_deadline_date) }</span>
                    )
                },
                {
                    title: '交易结果',
                    key: 'money_trade_result',
                     render: (h, params) => {
                        return (
                            <span>{ this.tradeResult(params.row.money_trade_result) }</span>
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
            pageSizeOpt: [5, 10, 20, 30],
            sumFee: 0
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
        totalMoney () {
            let total = 0
            this.itemList.forEach(element => {
                total += element.money_to_consumer
            })
            return total
        }
    },
    methods: {
        changePageSize (pageSize) {
            this.pageSize = pageSize
        },

        tradeResult (val) {
            switch (val) {
                case -2:
                    return '设备正式激活时的待交易处理'
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

<style scoped>
.footer span{
    margin-left: 20px;
}
</style>
