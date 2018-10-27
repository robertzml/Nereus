<template>
    <div class="consumer-deposit-list">
        <Table :data="tableData" :columns="columns" stripe border>
            <div slot="footer">
                <span style="margin-left: 10px;">设备押金合计: {{ totalDeposit }} 元</span>
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
                    key: 'serial_number'
                },
                {
                    title: '押金账单交易号',
                    key: 'pay_equipment_deposit_out_trade_no'
                },
                {
                    title: '正式激活/注销设备',
                    key: 'add_or_delete_equipment'
                },
                {
                    title: '设备支付押金/退出押金(元)',
                    key: 'add_or_delete_equipment_deposit'
                },
                {
                    title: '押金支付方式名称',
                    key: 'pay_equipment_deposit_type_name'
                },
               
                {
                    title: '付费类型',
                    key: 'product_charge_money_type',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.moneyType(params.row.product_charge_money_type) }</span>
                        )
                    }
                },
                {
                    title: '押金状态',
                    key: 'pay_equipment_deposit_status'
                },
                {
                    title: '激活设备时间',
                    key: 'pay_equipment_deposit_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.pay_equipment_deposit_date) }</span>
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
                total += element.add_or_delete_equipment_deposit
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
