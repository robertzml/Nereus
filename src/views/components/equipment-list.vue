<template>
    <div class="equipment-list">
        <Table :data="tableData" :columns="columns" border stripe></Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" :page-size-opts="pageSizeOpt" show-sizer placement="top" 
                    @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
            </div>
        </div>
    </div>
</template>

<script>
import * as nereus from '../../utility/nereus.js'

export default {
    name: 'equipment-list',
    props: {
        itemList: { type: Array, required: true },
        showPager: { type: Boolean, default: true },
        filterKey: { type: String }
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
                    title: '序列号',
                    key: 'serial_number'
                },
                {
                    title: '产品名称',
                    key: 'product_name'
                },
                {
                    title: '产品类别',
                    key: 'product_type_name'
                },
                {
                    title: '生产厂商',
                    key: 'vendor_company_name'
                },
                {
                    title: '代理商',
                    key: 'agent_company_name'
                },
                {
                    title: '设备主人',
                    key: 'owner_name'
                },
                {
                    title: '手机号',
                    key: 'owner_phone'
                },
                {
                    title: '激活状态',
                    key: 'is_activate',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return (
                            <span>{ params.row.is_activate ? '已激活' : '未激活' }</span>
                        )
                    }
                },
                {
                    title: '解锁状态',
                    key: 'is_unlock',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return (
                            <span>{ params.row.is_unlock ? '已解锁' : '未解锁' }</span>
                        )
                    }
                },
                {
                    title: '使用截至时间',
                    key: 'device_deadline_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDate(params.row.device_deadline_date) }</span>
                        )
                    }
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
        changePage (page) {
            // this.tableData = this.itemList.slice((page - 1) * this.pageSize, page * this.pageSize)
        },
        changePageSize (pageSize) {
            this.pageSize = pageSize
            // this.tableData = this.itemList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        },
        showDetails (item) {
            this.$router.push({ name: 'equipment-details', params: { id: item.id } })
        }
    }
}
</script>
