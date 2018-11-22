<template>
    <div class="history-list">
        <Table :data="tableData" :columns="columns" border stripe>
            <div slot="footer">
                <span style="margin-left: 10px;">设备总数: {{ itemsCount }} 台</span>
            </div>
        </Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
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
                    title: '产品名称',
                    key: 'product_id_name',
                    width: 130
                },
                {
                    title: '设备用户电话',
                    key: 'consumer_phone',
                    width: 115
                },
                {
                    title: '设备用户账号名称',
                    key: 'consumer_user_name',
                    width: 100
                },
                {
                    title: '设备设置激活时间',
                    key: 'activate_date',
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.activate_date)
                        )
                    },
                    width: 160
                },
                {
                    title: '设备转正日期节点',
                    key: 'in_due_form_date',
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.in_due_form_date)
                        )
                    },
                    width: 160
                },
                {
                    title: '设备正式开始计算账单节点',
                    key: 'statistics_equipment_in_due_form_date',
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.statistics_equipment_in_due_form_date)
                        )
                    },
                    width: 160
                },
                {
                    title: '设备注销时间',
                    key: 'inactivate_date',
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.inactivate_date)
                        )
                    },
                    width: 160
                },
                {
                    title: '创建日志时间',
                    key: 'create_date',
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.create_date)
                        )
                    },
                    width: 160
                },
                {
                    title: '备注',
                    key: 'remark',
                    width: 150
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
        }
    }
}
</script>
