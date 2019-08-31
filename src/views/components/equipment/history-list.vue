<template>
    <div class="history-list">
        <Table :data="tableData" :columns="columns" ref="table" border stripe>
            <div slot="footer">
                <span style="margin-left: 10px;">设备总数: {{ itemsCount }} 台</span>
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
            title="设备历史数据"
            width="1600">
            <history-details-mod ref="com1"></history-details-mod>
        </Modal>
    </div>
</template>

<script>
import * as nereus from '@/utility/nereus.js'
import historyDetailsMod from './history-details-mod.vue'

export default {
    name: 'history-list',
    props: {
        itemList: { type: Array, required: true },
        showPager: { type: Boolean, default: true }
    },
    components: {
        historyDetailsMod
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
                    title: '设备设置激活时间',
                    key: 'activate_date',
                    width: 150,
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.activate_date)
                        )
                    }
                },
                {
                    title: '设备转正日期',
                    key: 'in_due_form_date',
                    width: 150,
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.in_due_form_date)
                        )
                    }
                },
                {
                    title: '设备正式开始计算账单节点',
                    key: 'statistics_equipment_in_due_form_date',
                    width: 150,
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.statistics_equipment_in_due_form_date)
                        )
                    }
                },
                {
                    title: '设备注销时间',
                    key: 'inactivate_date',
                    width: 150,
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.inactivate_date)
                        )
                    }
                },
                {
                    title: '创建日志时间',
                    key: 't_equipment_inactivate_log_create_date',
                    width: 150,
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.t_equipment_inactivate_log_create_date)
                        )
                    }
                },
                {
                    title: '状态',
                    key: 'status',
                    width: 150,
                    render: (h, params) => {
                        return (
                            this.showStatus(params.row.status)
                        )
                    }
                },
                {
                    title: '累计用热水量升',
                    key: 'cummlative_heat_water',
                    width: 150
                },
                {
                    title: '累计用电量度',
                    key: 'cummlative_use_electricity',
                    width: 150
                },
                {
                    title: '累计省电量度',
                    key: 'cummlative_electricity_saving',
                    width: 150
                },
                {
                    title: '累计通电时间分',
                    key: 'cummlative_duration_machine',
                    width: 150
                },
                {
                    title: '累计工作时间分',
                    key: 'cummlative_heat_time',
                    width: 150
                },
                {
                    title: '累计综合节电量',
                    key: 'comprehensive_electricity_saving',
                    width: 150
                },
                {
                    title: '注销原因',
                    key: 'explanation',
                    width: 150
                },
                {
                    title: '备注',
                    key: 'remark',
                    width: 150
                },
                {
                    title: '试用截至日期',
                    key: 'set_free_time_date',
                    width: 150,
                    render: (h, params) => {
                        return (
                            nereus.displayDate(params.row.set_free_time_date)
                        )
                    }
                },
                {
                    title: '免费使用时间',
                    key: 'set_free_time',
                    width: 150,
                    render: (h, params) => {
                        return (
                            nereus.displayDate(params.row.set_free_time)
                        )
                    }
                },
                {
                    title: '是否更换设备',
                    key: 'is_change_equipment',
                    width: 150,
                    render: (h, params) => {
                        return (
                            this.isChange(params.row.is_change_equipment)
                        )
                    }
                },
                {
                    title: '更换时间',
                    key: 'change_time',
                    width: 150,
                    render: (h, params) => {
                        return (
                            nereus.displayDate(params.row.change_time)
                        )
                    }
                },
                {
                    title: '代理商公司名',
                    key: 'agent_company_name',
                    width: 150
                },
                {
                    title: '代理商业务员电话',
                    key: 'agent_phone',
                    width: 150
                },
                {
                    title: '申请者姓名',
                    key: 'apply_account_name',
                    width: 150
                },
                {
                    title: '安装工姓名',
                    key: 'erector_name',
                    width: 150
                },
                {
                    title: '安装工电话号码',
                    key: 'erector_phone',
                    width: 150
                },
                {
                    title: '设备管理者名称',
                    key: 'owner_intendant_name',
                    width: 150
                },
                {
                    title: '设备管理者电话号码',
                    key: 'owner_intendant_phone',
                    width: 150
                },
                {
                    title: '设备用户的公司名称',
                    key: 'owner_company_name',
                    width: 150
                },
                {
                    title: '设备用户名称',
                    key: 'owner_name',
                    width: 150
                },
                {
                    title: '设备用户电话',
                    key: 'owner_phone',
                    width: 150
                },
                {
                    title: '设备用户省地址',
                    key: 'owner_address_province',
                    width: 150
                },
                {
                    title: '设备用户市地址',
                    key: 'owner_address_city',
                    width: 150
                },
                {
                    title: '设备用户区地址',
                    key: 'owner_address_district',
                    width: 150
                },
                {
                    title: '设备用户详细地址',
                    key: 'owner_address_detail',
                    width: 150
                },
                {
                    title: '设备初始金额',
                    key: 'prepay_rent',
                    width: 150
                },
                {
                    title: '安装费',
                    key: 'installation_charge',
                    width: 150
                },
                {
                    title: '合同生成日期',
                    key: 'create_date',
                    width: 150,
                    render: (h, params) => {
                        return (
                            nereus.displayDate(params.row.create_date)
                        )
                    }
                },
                {
                    title: '操作',
                    width: 120,
                    align: 'center',
                    render: (h, params) => {
                        return (
                        <div>
                            <i-button type="primary" size="small" style="marginRight: 5px" onClick={ () => { this.showDetails(params.row) } }>查看</i-button>
                        </div>
                        )
                    }
                }
            ],
            pageSize: 10,
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
        }
    },
    methods: {
        changePageSize (pageSize) {
            this.pageSize = pageSize
        },
        showDetails (item) {
            this.$refs.com1.getInfo(item.product_type_id, item.serial_number, item.activate_date, item.inactivate_date)
            this.modal1 = true
        },

        isChange (val) {
            if (val === 1) {
                return '是'
            } else {
                return '否'
            }
        },

        showStatus (val) {
            if (status === 0) {
                return '正常注销'
            } else if (status === 1) {
                return '删除'
            } else if (status === 2) {
                return '更换设备注销'
            } else {
                return '未知'
            }
        },

        exportData () {
            let temp = JSON.parse(JSON.stringify(this.itemList))
            
            temp.forEach(element => {
                element.activate_date = nereus.displayDateTime(element.activate_date)
                element.in_due_form_date = nereus.displayDateTime(element.in_due_form_date)
                element.statistics_equipment_in_due_form_date = nereus.displayDateTime(element.statistics_equipment_in_due_form_date)
                element.inactivate_date = nereus.displayDateTime(element.inactivate_date)
                element.t_equipment_inactivate_log_create_date = nereus.displayDateTime(element.t_equipment_inactivate_log_create_date)
                element.status = this.showStatus(element.status)
                element.set_free_time_date = nereus.displayDateTime(element.set_free_time_date)
                element.set_free_time = nereus.displayDateTime(element.set_free_time)
                element.is_change_equipment = this.isChange(element.is_change_equipment)
                element.change_time = nereus.displayDate(element.change_time)
                element.create_date = nereus.displayDate(element.create_date)
                if (element.remark != null) {
                    element.remark = element.remark.replace(',', ';')
                }
                if (element.owner_address_detail != null) {
                    element.owner_address_detail = element.owner_address_detail.replace(',', ';')
                }
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
