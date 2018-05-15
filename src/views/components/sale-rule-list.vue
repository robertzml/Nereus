<template>
    <div class="sale-rule-list">
        <Table :data="tableData" :columns="columns" stripe border></Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" show-sizer placement="top" 
                    @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sale-rule-list',
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
                    title: '付款方式',
                    key: 'pay_type',
                    render: (h, params) => {
                        return (
                            <span>{ this.displayPayType(params.row.pay_type) }</span>
                        )
                    }
                },
                {
                    title: '分期数',
                    key: 'divided_pay_pers'
                },
                {
                    title: '租金类型',
                    key: 'charge_type',
                    render: (h, params) => {
                        return (
                            <span>{ this.displayChargeType(params.row.charge_type) }</span>
                        )
                    }
                },
                {
                    title: '期望初始金额(元)',
                    key: 'prepay_rent'
                },
                {
                    title: '期望安装费(元)',
                    key: 'installation_charge'
                },
                {
                    title: '期望设备押金(元)',
                    key: 'device_deposit'
                },
                {
                    title: '每期费用(元)',
                    key: 'fix_month_rent'
                },
                {
                    title: '每期时间(月)',
                    key: 'set_time_divided_pay_pers'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return (
                            <div>
                                <i-button type="primary" size="small" onClick={ () => { this.showDetails(params.row) } }>查看</i-button>
                            </div>
                        )
                    }
                }
            ],
            pageSize: 10,
            currentPage: 1,
            pageSizeOpt: [5, 10, 20, 30],
            tableData: this.itemList.slice(0, this.pageSize)
        }
    },
    computed: {
        itemsCount () {
            return this.itemList.length
        }
    },
    watch: {
        itemList: function (newList) {
            this.tableData = newList.slice(0, this.pageSize)
        }
    },
    methods: {
        displayPayType (val) {
            switch (val) {
                case 1:
                    return '一次性购买'
                case 2:
                    return '分期付款'
                case 3:
                    return '租金'
                case 4:
                    return '浮动分期'
                default:
                    return '未定义'
            }
        },
        displayChargeType (val) {
            switch (val) {
                case 1:
                    return '固定租金'
                case 2:
                    return '混合租金'
                case 3:
                    return '节能分享'
                default:
                    return '未定义'
            }
        },
        changePage (page) {
            this.tableData = this.itemList.slice((page - 1) * this.pageSize, page * this.pageSize)
        },
        changePageSize (pageSize) {
            this.pageSize = pageSize
            this.tableData = this.itemList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        },
        showDetails (item) {
            this.$router.push({ name: 'sale-rule', params: { id: item.id } })
        }
    }
}
</script>
