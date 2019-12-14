<template>
    <div class="unpaid-list">
        <Table :data="tableData" :columns="columns" ref="table" stripe border>
            <div slot="footer" class="footer">
                <span style="margin-right:20px;">共 {{ itemsCount }} 台待付款设备</span>
                <span>待付款合计：{{ totalMoney }} 元</span>
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
                    title: '账期',
                    key: 'statistics_year_month'
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
                    title: '省',
                    key: 'owner_address_province'
                },
                {
                    title: '市',
                    key: 'owner_address_city'
                },
                {
                    title: '区',
                    key: 'owner_address_district'
                },
                {
                    title: '地址',
                    key: 'owner_address_detail'
                },
                {
                    title: '公司名称',
                    key: 'owner_company_name'
                },
                {
                    title: '销售类型',
                    key: 'money_type',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.moneyType(params.row.money_type) }</span>
                        )
                    }
                },
                {
                    title: '消费者需付款金额',
                    key: 'money_to_consumer',
                    sortable: true,
                    render: (h, params) => (
                        params.row.money_to_consumer.toFixed(2)
                    )
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
                },
                {
                    title: '备注',
                    key: 'remark'
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
            return total.toFixed(2)
        }
    },
    methods: {
        changePageSize (pageSize) {
            this.pageSize = pageSize
        },

        tradeResult (val) {
            switch (val) {
                case -3:
                    return '不需要调整锁定时间的待交易处理'
                case -2:
                    return '设备正式激活时的待交易处理'
                case -1:
                    return '不需要交易'
                case 0:
                    return '需要调整锁定时间的待交易处理'
                case 1:
                    return '交易成功'
                case 2:
                    return '交易失败'
            }
        },

        exportData () {
            let temp = JSON.parse(JSON.stringify(this.itemList))
            
            temp.forEach(element => {
                element.money_to_consumer = element.money_to_consumer.toFixed(2)
                element.device_deadline_date = nereus.displayDate(element.device_deadline_date)
                element.money_trade_result = this.tradeResult(element.money_trade_result)
                element.create_date = nereus.displayDateTime(element.create_date)
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

<style scoped>
.footer span{
    margin-left: 20px;
}
</style>
