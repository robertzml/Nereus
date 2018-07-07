<template>
    <div class="store-list">
        <Table :data="tableData" :columns="columns" stripe border></Table>
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
    name: 'store-list',
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
                    title: '所属公司',
                    key: 'company_name'
                },
                {
                    title: '产品名称',
                    key: 'product_name'
                },
                {
                    title: '设备序列号',
                    key: 'serial_number'
                },
                {
                    title: '售出状态',
                    key: 'sale_status',
                    render: (h, params) => {
                        return (
                            <span>{ this.saleStatus(params.row.sale_status) }</span>
                        )
                    }
                },
                {
                    title: '导入日期',
                    key: 'create_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.create_date) }</span>
                        )
                    }
                },
                {
                    title: '修改日期',
                    key: 'update_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.update_date) }</span>
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
        changePageSize (pageSize) {
            this.pageSize = pageSize
        },

        saleStatus: function (status) {
            if (status === 0) {
                return '未售出'
            } else if (status === 1) {
                return '已售出'
            } else {
                return '未知'
            }
        }
    }
}
</script>