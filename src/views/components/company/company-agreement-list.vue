<template>
    <div class="company-agreement-list">
        <Table :data="tableData" :columns="columns" border stripe></Table>
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
    name: 'company-agreement-list',
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
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '公司名称',
                    key: 't_company_name'
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
                    title: '产品名称',
                    key: 't_product_name'
                },
                {
                    title: '备注',
                    key: 'remark'
                },
                {
                    title: '创建时间',
                    key: 'create_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.create_date) }</span>
                        )
                    },
                    width: 180
                },
                {
                    title: '编辑时间',
                    key: 'update_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.update_date) }</span>
                        )
                    },
                    width: 180
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 100,
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
            this.$router.push({ name: 'company-agreement-details', params: { id: item.id } })
        }
    }
}
</script>
