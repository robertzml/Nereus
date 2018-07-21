<template>
    <div class="share-list">
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
import * as nereus from '@/utility/nereus.js'

export default {
    name: 'share-list',
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
                    title: '厂商名称',
                    key: 'company_name'
                },
                {
                    title: '代理商名称',
                    key: 'agent_name'
                },
                {
                    title: '产品名称',
                    key: 'product_name'
                },              
                {
                    title: '销售规则名称',
                    key: 'product_sale_rule_name'
                },
                {
                    title: '代理商分成比例',
                    key: 'agent_money_sharing_value'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return (
                            <div>
                                <i-button type="warning" size="small" onClick={ () => { this.showEdit(params.row) } }>编辑</i-button>
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
        changePage (page) {
            this.tableData = this.itemList.slice((page - 1) * this.pageSize, page * this.pageSize)
        },
        changePageSize (pageSize) {
            this.pageSize = pageSize
            this.tableData = this.itemList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        },
        showEdit (item) {

        }
    }
}
</script>
