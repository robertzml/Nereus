<template>
    <div class="equipment-deposit-list">
        <Table :data="tableData" :columns="columns" ref="table" stripe border>
            <div slot="footer" class="footer">
                <span style="margin-right:20px;">共 {{ itemsCount }} 条押金记录</span>
                <span>押金合计：{{ totalMoney }} 元</span>
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
        <Modal
            v-model="modal1"
            title="押金退还信息"
            width="600">
            <inactivate-bill-mod ref="com1"></inactivate-bill-mod>
        </Modal>
    </div>
</template>

<script>
import * as nereus from '@/utility/nereus.js'
import inactivateBillMod from './inactivate-bill-mod.vue'

export default {
    name: 'equipment-deposit-list',
    props: {
        itemList: { type: Array, required: true },
        showPager: { type: Boolean, default: true },
        type: { type: Number }
    },
    components: {
        inactivateBillMod
    },
    data () {
        return {
            pageSize: 10,
            columns: [],
            currentPage: 1,
            pageSizeOpt: [5, 10, 20, 30],
            modal1: false
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
                total += element.equipment_deposit
            })
            return total.toFixed(2)
        }
    },
    methods: {
        changePageSize (pageSize) {
            this.pageSize = pageSize
        },
        depositStatus (status) {
            if (status === 0) {
                return '未退还'
            } else if (status === 1) {
                return '已退还'
            }
        },
        showDetails (item) {
            this.$refs.com1.getInfo(item.t_equipment_inactivate_bill_id)
            this.modal1 = true
        },
        exportData () {
            let temp = JSON.parse(JSON.stringify(this.itemList))
            
            temp.forEach(element => {
                element.pay_equipment_deposit_status = this.depositStatus(element.pay_equipment_deposit_status)
                element.pay_equipment_deposit_date = nereus.displayDateTime(element.pay_equipment_deposit_date)
            })

            this.$refs.table.exportCsv({
                filename: '导出数据',
                columns: this.columns,
                data: temp
            })
        }
    },
    created: function () {
        if (this.type === 1) {
            this.columns = [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '账单序号',
                    key: 'pay_equipment_deposit_out_trade_no'
                },
                {
                    title: '设备序列号',
                    key: 'serial_number'
                },
                {
                    title: '产品名称',
                    key: 'product_name'
                },
                {
                    title: '设备主人帐号',
                    key: 'consumer_name'
                },
                {
                    title: '设备主人',
                    key: 'owner_name'
                },
                {
                    title: '设备主人电话',
                    key: 'consumer_phone'
                },
                {
                    title: '代理商公司名称',
                    key: 'agent_company_name'
                },
                {
                    title: '设备押金',
                    key: 'equipment_deposit'
                },  
                {
                    title: '押金状态',
                    key: 'pay_equipment_deposit_status',
                    render: (h, params) => {
                        return (
                            this.depositStatus(params.row.pay_equipment_deposit_status)
                        )
                    }
                },
                {
                    title: '押金支付人名称',
                    key: 'pay_equipment_deposit_online_account_name'
                },
                {
                    title: '押金支付人电话号码',
                    key: 'pay_equipment_deposit_online_account_phone'
                },
                {
                    title: '押金支付方式',
                    key: 'pay_equipment_deposit_type_name'
                },
                {
                    title: '押金支付时间',
                    key: 'pay_equipment_deposit_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.pay_equipment_deposit_date) }</span>
                        )
                    }
                },
                {
                    title: '审核人员',
                    key: 'operater_name'
                }
            ]
        } else if (this.type === 2) {
            this.columns = [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '账单序号',
                    key: 'pay_equipment_deposit_out_trade_no'
                },
                {
                    title: '设备序列号',
                    key: 'serial_number'
                },
                {
                    title: '产品名称',
                    key: 'product_name'
                },
                {
                    title: '设备主人帐号',
                    key: 'consumer_name'
                },
                {
                    title: '设备主人',
                    key: 'owner_name'
                },
                {
                    title: '设备主人电话',
                    key: 'consumer_phone'
                },
                {
                    title: '代理商公司名称',
                    key: 'agent_company_name'
                },
                {
                    title: '设备押金',
                    key: 'equipment_deposit'
                },                
                {
                    title: '押金状态',
                    key: 'pay_equipment_deposit_status',
                    render: (h, params) => {
                        return (
                            this.depositStatus(params.row.pay_equipment_deposit_status)
                        )
                    }
                },
                {
                    title: '代收费人姓名',
                    key: 'pay_equipment_deposit_unline_account_name'
                },
                {
                    title: '代收费人电话',
                    key: 'pay_equipment_deposit_unline_account_phone'
                },
                
                {
                    title: '押金支付方式',
                    key: 'pay_equipment_deposit_type_name'
                },
                {
                    title: '押金支付时间',
                    key: 'pay_equipment_deposit_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.pay_equipment_deposit_date) }</span>
                        )
                    }
                },
                {
                    title: '审核人员',
                    key: 'operater_name'
                }
            ]
        } else if (this.type === 3) {
            this.columns = [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '账单序号',
                    key: 'pay_equipment_deposit_out_trade_no'
                },
                {
                    title: '设备序列号',
                    key: 'serial_number'
                },
                {
                    title: '产品名称',
                    key: 'product_name'
                },
                {
                    title: '设备用户名称',
                    key: 'consumer_name'
                },
                {
                    title: '代理商公司名称',
                    key: 'agent_company_name'
                },
                {
                    title: '押金退还申请人名称',
                    key: 'pay_equipment_deposit_unline_account_name'
                },
                {
                    title: '押金退还申请人电话号码',
                    key: 'pay_equipment_deposit_unline_account_phone'
                },
                {
                    title: '设备押金',
                    key: 'equipment_deposit'
                },                
                {
                    title: '押金状态',
                    key: 'pay_equipment_deposit_status',
                    render: (h, params) => {
                        return (
                            this.depositStatus(params.row.pay_equipment_deposit_status)
                        )
                    }
                },
                {
                    title: '实际退还押金金额',
                    key: 'return_equipment_deposit'
                },
                {
                    title: '押金支付方式',
                    key: 'pay_equipment_deposit_type_name'
                },
                {
                    title: '押金支付时间',
                    key: 'pay_equipment_deposit_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.pay_equipment_deposit_date) }</span>
                        )
                    }
                },
                {
                    title: '审核人员',
                    key: 'operater_name'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return (
                        <div>
                            <i-button type="primary" size="small" style="marginRight: 5px" onClick={ () => { this.showDetails(params.row) } }>查看</i-button>
                        </div>
                        )
                    }
                }
            ]
        }
    }
}
</script>

<style scoped>
.footer span{
    margin-left: 20px;
}
</style>
