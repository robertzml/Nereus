<template>
    <div class="waterheater-bill-list">
        <Table :data="tableData" :columns="columns" ref="table" stripe border>
            <div slot="footer" class="footer">
                <span style="margin-left:20px;margin-right:20px;">共 {{ itemsCount }} 条记录</span>
            </div>
        </Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
             <div>
                <span style="margin-left:20px;margin-right:20px;">共 {{ itemsCount }} 条收益记录</span>
                <span style="margin-right:20px;">需付款金额合计 {{ totalAmount }} 元</span>
                <br />
            </div>
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
/** 厂商账单列表 */
import * as nereus from '@/utility/nereus.js'

export default {
    name: 'waterheater-bill-list',
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
                    title: '付款情况',
                    key: 'money_trade_status',
                    width: 100
                },
                {
                    title: '付款时间',
                    key: 'date_of_money_trade_result',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.date_of_money_trade_result) }</span>
                        )
                    },
                    width: 100
                },
                {
                    title: '付款方式',
                    key: 'money_type',                    
                    render: (h, params) => {
                        return (
                            this.moneyType(params.row.money_type)
                        )
                    },
                    width: 100
                },
                {
                    title: '分成比例',
                    key: 'money_to_agent_ratio',
                    width: 80
                },
                {
                    title: '代理商应收款',
                    key: 'money_to_agent',
                    width: 80
                },
                {
                    title: '账单创建时间',
                    key: 'create_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.create_date) }</span>
                        )
                    },
                    width: 120
                },
                {
                    title: '账单所属月份',
                    key: 'statistics_year_month',
                    width: 100
                },
                {
                    title: '需付款金额',
                    key: 'money_to_consumer',
                    width: 100
                },
                {
                    title: '实际付款金额',
                    key: 'money_to_consumer_result',
                    width: 100
                },
                {
                    title: '设备账单情况',
                    key: 'equipment_remark',
                    width: 100
                },
                {
                    title: '累计用热水量升',
                    key: 'statistics_heat_water',
                    width: 100
                },
                {
                    title: '累计用电量度',
                    key: 'statistics_use_electricity',
                    width: 100
                },
                {
                    title: '累计省电量度',
                    key: 'statistics_electricity_saving',
                    width: 100
                },
                {
                    title: '累计通电时间分',
                    key: 'statistics_duration_machine',
                    width: 120
                },
                {
                    title: '累计加热时间分',
                    key: 'statistics_heat_time',
                    width: 100
                },
                {
                    title: '累计综合节电量',
                    key: 'statistics_comprehensive_electricity_saving',
                    width: 100
                },
                {
                    title: '每月平均流量',
                    key: 'mean_flow_each_month',
                    width: 100
                },
                {
                    title: '综合节能率',
                    key: 'fractional_energy_saving_comprehensive_each_month',
                    width: 100
                },
                {
                    title: '每月节能率',
                    key: 'fractional_energy_saving_each_month',
                    width: 100
                },
                {
                    title: '设备用户名称',
                    key: 'owner_name',
                    width: 120
                },
                {
                    title: '设备用户电话',
                    key: 'owner_phone',
                    width: 120
                },
                {
                    title: '设备地址省',
                    key: 'owner_address_province',
                    width: 120
                },
                {
                    title: '设备地址市',
                    key: 'owner_address_city',
                    width: 120
                },
                {
                    title: '设备地址区',
                    key: 'owner_address_district',
                    width: 120
                },
                {
                    title: '设备地址详细',
                    key: 'owner_address_detail',
                    width: 180
                },
                {
                    title: '设备使用公司名称',
                    key: 'owner_company_name',
                    width: 120
                },
                {
                    title: '设备管理者名称',
                    key: 'owner_intendant_name',
                    width: 120
                },
                {
                    title: '设备管理者电话号码',
                    key: 'owner_intendant_phone',
                    width: 120
                },
                {
                    title: '代理商公司名称',
                    key: 'agent_company_name',
                    width: 120
                },
                {
                    title: '累计数据开始日期',
                    key: 'statistics_start_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDate(params.row.statistics_start_date) }</span>
                        )
                    },
                    width: 120
                },
                {
                    title: '累计数据截至日期',
                    key: 'statistics_log_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDate(params.row.statistics_log_date) }</span>
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
        totalAmount () {
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

        isActivate (val) {
            return val ? '已激活' : '未激活'
        },

        isUnlock (val) {
            return val ? '已解锁' : '未解锁'
        },

        moneyType (val) {
            if (val === 1 || val === 2 || val === 34 || val === 4) {
                return '先付款'
            } else if (val === 31 || val === 32 || val === 33) {
                return '后付款'
            }
        },

        exportData () {
            let temp = JSON.parse(JSON.stringify(this.itemList))
            
            temp.forEach(element => {
                element.date_of_money_trade_result = nereus.displayDateTime(element.date_of_money_trade_result)
                element.create_date = nereus.displayDateTime(element.create_date)
                // element.activate_date = nereus.displayDateTime(element.activate_date)
                // element.is_activate = this.isActivate(element.is_activate)
                // element.is_unlock = this.isUnlock(element.is_unlock)
                // element.device_deadline_date = nereus.displayDateTime(element.device_deadline_date)
                element.statistics_start_date = nereus.displayDate(element.statistics_start_date)
                element.statistics_log_date = nereus.displayDate(element.statistics_log_date)
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
