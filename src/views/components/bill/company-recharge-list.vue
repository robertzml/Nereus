<template>
    <div class="company-recharge-list">
        <Table :data="tableData" :columns="columns" ref="table" stripe border>
            <div slot="footer" class="footer">
                <span style="margin-left:20px;margin-right:20px;">共 {{ itemsCount }} 条充值记录</span>
                <span style="margin-right:20px;">充值金额合计 {{ totalMoney }} 元</span>
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
/** 厂商充值列表 */
import * as nereus from '@/utility/nereus.js'

export default {
    name: 'company-recharge-list',
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
                    title: '公司代码',
                    key: 'company_code',
                    width: 100
                },
                {
                    title: '交易单号',
                    key: 'out_trade_no',
                    width: 260
                },
                {
                    title: '设备主人账号',
                    key: 'user_name',
                    width: 150
                },
                {
                    title: '设备主人电话号码',
                    key: 'phone',
                    width: 150
                },
                {
                    title: '钱包id',
                    key: 'wallet_id',
                    width: 120
                },
                {
                    title: '充值金额',
                    key: 'transferred_in_amount',
                    width: 150
                },
                {
                    title: '充值优惠券',
                    key: 'transferred_in_coupon',
                    width: 100
                },
                {
                    title: '充值方式',
                    key: 'payment',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.paymentType(params.row.payment) }</span>
                        )
                    },
                    width: 100
                },
                {
                    title: '充值日期',
                    key: 'transaction_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.transaction_date) }</span>
                        )
                    },
                    width: 160
                },
                {
                    title: '充值描述',
                    key: 'transferred_description',
                    width: 200
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
        totalMoney () {
            let total = 0
            this.itemList.forEach(element => {
                total += element.transferred_in_amount
            })
            return total.toFixed(2)
        }
    },
    methods: {
        changePageSize (pageSize) {
            this.pageSize = pageSize
        },

        exportData () {
            let temp = JSON.parse(JSON.stringify(this.itemList))
            
            temp.forEach(element => {
                element.payment = nereus.paymentType(element.payment)
                element.transaction_date = nereus.displayDateTime(element.transaction_date)
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
