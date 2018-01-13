<template>
    <div class="company-list">
        <Table :data="tableData" :columns="columns" border stripe></Table>
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
import * as nereus from '../../utility/nereus.js'
import _ from 'lodash'

export default {
    name: 'companyList',
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
                    title: '编码',
                    key: 'code'
                },
                {
                    title: '类型',
                    key: 'type',
                    render: (h, params) => {
                        return h('div', [
                            h('span', nereus.displayCompanyType(params.row.type))
                        ])
                    }
                },
                {
                    title: '联系人',
                    key: 'contact'
                },
                {
                    title: '电话',
                    key: 'phone'
                },
                {
                    title: '售后电话',
                    key: 'aftersale_phone'
                },
                {
                    title: '地址',
                    key: 'address'
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
        showDetails (item) {
            this.$router.push({ name: 'company-details', params: { id: item.id } })
        },
        showEdit (item) {
            this.$router.push({ name: 'company-edit', params: { id: item.id } })
        }
    }
}
</script>